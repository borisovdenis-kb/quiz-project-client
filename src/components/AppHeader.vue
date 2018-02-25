<template>
  <div id="header">
    <connection-indicator v-bind:is-connected="isConnected"></connection-indicator>
  </div>
</template>

<script>
    import ConnectionIndicator from "./ConnectionIndicator";

    export default {
        components: {
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
    justify-content: flex-end;
  }
</style>
