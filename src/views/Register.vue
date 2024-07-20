<!-- src/views/Register.vue -->
<template>
  <div class="signup-container">
    <div class="signup-image">
      <img src="../assets/mascota2.jpg" alt="Imagen de una mascota" />
    </div>
    <div class="signup-form">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <h2>Regístrate</h2>
      <form @submit.prevent="handleSignUp">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <router-link to="/">
          <button type="submit">Registrarse</button>
        </router-link>
      </form>
    </div>
  </div>
</template>
<!-- <p>Already have an account? <router-link to="/">Login</router-link></p> -->

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      // Mock registration
      localStorage.setItem("auth", "true");
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  height: 100vh;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.signup-image {
  flex: 1;
  background-color: #f0f0f0;
}

.signup-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.signup-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
}

.signup-form h2 {
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
