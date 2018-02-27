<template>
    <div>
      <h3>Время: {{ timeSec }}</h3>
    </div>
</template>

<script>
    import Bus from '../../Bus';

    export default {
      name: "timer",
      props: ['timeNeededSec'],
      data() {
        return {
          timeSec: 0
        }
      },
      methods: {
        countDownTime: function () {
          let intervalId = setInterval(() => {
            this.timeSec--;
            if (this.timeSec <= 0) {
              clearInterval(intervalId);
            }
          }, 1000);
        }
      },
      watch: {
        timeNeededSec: function (newTimeNeededSec, oldTimeNeededSec) {
          this.timeSec = newTimeNeededSec;
        }
      },
      created() {
        this.timeSec = this.timeNeededSec;

        Bus.bus.$on('activate-timer', () => {
          this.countDownTime();
        });
      }
    }
</script>

<style scoped>

</style>
