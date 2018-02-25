<template>
  <div class="hello">
    <div id="admin-header">
      <connection-indicator></connection-indicator>
    </div>

    <h2>{{ pageTitle }}</h2>

    <div>
      <button v-on:click="sendCommand">Load Quiz</button>
    </div>

  </div>
</template>

<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';
  import ConnectionIndicator from "./ConnectionIndicator";

  export default {
    components: {ConnectionIndicator},
    name: "admin-control-page",
    data() {
      return {
        received_messages: [],
        send_message: null,
        connected: false,
        pageTitle: 'Admin Control'
      };
    },
    methods: {
      subscribeOnCommand() {
        this.stompClient.subscribe("/app/client/getCommand", frame => {
          console.log(frame);
        });
      },
      sendCommand() {
        this.stompClient.send("/app/admin/getCommand", {}, JSON.stringify({command: 'LOAD'}));
      },
      connect() {
        this.ws = new SockJS("http://localhost:8080/app");
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect(
          {},
          frame => {
            console.log(frame);
            this.subscribeOnCommand();
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    mounted() {
      this.connect();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #admin-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
