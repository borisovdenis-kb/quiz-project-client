<template>
  <div id="logo">
    <div>{{ decoratedText }}</div>
    <div class="z-letter-container">
      <div class="z-letter z0">{{ lastTextSymbol }}</div>
      <div class="z-letter z1">{{ lastTextSymbol }}</div>
      <div class="z-letter z2">{{ lastTextSymbol }}</div>
      <div class="z-letter z3">{{ lastTextSymbol }}</div>
      <div class="z-letter z4">{{ lastTextSymbol }}</div>
      <div class="z-letter z5">{{ lastTextSymbol }}</div>
      <div class="z-letter z6">{{ lastTextSymbol }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'logo',
    props: ['text'],
    data() {
      return {
        textLength: this.text.length
      }
    },
    computed: {
      lastTextSymbol: function () {
        return this.text[this.textLength - 1];
      },
      decoratedText: function () {
        return this.text.slice(0, this.textLength - 1).split('').join(' ');
      }
    }
  }
</script>

<style scoped>
  #logo {
    display: flex;
    align-items: center;
    flex-direction: row;
    color: #ffffff;
    cursor: pointer;
    overflow: hidden;
  }

  .z-letter-container {
    transition: 1s ease transform;
    transform: translateY(0);
  }

  #logo:hover .z-letter-container {
    transform: translateY(38px);
  }

  .z-letter {
    margin-left: 5px;
  }

  .z0 {
    opacity: 0.6;
  }

  .z1 {
    opacity: 1;
  }

  .z2 {
    opacity: 0.6;
  }

  .z3 {
    opacity: 0.4;
  }

  .z4 {
    opacity: 0.2;
  }

  .z5 {
    opacity: 0.02;
  }

  .z6 {
    opacity: 0.05;
  }
</style>
