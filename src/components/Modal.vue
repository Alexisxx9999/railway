<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button @click="confirm" class="btn">Confirmar</button>
      <button @click="cancel" class="btn">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show", "title", "message"],
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.btn {
  background-color: #ffcc5f;
  color: white;
  padding: 8px;
  margin: 0 50px;
  border: none;
  border-radius: 7px;
}
.btn:hover {
  background-color: orange;
}
</style>
