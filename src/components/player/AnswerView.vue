<template>
    <div id="answer-view">
      <p>{{ question.question }}</p>
      <p>Ответ:</p>
      <input type="text" v-model="answer"/>
    </div>
</template>

<script>
  export default {
    name: "answer-view",
    props: ['question'],
    data() {
      return {
        answer: ""
      }
    }
  }
</script>

<style scoped>

</style>
