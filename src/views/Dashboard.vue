<template>
  <h1>Bienvenido a Pet Pocket</h1>
  <p>Una herramienta para gestion de veterinarios</p>
  <div class="card-container">
    <Card
      title="Total Usuarios"
      value="1"
      icon="fas fa-user-circle"
      bgColorClass="bg-orange"
      enlace="dashboard/usuarios"
    />
    <i class="fa-solid fa-dog" style="color: #ffffff"></i>
    <Card
      title="Total de Mascotas"
      value="2"
      icon="fa-solid fa-dog "
      bgColorClass="bg-light-orange"
      enlace="dashboard/mascotas"
    />

    <Card
      title="Total Vacunas "
      :value="1"
      icon="fa-solid fa-syringe "
      bgColorClass="bg-brown"
      enlace="dashboard/vacunas"
    />
    <Card
      title="Total Adopciones"
      :value="2"
      icon="fa-solid fa-shield-dog"
      bgColorClass="bg-yellow"
      enlace="dashboard/adopciones"
    />
  </div>

  <div>
    <div>
      <div class="estadistica">
        <h3>Usuarios y Mascotas</h3>
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
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import { ref, onMounted, computed } from "vue";
import { Chart, registerables } from "chart.js";
import axios from "../plugins/axios";
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
