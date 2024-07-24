<template>
  <div class="content">
    <div class="header-container">
      <h1>Vacunas</h1>
      <div class="user-info">
        <span>Usuario Admin</span>
      </div>
      <div class="search-container">
        <button @click="toggleForm" class="add-button">Agendar Cita</button>
      </div>
    </div>
    <div v-if="citaAgendada" class="details-container">
      <h2>Detalles de la Cita</h2>
      <table class="details-table">
        <thead>
          <tr>
            <th>Campo</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nombre del Dueño</td>
            <td>{{ dueno }}</td>
          </tr>
          <tr>
            <td>Tipo de Mascota</td>
            <td>{{ getMascotasSeleccionadas() }}</td>
          </tr>
          <tr>
            <td>Interesado en</td>
            <td>{{ getInteresesSeleccionados() }}</td>
          </tr>
          <tr>
            <td>Enfermedad</td>
            <td>{{ enfermedad }}</td>
          </tr>
          <tr>
            <td>Fecha</td>
            <td>{{ fecha }}</td>
          </tr>
          <tr>
            <td>Hora</td>
            <td>{{ hora }}</td>
          </tr>
          <tr>
            <td>Dirección</td>
            <td>{{ direccion }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="cancelarCita" class="back-button">Regresar</button>
    </div>
    <div v-if="showForm" class="form-container">
      <div class="form-group">
        <label>Nombre del dueño:</label>
        <input type="text" v-model="dueno" id="dueno" />
        <span v-if="showAlert && !dueno && !isFormComplete" class="alert">Este campo está vacío</span>
      </div>
      <div class="form-group">
        <label>Escoge tu mascota:</label>
        <div>
          <label>Perro <input type="checkbox" v-model="mascota.perro" /></label>
          <label>Gato <input type="checkbox" v-model="mascota.gato" /></label>
          <label>Conejo <input type="checkbox" v-model="mascota.conejo" /></label>
          <label>Aves <input type="checkbox" v-model="mascota.aves" /></label>
          <label>Otros <input type="checkbox" v-model="mascota.otros" /></label>
        </div>
        <span v-if="showAlert && !isMascotaSelected && !isFormComplete" class="alert">Este campo está vacío</span>
      </div>
      <div class="form-group">
        <label>Interesado en:</label>
        <div>
          <label>Fracturas <input type="checkbox" v-model="interes.fracturas" /></label>
          <label>Esterilización <input type="checkbox" v-model="interes.esterilizacion" /></label>
          <label>Desparacitación <input type="checkbox" v-model="interes.desparacitacion" /></label>
          <label>Consulta <input type="checkbox" v-model="interes.consulta" /></label>
          <label>Enfermedad:</label>
          <select v-model="enfermedad" id="enfermedad">
            <option value="">Seleccione una enfermedad</option>
            <option value="parvovirosis">Parvovirosis</option>
            <option value="moquillo">Moquillo</option>
            <option value="hepatitis_infecciosa">Hepatitis Infecciosa</option>
            <option value="laringotraqueitis_infecciosa">Laringotraqueitis Infecciosa</option>
            <option value="rabia">Rabia</option>
          </select>
        </div>
        <span v-if="showAlert && !isInteresSelected && !isFormComplete" class="alert">Este campo está vacío</span>
      </div>
      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input type="date" v-model="fecha" id="fecha" />
        <span v-if="showAlert && !fecha && !isFormComplete" class="alert">Este campo está vacío</span>
      </div>
      <div class="form-group">
        <label for="hora">Hora:</label>
        <input type="time" v-model="hora" id="hora" />
        <span v-if="showAlert && !hora && !isFormComplete" class="alert">Este campo está vacío</span>
      </div>
      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <input type="text" v-model="direccion" id="direccion" />
        <span v-if="showAlert && !direccion && !isFormComplete" class="alert">Este campo está vacío</span>
      </div>
      <div class="button-container">
        <button @click="agendarCita" class="submit-button">Enviar</button>
        <button @click="cancelarCita" class="cancel-button">Cancelar</button>
      </div>
      <span v-if="showAlert && !isFormComplete" class="alert">Los campos no están completamente llenos</span>
    </div>
    <button @click="goBack" class="back-button">Regresar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      dueno: '',
      mascota: {
        perro: false,
        gato: false,
        conejo: false,
        aves: false,
        otros: false
      },
      interes: {
        fracturas: false,
        esterilizacion: false,
        desparacitacion: false,
        consulta: false,
      },
      enfermedad: '',
      fecha: '',
      hora: '',
      direccion: '',
      mensaje: '',
      showAlert: false,
      showForm: false,
      citaAgendada: false
    };
  },
  computed: {
    isMascotaSelected() {
      return Object.values(this.mascota).some(value => value);
    },
    isInteresSelected() {
      return Object.values(this.interes).some(value) || this.enfermedad;
    },
    isFormComplete() {
      return this.dueno && this.isMascotaSelected && this.isInteresSelected && this.fecha && this.hora && this.direccion;
    }
  },
  methods: {
    searchHistory() {
      console.log('Buscando historial médico para:', this.searchTerm);
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    agendarCita() {
      this.showAlert = true;
      if (this.isFormComplete) {
        this.mensaje = 'Su cita ha sido agendada';
        this.citaAgendada = true;
        console.log('Cita agendada:', {
          dueno: this.dueno,
          mascota: this.mascota,
          interes: this.interes,
          enfermedad: this.enfermedad,
          fecha: this.fecha,
          hora: this.hora,
          direccion: this.direccion
        });
        
        this.resetForm();
      } else {
        this.mensaje = '';
      }
    },
    cancelarCita() {
      this.resetForm();
      this.showForm = false;
      this.citaAgendada = false;
    },
    resetForm() {
      this.dueno = '';
      this.mascota = {
        perro: false,
        gato: false,
        conejo: false,
        aves: false,
        otros: false
      };
      this.interes = {
        fracturas: false,
        esterilizacion: false,
        desparacitacion: false,
        consulta: false,
      };
      this.enfermedad = '';
      this.fecha = '';
      this.hora = '';
      this.direccion = '';
      this.showAlert = false;
    },
    getMascotasSeleccionadas() {
      const selected = [];
      for (const [key, value] of Object.entries(this.mascota)) {
        if (value) selected.push(key);
      }
      return selected.join(', ');
    },
    getInteresesSeleccionados() {
      const selected = [];
      for (const [key, value] of Object.entries(this.interes)) {
        if (value) selected.push(key);
      }
      return selected.join(', ');
    }
  }
};
</script>

<style scoped>
.content {
  margin-left: 50px;
  padding: 20px;
  width: calc(100% - 270px);
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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

.search-container {
  display: flex;
  align-items: center;
}

.search-container input {
  padding: 10px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.search-button,
.add-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
}

.search-button:hover,
.add-button:hover {
  background-color: #218838;
}

.form-container {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group div label {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #c82333;
}

.back-button {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}

.mensaje-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.alert {
  color: red;
  font-size: 12px;
}
</style>