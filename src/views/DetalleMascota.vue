<template>
  <div v-if="pet">
    <!-- Renderiza los detalles de la mascota aquí -->
    <h1>{{ pet.petName }}</h1>
    <p>{{ pet.description }}</p>
    <p>Owner: {{ pet.owner }}</p>
    <p>Date: {{ pet.date }}</p>
    <p>Adopted: {{ pet.adopted ? "Yes" : "No" }}</p>
  </div>
  <div v-else>
    <p>No se encontraron detalles de la mascota.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pet: null,
    };
  },
  created() {
    this.pet = this.$router.history.current.state.pet;
    if (!this.pet) {
      // Maneja el caso donde no hay datos cargados (puedes redirigir de nuevo o cargar datos de otra fuente)
      console.error("No pet data found in navigation state.");
    }
  },
};
</script>
