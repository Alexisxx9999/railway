<template>
  <div class="login-container">
    <div class="login-image">
      <img src="../assets/mascota1.jpg" alt="Imagen de una mascota" />
    </div>
    <div class="login-form">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <router-link to="/Dashboard">
          <button type="submit">Iniciar Sesion</button>
        </router-link>
        <p>
          No tienes una cuenta aun
          <router-link to="/register">Registrate</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Mock login
      localStorage.setItem("auth", "true");
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.login-image {
  flex: 1;
  background-color: #f0f0f0;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
}

.login-form h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #42a5f5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1e88e5;
}
</style>
