<template>
  <CrudGeneral
    nombre="Adopciones"
    campo1="fecha"
    campo2="nombre mascota"
    campo3="usuario"
    campo4="descripcion"
    campo5="acciones"
    titulo="adopciones"
    añadir="añadir adopcion"
  />
</template>
<!-- Nombre de la Vacuna	 Tipo de Animal	 Fecha de Aplicación	 Descripción	 Acciones -->
<!-- Fecha	 Nombre de la Mascota	 Dueño	 Descripción	 Acciones -->
<script>
import CrudGeneral from "../components/CrudGeneral.vue";
export default {
  name: "Adopciones",
  components: {
    CrudGeneral,
  },
};
</script>
