<template>
<<<<<<< HEAD
  <div class="card">
    <div class="icon">&#128202;</div>
    <h2>Usuarios</h2>
    <p>Descripción corta</p>
    <div class="statistic">100</div>
    <router-link to="dashboard/usuarios">
      <p>Usuarios</p>
    </router-link>
  </div>

  <div class="card">
    <div class="icon">&#x1f4c8;</div>
    <h2>Mascotas</h2>
    <p>Descripción breve</p>
    <div class="statistic">200</div>
    <router-link to="dashboard/mascotas">
      <p>Mascotas</p>
    </router-link>
  </div>

  <div class="card">
    <div class="icon">&#x1f4b0;</div>
    <h2>Vacunas</h2>
    <p>Otra descripción</p>
    <div class="statistic">300</div>
    <router-link to="dashboard/vacunas">
      <p>Vacunas</p>
    </router-link>
  </div>

  <div class="card">
    <div class="icon">&#x1f680;</div>
    <h2>Adopciones</h2>
    <p>Descripción genérica</p>
    <div class="statistic">400</div>
    <router-link to="dashboard/adopciones">
      <p>Adopciones</p>
    </router-link>
=======
  <h1>Bienvenido a Pet Pocket</h1>
  <p>Una herramienta para gestion de veterinarios</p>
  <div class="card-container">
    <Card
      title="total usuarios"
      :value="totalPageViews"
      icon="fas fa-user-circle"
      bgColorClass="bg-orange"
      enlace="dashboard/usuarios"
    />

    <Card
      title="total de mascotas"
      :value="totalVisitors"
      icon="fa-solid fa-dog fa-bounce"
      bgColorClass="bg-light-orange"
      enlace="dashboard/mascotas"
    />

    <Card
      title="total vacunas "
      :value="1000"
      icon="fa-solid fa-syringe fa-bounce"
      bgColorClass="bg-brown"
      enlace="dashboard/vacunas"
    />
    <Card
      title="total adopciones"
      :value="100"
      icon="fa-solid fa-shield-dog"
      bgColorClass="bg-yellow"
      enlace="dashboard/adopciones"
    />
  </div>

  <div>
    <div>
      <div class="estadistica">
        <h3>usuarios y mascotas</h3>
        <canvas ref="lineChart"></canvas>
        <div></div>
      </div>
      <div class="estadistica">
        <h3>Mascotas mas popular</h3>
        <canvas ref="barChart"></canvas>
      </div>
    </div>
    <!-- <div class="estadistica">
      <h3>usuarios y mascotas registradas</h3>
      <canvas ref="lineChart"></canvas>
    </div>
    <div class="estadistica">
      <canvas ref="barChart"></canvas>
    </div> -->
>>>>>>> 6fc2524411a53930ffbc9a6e8272d51d614c5698
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import { ref, onMounted, computed } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  name: "Dashboard",
  components: {
    Card,
  },
  setup() {
    const lineChart = ref(null);
    const barChart = ref(null);
    let lineChartInstance = null;
    let barChartInstance = null;

    const getLast7Days = (startDate) => {
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(startDate);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
      }
      return dates;
    };

    const lineChartData = ref({
      pageViews: [],
      visitors: [],
    });

    const barChartData = ref({
      labels: [
        "Dogs",
        "Cats",
        "Birds",
        "Fish",
        "Hamsters",
        "Reptiles",
        "Others",
      ],
      data: [29, 15, 32, 44, 98, 13, 5],
    });

    const totalPageViews = computed(() =>
      lineChartData.value.pageViews.reduce((a, b) => a + b, 0)
    );
    const totalVisitors = computed(() =>
      lineChartData.value.visitors.reduce((a, b) => a + b, 0)
    );
    const totalSales = computed(() =>
      barChartData.value.data.reduce((a, b) => a + b, 0)
    );

    const getLineChartData = () => {
      return {
        pageViews: Array.from({ length: 7 }, () =>
          Math.floor(Math.random() * 200)
        ),
        visitors: Array.from({ length: 7 }, () =>
          Math.floor(Math.random() * 50)
        ),
      };
    };

    const createLineChart = () => {
      const ctx = lineChart.value.getContext("2d");
      const data = getLineChartData();
      lineChartData.value.pageViews = data.pageViews;
      lineChartData.value.visitors = data.visitors;

      const startDate = "2024-07-16";
      const labels = getLast7Days(startDate);

      lineChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Usuarios",
              data: data.pageViews,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              fill: true,
              lineTension: 0.4,
            },
            {
              label: "mascotas",
              data: data.visitors,
              borderColor: "green",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
              fill: true,
              lineTension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Value",
              },
              beginAtZero: true,
              max: 200,
            },
          },
        },
      });
    };

    const createBarChart = () => {
      const ctx = barChart.value.getContext("2d");
      const { labels, data } = barChartData.value;

      barChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "tipos de mascotas",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)", // Red
                "rgba(255, 159, 64, 0.2)", // Orange
                "rgba(75, 192, 192, 0.2)", // Green
                "rgba(54, 162, 235, 0.2)", // Blue
                "rgba(153, 102, 255, 0.2)", // Purple
                "rgba(201, 203, 207, 0.2)", // Grey
                "rgba(255, 206, 86, 0.2)", // Yellow
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(201, 203, 207, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Total Sales",
              },
            },
          },
        },
      });
    };

    onMounted(() => {
      createLineChart();
      createBarChart();
    });

    return {
      lineChart,
      barChart,
      totalPageViews,
      totalVisitors,
      totalSales,
    };
  },
};
</script>
<style scoped>
<<<<<<< HEAD

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
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
=======
.estadistica {
  width: 90%;
  margin: auto;
  margin-top: 80px;
}
.estadistica h3 {
  width: 94%;
  background-color: orange;
  color: white;
  margin: auto;
  text-align: center;
  padding: 10px;
>>>>>>> 6fc2524411a53930ffbc9a6e8272d51d614c5698
  margin-bottom: 10px;
}
.card-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
}
</style>
<!-- name: "Dashboard", -->
