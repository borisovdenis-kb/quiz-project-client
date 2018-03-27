<template>
  <div id="players-results">
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
          borderWidth: 3
        }];
        return cdt;
      }
    },
    created() {
      Bus.bus.$on(globalEvents.showPlayersResults, (players) => {
        this.players = players;
        this.createChart('players-results-chart', this.getChartData());
      });
    }
  }
</script>

<style scoped>
  #players-results {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .chart-container {
    width: 70%;
    height: 70%;
  }
</style>
