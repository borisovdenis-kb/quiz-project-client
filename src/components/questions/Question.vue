<template>
    <div id="quiz-monitor">

      <h1>Раунд {{ question.roundNumber }}</h1>

      <timer v-bind:time-needed-sec="question.timeNeededSec"></timer>

      <div id="image-container">
        <img class="img-style" v-bind:src="question.imageFilePath"/>
      </div>

      <div id="question-text-container">
        <span>{{ question.question }}</span>
      </div>

      <audio id="sound" v-bind:src="question.soundFilePath"></audio>
    </div>
</template>

<script>
    import Timer from "./Timer";
    import Bus from "../../Bus";

    export default {
      components: {Timer},
      name: "question",
      props: ['question'],
      data() {
        return {
          sound: null
        }
      },
      methods: {
        turnOnSound() {
          this.sound.load();
          this.sound.play();
        }
      },
      mounted() {
        this.sound = document.getElementById("sound");
      },
      created() {
        Bus.bus.$on('turn-on-sound', () => {
          this.turnOnSound();
        })
      }
    }
</script>

<style scoped>
  .img-style {
    max-width: 1000px;
    max-height: 800px;
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
    background-color: #f49f66;
    border: 2px solid #d1885a;
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
