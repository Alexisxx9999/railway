<template>
  <div class="content">
    <div class="header-container">
      <h1>Adopciones</h1>
      <p>Vacunas para las mascotas</p>
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
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="currentPet.name" required />
        </div>
        <div class="form-group">
          <label for="type">Tipo:</label>
          <input type="text" id="type" v-model="currentPet.type" required />
        </div>
        <div class="form-group">
          <label for="age">Edad:</label>
          <input type="number" id="age" v-model="currentPet.age" required />
        </div>
        <div class="form-group">
          <label for="breed">Raza:</label>
          <input type="text" id="breed" v-model="currentPet.breed" required />
        </div>
        <div class="form-group">
          <label for="adopted">Adoptado:</label>
          <select id="adopted" v-model="currentPet.adopted" required>
            <option :value="true">Sí</option>
            <option :value="false">No</option>
          </select>
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
            <th><i class="fas fa-calendar-alt"></i> Nombre</th>
            <th><i class="fas fa-user"></i> Tipo</th>
            <th><i class="fas fa-id-card-alt"></i> Edad</th>
            <th><i class="fas fa-at"></i> Raza</th>
            <th><i class="fas fa-check-circle"></i> Adoptado</th>
            <th><i class="fas fa-cog"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in petsAvailable" :key="pet.id">
            <td>{{ pet.name }}</td>
            <td>{{ pet.type }}</td>
            <td>{{ pet.age }}</td>
            <td>{{ pet.breed }}</td>
            <td>{{ pet.adopted ? "Sí" : "No" }}</td>
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
</template>

<script>
export default {
  name: "Adopciones",
  data() {
    return {
      petsAvailable: [
        {
          id: 1,
          name: "Bella",
          type: "Perro",
          age: 3,
          breed: "Labrador",
          adopted: false,
        },
        {
          id: 2,
          name: "Milo",
          type: "Gato",
          age: 2,
          breed: "Siamés",
          adopted: false,
        },
      ],
      currentPet: {
        id: null,
        name: "",
        type: "",
        age: "",
        breed: "",
        adopted: false,
      },
      editing: false,
      showForm: false,
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
      // Mostrar una alerta de confirmación antes de eliminar
      if (
        window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")
      ) {
        this.petsAvailable = this.petsAvailable.filter((p) => p.id !== petId);
        console.log("Mascota eliminada:", petId);
      }
    },
    cancelEdit() {
      this.clearForm();
      this.showForm = false;
    },
    clearForm() {
      this.currentPet = {
        id: null,
        name: "",
        type: "",
        age: "",
        breed: "",
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
  },
};
</script>
<!-- name: "Dashboard", -->
<style scoped>
.content {
  margin-left: 50px;
  padding: 20px;
  width: calc(100% - 270px);
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
