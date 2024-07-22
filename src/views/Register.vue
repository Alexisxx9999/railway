<!-- src/views/Register.vue -->
<template>
  <div class="signup-container">
    <div class="signup-form">
      <div class="signup-image">
        <img src="../assets/mascota2.jpg" alt="Pet Image" />
      </div>
      <div class="signup-fields">
        <img src="../assets/logo.png" class="img" alt="" />

        <p>Crea una cuenta en pet pocket</p>
        <form @submit.prevent="signUp">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="cedula">Cédula</label>
            <input type="text" id="cedula" v-model="cedula" required />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input type="text" id="telefono" v-model="telefono" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <router-link to="/">
            <button type="submit" class="btn btn-primary">Registrate</button>
          </router-link>
        </form>

        <p>
          ¿Ya tienes una cuenta?
          <router-link to="/">Haz click aquí </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

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
