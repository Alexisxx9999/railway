<template>
  <CrudGeneral
    nombre="mascota"
    campo1="fecha"
    campo2="nombre mascota"
    campo3="dueño"
    campo4="descripcion"
    campo5="acciones"
    titulo="Mascotas"
    añadir="añadir mascota"
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
