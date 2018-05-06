<template>
    <div id="timer">
      <h3>Время: {{ timeSec }}</h3>
    </div>
</template>

<script>
    import Bus from '../../Bus';
    import {globalEvents} from "../../Common";

    export default {
      name: "timer",
      props: ['timeNeededSec'],
      data() {
        return {
          timeSec: 0
        }
      },
      methods: {
        countDownTime() {
          let intervalId = setInterval(() => {
            this.timeSec--;
            if (this.timeSec <= 0) {
              clearInterval(intervalId);
              Bus.bus.$emit(globalEvents.timeIsOver, true);
            }
          }, 1000);
        },
        getTime() {
          return this.timeSec;
        }
      },
      watch: {
        timeNeededSec: function (newTimeNeededSec) {
          this.timeSec = newTimeNeededSec;
          Bus.bus.$emit(globalEvents.timeIsOver, false);
        }
      },
      created() {
        this.timeSec = this.timeNeededSec;

        Bus.bus.$on(globalEvents.activateTimer, () => {
          this.countDownTime();
        });
      }
    }
</script>

<style scoped>

</style>
