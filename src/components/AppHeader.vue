<template>
  <div id="header">
    <div class="logo">
      <logo text="QUIZ"></logo>
    </div>

    <div class="connection-indicator">
      <connection-indicator v-if="isConnected !== null"
                            v-bind:is-connected="isConnected">
      </connection-indicator>
    </div>
  </div>
</template>

<script>
  import ConnectionIndicator from "./ConnectionIndicator";
  import Logo from "../Logo";

  export default {
    components: {
      Logo,
      ConnectionIndicator
    },
    name: "app-header",
    props: ['isConnected']
  }
</script>

<style scoped>
  #header {
    display: flex;
    flex-direction: row;
    height: 35px;
    background-color: #6675d6;
  }

  .logo {
    display: flex;
    flex-basis: 93%;
    padding-left: 20px;
    height: 100%;
  }

  .connection-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 7%;
    height: 100%;
  }
</style>
