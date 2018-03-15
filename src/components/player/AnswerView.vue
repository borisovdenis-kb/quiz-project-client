<template>
    <div id="answer-view">
      <div id="answer-container">
        <p>{{ question.question }}</p>
        <div id="textarea-container">
          <input v-model="answerText" placeholder="Введите ответ. Только без глупостей."/>
        </div>
        <button class="btn-style" v-on:click="sendAnswer()">Отправить ответ</button>
      </div>
    </div>
</template>

<script>
  import {restApiURL} from "../../Common";

  export default {
    name: "answer-view",
    props: ['question'],
    data() {
      return {
        answerText: '',
        answer: {
          playerId: 1,
          questionId: this.question.id,
          answer: this.answerText
        }
      }
    },
    methods: {
      sendAnswer() {
      }
    }
  }
</script>

<style scoped>
  .btn-style {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    border: 2px solid #dedede;
    border-radius: 4px;
    font-size: 1.3em;
    font-family: "Arial";
    cursor: pointer;
  }
  .textarea-label {
    float: left;
  }
  #answer-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  #answer-container {
    width: 90%;
    height: 90%;
  }
  #textarea-container {
    width: 100%;
  }
  input {
    width: 100%;
    height: 40px;
    border: 2px solid #dedede;
    border-radius: 4px;
    font-size: 1.1em;
  }
</style>
