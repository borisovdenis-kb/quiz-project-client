<template>
  <div class="hello">
    <app-header v-bind:is-connected="isConnected"></app-header>

    <h2>{{ pageTitle }}</h2>

    <div>
      <button v-on:click="sendCommand(commands.load)">Load Quiz</button>
      <button v-on:click="sendCommand(commands.next)">Next</button>
      <button v-on:click="sendCommand(commands.prev)">Prev</button>
    </div>

  </div>
</template>

<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import AppHeader from "./AppHeader";

  export default {
    components: {
      AppHeader
    },
    name: "admin-control-page",
    data() {
      return {
        commands: {
          load: 'LOAD',
          next: 'NEXT',
          prev: 'PREV'
        },
        send_message: null,
        isConnected: false,
        pageTitle: 'Admin Control'
      };
    },
    methods: {
      sendCommand(command) {
        this.stompClient.send("/app/admin/getCommand", {}, JSON.stringify({command: command}));
      },
      connectWSServer() {
        this.ws = new SockJS("http://localhost:8080/app");
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect(
          {},
          frame => {
            console.log(frame);
            this.isConnected = true;
            // this.subscribeOnCommand();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
