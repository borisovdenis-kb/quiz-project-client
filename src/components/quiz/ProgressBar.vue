<template>
    <div id="progress-bar">
      <div v-for="i in stepsAmount">
        <div class="step" v-bind:class="{ 'step-passed': i <= currentStepIndex + 1 }">{{ i }}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'progress-bar',
    props: ['stepsAmount', 'currentStepIndex'],
    data() {
      return {
        visited: [this.currentStepIndex]
      }
    },
    watch: {
      currentStepIndex: function (newValue) {
        if (newValue !== 0 && this.visited.indexOf(newValue) === -1) {
          this.visited.push(newValue);
        } else {
          this.visited = [newValue];
        }
      }
    }
  }
</script>

<style scoped>
  #progress-bar {
    display: flex;
    flex-direction: row;
  }
  .step {
    width: 40px;
    height: 20px;
    margin-left: 5px;
    background-color: #bababa;
  }
  .step-passed {
    background-color: #5c8bff;
  }
</style>
