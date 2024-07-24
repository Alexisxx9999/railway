<template>
  <CrudGeneral
    nombre="Adopciones 😺"
    campo1="Fecha"
    campo2="Nombre Mascota"
    campo3="Dueño"
    campo4="Descripcion"
    campo5="Acciones"
    titulo="Adopciones"
    añadir="Añadir dopcion"
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
