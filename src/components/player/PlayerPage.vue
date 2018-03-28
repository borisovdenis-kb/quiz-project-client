<template>
  <div id="player-page">
    <app-header v-bind:is-connected="isConnected"></app-header>

    <div class="container">
      <template v-if="currentQuestion">
        <answer-view v-bind:question="currentQuestion"></answer-view>
      </template>
      <template v-else>
        <div class="quiz-waiting">
          <h2>Игра скоро начнется...</h2>
        </div>

        <div class="text">
          <h4>Пока что придумайте имя для команды</h4>
        </div>

        <div class="player-name">
          <input placeholder="оригАНАЛьное ИWЯ хD" type="text"/>
          <div class="confirm-name-btn">Подтвердить имя</div>
        </div>
      </template>
    </div>

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
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .quiz-waiting {
    flex-grow: 1;
  }
  .text {
    flex-grow: 2;
  }
  .player-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    flex-grow: 1;
  }
  .confirm-name-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 60%;
    height: 30px;
    background-color: #4cdd7f;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }
  input {
    flex-basis: 100%;
    height: 40px;
    padding-left: 5px;
    border: 2px solid #dedede;
    border-radius: 4px;
    font-size: 1.1em;
  }
</style>
