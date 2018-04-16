import { mount } from '@vue/test-utils'
import Stepper from '../../../src/components/quiz/Stepper'

describe('Test suite', () => {
    let wrapper, vm;

    beforeEach(() => {
        wrapper = mount(Stepper);
        vm = wrapper.vm;
    });

    describe('component methods', () => {
      it('isStepPassed', () => {
        wrapper.setData({currentStepIndex: 3});

        expect(vm.isStepPassed(1)).toBeTruthy();
        expect(vm.isStepPassed(3)).toBeTruthy();
        expect(vm.isStepPassed(5)).toBeFalsy();
      });
    });
});
