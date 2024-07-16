<!-- src/components/NavBar.vue -->

<template>
  <div>
    <!-- Barra de Navegación Superior -->
    <nav class="nav-bar">
      <router-link to="/dashboard">
        <div class="logo">
          <img src="../assets/logo.png" alt="Logo" />
        </div>
      </router-link>

      <div class="user-info">
        <i class="fas fa-user-circle"></i>
        <span>usuario admin</span>
        <div class="salir">
          <router-link to="/">salir</router-link>
        </div>
      </div>
    </nav>
    <!--  <nav class="nav-bar">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="user-info">
        <i class="fas fa-user-circle"></i>
        <span class="user-text">usuario admin</span>
        <router-link to="/"><i class="fas fa-paw"></i> Salir</router-link>
      </div>
    </nav> -->

    <!-- Contenedor del Menú Lateral y del Contenido Principal -->
    <div class="main-container">
      <aside class="side-menu">
        <div class="profile-info">
          <i class="fas fa-user-circle"></i>
          <div>
            <span>leo messi</span>
            <span>usuario admin</span>
          </div>
        </div>
        <ul class="menu-list">
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/dashboard/mascotas">Mascotas</router-link></li>
          <li><router-link to="/dashboard/vacunas">Vacunas</router-link></li>
          <li>
            <router-link to="/dashboard/adopciones">Adopciones</router-link>
          </li>
          <li>
            <router-link to="/dashboard/historial-medico"
              >Historial Medico</router-link
            >
          </li>
          <li><router-link to="/dashboard/usuarios">Usuarios</router-link></li>
        </ul>
      </aside>
      <!-- Menú Lateral -->
      <!--   <aside class="side-menu">
        <div class="profile-info">
          <i class="fas fa-user-circle"></i>
          <div>
            <span>leo messi</span>
            <span>usuario admin</span>
          </div>
        </div>
        <ul class="menu-list">
          <li>
            <router-link to="/home"
              ><i class="fas fa-tachometer-alt"></i> Dashboard</router-link
            >
          </li>
          <li>
            <router-link to="/mascotas"
              ><i class="fas fa-paw"></i> Mascotas</router-link
            >
          </li>
          <li>
            <router-link to="/vacunas"
              ><i class="fas fa-syringe"></i> Vacunas</router-link
            >
          </li>
          <li>
            <router-link to="/adopciones"
              ><i class="fas fa-users"></i> Adopciones</router-link
            >
          </li>
          <li>
            <router-link to="/historial-medico"
              ><i class="fas fa-file-medical"></i> Historial medico</router-link
            >
          </li>
          <li>
            <router-link to="/usuarios"
              ><i class="fas fa-user"></i> Usuarios</router-link
            >
          </li>
        </ul>
      </aside> -->

      <!-- Contenido Principal -->
      <main class="main-content"></main>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
<style scoped>
/* Estilos de la barra de navegación superior */
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.5em;
  color: #ff9900;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info i {
  font-size: 1.5em;
  margin-right: 5px;
}

.user-info span {
  font-size: 1em;
  color: #555;
  margin-right: 40px;
}
.salir {
  margin-right: 40px;
  text-decoration: none;
}
/* Contenedor principal */

/* Estilos del menú lateral */
.side-menu {
  width: 250px;
  background-color: #2d353c;
  height: calc(
    100vh - 60px
  ); /* Ajusta la altura según la altura de la barra de navegación */
  position: fixed;
  top: 60px; /* Ajusta la posición superior según la altura de la barra de navegación */
  left: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow-y: auto;
}

.profile-info {
  display: flex;
  align-items: center;
  padding: 20px;
  color: #ecf0f1;
}

.profile-info i {
  font-size: 2em;
  margin-right: 10px;
}

.profile-info div {
  display: flex;
  flex-direction: column;
}

.profile-info span:first-child {
  font-size: 1.2em;
}

.profile-info span:last-child {
  font-size: 0.9em;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  display: flex;
  align-items: center;
  padding: 15px 20px;
}

.menu-list li a {
  display: flex;
  align-items: center;
  color: #ecf0f1;
  text-decoration: none;
  width: 100%;
  font-size: 1em;
  transition: background-color 0.3s, color 0.3s;
}

.menu-list li a:hover {
  background-color: #34495e;
  color: #fff;
}

.menu-list li a.router-link-active {
  background-color: #aab6b3;
  color: #fff;
}
</style>
