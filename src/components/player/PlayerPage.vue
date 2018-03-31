<template>
  <div id="player-page">
    <app-header v-bind:is-connected="isConnected"></app-header>

    <div class="container">
      <template v-if="currentQuestion">
        <answer-view v-bind:question="currentQuestion" v-bind:player="player"></answer-view>
      </template>
      <template v-else>
        <div class="quiz-waiting">
          <h2>Игра скоро начнется...</h2>
        </div>

        <div class="text">
          <h4>Пока что придумайте имя для команды</h4>
        </div>

        <div class="player-name">
          <template v-if="!isPlayerNameConfirmed">
            <input v-model="playerName" placeholder="оригАНАЛьное ИWЯ хD" type="text" maxlength="25"/>
            <button class="confirm-name-btn" v-on:click="confirmPlayerName">
              Подтвердить имя
            </button>
          </template>
          <template v-else>
            <h4>Название команды: {{ player.name }}</h4>
          </template>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import AnswerView from './AnswerView'
  import AppHeader from '../AppHeader';
  import {REST_API_URL} from '../../Common';

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
        isPlayerNameConfirmed: false,
        playerName: '',
        player: {
          id: null,
          name: '',
          score: null
        }
      }
    },
    methods: {
      subscribeOnGetCurrentQuestion() {
        this.stompClient.subscribe('/app/player/getCurrentQuestion', frame => {
          this.currentQuestion = JSON.parse(frame.body).content;
        });
      },
      sendPlayerCreationMessage() {
        let message = {content: this.player};
        this.stompClient.send('/app/player/new', {}, JSON.stringify(message));
      },
      connectWSServer() {
        this.ws = new SockJS('http://localhost:8080/app');
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect(
          {},
          frame => {
            this.createNewPlayer().then(
              response => {
                this.$set(this.player, 'id', response.data);
                this.sendPlayerCreationMessage();
              },
              error => {
                this.actionOnFailedRequest();
              }
            );
            this.isConnected = true;
            this.subscribeOnGetCurrentQuestion();
          },
          error => {
            console.log(error);
          }
        );
      },
      createNewPlayer() {
        let data = this.player;
        return this.$http.post(`${REST_API_URL}/players`, data);
      },
      confirmPlayerName() {
        let data = this.player;
        return this.$http.put(`${REST_API_URL}/players/${this.player.id}`, data).then(
          response => {
            let message = {content: this.player};

            this.isPlayerNameConfirmed = true;
            this.stompClient.send('/app/player/confirmName', {}, JSON.stringify(message));
          },
          error => {
            this.actionOnFailedRequest();
          }
        );
      },
      actionOnFailedRequest() {
        alert('Ошибко на одном из класстеров распределенной системы =(');
      }
    },
    watch: {
      playerName: function(newValue) {
        let message = {content: this.player};

        this.$set(this.player, 'name', newValue);
        this.stompClient.send('/app/player/updateName', {}, JSON.stringify(message));
      }
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
    width: 80%;
    height: 30px;
    background-color: #4cdd7f;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
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
