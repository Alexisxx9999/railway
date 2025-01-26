<template>
  <div class="content">
    <div class="header-container">
      <h1>Adopciones</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir adopcion</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} adopcion 😸</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="idMascota" class="title">Nombre de la Mascota</label>
            <select
              name="idMascota"
              id="idMascota"
              required
              v-model="currentPet.idMascota"
              class="form-control"
            >
              <option
                v-for="pet in pets"
                :key="pet.idMascota"
                :value="pet.idMascota"
              >
                {{ pet.nombreMascota }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="description" class="title">Información adicional</label>
            <textarea
              id="description"
              v-model="currentPet.descripcion"
              class="form-control"
              rows="4"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="idUsuario" class="title">Nombre del Dueño</label>
            <select
              name="idUsuario"
              id="idusuario"
              required
              v-model="currentPet.idUsuario"
              class="form-control"
            >
              <option
                v-for="user in users"
                :key="user.idUsuario"
                :value="user.idUsuario"
              >
                {{ user.nombreUsuario }}
              </option>
            </select>
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn btn-primary">
              {{ editing ? "Guardar" : "Agregar" }}
            </button>
            <button type="button" @click="cancelEdit" class="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha:</th>
            <th><i class="fas fa-user"></i> Nombre de Mascota</th>
            <th><i class="fas fa-id-card-alt"></i> Dueño</th>
            <th><i class="fas fa-at"></i> Descripcion</th>
            <th><i class="fas fa-at"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in adopciones" :key="pet.idAdopcion">
            <td>{{ pet.createAdopcion }}</td>
            <td>{{ getPetName(pet.idMascota) }}</td>
            <td>{{ getUserName(pet.idUsuario) }}</td>
            <td>{{ pet.descripcion }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(pet.idAdopcion)"></i>
              <i class="fas fa-edit" @click="editPet(pet.idAdopcion)"></i>
              <i
                class="fas fa-trash-alt"
                @click="deletePet(pet.idAdopcion)"
              ></i>
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
      message="¿Estás seguro de que quieres eliminar esta adopcion?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <!-- Sección para mostrar el detalle de la mascota -->
    <div v-if="selectedPet" class="pet-details-container">
      <div class="pet-details">
        <h2>Detalle de la Adopcion</h2>
        <p>
          <strong>Fecha de Adopcion: </strong> {{ selectedPet.createAdopcion }}
        </p>
        <p>
          <strong>Descripcion de Adopcion: </strong>
          {{ selectedPet.descripcion }}
        </p>

        <h4>Informacion de la mascota adoptada 😻</h4>
        <div class="mascota">
          <div class="inf-mascota">
            <p>
              <strong>Nombre de la mascota: </strong>
              {{ getPetDetails(selectedPet.idMascota).nombreMascota }}
            </p>
            <p>
              <strong>Sexo: </strong>
              {{ getPetDetails(selectedPet.idMascota).sexo }}
            </p>
            <p>
              <strong>Especie de la mascota </strong>
              {{ getPetDetails(selectedPet.idMascota).idTipoMascota }}
            </p>
            <p>
              <strong>descripcion de la mascota </strong>
              {{ getPetDetails(selectedPet.idMascota).descripcion }}
            </p>
          </div>
        </div>
        <h4>Informacion general del dueño 👧</h4>
        <div class="usuario">
          <div class="imageUsuario">
            <img src="" alt="imagen del usuario" />
          </div>
          <div class="inf-usuario">
            <p>
              <strong>Nombres y apellidos: </strong>
              {{ getUserDetails(selectedPet.idUsuario).nombreUsuario }}
              {{ getUserDetails(selectedPet.idUsuario).apellidoUsuario }}
            </p>
            <p>
              <strong>telefono: </strong>
              {{ getUserDetails(selectedPet.idUsuario).telefonoUsuario }}
            </p>
            <p>
              <strong>Ubicacion: </strong>
              {{ getUserDetails(selectedPet.idUsuario).ubicacionUsuario }}
            </p>

            <p>
              <strong>Email del Dueño: </strong>
              {{ getUserDetails(selectedPet.idUsuario).emailUsuario }}
            </p>
          </div>
        </div>

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
  name: "Adopciones",
  components: {
    ImageUploader,
    Modal,
  },
  data() {
    return {
      pets: [],
      users: [],
      adopciones: [],
      currentPet: {
        idMascota: "",
        idAdopcion: "",
        idUsuario: "",
        descripcion: "",

        createAdopcion: "",
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
        const response = await instance.get("/mascotas");
        console.log(response.data);
        this.pets = response.data;
      } catch (error) {
        console.error("Error fetching mascotas:", error);
      }
    },
    async submitForm() {
      try {
        const csrfToken = await this.obtenerCsrfToken();
        instance.defaults.headers.common["X-CSRF-Token"] = csrfToken;

        if (this.editing) {
          await instance.patch(
            `/adopciones/${this.currentPet.idAdopcion}`,
            this.currentPet
          );
        } else {
          await instance.post("/adopciones", this.currentPet);
        }
        this.getAdopciones();
        this.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    async getUsers() {
      try {
        const response = await instance.get("/usuarios");
        console.log(response.data);
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching mascotas:", error);
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
    getPetName(idMascota) {
      const pet = this.pets.find((p) => p.idMascota === idMascota);
      return pet ? pet.nombreMascota : "Nombre no disponible";
    },

    getUserName(idUsuario) {
      const user = this.users.find((u) => u.idUsuario === idUsuario);
      return user
        ? `${user.nombreUsuario} ${user.apellidoUsuario}`
        : "Nombre no disponible";
    },
    editPet(id) {
      this.editing = true;
      this.currentPet = {
        ...this.adopciones.find((pet) => pet.idAdopcion === id),
      };
      this.showForm = true;
    },
    getPetDetails(idMascota) {
      return this.pets.find((p) => p.idMascota === idMascota) || {};
    },

    getUserDetails(idUsuario) {
      return this.users.find((u) => u.idUsuario === idUsuario) || {};
    },
    viewDetails(id) {
      this.selectedPet = this.adopciones.find((pet) => pet.idAdopcion === id);
    },

    async deletePet(id) {
      this.petToDelete = id;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        await instance.delete(`/adopciones/${this.petToDelete}`);
        this.getAdopciones();
        this.showModal = false;
        this.petToDelete = null;
      } catch (error) {
        console.error("Error deleting adopcion:", error);
      }
    },
    cancelDelete() {
      this.showModal = false;
      this.petToDelete = null;
    },
    resetForm() {
      this.currentPet = {
        idMascota: "",
        idAdopcion: "",
        idUsuario: "",
        descripcion: "",
        createAdopcion: "",
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
    this.getAdopciones();
    this.getPets();
    this.getUsers();
    this.updateImageUploaderProps(this.$route);
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
.imageMascota {
  width: 40%;
  padding: 10px;
}
.imageUsuario {
  width: 40%;
  padding: 10px;
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
.title2 {
  text-align: center;
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
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.inf {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.title {
  font-size: 17px;
  color: #333;
  margin-bottom: 8px;
  font-weight: bold;
  display: block;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

textarea.form-control {
  resize: vertical;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
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
  width: 95%;
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
  max-width: 950px;
}

.pet-details h2 {
  margin-bottom: 40px;
  text-align: center;
}
.pet-details h4 {
  background-color: #f5dfdf;
}
.pet-details p {
  margin: 10px 0;
}
.mascota {
  display: flex;
  flex-direction: row;
}
.usuario {
  display: flex;
  flex-direction: row;
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
