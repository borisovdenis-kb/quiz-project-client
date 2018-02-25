<template>
    <div>
      <div class="indicator" v-bind:class="classObject">
        {{ connectionStateText }}
      </div>
    </div>
</template>

<script>
    export default {
        name: "connection-indicator",
        data() {
          return {
            connectionStates: {
              connected: "Connected",
              disconnected: "Disconnected"
            },
            isConnected: true
          }
        },
        computed: {
          classObject: function () {
            let classObj = {};
            if (this.isConnected) {
              classObj.indicator_green = true;
            } else {
              classObj.indicator_red = true;
            }
            return classObj;
          },
          connectionStateText: function () {
            return this.isConnected ? this.connectionStates.connected : this.connectionStates.disconnected;
          }
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
  .indicator_green {
    background-color: #12c263;
    border: 1px solid #129c4e;
  }
  .indicator_red {
    background-color: #d66663;
    border: 1px solid #b75c5c;
  }
</style>
