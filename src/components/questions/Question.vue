<template>
    <div id="quiz-monitor">

      <h1>Раунд {{ question.roundNumber }}</h1>

      <div id="image-container" class="shadow">
        <img class="img-style" v-bind:src="question.imageFilePath"/>
      </div>

      <div id="question-text-container" class="shadow">
        <span>{{ question.question }}</span>
      </div>

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
        },
        computed: {
          imgPath: function () {
            return '../../' + question.imageFilePath;
          }
        }
    }
</script>

<style scoped>
  .img-style {
    max-width: 1000px;
    max-height: 800px;
  }
  .shadow {
    -webkit-box-shadow: 4px 4px 9px 0px rgba(50, 50, 50, 0.55);
    -moz-box-shadow: 4px 4px 9px 0px rgba(50, 50, 50, 0.55);
    box-shadow: 4px 4px 9px 0px rgba(50, 50, 50, 0.55);
  }
  #image-container {
    width: 70%;
    border: 2px solid #efefef;
    border-radius: 6px
  }
  #question-text-container {
    margin-top: 20px;
    width: 70%;
    font-size: 2.5em;
    background-color: #6898f4;
    border: 2px solid #efefef;
    border-radius: 6px
  }
  #quiz-monitor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
</style>
