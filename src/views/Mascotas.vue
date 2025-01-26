<template>
  <div class="content">
    <div class="header-container">
      <h1>Mascotas</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir mascota</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} mascota 😸</h2>
      <form @submit.prevent="submitForm" class="form-principal">
        <div class="inf">
          <div class="form-group">
            <label for="nombreMascota" class="title"
              >Nombre de la mascota</label
            >
            <input
              type="text"
              id="nombreMascota"
              v-model="currentPet.nombreMascota"
              required
              name="nombreMascota"
            />
          </div>
          <div class="form-group">
            <label for="date">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              v-model="currentPet.fechaNacimiento"
              required
            />
          </div>
          <div class="form-group">
            <label for="idTipoMascota" class="title">
              Especie de la mascota</label
            >
            <select
              name="idTipoMascota"
              id="idTipoMascota"
              required
              v-model="currentPet.idTipoMascota"
              class="form-control"
            >
              <option
                v-for="especie in especies"
                :key="especie.idTipoMascota"
                :value="especie.idTipoMascota"
              >
                {{ especie.nombre }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="sexo" class="title">Sexo</label>
            <select name="sexo" id="sexo" required v-model="currentPet.sexo">
              <option value="Hembra">Hembra</option>
              <option value="Macho">Macho</option>
            </select>
          </div>
          <div class="form-group">
            <label for="description" class="title">Información adicional</label>
            <textarea
              id="description"
              v-model="currentPet.descripcion"
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
          <button type="submit">
            {{ editing ? "Guardar" : "Agregar" }}
          </button>
          <button type="button" @click="cancelEdit">Cancelar</button>
        </div>
        <div class="image">
          <div class="form-group">
            <label for="petName" class="title">Selecciona una imagen</label>
            <ImageUploader
              v-if="shouldShowImageUploader"
              :initialImage="storedImage"
              @update:modelValue="handleImageUpdate"
            />
          </div>
        </div>
      </form>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha N</th>
            <th><i class="fas fa-user"></i> Mascota</th>
            <th><i class="fas fa-id-card-alt"></i> Dueño</th>
            <th><i class="fas fa-at"></i> Sexo</th>
            <th><i class="fas fa-cog"></i> Especie</th>
            <th><i class="fas fa-cog"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in pets" :key="pet.idMascota">
            <td>{{ pet.createMascota }}</td>
            <td>{{ pet.nombreMascota }}</td>
            <td>{{ getUserName(pet.idUsuario) }}</td>
            <td>{{ pet.sexo }}</td>
            <td>{{ getEspeciesName(pet.idTipoMascota) }}</td>

            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(pet.idMascota)"></i>
              <i class="fas fa-edit" @click="editPet(pet.idMascota)"></i>
              <i class="fas fa-trash-alt" @click="deletePet(pet.idMascota)"></i>
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
      message="¿Estás seguro de que quieres eliminar esta mascota?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <!-- Sección para mostrar el detalle de la mascota -->
    <div v-if="selectedPet" class="pet-details-container">
      <div class="pet-details">
        <h2>Perfil de la Mascota</h2>
        <div class="mascota">
          <div class="inf-mascota">
            <p>
              <strong>Nombre de la mascota: </strong>
              {{ selectedPet.nombreMascota }}
            </p>
            <p>
              <strong>Fecha de Nacimiento: </strong>
              {{ selectedPet.fechaNacimiento }}
            </p>
            <p>
              <strong>Especie: </strong>
              {{ getEspecieDetails(selectedPet.idTipoMascota).nombre }}
            </p>
            <p><strong>Sexo: </strong> {{ selectedPet.sexo }}</p>

            <p>
              <strong>Descripción:</strong>
              <em>{{ selectedPet.descripcion }}</em>
            </p>
          </div>
        </div>

        <h4>Informacion general del dueño 👧</h4>
        <div class="usuario">
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
  name: "Mascotas",
  components: {
    ImageUploader,
    Modal,
  },
  data() {
    return {
      pets: [],
      users: [],
      especies: [],
      currentPet: {
        nombreMascota: "",
        fechaNacimiento: "",
        sexo: "",
        idTipoMascota: "",
        idUsuario: "",
        descripcion: "",
        imageMascota: "",
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
        /*   console.log(
          "CSRF Token:",
          instance.defaults.headers.common["X-CSRF-Token"]
        ); */
        const csrfToken = await this.obtenerCsrfToken();
        instance.defaults.headers.common["X-CSRF-Token"] = csrfToken;

        if (this.editing) {
          await instance.patch(
            `/mascotas/${this.currentPet.idMascota}`,
            this.currentPet
          );
        } else {
          await instance.post("/mascotas", this.currentPet);
        }
        this.getPets();
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
    async getEspecies() {
      try {
        const response = await instance.get("/tipoMascotas");
        console.log(response.data);
        this.especies = response.data;
      } catch (error) {
        console.error("Error fetching especies:", error);
      }
    },
    editPet(id) {
      this.editing = true;
      this.currentPet = { ...this.pets.find((pet) => pet.idMascota === id) };
      this.showForm = true;
    },
    viewDetails(id) {
      this.selectedPet = this.pets.find((pet) => pet.idMascota === id);
    },
    async deletePet(id) {
      this.petToDelete = id;
      this.showModal = true;
    },
    getUserName(idUsuario) {
      const user = this.users.find((u) => u.idUsuario === idUsuario);
      return user
        ? `${user.nombreUsuario} ${user.apellidoUsuario}`
        : "Nombre no disponible";
    },
    getEspeciesName(idTipoMascota) {
      const especie = this.especies.find(
        (u) => u.idTipoMascota === idTipoMascota
      );
      return especie ? `${especie.nombre}` : "Nombre de Especie no disponible";
    },
    async confirmDelete() {
      try {
        await instance.delete(`/mascotas/${this.petToDelete}`);
        this.getPets();
        this.showModal = false;
        this.petToDelete = null;
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    },
    getUserDetails(idUsuario) {
      return this.users.find((u) => u.idUsuario === idUsuario) || {};
    },
    getEspecieDetails(idTipoMascota) {
      return this.especies.find((u) => u.idTipoMascota === idTipoMascota) || {};
    },
    cancelDelete() {
      this.showModal = false;
      this.petToDelete = null;
    },
    resetForm() {
      this.currentPet = {
        nombreMascota: "",
        fechaNacimiento: "",
        sexo: "",
        idTipoMascota: "",
        idUsuario: "",
        descripcion: "",
        imageMascota: "",
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
    this.getUsers();
    this.getEspecies();
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
.mascota {
  display: flex;
  flex-direction: row;
}
.image-2 {
  width: 30%;
  position: relative;
  left: 175px;

  height: 200px;
}
.usuario {
  display: flex;
  flex-direction: row;
}
@media (max-width: 700px) {
  .content {
    width: 100%;
    overflow-x: scroll;
    max-width: 600px;
  }
}
</style>
