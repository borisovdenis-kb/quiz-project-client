<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button v-on:click="sendCommand">Load Quiz</button>

  </div>
</template>

<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';

  export default {
    name: "hello-world",
    data() {
      return {
        received_messages: [],
        send_message: null,
        connected: false,
        msg: 'Frontend sucks'
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
      // disconnect() {
      //   if (this.stompClient) {
      //     this.stompClient.disconnect();
      //   }
      //   this.connected = false;
      // }
    },
    mounted() {
      this.connect();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
