<template>
  <CrudGeneral
    nombre="Usuarios"
    campo1="fecha"
    campo2="nombre usuario"
    campo3="mascotas"
    campo4="descripcion"
    campo5="acciones"
    titulo="Usuarios"
    añadir="añadir usuario"
  />
</template>
<script>
import CrudGeneral from "../components/CrudGeneral.vue";
export default {
  name: "Usuarios",
  components: {
    CrudGeneral,
  },
};
</script>
