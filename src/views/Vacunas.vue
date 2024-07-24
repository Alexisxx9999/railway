<template>
  <CrudGeneral
    nombre="Vacunas"
    campo1=" Fecha de Aplicación"
    campo2="Nombre de la mascota"
    campo3="dueño"
    campo4="motivo de vacuna"
    campo5="acciones"
    titulo="Vacunas"
    añadir="añadir vacunas"
  />
</template>
<!-- Nombre de la Vacuna	 Tipo de Animal	 Fecha de Aplicación	 Descripción	 Acciones -->
<!-- Fecha	 Nombre de la Mascota	 Dueño	 Descripción	 Acciones -->
<script>
import CrudGeneral from "../components/CrudGeneral.vue";
export default {
  name: "Vacunas",
  components: {
    CrudGeneral,
  },
};
</script>
