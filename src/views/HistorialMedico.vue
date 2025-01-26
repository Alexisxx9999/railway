<template>
  <div class="content">
    <div class="header-container">
      <h1>🏥 Registro Médico</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div class="search-container">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por mascota..."
        />
        <button @click="searchHistory" class="search-button">Buscar</button>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-user"></i> Fecha</th>
            <th><i class="fas fa-user"></i> Nombre Mascota</th>
            <th><i class="fas fa-id-card-alt"></i> Categoría</th>
            <th><i class="fas fa-calendar-alt"></i> diagnostico</th>
            <th><i class="fas fa-cog"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in paginatedMedicalHistory"
            :key="record.idHistorial"
          >
            <td>{{ record.createHistory }}</td>
            <td>{{ getPetName(record.idMascota) }}</td>
            <td>{{ record.especialidad }}</td>
            <td>{{ record.diagnostico }}</td>
            <td class="actions">
              <!-- <i class="fas fa-edit" @click="editRecord(record)"></i> -->
              <i
                class="fas fa-trash-alt"
                @click="deleteRecord(record.idHistorial)"
              ></i>
            </td>
          </tr>

          <tr v-if="paginatedMedicalHistory.length === 0">
            <td colspan="4" style="text-align: center">
              No se encontraron registros
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Botones de paginación -->
    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">
        &laquo; Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Siguiente &raquo;
      </button>
    </div>

    <button @click="goBack" class="back-button">Regresar</button>
    <Modal
      v-if="showModal"
      :show="showModal"
      title="Confirmar Eliminación"
      message="¿Estás seguro de que quieres eliminar este registro ? "
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <!-- Formulario flotante para editar o agregar nuevo registro -->
    <div v-if="showForm" class="form-container">
      <div class="form-modal">
        <h2>{{ editing ? "Editar Registro" : "Agregar Nuevo Registro" }}</h2>
        <form @submit.prevent="saveRecord">
          <div class="input-group">
            <label for="diagnosis">Diagnóstico:</label>
            <textarea
              id="diagnosis"
              v-model="currentRecord.diagnostico"
              required
            ></textarea>
          </div>
          <div class="button-group">
            <button type="submit">
              {{ editing ? "Guardar Cambios" : "Agregar Registro" }}
            </button>
            <button type="button" @click="cancelEdit">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="showDetails" class="details-container">
      <h2>Detalles del Registro</h2>
      <p>
        <strong>Nombre Mascota:</strong>
        {{ getPetName(currentRecord.idMascota) }}
      </p>
      <p><strong>Categoría:</strong> {{ currentRecord.especialidad }}</p>
      <p><strong>Diagnóstico:</strong> {{ currentRecord.diagnostico }}</p>
      <button type="button" @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
import instance from "../plugins/axios";
import Modal from "../components/Modal.vue";

export default {
  name: "HistorialMedico",
  components: {
    Modal,
  },
  data() {
    return {
      medicalHistory: [],
      pets: [],
      currentRecord: {
        idHistorial: null,
        idMascota: "",
        especialidad: "",
        diagnostico: "",
      },
      editing: false,
      showForm: false,
      searchTerm: "",
      currentPage: 1,
      recordsPerPage: 5,
      showDetails: false,
      showModal: false,
      deleteHistory: null,
    };
  },
  computed: {
    filteredMedicalHistory() {
      if (this.searchTerm.trim() === "") {
        return this.medicalHistory;
      } else {
        const normalizedSearch = this.searchTerm.trim().toLowerCase();
        return this.medicalHistory.filter((record) =>
          this.getPetName(record.idMascota)
            .toLowerCase()
            .includes(normalizedSearch)
        );
      }
    },
    totalPages() {
      return Math.ceil(
        this.filteredMedicalHistory.length / this.recordsPerPage
      );
    },
    paginatedMedicalHistory() {
      const start = (this.currentPage - 1) * this.recordsPerPage;
      const end = start + this.recordsPerPage;
      return this.filteredMedicalHistory.slice(start, end);
    },
  },
  methods: {
    async obtenerCsrfToken() {
      try {
        const response = await instance.get("/"); // Endpoint para obtener el token CSRF
        return response.data.csrfToken;
      } catch (error) {
        console.error("Error al obtener el token CSRF:", error.message);
        throw new Error("No se pudo obtener el token CSRF");
      }
    },
    async deleteRecord(id) {
      this.deleteHistory = id;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        // Obtener el token CSRF
        const csrfToken = await this.obtenerCsrfToken();

        // Realizar la solicitud DELETE con el token CSRF en los encabezados
        await instance.delete(`/historiales/${this.deleteHistory}`, {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        });

        // Actualizar la lista de registros
        this.getHistorial();

        // Cerrar el modal y limpiar el ID
        this.showModal = false;
        this.deleteHistory = null;
      } catch (error) {
        console.error("Error deleting historial:", error);
      }
    },

    cancelDelete() {
      this.showModal = false;
      this.deleteHistory = null;
    },

    async getPets() {
      try {
        const response = await instance.get("/mascotas");
        this.pets = response.data;
      } catch (error) {
        console.error("Error fetching mascotas:", error);
      }
    },
    async getHistorial() {
      try {
        const response = await instance.get("/historiales");
        this.medicalHistory = response.data;
      } catch (error) {
        console.error("Error fetching historiales:", error);
      }
    },
    getPetName(idMascota) {
      const pet = this.pets.find((p) => p.idMascota === idMascota);
      return pet ? pet.nombreMascota : "Desconocido";
    },
    editRecord(record) {
      this.currentRecord = { ...record };
      this.editing = true;
      this.showForm = true;
    },
    searchHistory() {
      // Lógica de búsqueda adicional si es necesario
    },
    saveRecord() {
      if (this.editing) {
        const index = this.medicalHistory.findIndex(
          (record) => record.idHistorial === this.currentRecord.idHistorial
        );
        if (index !== -1) {
          this.medicalHistory.splice(index, 1, { ...this.currentRecord });
        }
      } else {
        this.currentRecord.idHistorial = this.medicalHistory.length + 1; // Asumiendo que los IDs son únicos y autoincrementables
        this.medicalHistory.push({ ...this.currentRecord });
      }
      this.cancelEdit();
    },
    viewDetails(record) {
      this.currentRecord = { ...record };
      this.showDetails = true;
    },
    cancelEdit() {
      this.currentRecord = {
        idHistorial: null,
        idMascota: "",
        especialidad: "",
        diagnostico: "",
      };
      this.editing = false;
      this.showForm = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.getPets();
    this.getHistorial();
  },
};
</script>

<style scoped>
.content {
  margin-left: 50px;
  padding: 20px;
  width: 90%;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #d1d8dd;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container h1 {
  margin: 0;
  font-size: 24px;
}

.table-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #ffcc5f;
  color: #333;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9fafb;
}

tr:hover {
  background-color: #8881817e;
}

.actions i {
  margin-right: 10px;
  cursor: pointer;
}

.actions i:hover {
  color: #007bff;
}

.back-button,
.add-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
}

.back-button:hover,
.add-button:hover {
  background-color: #0056b3;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-container input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.search-container button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #0056b3;
}

.form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px; /* Añadido para limitar el ancho máximo del formulario */
  width: 1000%; /* Añadido para asegurar que ocupe el ancho completo del contenedor */
}

.form-container h2 {
  margin-top: 0;
  font-size: 20px;
}

.input-group {
  margin-bottom: 15px;
  width: 100%;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.button-group {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.button-group button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.button-group button:hover {
  background-color: #0056b3;
}
.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-controls button {
  margin: 0 5px;
  padding: 10px;
  font-size: 14px;
  background-color: orange;
  border: none;
  border-radius: 10px;
  color: white;
}
.pagination-controls button:hover {
  background-color: orangered;
}
.pagination-controls span {
  margin: 0 10px;
  font-size: 16px;
}
</style>
