<template>
  <div>
    <router-link :to="{ name: 'admin', params: { userId: 123 }}">Admin Page</router-link>
  </div>
</template>

<script>
    export default {
        name: "navigation-page"
    }
</script>

<style scoped>

</style>
