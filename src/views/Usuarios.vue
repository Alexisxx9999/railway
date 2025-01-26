<template>
  <div class="content">
    <div class="header-container">
      <h1>Usuarios</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Usuario</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Usuario 😸</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="nombreUsuario" class="title">Nombre del Usuario</label>
            <input
              type="text"
              id="nombreUsuario"
              v-model="currentPet.nombreUsuario"
              required
              name="nombreUsuario"
            />
          </div>
          <div class="form-group">
            <label for="apellidoUsuario" class="title"
              >Apellido del Usuario</label
            >
            <input
              type="text"
              id="apellidoUsuario"
              v-model="currentPet.apellidoUsuario"
              required
              name="apellidoUsuario"
            />
          </div>
          <div class="form-group">
            <label for="emailUsuario" class="title">Email</label>
            <input
              type="text"
              id="emailUsuario"
              v-model="currentPet.emailUsuario"
              required
              name="emailUsuario"
            />
          </div>

          <div class="form-group">
            <label for="contraseñaUsuario" class="title">contraseña </label>
            <input
              type="text"
              id="contraseñaUsuario"
              v-model="currentPet.contraseñaUsuario"
              required
              name="contraseñaUsuario"
            />
          </div>

          <div class="form-group">
            <label for="telefonoUsuario" class="title">telefono Usuario</label>
            <input
              type="number"
              name="telefonoUsuario"
              v-model="currentPet.telefonoUsuario"
            />
          </div>
          <div class="form-group">
            <label for="cedulaUsuario" class="title">cedula Usuario</label>
            <input
              type="number"
              id="cedulaUsuario"
              v-model="currentPet.cedulaUsuario"
              required
            />
          </div>
          <div class="form-group">
            <label for="ubicacionUsuario" class="title">Ubicacion</label>
            <input
              type="text"
              id="ubicacionUsuario"
              v-model="currentPet.ubicacionUsuario"
              required
              placeholder="av bellavista"
            />
          </div>
          <button type="submit">
            {{ editing ? "Guardar" : "Agregar" }}
          </button>
          <button type="button" @click="cancelEdit">Cancelar</button>
        </div>
      </form>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> createUsuario</th>
            <th><i class="fas fa-user"></i> nombres</th>
            <th><i class="fas fa-id-card-alt"></i> apellidos</th>
            <th><i class="fas fa-cog"></i> telefono</th>
            <th><i class="fas fa-cog"></i> email</th>
            <th><i class="fas fa-at"></i> cedula</th>
            <th><i class="fas fa-cog"></i> acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in pets" :key="pet.idUsuario">
            <td>{{ pet.createUsuario }}</td>
            <td>{{ pet.nombreUsuario }}</td>
            <td>{{ pet.apellidoUsuario }}</td>
            <td>{{ pet.telefonoUsuario }}</td>
            <td>{{ pet.emailUsuario }}</td>
            <td>{{ pet.cedulaUsuario }}</td>

            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(pet.idUsuario)"></i>
              <i class="fas fa-edit" @click="editPet(pet.idUsuario)"></i>
              <i class="fas fa-trash-alt" @click="deletePet(pet.idUsuario)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="goBack" class="back-button">Regresar</button>
    <!-- Modal para confirmación de eliminación -->
    <Modal
      v-if="showModal"
      :show="showModal"
      title="Confirmar Eliminación"
      message="¿Estás seguro de que quieres eliminar este Usuario?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <!-- Sección para mostrar el detalle de la mascota -->
    <div v-if="selectedPet" class="pet-details-container">
      <div class="detalle">
        <div v-if="selectedPet.imageUsuario">
          <img :src="selectedPet.imageUsuario" alt="Pet Usuario" />
        </div>
      </div>
      <div class="pet-details">
        <h2>Perfil del Usuario</h2>
        <p>
          <strong>Nombre del Usuario </strong>
          {{ selectedPet.nombreUsuario }}
        </p>
        <p>
          <strong>apellido del Usuario </strong>
          {{ selectedPet.apellidoUsuario }}
        </p>
        <p><strong>Email: </strong> {{ selectedPet.emailUsuario }}</p>
        <p><strong>telefono: </strong> {{ selectedPet.telefonoUsuario }}</p>
        <p><strong>cedula: </strong> {{ selectedPet.cedulaUsuario }}</p>
        <p><strong>Ubicacion: </strong> {{ selectedPet.ubicacionUsuario }}</p>
        <p>
          <strong>Este usuario se creo: </strong>
          <em>{{ selectedPet.createUsuario }}</em>
        </p>
        <button @click="selectedPet = null" class="back-button">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import ImageUploader from "../components/ImageUploader.vue";
import Modal from "../components/Modal.vue";

import instance from "../plugins/axios"; // Ajusta la ruta

export default {
  name: "Mascotas",
  components: {
    ImageUploader,
    Modal,
  },
  data() {
    return {
      pets: [],
      currentPet: {
        nombreUsuario: "",
        apellidoUsuario: "",
        emailUsuario: "",
        telefonoUsuario: "",
        ubicacionUsuario: "",
        cedulaUsuario: "",
        imageUsuario: "",
        idUsuario: "",
      },
      editing: false,
      showForm: false,
      selectedPet: null,
      showModal: false,
      petToDelete: null,
      shouldShowImageUploader: false,
    };
  },
  watch: {
    $route(to) {
      this.updateImageUploaderProps(to);
    },
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
      } else if (route.name === "Vacunas") {
        this.shouldShowImageUploader = true;
      } else {
        this.shouldShowImageUploader = false; // Ocultar ImageUploader en otras vistas
      }
    },
    async obtenerCsrfToken() {
      try {
        const response = await instance.get("/"); // Endpoint para obtener el token CSRF
        return response.data.csrfToken;
      } catch (error) {
        console.error("Error al obtener el token CSRF:", error.message);
        throw new Error("No se pudo obtener el token CSRF");
      }
    },
    async getPets() {
      try {
        const response = await instance.get("/usuarios");
        console.log(response.data);
        this.pets = response.data;
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    },
    async submitForm() {
      try {
        /*   console.log(
          "CSRF Token:",
          instance.defaults.headers.common["X-CSRF-Token"]
        ); */
        const csrfToken = await this.obtenerCsrfToken();
        instance.defaults.headers.common["X-CSRF-Token"] = csrfToken;

        if (this.editing) {
          await instance.patch(
            `/usuarios/${this.currentPet.idUsuario}`,
            this.currentPet
          );
        } else {
          await instance.post("/Register", this.currentPet);
        }
        this.getPets();
        this.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },

    editPet(id) {
      this.editing = true;
      this.currentPet = { ...this.pets.find((pet) => pet.idUsuario === id) };
      this.showForm = true;
    },
    viewDetails(id) {
      this.selectedPet = this.pets.find((pet) => pet.idUsuario === id);
    },
    async deletePet(id) {
      this.petToDelete = id;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        await instance.delete(`/usuarios/${this.petToDelete}`);
        this.getPets();
        this.showModal = false;
        this.petToDelete = null;
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    },
    cancelDelete() {
      this.showModal = false;
      this.petToDelete = null;
    },
    resetForm() {
      this.currentPet = {
        nombreUsuario: "",
        apellidoUsuario: "",
        telefonoUsuario: "",
        cedulaUsuario: "",
        imageUsuario: "",
        emailUsuario: "",
        contraseñaUsuario: "",
        ubicacionUsuario: "",
      };
      this.editing = false;
      this.showForm = false;
    },
    showAddForm() {
      this.resetForm();
      this.showForm = true;
    },
    cancelEdit() {
      this.resetForm();
      this.showForm = false;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getPets();
    this.updateImageUploaderProps(this.$route);
  },
};
</script>

<style scoped>
/* Estilos generales */
.content {
  width: 90%;
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
.form-principal {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.inf {
  width: 60%;
  margin-right: 10px;
}
.image {
  display: flex;
  width: 40%;
  justify-content: center;
  margin-left: 50px;
}
.image .form-group {
  margin: 0 auto;
}
.title {
  font-weight: bold;
  font-size: 18px;
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
  font-weight: 400;
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
.detalle {
  width: 50%;
}
.detalle img {
  width: 90%;
  border-radius: 10px;
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
