<template>
    <div>
      <h3>Время: {{ timeSec }}</h3>
    </div>
</template>

<script>
    export default {
        name: "timer",
        props: ['timeNeededSec', 'isTimerActive'],
        data() {
          return {
            timeSec: 0
          }
        },
        methods: {
          countDownTime: function() {
            let self = this;
            setInterval(function() {
              if (self.timeSec > 0 ) {
                self.timeSec--;
              }
            }, 1000);
          }
        },
      watch: {
        isTimerActive: function (newIsActive, oldIsActive) {
          console.log("asdfd");
          if (newIsActive) {
            this.countDownTime();
          }
        }
      },
      computed: {
          timer: function () {
            return this.timeNeededSec;
          }
      },
      mounted() {
          this.timeSec = this.timeNeededSec;
      }
    }
</script>

<style scoped>

</style>
