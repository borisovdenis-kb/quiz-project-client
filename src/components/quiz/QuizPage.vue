<template>
  <div id="quiz-page" v-bind:class="{ 'time-is-over': isTimeOver }">
    <app-header v-bind:is-connected="isConnected"></app-header>

    <template v-if="isBlockVisible('quiz')">
      <question
        v-bind:stomp-client="stompClient"
        v-bind:questions="questions">
      </question>
    </template>
    <template v-else-if="isBlockVisible('quiz-waiting')">
      <h2>Игра скоро начнется...</h2>
      <div class="connected-players-container">
        <div class="player-preview"
             v-bind:class="{'player-name-confirmed': player.isNameConfirmed}"
             v-for="(player, id) in connectedPlayers">
          @ {{ player.name }}
        </div>
      </div>
    </template>

    <players-results v-show="isBlockVisible('players-results')"></players-results>
  </div>
</template>

<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import AppHeader from "../AppHeader";
  import Question from "./Question";
  import Bus from "../../Bus";
  import {globalEvents, commands} from "../../Common";
  import PlayersResults from "../player/PlayersResults";

  export default {
    components: {
      PlayersResults,
      Question,
      AppHeader
    },
    name: "quiz-page",
    data() {
      return {
        questions: [],
        isConnected: false,
        isTimeOver: false,
        isPlayersResultsVisible: false,
        connectedPlayers: {},
        mapCommandToEvent: {
          'LOAD': globalEvents.loadQuestions,
          'NEXT': globalEvents.nextQuestion,
          'PREV': globalEvents.prevQuestion,
          'SHOW_ANSWER': globalEvents.showAnswer,
          'SHOW_PLAYERS_ANSWERS': globalEvents.showPlayersAnswers,
          'SHOW_PLAYERS_RESULTS': globalEvents.showPlayersResults,
          'CALC_PLAYERS_RESULTS': globalEvents.calcPlayersResults,
          'START': globalEvents.activateTimer,
          'PLAY_SOUND': globalEvents.playSound,
          'PAUSE_SOUND': globalEvents.pauseSound,
          'CHANGE_VOLUME': globalEvents.changeVolume
        }
      };
    },
    methods: {
      subscribeOnPlayerCreation() {
        this.stompClient.subscribe('/app/quiz/newPlayer', frame => {
          let player = JSON.parse(frame.body).content;
          let extendedPlayer = {
            id: player.id,
            name: player.name,
            score: player.score,
            isNameConfirmed: false
          };

          this.$set(this.connectedPlayers, extendedPlayer.id, extendedPlayer);
        });
      },
      subscribeOnPlayerNameUpdating() {
        this.stompClient.subscribe('/app/quiz/playerUpdateName', frame => {
          let updatedPlayer = JSON.parse(frame.body).content;
          let player = this.connectedPlayers[updatedPlayer.id];

          this.$set(player, 'name', updatedPlayer.name);
        });
      },
      subscribeOnPlayerNameConfirmation() {
        this.stompClient.subscribe('/app/quiz/playerConfirmName', frame => {
          let updatedPlayer = JSON.parse(frame.body).content;
          let player = this.connectedPlayers[updatedPlayer.id];

          this.$set(player, 'isNameConfirmed', true);
        });
      },
      subscribeOnGetCurrentQuestion() {
        this.stompClient.subscribe('/app/client/getCommand', frame => {
          let message = JSON.parse(frame.body);

          this.emitEventOnCommand(message.command.name, message);
        });
      },
      connectWSServer() {
        this.ws = new SockJS("http://localhost:8080/app");
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect(
          {},
          frame => {
            this.isConnected = true;
            this.subscribeOnGetCurrentQuestion();
            this.subscribeOnPlayerCreation();
            this.subscribeOnPlayerNameUpdating();
            this.subscribeOnPlayerNameConfirmation();
          },
          error => {
            console.log(error);
          }
        );
      },
      emitEventOnCommand(command, data) {
        Bus.bus.$emit(this.mapCommandToEvent[command], data);
      },
      changePlayersResultsVisibility() {
        this.isPlayersResultsVisible = !this.isPlayersResultsVisible;
      },
      isBlockVisible(blockName) {
        switch (blockName) {
          case 'quiz':
            return (this.questions.length > 0) && !this.isPlayersResultsVisible;
          case 'quiz-waiting':
            return (this.questions.length === 0) && !this.isPlayersResultsVisible;
          case 'players-results':
            return this.isPlayersResultsVisible;
        }
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
      Bus.bus.$on(globalEvents.loadQuestions, message => {
        if (!this.isQuestionsLoaded) {
          this.questions = message.content;
        }
      });

      Bus.bus.$on(globalEvents.showPlayersResults, () => {
        this.changePlayersResultsVisibility();
      });

      Bus.bus.$on(globalEvents.timeIsOver, isTimeOver => {
        this.isTimeOver = isTimeOver;
      });
    }
  };
</script>

<style scoped>
  #quiz-page {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .connected-players-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 200px;
    width: 40%;
    height: 50px;
  }

  .player-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    min-height: 35px;
    margin-left: 20px;
    margin-bottom: 30px;
    padding: 0px 15px 0px 15px;
    background-color: #fdfdfd;
    border: 2px dashed #e2e2e2;
    border-radius: 20px;
    font-size: 1.3em;
  }

  .player-name-confirmed {
    background-color: #56d394;
    border: 2px solid #53c387;
  }

  .time-is-over {
    background-color: #c74642;
  }
</style>
