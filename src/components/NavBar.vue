<template>
  <div>
    <!-- Barra de Navegación Superior -->
<nav class="nav-bar">
  <router-link to="/dashboard">
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo" />
    </div>
  </router-link>

  <nav>
    <ul class="menu-horizontal">
      <li>
        <a href="#">
          <i class="fas fa-user-circle"></i>
          <span class="nav-text">Usuario Admin</span>
        </a>
        <ul class="menu-vertical">
          <li><a href="#"><i class="fas fa-sign-out-alt"></i><router-link to="/">Cerrar sesión</router-link></a></li>
        </ul>
      </li>
    </ul>
  </nav>
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
    
    <div class="sidebar">
      <aside class="side-menu">
        <div class="profile-info">

          <br><br><br>         
          <div class="imgbox"><img class="foto" src="https://i.pinimg.com/originals/90/eb/90/90eb907fde3833db6c0b58cbfae30f82.jpg" alt="" height="200" width="270">
            
          </div>
        </div>
        <ol class="Navbar">
          <li><a href="#"><router-link to="/dashboard"><i class="fas fa-tv"></i>Dashboard</router-link></a></li>
          <li><a href="#"><router-link to="/dashboard/mascotas"><i class="fas fa-paw"></i>Mascotas</router-link></a></li>
          <li><a href="#"><router-link to="/dashboard/vacunas"><i class="fas fa-syringe"></i>Vacunas</router-link></a></li>
          <li><a href="#"><router-link to="/dashboard/adopciones"><i class="fas fa-heart"></i>Adopciones</router-link></a></li>
          <li><a href="#"><router-link to="/dashboard/historial-medico"><i class="fas fa-folder"></i>Historial Medico</router-link>
          </a></li>
          <li><a href="#"><router-link to="/dashboard/usuarios"><i class="far fa-address-book"></i>Usuarios</router-link></a></li>
        </ol>
      
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
  padding: 10px 5px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
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

.menu-horizontal {
  list-style: none;
  display: flex;
  align-items: center; /* Alinear verticalmente los íconos y el texto */
}

.menu-horizontal > li > a {
  display: flex; /* Usar flexbox para alinear ícono y texto */
  align-items: center; /* Alinear verticalmente ícono y texto */
  padding: 15px 20px;
  color: black;
  text-decoration: none;
}

.menu-horizontal > li > a .nav-text {
  margin-left: 10px; /* Separación entre ícono y texto */
}

.menu-horizontal > li:hover {
  background-color: rgba(169, 169, 169, 0.5);
}

.menu-vertical {
  position: absolute;
  display: none;
  list-style: none;
  width: 163px;
  background-color: rgba(169, 169, 169, 0.5);
}

.menu-horizontal li:hover .menu-vertical {
  display: block;
}

.menu-vertical li:hover {
  background-color: rgba(169, 169, 169, 0.5);
}

.menu-vertical li a {
  display: flex;
  align-items: center; 
  color: black;
  padding: 15px 20px;
  text-decoration: none;
  height: 40px; /* Ajustar la altura de los elementos en el menú vertical */
}

/* Contenedor principal */


/* Estilos del menú lateral */
*{
  margin: 500;
  padding: 0;
  box-sizing: border-box;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.side-menu {
  width: 100%;
  min-width: 15%;
  max-width: 220px;
  height: 100%;
  background: rgba(45, 53, 60, 1);
  position: absolute;
  z-index: 1;
  transition: 0.3s ease-in-out;
}

.sidebar .imgbox{
    position: relative;
    height: 150px;
    width: 100%;
    margin-bottom: 20px;
    z-index: -1;
}

.sidebar .imgbox img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 5px;
    border-radius: 12px;
}

.sidebar .Navbar{
    width: 100%;
    padding: 0 10px;
    list-style: none;
}

.sidebar .Navbar li{
    width: 100%;
    display: inline-flex;
    margin: 5px 0;
}
.sidebar .Navbar li a{
    width: 100%;
    display: inline-flex;
    text-decoration: none;
    text-transform: capitalize;
    color: white;
    padding: 5px 8px;
    border-radius: 10px;
}
.sidebar .Navbar li:hover a{
    background: rgba(150, 175, 198, 1);
    color: #fff;
}
.sidebar .Navbar li a i{
    margin: auto 0;
    font-size: 20px;
    width: 40px;
    text-align: center;
}
.sidebar .Navbar li a p{
    font-size: 20px;
    transform: scale(1);
    transform-origin: left;
    transition: 0.3s;
}


</style>
