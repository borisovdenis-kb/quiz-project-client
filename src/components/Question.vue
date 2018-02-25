<template>
    <div id="quiz">
      <span>Question: {{ question.question }}</span>
      <span>Round: {{ question.roundNumber }}</span>
      <span>Time: {{ question.timeNeeded }}</span>
    </div>
</template>

<script>
    export default {
        name: "question",
        props: ['question'],
        data() {
          return {
          }
        }
    }
</script>

<style scoped>
  #quiz {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
</style>
