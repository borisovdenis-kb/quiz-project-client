<template>
  <div id="quiz-page" v-bind:class="{ 'time-is-over': isTimeOver }">
    <app-header v-bind:is-connected="isConnected"></app-header>

    <template v-if="isQuestionsLoaded">
      <question
        v-bind:stomp-client="stompClient"
        v-bind:questions="questions">
      </question>
    </template>
    <template v-else>
      <h2>Игра скоро начнется...</h2>
    </template>
  </div>
</template>

<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import AppHeader from "../AppHeader";
  import Question from "./Question";
  import Bus from "../../Bus";
  import {commands} from "../../Common";
  import {globalEvents} from "../../Common";

  export default {
    components: {
      Question,
      AppHeader
    },
    name: "quiz-page",
    data() {
      return {
        questions: [],
        isConnected: false,
        isTimeOver: false
      };
    },
    methods: {
      subscribeOnGetCurrentQuestion() {
        this.stompClient.subscribe("/app/client/getCommand", frame => {
          let message = JSON.parse(frame.body);
          let commandName = message.command.name;

          if (commandName === commands.LOAD) {
            if (!this.isQuestionsLoaded) {
              this.questions = message.content;
            }
          } else if (commandName === commands.NEXT) {
            Bus.bus.$emit(globalEvents.nextQuestion);
          } else if (commandName === commands.PREV) {
            Bus.bus.$emit(globalEvents.prevQuestion);
          } else if (commandName === commands.SHOW_ANSWER) {
            Bus.bus.$emit(globalEvents.showAnswer);
          } else if (commandName === commands.SHOW_PLAYERS_ANSWERS) {
            Bus.bus.$emit(globalEvents.showPlayersAnswers, message.content);
          } else if (commandName === commands.CALC_PLAYERS_SCORE) {
            console.log(message.content);
          } else if (commandName === commands.START) {
            Bus.bus.$emit(globalEvents.activateTimer);
          } else if (commandName === commands.PLAY_SOUND) {
            Bus.bus.$emit(globalEvents.playSound, message.command.metaInfo.target);
          } else if (commandName === commands.PAUSE_SOUND) {
            Bus.bus.$emit(globalEvents.pauseSound, message.command.metaInfo.target);
          } else if (commandName === commands.CHANGE_VOLUME) {
            Bus.bus.$emit(globalEvents.changeVolume, message.command.metaInfo);
          }
        });
      },
      connectWSServer() {
        this.ws = new SockJS("http://localhost:8080/app");
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect(
          {},
          frame => {
            console.log(frame);
            this.isConnected = true;
            this.subscribeOnGetCurrentQuestion();
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    computed: {
      isQuestionsLoaded: function () {
        return this.questions.length > 0;
      }
    },
    mounted() {
      this.connectWSServer();
    },
    created() {
      Bus.bus.$on(globalEvents.timeIsOver, (isTimeOver) => {
        this.isTimeOver = isTimeOver;
      })
    }
  };
</script>

<style scoped>
  #quiz-page {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .time-is-over {
    background-color: #c74642;
  }
</style>
