<template>
    <div id="quiz-monitor">
      <div class="quiz-monitor-container">
        <h1>Раунд {{ currentQuestion.roundNumber }}</h1>

        <stepper
          v-bind:current-step-index="currentQuestionIndex"
          v-bind:steps-amount="roundLength">
        </stepper>

        <timer v-bind:time-needed-sec="currentQuestion.timeNeededSec"></timer>

        <template v-if="!isTimeOver">
          <div id="image-container">
            <div class="img-style"
                 v-bind:style="{ 'background-image': 'url(' + currentQuestion.imageFilePath + ')' }" >
            </div>
          </div>

          <div id="question-text-container">
            <div class="question-wrap">
              <span class="question-text">{{ currentQuestion.question }}</span>
            </div>
          </div>
        </template>
        <template v-else>
          <h1>Время истекло.</h1>
        </template>

        <audio id="sound" v-bind:src="currentQuestion.soundFilePath"></audio>
        <audio id="funny-staff" v-bind:src="currentQuestion.funnyStuffFilePath"></audio>
      </div>
    </div>
</template>

<script>
    import Timer from "./Timer";
    import Bus from "../../Bus";
    import {globalEvents, soundTargetNames} from "../../Common";
    import Stepper from "./Stepper";

    export default {
      name: "question",
      props: ['stompClient', 'questions'],
      components: {
        Stepper,
        Timer
      },
      data() {
        return {
          sound: null,
          funnyStaff: null,
          isTimeOver: false,
          currentQuestionIndex: -1,
          roundIndex: 0
        }
      },
      methods: {
        playAudio(audioElement) {
          audioElement.play();
        },
        pauseAudio(audioElement) {
          audioElement.pause();
        },
        changeVolume(audioElement, newVolume) {
          audioElement.volume = newVolume;
        },
        nextQuestion() {
          if (this.currentQuestionIndex < this.questions[this.roundIndex].length - 1) {
            this.currentQuestionIndex++;
          } else {
            if (this.roundIndex < this.questions.length - 1) {
              this.roundIndex++;
              this.currentQuestionIndex = 0;
            }
          }
        },
        prevQuestion() {
          if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
          } else {
            if (this.roundIndex > 0) {
              this.roundIndex--;
              this.currentQuestionIndex = this.questions[this.roundIndex].length - 1
            }
          }
        }
      },
      watch: {
        currentQuestionIndex: function () {
          this.stompClient.send(
            "/app/quiz/getCurrentQuestion",
            {},
            JSON.stringify({question: this.currentQuestion})
          );
        }
      },
      computed: {
        currentQuestion: function () {
          return this.questions[this.roundIndex][this.currentQuestionIndex];
        },
        roundLength: function() {
          return this.questions[this.roundIndex].length;
        }
      },
      mounted() {
        this.sound = document.getElementById("sound");
        this.funnyStaff = document.getElementById("funny-staff");
      },
      created() {
        this.nextQuestion();

        Bus.bus.$on(globalEvents.nextQuestion, () => {
          this.nextQuestion();
        });

        Bus.bus.$on(globalEvents.prevQuestion, () => {
          this.prevQuestion();
        });

        Bus.bus.$on(globalEvents.playSound, (target) => {
          if (target === soundTargetNames.sound) {
            this.playAudio(this.sound);
            console.log(this.sound);
          } else if (target === soundTargetNames.funnyStaff) {
            this.playAudio(this.funnyStaff);
            console.log(this.funnyStaff);
          }
        });

        Bus.bus.$on(globalEvents.pauseSound, (target) => {
          if (target === soundTargetNames.sound) {
            this.pauseAudio(this.sound);
          } else if (target === soundTargetNames.funnyStaff) {
            this.pauseAudio(this.funnyStaff);
          }
        });

        Bus.bus.$on(globalEvents.changeVolume, (metaInfo) => {
          if (metaInfo.target === soundTargetNames.sound) {
            this.changeVolume(this.sound, metaInfo.volume);
          } else if (target === soundTargetNames.funnyStaff) {
            this.changeVolume(this.funnyStaff, metaInfo.volume);
          }
        });

        Bus.bus.$on(globalEvents.timeIsOver, (isTimeOver) => {
          this.isTimeOver = isTimeOver;
        });
      }
    }
</script>

<style scoped>
  .row {
    flex-basis: 100%;
  }
  .quiz-monitor-container {
    flex-grow: 1;
    display: flex;
    flex-flow: column;
    width: 90%;
    margin: 0 20px 0 20px;
    padding: 0 20px 0 20px;
    border-radius: 6px;
    overflow: hidden;
    /*background: #3d002d;*/
  }
  .img-style {
    flex-grow: 1;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: 5px solid #efefef;

  }
  #image-container {
    background: black;
    display: flex;
    flex-grow: 5;
    justify-content: center;

  }
  #question-text-container {
    width: 100%;
    margin-top: 10px;
    font-size: 2.5em;
    text-align: center;
  }
  .question-wrap {
    flex-grow: 1;
    margin-bottom: 75px;
    background-color: #f49f66;
    border: 2px solid #d1885a;
    border-radius: 6px;
  }
  .question-text {
  }
  #quiz-monitor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
</style>
