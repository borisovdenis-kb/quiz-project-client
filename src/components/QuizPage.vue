<template>
    <div>
      <app-header v-bind:is-connected="isConnected"></app-header>

      <template v-if="questionList.length > 0">
        <question  v-bind:question="currentQuestion"></question>
      </template>
      <template v-else>
        <h2>Игра скоро начнется...</h2>
      </template>

    </div>
</template>

<script>
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';
    import AppHeader from "./AppHeader";
    import Question from "./questions/Question";

    export default {
      components: {
        Question,
        AppHeader
      },
      name: "quiz-page",
      data() {
        return {
          commands: {
            load: 'LOAD',
            next: 'NEXT',
            prev: 'PREV'
          },
          isConnected: false,
          questionList: [],
          currentQuestionIndex: 0
        };
      },
      methods: {
        subscribeOnCommand() {
          this.stompClient.subscribe("/app/client/getCommand", frame => {
            let message = JSON.parse(frame.body);
            let command = message.command;
            if (command === this.commands.load) {
              if (this.questionList.length === 0) {
                this.questionList = JSON.parse(frame.body).content;
              }
            } else if (command === this.commands.next || command === this.commands.prev) {
              this.changeIndex(message.command);
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
          if (command === this.commands.next && this.currentQuestionIndex < this.questionList.length - 1) {
            this.currentQuestionIndex++;
          } else if (command === this.commands.prev && this.currentQuestionIndex > 0) {
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
      }
    };
</script>

<style scoped>

</style>
