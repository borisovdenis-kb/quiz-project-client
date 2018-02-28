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
          currentQuestionIndex: 0,
          isTimeOver: false,
        };
      },
      methods: {
        subscribeOnCommand() {
          this.stompClient.subscribe("/app/client/getCommand", frame => {
            let message = JSON.parse(frame.body);
            let command = message.command;

            if (command === commands.LOAD) {
              if (this.questionList.length === 0) {
                this.questionList = JSON.parse(frame.body).content;
              }
            } else if (command === commands.NEXT || command === commands.PREV) {
              this.changeIndex(message.command);
            } else if (command === commands.START) {
              Bus.bus.$emit('activate-timer');
            } else if (command === commands.TURN_SOUND) {
              Bus.bus.$emit('turn-on-sound');
            } else if (command === commands.TURN_FUNNY_STUFF) {
              Bus.bus.$emit('turn-on-funny-staff');
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
        changeIndex(command) {
          if (command === commands.NEXT && this.currentQuestionIndex < this.questionList.length - 1) {
            this.currentQuestionIndex++;
          } else if (command === commands.PREV && this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
          }
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
        Bus.bus.$on('time-is-over', (isTimeOver) => {
          this.isTimeOver = isTimeOver;
        })
      }
    };
</script>

<style scoped>
  #quiz-page {
    width: 100%;
    height: 100%;
  }
  .time-is-over {
    background-color: #c74642;
  }
</style>
