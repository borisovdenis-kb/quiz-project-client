<template>
    <div id="quiz-monitor">

      <h1>Раунд {{ question.roundNumber }}</h1>

      <timer v-bind:time-needed-sec="question.timeNeededSec"></timer>

      <template v-if="!isTimeOver">
        <div id="image-container">
          <img class="img-style" v-bind:src="question.imageFilePath"/>
        </div>

        <div id="question-text-container">
          <span>{{ question.question }}</span>
        </div>
      </template>
      <template v-else>
        <h1>Время истекло.</h1>
      </template>

      <audio id="sound" v-bind:src="question.soundFilePath"></audio>
      <audio id="funny-staff" v-bind:src="question.funnyStuffFilePath"></audio>
    </div>
</template>

<script>
    import Timer from "./Timer";
    import Bus from "../../Bus";
    import {globalEvents} from "../../Common";

    export default {
      components: {Timer},
      name: "question",
      props: ['question'],
      data() {
        return {
          sound: null,
          funnyStaff: null,
          isTimeOver: false
        }
      },
      methods: {
        playAudio(element) {
          // element.load();
          element.play();
        },
        pauseAudio(element) {
          element.pause();
        }
      },
      mounted() {
        this.sound = document.getElementById("sound");
        this.funnyStaff = document.getElementById("funny-staff");
      },
      created() {
        Bus.bus.$on(globalEvents.playSound, (target) => {
          if (target === 'sound') {
            this.playAudio(this.sound);
          } else if (target === 'funnyStuff') {
            this.playAudio(this.funnyStaff);
          }
        });

        Bus.bus.$on(globalEvents.pauseSound, (target) => {
          if (target === 'sound') {
            this.pauseAudio(this.sound);
          } else if (target === 'funnyStuff') {
            this.pauseAudio(this.funnyStaff);
          }
        });

        Bus.bus.$on(globalEvents.timeIsOver, (isTimeOver) => {
          this.isTimeOver = isTimeOver;
        });
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
    margin-top: 10px;
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
  }
</style>
