<template>
  <div class="hello">
    <app-header v-bind:is-connected="isConnected"></app-header>

    <h2>{{ pageTitle }}</h2>

    <div>
      <button v-on:click="sendCommand">Load Quiz</button>
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
        send_message: null,
        isConnected: false,
        pageTitle: 'Admin Control'
      };
    },
    methods: {
      sendCommand() {
        this.stompClient.send("/app/admin/getCommand", {}, JSON.stringify({command: 'LOAD'}));
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
