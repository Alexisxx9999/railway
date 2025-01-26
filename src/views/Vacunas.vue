<template>
  <div class="content">
    <div class="header-container">
      <h1>Vacunas 💉</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div>
        <button @click="showAddForm" class="add-button">Añadir Vacuna</button>
      </div>
    </div>
    <div class="form-container" v-if="showForm">
      <h2 class="title2">{{ editing ? "Editar " : "Agregar " }} Vacuna</h2>
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
            <label for="descripcion" class="title">Información adicional</label>
            <textarea
              id="descripcion"
              v-model="currentPet.descripcion"
              class="form-control"
              rows="4"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="idEnfermedad" class="title"
              >Nombre de la Enfermedad</label
            >
            <select
              name="idEnfermedad"
              id="idEnfermedad"
              required
              v-model="currentPet.idEnfermedad"
              class="form-control"
            >
              <option
                v-for="enfermedad in enfermedades"
                :key="enfermedad.idEnfermedad"
                :value="enfermedad.idEnfermedad"
              >
                {{ enfermedad.nombreEnfermedad }}
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
            <th><i class="fas fa-id-card-alt"></i> Enfermedad</th>
            <th><i class="fas fa-at"></i> Descripcion</th>
            <th><i class="fas fa-at"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in vacunas" :key="pet.idVacuna">
            <td>{{ pet.createVacuna }}</td>
            <td>{{ getPetName(pet.idMascota) }}</td>
            <td>{{ getEnfermedadesName(pet.idEnfermedad) }}</td>
            <td>{{ pet.descripcion }}</td>
            <td class="actions">
              <i class="fas fa-eye" @click="viewDetails(pet.idVacuna)"></i>
              <i class="fas fa-edit" @click="editPet(pet.idVacuna)"></i>
              <i class="fas fa-trash-alt" @click="deletePet(pet.idVacuna)"></i>
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
      message="¿Estás seguro de que quieres eliminar esta vacuna?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
    <!-- Sección para mostrar el detalle de la mascota -->
    <div v-if="selectedPet" class="pet-details-container">
      <div class="pet-details">
        <h2>Detalle de la Vacuna:</h2>
        <p><strong>Fecha de Vacuna: </strong> {{ selectedPet.createVacuna }}</p>
        <p>
          <strong>Tipo de enfermedad: </strong>
          {{
            getEnfermedadesDetails(selectedPet.idEnfermedad).nombreEnfermedad
          }}
        </p>
        <p>
          <strong>Descripcion de la Vacuna: </strong>
          {{ selectedPet.descripcion }}
        </p>

        <h4>Informacion de la mascota vacunada 😻</h4>
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
              <strong>Especie de la mascota: </strong>
              {{ getPetDetails(selectedPet.idMascota).idTipoMascota }}
            </p>
            <p>
              <strong>descripcion de la mascota </strong>
              {{ getPetDetails(selectedPet.idMascota).descripcion }}
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
  name: "Vacunas",
  components: {
    ImageUploader,
    Modal,
  },
  data() {
    return {
      pets: [],
      enfermedades: [],
      vacunas: [],
      currentPet: {
        idVacuna: "",
        idMascota: "",
        idEnfermedad: "",
        descripcion: "",
        createVacuna: "",
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
            `/vacunas/${this.currentPet.idVacuna}`,
            this.currentPet
          );
        } else {
          await instance.post("/vacunas", this.currentPet);
        }
        this.getVacunas();
        this.resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    async getEnfermedades() {
      try {
        const response = await instance.get("/enfermedades");
        console.log(response.data); // Verifica que response.data contiene los datos esperados
        this.enfermedades = response.data;
        console.log(this.enfermedades); // Verifica que this.enfermedades se está llenando correctamente
      } catch (error) {
        console.error("Error fetching enfermedades:", error);
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
    getPetName(idMascota) {
      const pet = this.pets.find((p) => p.idMascota === idMascota);
      return pet ? pet.nombreMascota : "Nombre no disponible";
    },

    getEnfermedadesName(idEnfermedad) {
      const enfermedad = this.enfermedades.find(
        (u) => u.idEnfermedad === idEnfermedad
      );
      return enfermedad ? enfermedad.nombreEnfermedad : "Nombre no disponible";
    },
    editPet(id) {
      this.editing = true;
      this.currentPet = {
        ...this.vacunas.find((pet) => pet.idVacuna === id),
      };
      this.showForm = true;
    },
    getPetDetails(idMascota) {
      return this.pets.find((p) => p.idMascota === idMascota) || {};
    },

    getEnfermedadesDetails(idEnfermedad) {
      return (
        this.enfermedades.find((u) => u.idEnfermedad === idEnfermedad) || {}
      );
    },
    viewDetails(id) {
      this.selectedPet = this.vacunas.find((pet) => pet.idVacuna === id);
    },

    async deletePet(id) {
      this.petToDelete = id;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        const csrfToken = await this.obtenerCsrfToken();
        await instance.delete(`/vacunas/${this.petToDelete}`, {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        });
        this.getVacunas();
        this.showModal = false;
        this.petToDelete = null;
      } catch (error) {
        console.error("Error deleting vacuna:", error);
      }
    },
    cancelDelete() {
      this.showModal = false;
      this.petToDelete = null;
    },
    resetForm() {
      this.currentPet = {
        idVacuna: "",
        idMascota: "",
        idEnfermedad: "",
        descripcion: "",
        createVacuna: "",
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
    this.getVacunas();
    this.getPets();
    this.getEnfermedades();

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
  font-size: 16px;
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
