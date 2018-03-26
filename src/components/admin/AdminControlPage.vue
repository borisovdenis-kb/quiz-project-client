<template>
  <div class="page-container">
    <app-header v-bind:is-connected="isConnected"></app-header>

    <div id="flex-wrapper">
      <h2>{{ pageTitle }}</h2>

      <div id="control-board">
        <div class="flex-row">
          <button class="btn-style" v-on:click="sendCommand(commands.LOAD)">Load Quiz</button>
        </div>
        <div class="flex-row">
          <button class="btn-style" v-on:click="sendCommand(commands.START)">Start</button>
        </div>
        <div class="flex-row">
          <button class="btn-style" v-on:click="sendCommand(commands.SHOW_ANSWER)">Show Answer</button>
        </div>
        <div class="flex-row">
          <button class="btn-style" v-on:click="sendCommand(commands.SHOW_PLAYERS_ANSWERS, null, currentQuestion)">Show Player's Answers</button>
        </div>
        <div class="flex-row">
          <button class="btn-style" v-on:click="sendCommand(commands.CALC_PLAYERS_SCORE)">Calc Players Score</button>
        </div>
        <div class="flex-row">
          <button class="btn-style" v-on:click="sendCommand(commands.PREV)">← Prev</button>
          <button class="btn-style" v-on:click="sendCommand(commands.NEXT)">Next →</button>
        </div>
        <div class="flex-row">
          <audio-controller
            label="Sound"
            v-bind:target-name="targetNames.sound"
            v-bind:stomp-client="stompClient">
          </audio-controller>
        </div>
        <div class="flex-row">
          <audio-controller
            label="Prekol"
            v-bind:target-name="targetNames.funnyStaff"
            v-bind:stomp-client="stompClient">
          </audio-controller>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import AppHeader from "../AppHeader";
  import {commands, soundTargetNames} from "../../Common";
  import AudioController from "./AudioController";
  import _ from 'lodash';

  export default {
    components: {
      AudioController,
      AppHeader
    },
    name: "admin-control-page",
    data() {
      return {
        commands: commands,
        send_message: null,
        targetNames: null,
        stompClient: null,
        currentQuestion: null,
        isConnected: false,
        pageTitle: 'Admin Control'
      };
    },
    methods: {
      sendCommand(commandName, metaInfo, content) {
        let message = {
          command: {
            name: commandName,
            metaInfo: metaInfo
          },
          content: content
        };
        let suffix = {
          'LOAD': '/load',
          'SHOW_PLAYERS_ANSWERS': '/show_players_answers',
          'CALC_PLAYERS_SCORE': '/calc_players_score'
        };
        let endPointUrl = `/app/admin/command${_.get(suffix, commandName, '')}`;

        this.stompClient.send(endPointUrl, {}, JSON.stringify(message));
      },
      subscribeOnGetCurrentQuestion() {
        this.stompClient.subscribe('/app/player/getCurrentQuestion', frame => {
          this.currentQuestion = JSON.parse(frame.body).content;
        });
      },
      connectWSServer() {
        this.ws = new SockJS('http://localhost:8080/app');
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect(
          {},
          frame => {
            this.isConnected = true;
            this.subscribeOnGetCurrentQuestion();
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    mounted() {
      this.connectWSServer();
    },
    created() {
      this.targetNames = soundTargetNames;
    }
  };
</script>

<style scoped>
  #flex-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .page-container {
    height: inherit;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .btn-style {
    margin-top: 5px;
    margin-left: 5px;
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    border: 2px solid #dedede;
    border-radius: 4px;
    font-size: 1.3em;
    font-family: "Arial";
    cursor: pointer;
  }
  #control-board {
    margin-top: 40px;
    width: 250px;
  }
</style>
