<template>
    <div id="audio-controller">
      <div id="controller-container">
        <div id="controller">

          <div id="play-pause">
            <div class="center" style="width: 40%">
              <span>{{ label }}</span>
            </div>

            <div class="center" style="width: 20%">
              <template v-if="isPlay">
                <div class="music-btn play-btn" v-on:click="playAudion()"></div>
              </template>
              <template v-else>
                <div class="music-btn pause-btn" v-on:click="pauseAudio()"></div>
              </template>
            </div>

            <div class="center" style="width: 40%">
              <span>Vol: {{ volume }}</span>
              <span>volume: {{ metaInfo.volume }}</span>
            </div>
          </div>

          <vue-slider
            v-bind="sliderConfig"
            v-model="volume"
            v-on:click="changeVolume()">
          </vue-slider>
        </div>
      </div>
    </div>
</template>

<script>
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';
    import {commands} from "../../Common";
    import vueSlider from 'vue-slider-component';

    export default {
      name: "audio-controller",
      props: ['label', 'targetName'],
      components: {vueSlider},
      data() {
        return {
          isPlay: true,
          volume: 100,
          metaInfo: {
            volume: 1,
            target: this.targetName
          },
          sliderConfig: {
            value: 73,
            width: "230px",
            height: 4,
            direction: "horizontal",
            dotSize: 16,
            eventType: "auto",
            min: 0,
            max: 100,
            interval: 1,
            debug: false,
            disabled: false,
            show: true,
            realTime: false,
            tooltip: "hover",
            clickable: true,
            tooltipDir: "top",
            piecewise: false,
            lazy: false,
            useKeyboard: false,
            reverse: false,
            speed: 0.5,
            formatter: null,
            focusStyle: null,
            bgStyle: null,
            sliderStyle: null,
            tooltipStyle: null,
            processStyle: null,
            piecewiseStyle: null,
          }
        }
      },
      methods: {
        sendCommand(commandName, metaInfo) {
          let message = JSON.stringify({command: {name: commandName, metaInfo: metaInfo}});
          this.stompClient.send("/app/admin/getCommand", {}, message);
        },
        connectWSServer() {
          this.ws = new SockJS("http://localhost:8080/app");
          this.stompClient = Stomp.over(this.ws);
        },
        changeVolume() {
          let vol = this.volume / 100;
          this.metaInfo.volume = parseInt(vol.toFixed());
          setTimeout(() => {
            this.sendCommand(commands.CHANGE_VOLUME, this.metaInfo);
          }, 500);
        },
        playAudion() {
          this.isPlay = !this.isPlay;
          this.sendCommand(commands.PLAY_SOUND, this.metaInfo);
        },
        pauseAudio() {
          this.isPlay = !this.isPlay;
          this.sendCommand(commands.PAUSE_SOUND, this.metaInfo);
        }
      },
      watch: {
        volume: function (newVolume, oldVolume) {
          this.changeVolume();
        }
      },
      mounted() {
        this.connectWSServer();
      }
    }
</script>

<style scoped>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
  #controller-container  {
    margin-top: 10px;
    margin-left: 5px;
    width: 240px;
    height: 80px;
    border: 3px dashed #e2e2e2;
    border-radius: 4px;
  }
  #controller {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
    width: 100%;
    height: 90%;
  }
  #play-pause {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    width: 90%;
    height: 80%;
  }
  span {
    font-size: 0.9em;
  }
</style>
