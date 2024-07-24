<template>
  <div>
    <div
      class="image-container"
      @mouseover="showTooltip"
      @mouseleave="hideTooltip"
    >
      <transition name="fade">
        <img
          v-if="imageSrcs.length > 0"
          :src="imageSrcs[currentImageIndex]"
          alt="Click to upload"
          @click="handleImageClick"
          key="image"
        />
        <div v-else class="placeholder" @click="triggerFileInput">
          &plus; selecciona una imagen
        </div>
      </transition>
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="loadImage"
        style="display: none"
      />
      <div v-if="showTooltipMessage" class="tooltip">{{ tooltipMessage }}</div>
      <div v-if="imageSrcs.length > 0" class="image-index-tooltip">
        Imagen {{ currentImageIndex + 1 }} de {{ imageSrcs.length }}
      </div>
    </div>
    <div class="buttons" v-if="imageSrcs.length > 0">
      <button @click="prevImage">⬅</button>
      <button @click="nextImage">➡</button>
      <button @click="removeCurrentImage">🗑 Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrcs: [],
      currentImageIndex: 0,
      showTooltipMessage: false,
      tooltipMessage: "Seleccionar otra imagen",
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
          if (this.imageSrcs.length < 3) {
            this.imageSrcs.push(e.target.result);
            this.currentImageIndex = this.imageSrcs.length - 1;
            if (this.imageSrcs.length === 3) {
              this.tooltipMessage = "Número máximo de imágenes";
            }
          }
        };
        reader.readAsDataURL(file);
      }
    },
    showTooltip() {
      if (this.imageSrcs.length > 0) {
        this.showTooltipMessage = true;
      }
    },
    hideTooltip() {
      this.showTooltipMessage = false;
    },
    prevImage() {
      if (this.imageSrcs.length > 0) {
        this.currentImageIndex =
          (this.currentImageIndex - 1 + this.imageSrcs.length) %
          this.imageSrcs.length;
      }
    },
    nextImage() {
      if (this.imageSrcs.length > 0) {
        this.currentImageIndex =
          (this.currentImageIndex + 1) % this.imageSrcs.length;
      }
    },
    removeCurrentImage() {
      if (this.imageSrcs.length > 0) {
        this.imageSrcs.splice(this.currentImageIndex, 1);
        if (this.imageSrcs.length === 0) {
          this.currentImageIndex = 0;
        } else {
          this.currentImageIndex =
            this.currentImageIndex % this.imageSrcs.length;
        }
        this.tooltipMessage = "Seleccionar otra imagen";
      }
    },
    handleImageClick() {
      if (this.imageSrcs.length < 3) {
        this.triggerFileInput();
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 300px; /* Fijar el ancho del contenedor */
  height: 350px; /* Fijar la altura del contenedor */
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 35px;
  margin-right: 20px;
  border-radius: 4%;
  overflow: hidden; /* Ensure content doesn't overflow */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: opacity 0.5s; /* Apply transition */
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

.image-index-tooltip {
  position: absolute;
  top: 10px;
  left: 82%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.buttons button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.buttons button:hover {
  background-color: #0056b3;
}

.buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
