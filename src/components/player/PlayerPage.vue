<template>
  <div id="player-page">
    <app-header v-bind:is-connected="isConnected"></app-header>
    <!--<component v-bind:is="currentAnswerView" v-if="currentQuestion">-->
    <!--</component>-->
    <template v-if="currentQuestion">
      <answer-view v-bind:question="currentQuestion"></answer-view>
    </template>
    <template v-else>
      <h2>Игра скоро начнется...</h2>
    </template>
  </div>
</template>

<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import AnswerView from './AnswerView'
  import AppHeader from "../AppHeader";

  export default {
    name: "player-page",
    components: {
      AnswerView,
      AppHeader
    },
    data() {
      return {
        currentQuestion: null,
        isConnected: false,
        // currentAnswerView: AnswerView,
      }
    },
    methods: {
      subscribeOnCommand() {
        this.stompClient.subscribe("/app/player/getCurrentQuestion", frame => {
          let questionList = JSON.parse(frame.body).questionList;
          if (questionList.length > 0) {
            this.currentQuestion = questionList[0];
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
    },
    mounted() {
      this.connectWSServer();
    }
  }
</script>

<style scoped>

</style>
