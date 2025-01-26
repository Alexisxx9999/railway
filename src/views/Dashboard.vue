<template>
  <h1>Bienvenido a Pet Pocket</h1>
  <p>Una herramienta para gestión de veterinarios</p>
  <div class="card-container">
    <Card
      title="Total Usuarios"
      :value="totalUsuarios"
      icon="fas fa-user-circle"
      bgColorClass="bg-orange"
      enlace="dashboard/usuarios"
    />
    <Card
      title="Total de Mascotas"
      :value="totalMascotas"
      icon="fa-solid fa-dog"
      bgColorClass="bg-light-orange"
      enlace="dashboard/mascotas"
    />
    <Card
      title="Total Vacunas"
      :value="totalVacunas"
      icon="fa-solid fa-syringe"
      bgColorClass="bg-brown"
      enlace="dashboard/vacunas"
    />
    <Card
      title="Total Adopciones"
      :value="totalAdopciones"
      icon="fa-solid fa-shield-dog"
      bgColorClass="bg-yellow"
      enlace="dashboard/adopciones"
    />
  </div>

  <h3>Usuarios y Mascotas registradas</h3>
  <canvas ref="lineChart" class="estadistica"> </canvas>
  <h3>tipos de mascotas</h3>
  <canvas ref="barChart" class="estadistica"></canvas>
</template>

<script>
import Card from "../components/Card.vue";
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import axios from "../plugins/axios";
Chart.register(...registerables);

export default {
  name: "Dashboard",
  components: {
    Card,
  },
  data() {
    return {
      totalUsuarios: 0,
      totalMascotas: 0,
      totalVacunas: 0,
      totalAdopciones: 0,
      lineChart: null,
      barChart: null,
      lineChartData: {
        pageViews: [], // Usuarios registrados simulados durante 7 días
        visitors: [], // Mascotas registradas simuladas durante 7 días
      },
      barChartData: {
        labels: [], // Especies de mascotas
        data: [], // Conteo de mascotas por especie
      },
      especies: [], // Especies disponibles
      especieCount: {}, // Conteo de mascotas por especie
    };
  },
  methods: {
    async fetchData() {
      try {
        const [usuarios, mascotas, vacunas, adopciones, tipoMascotas] =
          await Promise.all([
            axios.get("/usuarios"),
            axios.get("/mascotas"),
            axios.get("/vacunas"),
            axios.get("/adopciones"),
            axios.get("/tipoMascotas"),
          ]);

        this.totalUsuarios = usuarios.data.length;
        this.totalMascotas = mascotas.data.length;
        this.totalVacunas = vacunas.data.length;
        this.totalAdopciones = adopciones.data.length;

        this.especies = tipoMascotas.data; // Obtener especies disponibles

        // Generar datos simulados para los últimos 7 días
        this.lineChartData.pageViews = this.simulateDailyData(
          this.totalUsuarios
        );
        this.lineChartData.visitors = this.simulateDailyData(
          this.totalMascotas
        );

        // Contar el número de mascotas por especie
        this.especieCount = mascotas.data.reduce((acc, mascota) => {
          const especieId = mascota.idTipoMascota;
          if (!acc[especieId]) {
            acc[especieId] = 0;
          }
          acc[especieId]++;
          return acc;
        }, {});

        // Actualizar datos del gráfico de barras
        this.barChartData.labels = this.especies.map((e) => e.nombre);
        this.barChartData.data = this.especies.map(
          (e) => this.especieCount[e.idTipoMascota] || 0
        );

        this.createLineChart();
        this.createBarChart();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    simulateDailyData(total) {
      const dailyData = [];
      let cumulative = 0;

      for (let i = 0; i < 7; i++) {
        const dailyIncrement = Math.floor(total / 7) + Math.random() * 5;
        cumulative += dailyIncrement;
        dailyData.push(Math.min(cumulative, total));
      }

      return dailyData;
    },
    createLineChart() {
      const ctx = this.$refs.lineChart.getContext("2d");

      if (this.lineChart) {
        this.lineChart.destroy();
      }

      const labels = this.getLast7Days();

      this.lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Usuarios Registrados",
              data: this.lineChartData.pageViews,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              fill: true,
              lineTension: 0.4,
            },
            {
              label: "Mascotas Registradas",
              data: this.lineChartData.visitors,
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
                text: "Fecha",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Cantidad",
              },
              beginAtZero: true,
            },
          },
        },
      });
    },
    createBarChart() {
      const ctx = this.$refs.barChart.getContext("2d");

      if (this.barChart) {
        this.barChart.destroy();
      }

      this.barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.barChartData.labels,
          datasets: [
            {
              label: "Tipos de Mascotas",
              data: this.barChartData.data,
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
                text: "Total Mascotas",
              },
            },
          },
        },
      });
    },
    getLast7Days() {
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split("T")[0]);
      }
      return dates;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.estadistica {
  width: 90%;
  margin: auto;
  margin-top: 50px;
}
h3 {
  width: 94%;
  background-color: orange;
  color: white;
  margin: auto;
  text-align: center;
  padding: 10px;
  margin-bottom: 50px;
  margin-top: 50px;
}
.card-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
}
@media (max-width: 700px) {
  .card-container {
    flex-direction: column;
  }
  .card-container * {
    width: 90%;
    flex: 1;
    margin-top: 20px;
  }
}
</style>
<!-- name: "Dashboard", -->
