<template>
  <div id="players-results">
    <h2>Текущие результаты:</h2>
    <div class="chart-container">
      <canvas id="players-results-chart"></canvas>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import chartDataTemplate from './chart-data-template';
  import Bus from "../../Bus";
  import {globalEvents} from "../../Common";

  export default {
    name: "players-results",
    data() {
      return {
        players: [],
        chart: null
      }
    },
    methods: {
      createChart(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        this.chart = new Chart(ctx, {
          type: chartData.type,
          data: chartData.data,
          options: chartData.options,
        });
      },
      getChartData() {
        let cdt = chartDataTemplate;
        cdt.data.labels = this.players.map(p => p.name);
        cdt.data.datasets = [{
          label: 'Количество правильных ответов',
          data: this.players.map(p => p.score),
          backgroundColor: this.players.map(p => '#47ce85'),
          borderColor: [],
          borderWidth: 2
        }];
        return cdt;
      }
    },
    created() {
      Bus.bus.$on(globalEvents.calcPlayersResults, message => {
        this.players = message.content;
        this.createChart('players-results-chart', this.getChartData());
      });
    }
  }
</script>

<style scoped>
  #players-results {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .chart-container {
    width: 70%;
    height: 70%;
    margin-bottom: 100px;
  }
</style>
