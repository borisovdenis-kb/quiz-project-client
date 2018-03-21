<template>
  <div id="answer-resolver-page">
    <app-header></app-header>

    <div id="main-container">

      <template v-if="!isAnswersEmpty">
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
                  <span>{{ item.question.question }}</span>
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
                       v-on:click="setAnswerStatus(item, statuses.not_resolved)">
                    ?
                  </div>
                  <div class="status-button status-button-right"
                       v-bind:class="{ 'selected' : item.status === statuses.right }"
                       v-on:click="setAnswerStatus(item, statuses.right)">
                    yes
                  </div>
                  <div class="status-button status-button-wrong"
                       v-bind:class="{ 'selected' : item.status === statuses.wrong }"
                       v-on:click="setAnswerStatus(item, statuses.wrong)">
                    no
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="save-container">
            <div id="save-button" v-on:click="updateAnswers()">Save</div>
          </div>

          <h3 v-if="isRequestFailed" style="color: red">Во время обновления списка вопросов возникла ошибка.</h3>

        </div>
      </template>
      <template v-else>
        <h2>Сейчас нет ни одного вопроса, который нужно было бы решить...</h2>
      </template>

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
        answersGroupedByPlayers: {},
        statuses: answerStatuses,
        isRequestFailed: false
      }
    },
    methods: {
      setAnswerStatus(item, status) {
        this.$set(item, 'status', status);
      },
      convertAnswerDtoToAnswers(answerDtoList) {
        return Object
          .values(answerDtoList)
          .reduce((x, y) => x.concat(y))
          .map( (answerDto) => {
            return {
              id: answerDto.id,
              questionId: answerDto.question.id,
              playerId: answerDto.player.id,
              answer: answerDto.answer,
              status: answerDto.status
            }
          });
      },
      updateAnswers() {
        let data = this.convertAnswerDtoToAnswers(this.answersGroupedByPlayers);

        this.$http.put(`${restApiURL}/answers`, data).then(
          response => {
            window.location.reload();
          },
          error => {
            this.isRequestFailed = true;
          }
        );
      }
    },
    computed: {
      isAnswersEmpty: function () {
        return Object.keys(this.answersGroupedByPlayers).length === 0;
      }
    },
    created() {
      this.$http.get(`${restApiURL}/answers?status=NOT_RESOLVED`).then(
        response => {
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
  .column:last-child {
    border-right: none;
  }
  .column span {
    margin-left: 10px;
  }
  .question-cell {
    flex: 0 0 40%;
  }
  .player-answer-cell {
    flex: 0 0 22%;
  }
  .right-answer-cell {
    flex: 0 0 22%;
  }
  .answer-status-cell {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex: 1 0 16%;
  }
  .status-button {
    width: 25%;
    padding: 2px;
    background-color: cadetblue;
    cursor: pointer;
    border-radius: 2px;
    opacity: 0.3;
  }
  .status-button-not-resolved {
    background-color: #9a9a9a;
  }
  .status-button-right {
    background-color: #40b559;
  }
  .status-button-wrong {
    background-color: #d36071;
  }
  .selected {
    opacity: 1;
  }
  #save-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
  }
  #save-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    background-color: #42b161;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  #save-button:hover {
    opacity: 0.7;
  }
</style>
