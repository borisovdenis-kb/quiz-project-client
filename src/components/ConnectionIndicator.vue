<template>
    <div>
      <div class="indicator indicator_connected" v-if="isConnected">
        {{ connectionStates.connected }}
      </div>
      <div class="indicator indicator_disconnected" v-else>
        {{ connectionStates.disconnected }}
      </div>
    </div>
</template>

<script>
    export default {
        name: "connection-indicator",
        props: ['isConnected'],
        data() {
          return {
            connectionStates: {
              connected: "Connected",
              disconnected: "Disconnected"
            }
          }
        },
        mounted() {
          console.log(this.isConnected);
        }
    }
</script>

<style scoped>
  .indicator {
    display: inline-block;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 10px;
    text-align: center;
  }
  .indicator_connected {
    background-color: #12c263;
    border: 1px solid #129c4e;
  }
  .indicator_disconnected {
    background-color: #d66663;
    border: 1px solid #b75c5c;
  }
</style>
