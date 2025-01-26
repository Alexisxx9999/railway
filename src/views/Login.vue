<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-image">
        <img src="../assets/mascota1.jpg" alt="" />
      </div>
      <div class="login-fields">
        <img src="../assets/logo.png" class="img" alt="" />
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>

          <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        </form>
        <p>
          No tienes una cuenta aun ?
          <router-link to="/register">Registrate</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "../plugins/axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        // Obtener el token CSRF
        const csrfResponse = await instance.get("/");
        const csrfToken = csrfResponse.data.csrfToken;

        // Enviar la solicitud de login
        const response = await instance.post(
          "/login",
          {
            emailUsuario: this.email,
            contraseñaUsuario: this.password,
          },
          {
            headers: {
              "X-CSRF-Token": csrfToken, // Incluir el token CSRF en los encabezados
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirigir si la autenticación es exitosa
        this.$router.push(response.data.redirect || "/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar Sesion",
          text: error.response ? error.response.data.message : error.message,
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 20px;
  box-sizing: border-box;
}
.img {
  padding: 10px;
  margin-bottom: 20px;
  height: 80px;
  width: 85%;
}
.login-container a {
  text-decoration: none;
}

.login-form {
  display: flex;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  max-width: 850px;
  width: 100%;
}

.login-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}
.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-fields {
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
  border-radius: 3px;
}

.btn:hover {
  background-color: #e69617;
}

.login-fields h1 {
  margin-bottom: 20px;
}

.login-fields p {
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .login-form {
    flex-direction: column;
  }

  .login-image {
    margin-top: 400px;
    width: 100%;
    background-size: cover;
  }
}
</style>
