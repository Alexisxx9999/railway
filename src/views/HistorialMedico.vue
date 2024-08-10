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
            <th><i class="fas fa-calendar-alt"></i> Fecha</th>
            <th><i class="fas fa-user"></i> Nombre Mascota</th>
            <th><i class="fas fa-id-card-alt"></i> Categoría</th>
            <th><i class="fas fa-cog"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in paginatedMedicalHistory" :key="record.id">
            <td>{{ record.date }}</td>
            <td></td>
            <td>{{ record.category }}</td>
            <td class="actions">
              <i class="fas fa-edit" @click="editRecord(record)"></i>
              <i class="fas fa-trash-alt" @click="deleteRecord(record.id)"></i>
            </td>
          </tr>

          <tr v-if="paginatedMedicalHistory.length === 0">
            <td colspan="5" style="text-align: center">
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

    <!-- Formulario flotante para editar o agregar nuevo registro -->
    <div v-if="showForm" class="form-container">
      <div class="form-modal">
        <h2>{{ editing ? "Editar Registro" : "Agregar Nuevo Registro" }}</h2>
        <form @submit.prevent="saveRecord">
          <div class="input-group">
            <label for="petName">Nombre Mascota:</label>
            <input
              type="text"
              id="petName"
              v-model="currentRecord.petName"
              required
            />
          </div>
          <div class="input-group">
            <label for="category">Categoría:</label>
            <input
              type="text"
              id="category"
              v-model="currentRecord.category"
              required
            />
          </div>
          <div class="input-group">
            <label for="date">Fecha:</label>
            <input
              type="date"
              id="date"
              v-model="currentRecord.date"
              required
            />
          </div>
          <div class="input-group">
            <label for="description">Descripción:</label>
            <textarea
              id="description"
              v-model="currentRecord.description"
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
      <p><strong>Nombre Mascota:</strong> {{ currentRecord.petName }}</p>
      <p><strong>Categoría:</strong> {{ currentRecord.category }}</p>
      <p><strong>Fecha:</strong> {{ currentRecord.date }}</p>
      <button @click="cancelEdit">Cerrar</button>
    </div>
  </div>
</template>

<script>
import instance from "../plugins/axios";
export default {
  name: "HistorialMedico",
  data() {
    return {
      medicalHistory: [],
      adopciones: [],
      vacunas: [],
      pets: [],
      currentRecord: {
        id: null,
        petName: "",
        category: "",

        date: "",
      },
      editing: false,
      showForm: false,
      searchTerm: "",
      currentPage: 1,
      recordsPerPage: 5,
      showDetails: false,
    };
  },
  computed: {
    filteredMedicalHistory() {
      if (this.searchTerm.trim() === "") {
        return this.medicalHistory;
      } else {
        const normalizedSearch = this.searchTerm.trim().toLowerCase();
        return this.medicalHistory.filter((record) =>
          record.petName.toLowerCase().includes(normalizedSearch)
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
    async getAdopciones() {
      try {
        const response = await instance.get("/adopciones");
        console.log(response.data);
        this.adopciones = response.data;
      } catch (error) {
        console.error("Error fetching adopciones:", error);
      }
    },
    async getVacunas() {
      try {
        const response = await instance.get("/vacunas");
        console.log(response.data);
        this.vacunas = response.data;
      } catch (error) {
        console.error("Error fetching vacunas:", error);
      }
    },
    async getPets() {
      try {
        const response = await instance.get("/mascotas");
        console.log(response.data);
        this.pets = response.data;
      } catch (error) {
        console.error("Error fetching mascotas:", error);
      }
    },
    getPetName(idMascota) {
      const pet = this.pets.find((p) => p.idMascota === idMascota);
      return pet ? pet.nombreMascota : "Nombre no disponible";
    },
    editRecord(record) {
      this.currentRecord = { ...record };
      this.editing = true;
      this.showForm = true;
    },
    deleteRecord(recordId) {
      if (
        window.confirm(
          "¿Estás seguro de que quieres eliminar este registro médico?"
        )
      ) {
        this.medicalHistory = this.medicalHistory.filter(
          (record) => record.id !== recordId
        );
        console.log("Registro médico eliminado:", recordId);
      }
    },
    searchHistory() {
      // Aquí puedes añadir lógica adicional para buscar el historial según los criterios necesarios
    },
    saveRecord() {
      if (this.editing) {
        const index = this.medicalHistory.findIndex(
          (record) => record.id === this.currentRecord.id
        );
        if (index !== -1) {
          this.medicalHistory.splice(index, 1, { ...this.currentRecord });
        }
      } else {
        this.currentRecord.id = this.medicalHistory.length + 1; // Asumiendo que los IDs son únicos y autoincrementables
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
        id: null,
        petName: "",
        category: "",
        date: "",
        description: "",
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
    this.getAdopciones();
    this.getVacunas();
    this.getPets();
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
