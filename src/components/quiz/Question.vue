<template>
  <div id="quiz-monitor">
    <div class="quiz-monitor-container">


      <div id="top-container">
        <div class="top-container-col top-container-col--first">

        </div>

        <div class="top-container-col top-container-col--middle">
          <div id="round-container">
            Раунд:
            <div class="badge">{{ currentQuestion.roundName }}</div>
          </div>
        </div>

        <div class="top-container-col top-container-col--last">
          <div id="timer-container">
            <timer v-bind:time-needed-sec="currentQuestion.timeNeededSec"></timer>
          </div>
        </div>
      </div>

      <div id="stepper-container">
        <stepper
          v-bind:current-step-index="currentQuestionIndex"
          v-bind:steps-amount="roundLength">
        </stepper>
      </div>

      <template v-if="!isTimeOver">
        <div id="image-container">
          <div class="img-style"
               v-bind:style="{ 'background-image': 'url(' + currentQuestion.imageFilePath + ')' }">
          </div>
        </div>

        <div id="question-text-container">
          <div class="question-wrap" v-bind:class="{ 'opacity' : isAnswerVisible || isPlayersAnswersVisible }">
            <span class="question-text">{{ currentQuestion.question }}</span>
          </div>

          <div class="answer-wrap" v-if="isAnswerVisible" v-bind:class="{ 'opacity' : isPlayersAnswersVisible }">
            <span>{{ currentQuestion.rightAnswer }}</span>
          </div>

          <div id="players-answers-container" v-if="isPlayersAnswersVisible">
            <div class="player-answer" v-for="(answer, playerName) in playersAnswers">
              {{ playerName }}:
              <div class="badge" v-bind:class="playerAnswerExtraStyles(answer)">
                {{ answer.answer }}
              </div>
            </div>
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
  import {globalEvents, soundTargetNames, answerStatuses} from "../../Common";
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
        playersAnswers: {},
        currentQuestionIndex: -1,
        roundIndex: 0,
        isTimeOver: false,
        isAnswerVisible: false,
        isPlayersAnswersVisible: false
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
      },
      changePlayersAnswersVisibility() {
        this.isPlayersAnswersVisible = !this.isPlayersAnswersVisible;
      },
      playerAnswerExtraStyles(answer) {
        return {
          'player-answer-right': answer.status === answerStatuses.right,
          'player-answer-wrong': answer.status === answerStatuses.wrong
        }
      },
      resetAllFlags() {
        this.isTimeOver = false;
        this.isAnswerVisible = false;
        this.isPlayersAnswersVisible = false;
      }
    },
    watch: {
      currentQuestionIndex: function () {
        this.stompClient.send(
          "/app/quiz/getCurrentQuestion",
          {},
          JSON.stringify({content: this.currentQuestion})
        );
      }
    },
    computed: {
      currentQuestion: function () {
        return this.questions[this.roundIndex][this.currentQuestionIndex];
      },
      roundLength: function () {
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
        this.resetAllFlags();
        this.nextQuestion();
      });

      Bus.bus.$on(globalEvents.prevQuestion, () => {
        this.resetAllFlags();
        this.prevQuestion();
      });

      Bus.bus.$on(globalEvents.showAnswer, () => {
        this.changeAnswerVisibility();
      });

      Bus.bus.$on(globalEvents.showPlayersAnswers, (playersAnswers) => {
        this.playersAnswers = playersAnswers;
        this.changePlayersAnswersVisibility();
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

  #top-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  #round-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.5em;
  }

  .badge {
    padding: 5px;
    margin-left: 10px;
    background-color: #e6e6e6;
    border-radius: 4px;
  }

  #timer-container {
  }

  #stepper-container {
    margin-top: 20px;
    margin-bottom: 20px;
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

  .top-container-col {
    display: flex;
  }

  .top-container-col--first {
    flex: 0 0 150px;
  }

  .top-container-col--middle {
    justify-content: center;
    flex-grow: 1;
  }

  .top-container-col--last {
    flex: 0 0 150px;
    justify-content: flex-end;
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

  #players-answers-container {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }

  .player-answer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    font-size: 0.6em;
  }

  .player-answer-right {
    background-color: rgba(75, 218, 134, 0.74);
  }

  .player-answer-wrong {
    background-color: rgba(218, 99, 96, 0.75);
  }

  .opacity {
    opacity: 0.3;
  }

  #quiz-monitor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
</style>
