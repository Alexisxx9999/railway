// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/Layout.vue";
import Dashboard from "../views/Dashboard.vue";
import Mascotas from "../views/Mascotas.vue";
import Vacunas from "../views/Vacunas.vue";
import Adopciones from "../views/Adopciones.vue";
import HistorialMedico from "../views/HistorialMedico.vue";
import Usuarios from "../views/Usuarios.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DetalleMascota from "../views/DetalleMascota.vue";
import DetalleUsuario from "../views/DetalleUsuario.vue";
const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/dashboard",
    component: Layout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
      },
      { path: "mascotas", name: "Mascotas", component: Mascotas },
      { path: "vacunas", name: "Vacunas", component: Vacunas },
      { path: "adopciones", name: "Adopciones", component: Adopciones },
      {
        path: "historial-medico",
        name: "HistorialMedico",
        component: HistorialMedico,
      },
      { path: "usuarios", name: "Usuarios", component: Usuarios },
      {
        path: "detalleMascota/:id",
        name: "detalleMascota",
        component: DetalleMascota, // Aquí va el componente correspondiente
      },
      {
        path: "detalleUsuario/:id",
        name: "detalleUsuario",
        component: DetalleUsuario, // Aquí va el componente correspondiente
      },
    ],
  },
];
/* const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/home", name: "Dashboard", component: Dashboard },
  { path: "/mascotas", name: "Mascotas", component: Mascotas },
  { path: "/vacunas", name: "Vacunas", component: Vacunas },
  { path: "/adopciones", name: "Adopciones", component: Adopciones },
  {
    path: "/historial-medico",
    name: "HistorialMedico",
    component: HistorialMedico,
  },
  { path: "/usuarios", name: "Usuarios", component: Usuarios },
];
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
