<template>
  <div id="truth-or-lie-input">

    <div class="variant-item truth"
         v-bind:class="{ 'selected': answer === true}"
         v-on:click="setAnswer(true)">
      ПРАВДА
    </div>
    <div class="variant-item lie"
         v-bind:class="{ 'selected': answer === false}"
         v-on:click="setAnswer(false)">
      ЛОЖЬ
    </div>

  </div>
</template>

<script>
  export default {
    name: "truth-or-lie-input",
    data() {
      return {
        answer: null
      }
    },
    methods: {
      setAnswer(bool) {
        this.answer = bool;
      },
      getAnswer() {
        return this.answer;
      }
    }
  }
</script>

<style scoped>
  #truth-or-lie-input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-radius: 6px;
  }
  .variant-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    flex-basis: 49%;
    border-radius: 6px;
    cursor: pointer;
    opacity: 0.4;
  }
  .truth {
    background-color: rgb(75, 218, 134);
  }
  .lie {
    background-color: rgb(255, 106, 109);
  }
  .selected {
    opacity: 1;
  }
</style>
