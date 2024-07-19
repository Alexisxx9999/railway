<template>
  <div :class="['card', bgColorClass]">
    <div class="card-content">
      <div class="card-title">{{ title }}</div>
      <div class="card-value">{{ value }}</div>
      <div class="card-icon">
        <i :class="icon"></i>
      </div>
    </div>
    <div class="card-footer">
      <router-link :to="enlace">
        <p>ver mas &RightArrow;</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: true,
    },
    enlace: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    bgColorClass: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 23%;
  height: 150px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
}

.card-content {
  text-align: center;
  padding: 5px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  padding: 5px;
}

.card-value {
  font-size: 20px;
  margin: 8px 0;
  float: left;
  padding: 5px;
}

.card-footer {
  background-color: white;
  width: 100%;
  display: block;
  text-align: center;
  height: 40px;
  text-decoration: none;
}
.card-footer a {
  text-decoration: none;
}

.card-icon {
  font-size: 45px;
}
.card-button {
  background: transparent;
  border: none;
  color: white;
  text-decoration: underline;
  cursor: pointer;
}

.bg-orange {
  background-color: #f39c12;
}

.bg-light-orange {
  background-color: #f39c80;
}

.bg-brown {
  background-color: #8e7759;
}

.bg-yellow {
  background-color: #f3c412;
}
</style>
