<template>
  <div class="content">
    <div class="header-container">
      <h1>Registro Médico</h1>
      <p>Detalle de mascota</p>
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
            <th><i class="fas fa-at"></i> Descripción</th>
            <th><i class="fas fa-cog"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredMedicalHistory" :key="record.id">
            <td>{{ record.date }}</td>
            <td>{{ record.petName }}</td>
            <td>{{ record.category }}</td>
            <td>{{ record.description }}</td>
            <td class="actions">
              <i class="fas fa-edit" @click="editRecord(record)"></i>
              <i class="fas fa-trash-alt" @click="deleteRecord(record.id)"></i>
            </td>
          </tr>
          <tr v-if="filteredMedicalHistory.length === 0">
            <td colspan="5" style="text-align: center">
              No se encontraron registros
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script>
export default {
  name: "HistorialMedico",
  data() {
    return {
      medicalHistory: [
        {
          id: 1,
          petName: "Bella",
          category: "Perro",
          date: "2023-01-01",
          description: "Vacunación",
        },
        {
          id: 2,
          petName: "Milo",
          category: "Gato",
          date: "2023-02-15",
          description: "Revisión médica",
        },
      ],
      currentRecord: {
        id: null,
        petName: "",
        category: "",
        date: "",
        description: "",
      },
      editing: false,
      showForm: false,
      searchTerm: "",
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
  },
  methods: {
    editRecord(record) {
      this.currentRecord = { ...record };
      this.editing = true;
      this.showForm = true;
    },
    deleteRecord(recordId) {
      // Mostrar una alerta de confirmación antes de eliminar
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
      // Por ahora, solo estamos filtrando localmente en la lista existente
    },
    saveRecord() {
      if (this.editing) {
        // Modificar registro existente
        const index = this.medicalHistory.findIndex(
          (record) => record.id === this.currentRecord.id
        );
        if (index !== -1) {
          this.medicalHistory.splice(index, 1, { ...this.currentRecord });
        }
      } else {
        // Agregar nuevo registro
        this.currentRecord.id = this.medicalHistory.length + 1; // Asumiendo que los IDs son únicos y autoincrementables
        this.medicalHistory.push({ ...this.currentRecord });
      }
      this.cancelEdit();
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
  },
};
</script>
<style scoped>
.content {
  margin-left: 50px;
  padding: 20px;
  width: calc(100% - 270px);
}

.header h1 {
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
  background-color: #f1f1f1;
}

.actions i {
  margin-right: 10px;
  cursor: pointer;
}

.actions i:hover {
  color: #007bff;
}

.back-button,
.search-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.back-button:hover,
.search-button:hover {
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
  position: absolute;
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
</style>
<!-- name: "HistorialMedico", -->
