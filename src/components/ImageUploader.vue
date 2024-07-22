<template>
  <div
    class="image-container"
    @mouseover="showTooltip"
    @mouseleave="hideTooltip"
  >
    <img
      v-if="imageSrc"
      :src="imageSrc"
      alt="Click to upload"
      @click="triggerFileInput"
    />
    <div v-else class="placeholder" @click="triggerFileInput">
      &plus; selecciona una imagen
    </div>
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      @change="loadImage"
      style="display: none"
    />
    <div v-if="showTooltipMessage" class="tooltip">Seleccionar otra imagen</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: null,
      showTooltipMessage: false,
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    loadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    showTooltip() {
      if (this.imageSrc) {
        this.showTooltipMessage = true;
      }
    },
    hideTooltip() {
      this.showTooltipMessage = false;
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 20%;
  height: 220px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 35px;
  margin-right: 20px;
  border-radius: 4%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #888;
  font-size: 16px;
}

.tooltip {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
}
</style>
