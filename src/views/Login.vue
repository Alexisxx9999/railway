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

          <router-link to="/Dashboard">
            <button type="submit" class="btn btn-primary">
              Iniciar Sesión
            </button>
          </router-link>
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
    height: 200px;
    background-size: cover;
  }
}
</style>
