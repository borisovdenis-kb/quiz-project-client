<template>
  <div>
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
          <button class="btn-style" v-on:click="sendCommand(commands.PREV)">← Prev</button>
          <button class="btn-style" v-on:click="sendCommand(commands.NEXT)">Next →</button>
        </div>
        <div class="flex-row">
          <audio-controller
            label="Sound"
            client-target-name="sound"
            v-on:play-sound="sendCommand(commands.PLAY_SOUND, {target: 'sound'})"
            v-on:pause-sound="sendCommand(commands.PAUSE_SOUND, {target: 'sound'})">
          </audio-controller>
        </div>
        <div class="flex-row">
          <audio-controller
            label="Prekol"
            client-target-name="funny-stuff"
            v-on:play-funny-stuff="sendCommand(commands.PLAY_SOUND, {target: 'funnyStuff'})"
            v-on:pause-funny-stuff="sendCommand(commands.PAUSE_SOUND, {target: 'funnyStuff'})">
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
  import {commands} from "../../Common";
  import AudioController from "./AudioController";

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
        isConnected: false,
        pageTitle: 'Admin Control'
      };
    },
    methods: {
      sendCommand(commandName, metaInfo) {
        let message = JSON.stringify({command: {name: commandName, metaInfo: metaInfo}});
        this.stompClient.send("/app/admin/getCommand", {}, message);
      },
      connectWSServer() {
        this.ws = new SockJS("http://localhost:8080/app");
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect(
          {},
          frame => {
            this.isConnected = true;
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    mounted() {
      this.connectWSServer();
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
