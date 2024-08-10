<template>
  <div class="signup-container">
    <div class="signup-form">
      <div class="signup-image">
        <img src="../assets/mascota2.jpg" alt="Pet Image" />
      </div>
      <div class="signup-fields">
        <img src="../assets/logo.png" class="img" alt="" />
        <p>Crea una cuenta en pet pocket</p>
        <form @submit.prevent="createUsers">
          <div class="form-group">
            <label for="name">Nombres</label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              v-model="user.nombreUsuario"
              required
            />
          </div>
          <div class="form-group">
            <label for="apellidoUsuario">Apellidos</label>
            <input
              type="text"
              id="apellidoUsuario"
              v-model="user.apellidoUsuario"
              name="apellidoUsuario"
              required
            />
          </div>
          <div class="form-group">
            <label for="emailUsuario">Email</label>
            <input
              type="email"
              name="emailUsuario"
              id="emailUsuario"
              v-model="user.emailUsuario"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Por favor, ingresa un correo electrónico válido"
            />
          </div>
          <div class="form-group">
            <label for="cedulaUsuario">Cédula</label>
            <input
              type="text"
              id="cedulaUsuario"
              v-model="user.cedulaUsuario"
              name="cedulaUsuario"
              required
              pattern="\d{10}"
              title="La cédula debe contener exactamente 10 dígitos numéricos"
            />
          </div>
          <div class="form-group">
            <label for="telefonoUsuario">Teléfono</label>
            <input
              type="text"
              id="telefonoUsuario"
              v-model="user.telefonoUsuario"
              name="telefonoUsuario"
              required
              pattern="\d{10}"
              title="el numero telefonico debe ser de 10 digitos"
            />
          </div>
          <div class="form-group">
            <label for="contraseñaUsuario">Contraseña</label>
            <input
              type="password"
              id="contraseñaUsuario"
              v-model="user.contraseñaUsuario"
              name="contraseñaUsuario"
              required
              minlength="8"
            />
          </div>
          <button type="submit" class="btn btn-primary">Registrate</button>
        </form>
        <p>
          ¿Ya tienes una cuenta?
          <router-link to="/">Haz click aquí</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "../plugins/axios";
import Swal from "sweetalert2";

export default {
  name: "Register",
  data() {
    return {
      user: {
        nombreUsuario: "",
        apellidoUsuario: "",
        emailUsuario: "",
        cedulaUsuario: "",
        telefonoUsuario: "",
        contraseñaUsuario: "",
      },
      csrfToken: "",
    };
  },
  methods: {
    async obtenerCsrfToken() {
      try {
        const response = await instance.get("/"); // Asegúrate de que este endpoint devuelva el token CSRF
        this.csrfToken = response.data.csrfToken;
        return this.csrfToken;
      } catch (error) {
        console.error("Error al obtener el token CSRF:", error.message);
        throw new Error("No se pudo obtener el token CSRF");
      }
    },
    async createUsers() {
      try {
        if (!this.csrfToken) {
          this.csrfToken = await this.obtenerCsrfToken();
        }

        console.log("Datos enviados:", this.user); // Verifica los datos enviados

        const response = await instance.post("/Register", this.user, {
          headers: {
            "X-CSRF-Token": this.csrfToken,
          },
        });

        if (response.data.redirect) {
          this.$router.push(response.data.redirect);
        } else {
          console.log("Registro exitoso:", response.data.message);
        }
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al registrarse",
          text: error.response ? error.response.data.message : error.message,
        });
      }
    },
  },
  async created() {
    await this.obtenerCsrfToken();
  },
};
</script>

<style scoped>
/* Estilos aquí */
</style>

<style scoped>
.signup-container {
  display: flex;
  height: 100vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  justify-content: center;
  align-items: center;
  height: 90%;
  padding: 20px;
  box-sizing: border-box;
}

.signup-form {
  display: flex;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
}
.signup-form a {
  text-decoration: none;
}
.signup-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}
.img {
  padding: 10px;
  margin-bottom: 5px;
  height: 80px;
  width: 85%;
}
.signup-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.signup-fields {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #f7a518;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.btn:hover {
  background-color: #e69617;
}

.signup-fields h1 {
  margin-bottom: 10px;
}

.signup-fields p {
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .signup-form {
    flex-direction: column;
  }

  .signup-image {
    height: 200px;
    background-size: cover;
  }
}
</style>
