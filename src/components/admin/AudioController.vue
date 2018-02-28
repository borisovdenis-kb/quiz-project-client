<template>
    <div id="audio-controller">
      <div id="controller-container">
        <label>{{ label }}</label>
        <div id="controller">
          <div class="volume-btn" style="margin-left: 2px">-</div>

          <template v-if="isPlay">
            <div class="music-btn play-btn" v-on:click=""></div>
          </template>
          <template v-else>
            <div class="music-btn pause-btn"></div>
          </template>

          <div class="volume-btn louder-btn" style="margin-right: 2px">+</div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "audio-controller",
      props: ['label'],
      data() {
        return {
          isPlay: false
        }
      }
    }
</script>

<style scoped>
  .music-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .play-btn {
    background-image: url('../../../static/icons/play-button.png');
  }
  .pause-btn {
    background-image: url('../../../static/icons/pause.png');
  }
  .volume-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
    width: 80px;
    height: 30px;
    background-color: #4077dc;
    font-size: 2em;
    color: #ffffff;
  }
  #controller-container  {
    margin-top: 10px;
    margin-left: 5px;
    width: 240px;
    height: 60px;
    border: 3px dashed #e2e2e2;
    border-radius: 4px;
  }
  #controller {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
    width: 100%;
  }
  label {
    top: -5px;
    font-size: 0.8em;
  }
</style>
