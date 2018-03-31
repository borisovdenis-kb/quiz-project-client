<template>
  <div id="question-answer-input">
    <input v-model="answer" placeholder="Введите ответ. Только без глупостей."/>
  </div>
</template>

<script>
  export default {
    name: "question-answer-input",
    data() {
      return {
        answer: null
      }
    },
    methods: {
      getAnswer() {
        return this.answer;
      },
      clearAnswer() {
        this.answer = null;
      }
    }
  }
</script>

<style scoped>
  #question-answer-input {
    width: 100%;
  }
  input {
    flex-basis: 100%;
    height: 40px;
    padding-left: 5px;
    border: 2px solid #dedede;
    border-radius: 4px;
    font-size: 1.1em;
  }
</style>
