<template>
  <CrudGeneral
    nombre="Mascota 🐕"
    campo1="Fecha"
    campo2="Nombre mascota"
    campo3="Dueño"
    campo4="Descripcion"
    campo5="Acciones"
    titulo="Mascotas"
    añadir="Añadir Mascota"
    opcional=""
  />
</template>

<script>
import CrudGeneral from "../components/CrudGeneral.vue";
export default {
  name: "Mascotas",
  components: {
    CrudGeneral,
  },
};
</script>
