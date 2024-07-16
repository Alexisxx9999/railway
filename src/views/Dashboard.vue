<template>
  <div class="card">
    <div class="icon">&#128202;</div>
    <h2>Usuarios</h2>
    <p>Descripción corta</p>
    <div class="statistic">100</div>
    <router-link to="dashboard/usuarios">
      <p>usuarios</p>
    </router-link>
  </div>

  <div class="card">
    <div class="icon">&#x1f4c8;</div>
    <h2>mascotas</h2>
    <p>Descripción breve</p>
    <div class="statistic">200</div>
    <router-link to="dashboard/mascotas">
      <p>mascotas</p>
    </router-link>
  </div>

  <div class="card">
    <div class="icon">&#x1f4b0;</div>
    <h2>vacunas</h2>
    <p>Otra descripción</p>
    <div class="statistic">300</div>
    <router-link to="dashboard/vacunas">
      <p>vacunas</p>
    </router-link>
  </div>

  <div class="card">
    <div class="icon">&#x1f680;</div>
    <h2>adopciones</h2>
    <p>Descripción genérica</p>
    <div class="statistic">400</div>
    <router-link to="dashboard/adopciones">
      <p>adopciones</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>
<style scoped>
.card {
  width: 150px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: inline-block;
  vertical-align: top;
  text-align: center;
}
.card h2 {
  margin-top: 0;
}
.card p {
  font-size: 14px;
  color: #666;
}
.statistic {
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.icon {
  font-size: 36px;
  color: #007bff;
  margin-bottom: 10px;
}
</style>
<!-- name: "Dashboard", -->
