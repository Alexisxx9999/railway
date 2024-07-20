<template>
  <div class="content">
    <div class="header-container">
      <h1>Vacunas</h1>
      <p>Gestión de vacunas para mascotas</p>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Vacuna</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2>{{ editing ? "Editar Vacuna" : "Agregar Vacuna" }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nombre de la Vacuna:</label>
          <input type="text" id="name" v-model="currentVaccine.name" required />
        </div>
        <div class="form-group">
          <label for="type">Tipo de Animal:</label>
          <input type="text" id="type" v-model="currentVaccine.type" required />
        </div>
        <div class="form-group">
          <label for="date">Fecha de Aplicación:</label>
          <input type="date" id="date" v-model="currentVaccine.date" required />
        </div>
        <div class="form-group">
          <label for="description">Descripción:</label>
          <textarea
            id="description"
            v-model="currentVaccine.description"
          ></textarea>
        </div>
        <button type="submit">
          {{ editing ? "Guardar Cambios" : "Agregar Vacuna" }}
        </button>
        <button type="button" @click="cancelEdit" v-if="editing">
          Cancelar
        </button>
      </form>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Nombre de la Vacuna</th>
            <th><i class="fas fa-user"></i> Tipo de Animal</th>
            <th><i class="fas fa-id-card-alt"></i> Fecha de Aplicación</th>
            <th><i class="fas fa-at"></i> Descripción</th>
            <th><i class="fas fa-cog"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vaccine in vaccines" :key="vaccine.id">
            <td>{{ vaccine.name }}</td>
            <td>{{ vaccine.type }}</td>
            <td>{{ vaccine.date }}</td>
            <td>{{ vaccine.description }}</td>
            <td class="actions">
              <i class="fas fa-edit" @click="editVaccine(vaccine.id)"></i>
              <i
                class="fas fa-trash-alt"
                @click="deleteVaccine(vaccine.id)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="goBack" class="back-button">Regresar</button>
  </div>
  <!-- Sección para mostrar el mensaje de vacuna agendada -->
  <div v-if="scheduledVaccine">
    <div class="alert alert-success" role="alert">
      Vacuna agendada para {{ scheduledVaccine.date }} a las
      {{ scheduledVaccine.time }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Vacunas",
  data() {
    return {
      vaccines: [
        {
          id: 1,
          name: "Rabia",
          type: "Perro",
          date: "2024-06-01",
          description: "Vacuna contra la rabia",
        },
        {
          id: 2,
          name: "Polivalente",
          type: "Gato",
          date: "2024-05-15",
          description: "Vacuna polivalente para gatos",
        },
      ],
      currentVaccine: {
        id: null,
        name: "",
        type: "",
        date: "",
        description: "",
      },
      editing: false,
      showForm: false,
      scheduledVaccine: null, // Variable para almacenar la vacuna agendada
    };
  },
  methods: {
    submitForm() {
      if (this.editing) {
        this.saveChanges();
      } else {
        this.addVaccine();
      }
      this.showForm = false;
    },
    addVaccine() {
      const newVaccine = { ...this.currentVaccine, id: Date.now() };
      this.vaccines.push(newVaccine);
      this.clearForm();

      // Mostrar el mensaje de vacuna agendada
      this.scheduledVaccine = {
        date: newVaccine.date,
        time: new Date().toLocaleTimeString(), // Obtener la hora actual
      };

      // Limpiar el mensaje después de unos segundos (opcional)
      setTimeout(() => {
        this.scheduledVaccine = null;
      }, 5000); // Mostrar por 5 segundos
    },
    editVaccine(vaccineId) {
      const vaccine = this.vaccines.find((v) => v.id === vaccineId);
      this.currentVaccine = { ...vaccine };
      this.editing = true;
      this.showForm = true;
    },
    saveChanges() {
      const index = this.vaccines.findIndex(
        (v) => v.id === this.currentVaccine.id
      );
      if (index !== -1) {
        this.vaccines.splice(index, 1, { ...this.currentVaccine });
      }
      this.clearForm();
    },
    deleteVaccine(vaccineId) {
      if (
        window.confirm("¿Estás seguro de que quieres eliminar esta vacuna?")
      ) {
        this.vaccines = this.vaccines.filter((v) => v.id !== vaccineId);
      }
    },
    cancelEdit() {
      this.clearForm();
      this.showForm = false;
    },
    clearForm() {
      this.currentVaccine = {
        id: null,
        name: "",
        type: "",
        date: "",
        description: "",
      };
      this.editing = false;
    },
    showAddForm() {
      this.showForm = true;
      this.clearForm();
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
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
p {
  position: absolute;
  top: 10%;
}
.descr {
  position: absolute;
  top: 20%;
  padding-left: 0%;
}

.header h2 {
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
.status {
  color: #28a745;
  font-weight: bold;
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

.back-button,
.add-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #13c73a;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
}

.back-button:hover,
.add-button:hover {
  background-color: #0056b3;
}

.form-container {
  margin-top: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 600px;
  margin: 15px auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

form button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
}

form button:hover {
  background-color: #0056b3;
}
</style>