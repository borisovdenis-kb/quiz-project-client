<template>
    <div id="quiz-page" v-bind:class="{ 'time-is-over': isTimeOver }">
      <app-header v-bind:is-connected="isConnected"></app-header>

      <template v-if="questionList.length > 0">
        <question v-bind:question="currentQuestion"></question>
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
          isConnected: false,
          questionList: [],
          currentQuestionIndex: -1,
          isTimeOver: false,
        };
      },
      methods: {
        subscribeOnCommand() {
          this.stompClient.subscribe("/app/client/getCommand", frame => {
            let message = JSON.parse(frame.body);
            let commandName = message.command.name;

            if (commandName === commands.LOAD) {
              if (this.questionList.length === 0) {
                this.currentQuestionIndex = 0;
                this.questionList = JSON.parse(frame.body).questionList; // TODO: refactor parse 2 times
              }
            } else if (commandName === commands.NEXT || commandName === commands.PREV) {
              this.changeIndex(commandName);
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
              this.subscribeOnCommand();
            },
            error => {
              console.log(error);
            }
          );
        },
        changeIndex(commandName) {
          if (commandName === commands.NEXT && this.currentQuestionIndex < this.questionList.length - 1) {
            this.currentQuestionIndex++;
          } else if (commandName === commands.PREV && this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
          }
        }
      },
      watch: {
        currentQuestionIndex: function (newQuestionIndex, oldQuestionIndex) {
          this.stompClient.send(
            "/app/quiz/getCurrentQuestion",
            {},
            JSON.stringify({questionList: [this.currentQuestion]})
          );
        }
      },
      computed: {
        currentQuestion: function () {
          return this.questionList[this.currentQuestionIndex];
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
