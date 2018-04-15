import Vue from 'vue'
import TruthOrLieInput from '../../../src/components/player/TruthOrLieInput'

describe('TruthOrLieInput test', () => {
  let component, vm;

  beforeEach(() => {
    component = Vue.extend(TruthOrLieInput);
    vm = new component({
      data: {
        answer: 'test'
      }
    }).$mount();
  });

  it('answer should equals to "test"', () => {
    expect(vm.answer).toEqual('test');
  })

});
