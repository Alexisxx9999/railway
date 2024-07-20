<template>
  <div class="content">
    <div class="header-container">
      <h1>Mascotas</h1>
      <p>Gestión de mascotas</p>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Mascota</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2>{{ editing ? "Editar Mascota" : "Agregar Mascota" }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="date">Fecha:</label>
          <input type="date" id="date" v-model="currentPet.date" required />
        </div>
        <div class="form-group">
          <label for="petName">Nombre de la Mascota:</label>
          <input
            type="text"
            id="petName"
            v-model="currentPet.petName"
            required
          />
        </div>
        <div class="form-group">
          <label for="owner">Dueño:</label>
          <input type="text" id="owner" v-model="currentPet.owner" required />
        </div>
        <div class="form-group">
          <label for="description">Descripción:</label>
          <textarea
            id="description"
            v-model="currentPet.description"
          ></textarea>
        </div>
        <button type="submit">
          {{ editing ? "Guardar Cambios" : "Agregar Mascota" }}
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
            <th><i class="fas fa-calendar-alt"></i> Fecha</th>
            <th><i class="fas fa-user"></i> Nombre de la Mascota</th>
            <th><i class="fas fa-id-card-alt"></i> Dueño</th>
            <th><i class="fas fa-at"></i> Descripción</th>
            <th><i class="fas fa-cog"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in petsAvailable" :key="pet.id">
            <td>{{ pet.date }}</td>
            <td>{{ pet.petName }}</td>
            <td>{{ pet.owner }}</td>
            <td>{{ pet.description }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(pet.id)"></i>
              <i class="fas fa-edit" @click="editPet(pet.id)"></i>
              <i class="fas fa-trash-alt" @click="deletePet(pet.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="goBack" class="back-button">Regresar</button>
  </div>
  <!-- Sección para mostrar el detalle de la mascota -->
  <div v-if="selectedPet">
    <div class="pet-details">
      <h2>Detalles de la Mascota</h2>
      <p><strong>Fecha:</strong> {{ selectedPet.date }}</p>
      <p><strong>Nombre de la Mascota:</strong> {{ selectedPet.petName }}</p>
      <p><strong>Dueño:</strong> {{ selectedPet.owner }}</p>
      <p><strong>Descripción:</strong> {{ selectedPet.description }}</p>
      <button @click="selectedPet = null" class="back-button">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mascotas",
  data() {
    return {
      petsAvailable: [
        {
          id: 1,
          date: "2024-07-15",
          petName: "Bella",
          owner: "Juan Pérez",
          description: "Labrador cariñosa en busca de hogar",
          adopted: false,
        },
        {
          id: 2,
          date: "2024-07-10",
          petName: "Milo",
          owner: "María Gómez",
          description: "Gato siamés juguetón y amigable",
          adopted: false,
        },
      ],
      currentPet: {
        id: null,
        date: "",
        petName: "",
        owner: "",
        description: "",
        adopted: false,
      },
      editing: false,
      showForm: false,
      selectedPet: null, // Variable para almacenar la mascota seleccionada para ver detalles
    };
  },
  methods: {
    submitForm() {
      if (this.editing) {
        this.saveChanges();
      } else {
        this.addPet();
      }
      this.showForm = false;
    },
    addPet() {
      const newPet = { ...this.currentPet, id: Date.now() };
      this.petsAvailable.push(newPet);
      this.clearForm();
    },
    editPet(petId) {
      const pet = this.petsAvailable.find((p) => p.id === petId);
      this.currentPet = { ...pet };
      this.editing = true;
      this.showForm = true;
    },
    saveChanges() {
      const index = this.petsAvailable.findIndex(
        (p) => p.id === this.currentPet.id
      );
      if (index !== -1) {
        this.petsAvailable.splice(index, 1, { ...this.currentPet });
      }
      this.clearForm();
    },
    deletePet(petId) {
      if (
        window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")
      ) {
        this.petsAvailable = this.petsAvailable.filter((p) => p.id !== petId);
        // También limpiar la mascota seleccionada si es eliminada
        if (this.selectedPet && this.selectedPet.id === petId) {
          this.selectedPet = null;
        }
      }
    },
    cancelEdit() {
      this.clearForm();
      this.showForm = false;
    },
    clearForm() {
      this.currentPet = {
        id: null,
        date: "",
        petName: "",
        owner: "",
        description: "",
        adopted: false,
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
    viewDetails(petId) {
      this.selectedPet = this.petsAvailable.find((p) => p.id === petId);
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
