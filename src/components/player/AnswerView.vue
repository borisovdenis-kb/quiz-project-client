<template>
    <div id="answer-view">
      <div id="answer-container">
        <p>{{ question.question }}</p>
        <div id="input-answer-container">

          <template v-if="question.roundType === roundTypes.questionAnswer">
            <question-answer-input ref="answerInput"></question-answer-input>
          </template>
          <template v-else>
            <truth-or-lie-input ref="answerInput"></truth-or-lie-input>
          </template>

        </div>
        <button class="btn-style" v-on:click="sendAnswer()">Отправить ответ</button>
      </div>
    </div>
</template>

<script>
  import TruthOrLieInput from "./TruthOrLieInput";
  import QuestionAnswerInput from "./QuestionAnswerInput";
  import {REST_API_URL, roundTypes} from "../../Common";

  export default {
    components: {
      QuestionAnswerInput,
      TruthOrLieInput},
    name: "answer-view",
    props: ['question', 'player'],
    data() {
      return {
        answer: {
          playerId: this.player.id,
          questionId: '',
          answer: ''
        },
        roundTypes: roundTypes
      }
    },
    methods: {
      sendAnswer() {
        this.answer.answer = this.$refs.answerInput.getAnswer();
        this.answer.questionId = this.question.id;
        console.log(this.answer);
        this.$http.post(`${REST_API_URL}/answers`, this.answer);
      }
    },
    computed: {
      currentAnswer: function () {
        return this.$refs.answerInput.getAnswer();
      }
    },
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
  #input-answer-container {
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
