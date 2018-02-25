<template>
    <div>
      <app-header v-bind:is-connected="isConnected"></app-header>
    </div>
</template>

<script>
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';
    import AppHeader from "./AppHeader";

    export default {
      components: {AppHeader},
      name: "quiz-page",
      data() {
        return {
          isConnected: false,
          questionList: []
        };
      },
      methods: {
        subscribeOnCommand() {
          this.stompClient.subscribe("/app/client/getCommand", frame => {
            // console.log(frame);
            this.questionList = JSON.parse(frame.body).content;
            console.log(this.questionList);
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
              this.subscribeOnCommand();
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

</style>
