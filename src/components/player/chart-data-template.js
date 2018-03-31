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
        borderWidth: 2
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
          fontSize: 30
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true,
          fontSize: 20
        }
      }]
    }
  }
};

export default chartDataTemplate;
