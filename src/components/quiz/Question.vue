<template>
    <div id="quiz-monitor">
      <div class="quiz-monitor-container">
        <div id="round-container">
          Раунд: <div id="round-name">{{ currentQuestion.roundName }}</div>
        </div>

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
            <div class="question-wrap" v-bind:class="{ 'opacity' : isAnswerVisible }">
              <span class="question-text">{{ currentQuestion.question }}</span>
            </div>
            <div class="answer-wrap" v-if="isAnswerVisible">
              <span>{{ currentQuestion.rightAnswer }}</span>
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
          currentQuestionIndex: -1,
          roundIndex: 0,
          isTimeOver: false,
          isAnswerVisible: false
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
        },
        changeAnswerVisibility() {
          this.isAnswerVisible = !this.isAnswerVisible;
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
          this.isAnswerVisible = false;
          this.nextQuestion();
        });

        Bus.bus.$on(globalEvents.prevQuestion, () => {
          this.isAnswerVisible = false;
          this.prevQuestion();
        });

        Bus.bus.$on(globalEvents.showAnswer, () => {
          this.changeAnswerVisibility(true);
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
  }
  .img-style {
    flex-grow: 1;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: 5px solid #efefef;

  }
  #round-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 1.5em;
  }
  #round-name {
    padding: 5px;
    margin-left: 10px;
    background-color: #e6e6e6;
    border-radius: 4px;
  }
  #image-container {
    display: flex;
    flex-grow: 5;
    justify-content: center;
    background: black;
  }
  #question-text-container {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 50px;
    font-size: 2.5em;
    text-align: center;
  }
  .question-wrap {
    flex-grow: 1;
    background-color: #f49f66;
    border: 2px solid #d1885a;
    border-radius: 6px;
  }
  .answer-wrap {
    margin-top: 10px;
    background-color: #73aff4;
    border: 2px solid #5b7fb6;
    border-radius: 6px;
  }
  .opacity {
    opacity: 0.2;
  }
  #quiz-monitor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
</style>
