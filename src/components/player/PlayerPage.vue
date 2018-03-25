<template>
  <div id="player-page">
    <app-header v-bind:is-connected="isConnected"></app-header>

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
        isConnected: false
      }
    },
    methods: {
      subscribeOnGetCurrentQuestion() {
        this.stompClient.subscribe("/app/player/getCurrentQuestion", frame => {
          this.currentQuestion = JSON.parse(frame.body).content;
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
      },
    },
    mounted() {
      this.connectWSServer();
    }
  }
</script>

<style scoped>
  #player-page {
    height: 100%;
  }
</style>
