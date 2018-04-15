import Vue from 'vue'
import TruthOrLieInput from '../../../src/components/player/TruthOrLieInput'

describe('TruthOrLieInput test', () => {
  let component, vm;

  beforeEach(() => {
    component = Vue.extend(TruthOrLieInput);
    vm = new component().$mount();
  });

  describe('component methods', () => {
    it('clearAnswer', () => {
      vm.answer = 'test text';
      expect(vm.answer).toEqual('test text');

      vm.clearAnswer();
      expect(vm.answer).toEqual(null);
    });
  });
});
