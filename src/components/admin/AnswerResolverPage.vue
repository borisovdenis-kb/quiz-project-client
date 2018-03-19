<template>
  <div id="answer-resolver-page">
    <app-header></app-header>

    <div id="main-container">
      <div id="container">
        <div v-for="(playerAnswers, playerName)  in answersGroupedByPlayers">
          <div class="resolver-for-player-header">
            <span>{{ playerName }}</span>
          </div>

          <div class="answers-container">
            <div class="row column-names">
              <div class="column question-cell">
                <span>Вопрос</span>
              </div>
              <div class="column player-answer-cell">
                <span>Ответ Команды</span>
              </div>
              <div class="column right-answer-cell">
                <span>Правильный ответ</span>
              </div>
            </div>

            <div class="row" v-for="item in playerAnswers">
              <div class="column question-cell">
                <span>{{ item.question }}</span>
              </div>
              <div class="column player-answer-cell">
                <span>{{ item.rightAnswer }}</span>
              </div>
              <div class="column right-answer-cell">
                <span>{{ item.answer }}</span>
              </div>
              <div class="column answer-status-cell">
                <div class="status-button status-button-not-resolved"
                     v-bind:class="{ 'selected' : item.status === statuses.not_resolved }"
                     v-on:click="setAnswerStatus(item.answer, statuses.not_resolved)">
                  ?
                </div>
                <div class="status-button status-button-right"
                     v-bind:class="{ 'selected' : item.status === statuses.right }"
                     v-on:click="setAnswerStatus(item.answer, statuses.right)">
                  yes
                </div>
                <div class="status-button status-button-wrong"
                     v-bind:class="{ 'selected' : item.status === statuses.wrong }"
                     v-on:click="setAnswerStatus(item.answer, statuses.wrong)">
                  no
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import AppHeader from "../AppHeader";
  import {restApiURL, answerStatuses} from "../../Common";

  export default {
    components: {AppHeader},
    name: "answer-resolver-page",
    data() {
      return {
        answersGroupedByPlayers: [],
        statuses: answerStatuses
      }
    },
    methods: {
      setAnswerStatus(answer, status) {
        this.$set(answer, status);
        console.log(this.answersGroupedByPlayers);
      }
    },
    created() {
      this.$http.get(`${restApiURL}/answers?status=NOT_RESOLVED`).then(
        response => {
          console.log(response.data);
          this.answersGroupedByPlayers = response.data;
        },
        error => {

        }
      );
    }
  }
</script>

<style scoped>
  #main-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #container {
    width: 90%;
    margin-top: 40px;
  }
  .resolver-for-player-header {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-top: 20px;
    background-color: #42b161;
    border: 1px solid #d6d6d6;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }
  .resolver-for-player-header span {
    margin-left: 10px;
  }
  .answers-container {
    width: 100%;
    border-bottom: 1px solid #d6d6d6;
    border-right: 1px solid #d6d6d6;
    border-left: 1px solid #d6d6d6;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .column-names {
    background-color: #f1f1f1;
  }
  .row {
    display: flex;
    flex-direction: row;
    height: 35px;
    border-bottom: 1px solid #d6d6d6;
  }
  .column {
    display: flex;
    justify-content: left;
    align-items: center;
    border-right: 1px solid #d6d6d6;
  }
  .column span {
    margin-left: 10px;
  }
  .question-cell {
    width: 40%;
  }
  .player-answer-cell {
    width: 22%;
  }
  .right-answer-cell {
    width: 22%;
  }
  .answer-status-cell {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 12%;
  }
  .status-button {
    width: 30%;
    background-color: cadetblue;
    cursor: pointer;
    border-radius: 2px;
    transition: 0.3s ease-in-out;
  }
  .status-button-not-resolved {
    background-color: #bebebe;
  }
  .status-button-right {
    background-color: #40b559;
  }
  .status-button-wrong {
    background-color: #d36071;
  }
  .selected {
    border: 2px solid #7a7a7a;
  }
</style>
