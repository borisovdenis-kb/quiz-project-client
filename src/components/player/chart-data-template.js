export const chartDataTemplate = {
  type: 'horizontalBar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Результаты',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 3
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 25,
          fontSize: 30
        }
      }],
      xAxes: [{
        ticks: {
          fontSize: 20
        }
      }]
    }
  }
};

export default chartDataTemplate;
