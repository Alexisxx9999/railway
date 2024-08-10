<template>
  <div class="content">
    <div class="header-container">
      <h1>{{ titulo }}</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">{{ añadir }}</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2>{{ editing ? "Editar " : "agregar " }} {{ nombre }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="date">{{ campo1 }}</label>
          <input type="date" id="date" v-model="currentPet.date" required />
        </div>
        <div class="form-group">
          <label for="petName">{{ campo2 }}</label>
          <input
            type="text"
            id="petName"
            v-model="currentPet.petName"
            required
          />
        </div>
        <div class="form-group">
          <label for="owner">{{ campo3 }}</label>
          <input type="text" id="owner" v-model="currentPet.owner" required />
        </div>
        <div class="form-group">
          <label for="description">{{ campo4 }}</label>
          <textarea
            id="description"
            v-model="currentPet.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="description">{{ campo6 }}</label>
          <textarea
            id="description"
            v-model="currentPet.description"
          ></textarea>
        </div>
        <button type="submit">
          {{ editing ? "Guardar " : "Agregar " }} {{ nombre }}
        </button>
        <button type="button" @click="cancelEdit">Cancelar</button>
      </form>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> {{ campo1 }}</th>
            <th><i class="fas fa-user"></i> {{ campo2 }}</th>
            <th><i class="fas fa-id-card-alt"></i> {{ campo3 }}</th>
            <th><i class="fas fa-at"></i> {{ campo4 }}</th>
            <th><i class="fas fa-cog"></i> {{ campo5 }}</th>
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
        <Modal
          v-if="showModal"
          :show="showModal"
          title="Confirmar Eliminación"
          message="¿Estás seguro de que quieres eliminar esta mascota?"
          @confirm="confirmDelete"
          @cancel="cancelDelete"
        />
      </table>
    </div>
    <button @click="goBack" class="back-button">Regresar</button>
  </div>
  <!-- Sección para mostrar el detalle de la mascota -->
  <div v-if="selectedPet" class="pet-details-container">
    <ImageUploader v-if="shouldShowImageUploader" />
    <div class="pet-details">
      <h2>Detalle de {{ nombre }}</h2>
      <p>
        <strong>{{ campo1 }}</strong> {{ selectedPet.date }}
      </p>
      <p>
        <strong>{{ campo2 }}</strong> {{ selectedPet.petName }}
      </p>

      <p>
        <strong>{{ campo4 }}</strong> {{ selectedPet.description }}
      </p>
     
      <p>
        <strong>Reseña :</strong> <em>{{ selectedPet.petName }} </em> es una
        mascota muy cariñosa que le gusta sentirse rodeada de afecto
      </p>
       <p>
        <strong>{{ campo3 }}</strong> {{ selectedPet.owner }}
         <div>
          {{ opcional }}
        </div>
      </p>
      <button @click="selectedPet = null" class="back-button">Cerrar</button>
    </div>
  </div>
</template>
<script>
import { RouterView } from "vue-router";
import ImageUploader from "../components/ImageUploader.vue";

import Modal from "./Modal.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CrudGeneral",
  components: {
    ImageUploader,
    Modal,
  },
  props: {
    nombre: {
      type: String,
      required: true,
    },
    campo1: {
      type: String,
      required: true,
    },

    campo2: {
      type: String,
      required: true,
    },
    campo3: {
      type: String,
      required: true,
    },
    campo4: {
      type: String,
      required: true,
    },
    campo5: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    añadir: {
      type: String,
      required: true,
    },
    opcional: {
      type: String,
    },
  },
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
      selectedPet: null,
      shouldShowImageUploader: false,
      // Variable para almacenar la mascota seleccionada para ver detalles
      showModal: false,
      petToDelete: null,
    };
  },
  watch: {
    $route(to) {
      this.updateImageUploaderProps(to);
    },
  },
  mounted() {
    this.updateImageUploaderProps(this.$route);
  },
  methods: {
    updateImageUploaderProps(route) {
      // Actualiza los props según la ruta actual
      if (route.name === "Mascotas") {
        this.shouldShowImageUploader = true;
      } else if (route.name === "Usuarios") {
        this.shouldShowImageUploader = true;
      } else if (route.name === "Adopciones") {
        this.shouldShowImageUploader = true;
      }else if (route.name === "Vacunas") {
        this.shouldShowImageUploader = true;
      }
      else {
        this.shouldShowImageUploader = false; // Ocultar ImageUploader en otras vistas
      }
    },
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
    /*  deletePet(petId) {
      if (
        window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")
      ) {
        this.petsAvailable = this.petsAvailable.filter((p) => p.id !== petId);
        // También limpiar la mascota seleccionada si es eliminada
        if (this.selectedPet && this.selectedPet.id === petId) {
          this.selectedPet = null;
        }
      }
    }, */
    deletePet(petId) {
      this.petToDelete = petId;
      this.showModal = true;
    },
    confirmDelete() {
      this.petsAvailable = this.petsAvailable.filter(
        (p) => p.id !== this.petToDelete
      );
      if (this.selectedPet && this.selectedPet.id === this.petToDelete) {
        this.selectedPet = null;
      }
      this.showModal = false;
      this.petToDelete = null;
    },
    cancelDelete() {
      this.showModal = false;
      this.petToDelete = null;
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
      /*  this.$router.push({ name: "detalleMascota", params: { id: petId } });
       */
      this.selectedPet = this.petsAvailable.find((p) => p.id === petId);
    },
  },
};
</script>

<style scoped>
/* Estilos generales */
.content {
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

/* Encabezado */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e1e8ed;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container h1 {
  margin: 0;
  font-size: 28px;
}

.add-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #218838;
}

/* Formulario */
.form-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}

.form-container h2 {
  margin-bottom: 20px;
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
.form-group textarea {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button[type="submit"],
button[type="button"] {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
}

button[type="submit"] {
  background-color: #007bff;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #dc3545;
}

button[type="button"]:hover {
  background-color: #c82333;
}

/* Tabla */
.table-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #ffcc5f;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #fafafa;
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

/* Detalle de la mascota */
.pet-details-container {
  display: flex;
  width: 92%;
  margin: auto;
  flex-direction: row;
  align-items: center;
  background-color: #faf5f5;
  padding: 2%;
  border-radius: 10px;
}

.pet-details {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 700px;
}

.pet-details h2 {
  margin-bottom: 40px;
  text-align: center;
}

.pet-details p {
  margin: 10px 0;
}

.back-button {
  background-color: #ffcc5f;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  position: relative;
  left: 90%;
  margin-top: 20px;
}

.back-button:hover {
  background-color: orange;
}
.link {
  text-decoration: none;
}
</style>
