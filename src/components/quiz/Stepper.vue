<template>
    <div id="stepper">
      <div id="steps-container">
        <div v-for="i in stepsAmount">
          <div class="step-block" v-bind:class="{ 'step-passed': isStepPassed(i - 1) }">

            <template v-if="i === 1">
              <div class="step-block-left-square"></div>
            </template>
            <template v-else>
              <div class="step-block-left-arrow"></div>
            </template>

            <div class="step-block-middle">{{ i }}</div>

            <div class="step-block-right"
                 v-bind:class="{ 'step-right-passed-border': isStepPassed(i - 1), 'step-right-not-passed-border': !isStepPassed(i - 1) }">
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'stepper',
    props: ['stepsAmount', 'currentStepIndex'],
    data() {
      return {
        visited: [this.currentStepIndex]
      }
    },
    methods: {
      isStepPassed(stepIndex) {
        return stepIndex <= this.currentStepIndex;
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
  #steps-container {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
  }
  .step-block {
    display: flex;
    flex-direction: row;
    background-color: #cecece;
  }
  .step-block-left-arrow {
    width: 0;
    height: 0;
    background-color: inherit;
    border-left: 20px solid #ffffff;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
  .step-block-left-square {
    width: 13px;
    height: 100%;
    background-color: inherit;
  }
  .step-block-middle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 30px;
    background-color: inherit;
  }
  .step-block-right {
    width: 0;
    height: 0;
    background-color: #ffffff;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
  .step-right-passed-border {
    border-left: 20px solid #33cb64;
  }
  .step-right-not-passed-border {
    border-left: 20px solid #cecece;
  }
  .step-passed {
    background-color: #33cb64;
  }
</style>
