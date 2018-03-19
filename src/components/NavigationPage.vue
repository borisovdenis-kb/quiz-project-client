<template>
  <div>
    <ul>
      <li><router-link :to="{ name: 'AdminControlPage'}">Admin Page</router-link></li>
      <li><router-link :to="{ name: 'AnswerResolverPage'}">Answer Resolver</router-link></li>
      <li><router-link :to="{ name: 'QuizPage'}">Quiz Page</router-link></li>
      <li><router-link :to="{ name: 'PlayerPage'}">Player Page</router-link></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "navigation-page"
    }
</script>

<style scoped>

</style>
