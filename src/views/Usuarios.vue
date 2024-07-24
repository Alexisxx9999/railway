<template>
  <CrudGeneral
    nombre="Usuario 🙎‍♂️"
    campo1="Fecha:"
    campo2="Nombre usuario"
    campo3="Telefono"
    campo4="Rol"
    campo5="Acciones"
    titulo="Usuarios"
    añadir="Añadir usuario"
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
