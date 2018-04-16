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

    /**
     * Method for test "audio" events
     * @param event - event to emit
     * @param methodToSpyOn - method of component
     * @param target - "sound" or "funnyStuff"
     * @param expectedMethodArgs - list of arguments with which the method call is expected
     */
    function testAudioEvent(event, target, methodToSpyOn, expectedMethodArgs) {
      const spy = jest.spyOn(vm, methodToSpyOn);
      const message = {
        command: {
          metaInfo: {
            target: target,
            volume: 100
          }
        }
      };

      Bus.bus.$emit(event, message);

      expect(spy).toHaveBeenCalledWith(...expectedMethodArgs);

      spy.mockReset();
      spy.mockRestore();
    }

    describe('changeVolume', () => {
      it('target is sound', () => {
        const methodName = 'changeVolume';

        testAudioEvent(
          globalEvents.changeVolume,
          soundTargetNames.sound,
          methodName,
          [vm.sound, 100]
        );
      });

      it('target is funnyStuff', () => {
        const methodName = 'changeVolume';

        testAudioEvent(
          globalEvents.changeVolume,
          soundTargetNames.funnyStaff,
          methodName,
          [vm.funnyStaff, 100]
        );
      });
    });

    describe('pauseSound', () => {
      it('target is sound', () => {
        const methodName = 'pauseAudio';

        testAudioEvent(
          globalEvents.pauseSound,
          soundTargetNames.sound,
          methodName,
          [vm.sound]
        );
      });

      it('target is funnyStuff', () => {
        const methodName = 'pauseAudio';

        testAudioEvent(
          globalEvents.pauseSound,
          soundTargetNames.funnyStaff,
          methodName,
          [vm.funnyStaff]
        );
      });
    });

    describe('playSound', () => {
      it('target is sound', () => {
        const methodName = 'playAudio';

        testAudioEvent(
          globalEvents.playSound,
          soundTargetNames.sound,
          methodName,
          [vm.sound]
        );
      });

      it('target is funnyStuff', () => {
        const methodName = 'playAudio';

        testAudioEvent(
          globalEvents.playSound,
          soundTargetNames.funnyStaff,
          methodName,
          [vm.funnyStaff]
        );
      });
    });

  });
});
