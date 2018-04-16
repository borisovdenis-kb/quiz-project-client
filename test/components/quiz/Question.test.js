import { mount } from '@vue/test-utils'
import Question from '../../../src/components/quiz/Question'
import Bus from "../../../src/Bus"
import {globalEvents, soundTargetNames} from "../../../src/Common";
import { testData } from '../../fixture/test-data/quiz/question-test-data';

describe('Test suite', () => {
  let wrapper, vm;

  beforeEach(() => {
    wrapper = mount(Question, {
      propsData: {
        questions: testData.questions
      }
    });
    vm = wrapper.vm;
  });

  describe('component methods', () => {
    it('resetAllFlags', () => {
      vm.resetAllFlags();

      expect(vm.isTimeOver).toBeFalsy();
      expect(vm.isAnswerVisible).toBeFalsy();
      expect(vm.isPlayersAnswersVisible).toBeFalsy();
    })
  });

  describe('user interactions', () => {
  });

  describe('templates', () => {
  });

  describe('events', () => {
    it('changeVolume, target is sound', () => {
      const spy = jest.spyOn(vm, 'changeVolume');

      Bus.bus.$emit(globalEvents.changeVolume, {
        command: {
          metaInfo: {
            target: soundTargetNames.sound,
            volume: 100
          }
        }
      });

      expect(spy).toHaveBeenCalledWith(vm.sound, 100);

      spy.mockReset();
      spy.mockRestore();
    });

    it('changeVolume, target is funnyStuff', () => {
      const spy = jest.spyOn(vm, 'changeVolume');

      Bus.bus.$emit(globalEvents.changeVolume, {
        command: {
          metaInfo: {
            target: soundTargetNames.funnyStaff,
            volume: 100
          }
        }
      });

      expect(spy).toHaveBeenCalledWith(vm.funnyStaff, 100);

      spy.mockReset();
      spy.mockRestore();
    });
  });
});
