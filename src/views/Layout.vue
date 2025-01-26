<template>
  <div class="layout">
    <NavBar />
    <div class="main-container">
      <SideMenu />
      <main class="main-content">
        <router-view></router-view>
        <!-- Aquí se renderizarán las vistas específicas -->
      </main>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "Layout",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.main-container {
  display: flex;
  flex-grow: 1;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px; /* Ajuste para el menú lateral */
  margin-top: 60px; /* Ajuste para la barra de navegación */
}
@media (max-width: 700px) {
  .main-content {
    width: 100%;
    text-align: center;
    margin-left: 0px; /* Ajuste para el menú lateral */
    margin: auto;
    max-width: 700px;
  }
}
</style>
