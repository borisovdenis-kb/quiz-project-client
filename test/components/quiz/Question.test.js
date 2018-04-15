import {mount} from '@vue/test-utils'
import Question from '../../../src/components/quiz/Question'
import Bus from "../../../src/Bus"
import {globalEvents, soundTargetNames} from "../../../src/Common";

describe('Test suite', () => {
  let wrapper, vm;

  beforeEach(() => {
    wrapper = mount(Question, {
      propsData: {
        questions: [[{
          "id": 1,
          "question": "Раунд 1 Вопрос 1",
          "rightAnswer": "В 2040 году",
          "roundName": "Вопрос / Ответ",
          "roundType": "QUESTION_ANSWER",
          "timeNeededSec": 15,
          "imageFilePath": "static/image/preview-1.jpg",
          "soundFilePath": "static/sound/иван-дорн-бигуди.mp3",
          "funnyStuffFilePath": "static/sound/BIG_SHAQ_PREKOL.mp3"
        }, {
          "id": 2,
          "question": "Раунд 1 Вопрос 2",
          "rightAnswer": "70 см.",
          "roundName": "Вопрос / Ответ",
          "roundType": "QUESTION_ANSWER",
          "timeNeededSec": 20,
          "imageFilePath": "static/image/lord-of-the-rings.jpg",
          "soundFilePath": "static/sound/Azino_Tri_Topora.mp3",
          "funnyStuffFilePath": "static/sound/BIG_SHAQ_PREKOL.mp3"
        }], [{
          "id": 3,
          "question": "Раунд 2 Вопрос 1",
          "rightAnswer": "true",
          "roundName": "Правда или ложь",
          "roundType": "TRUTH_OR_LIE",
          "timeNeededSec": 10,
          "imageFilePath": "static/image/360062_11394321.jpg",
          "soundFilePath": null,
          "funnyStuffFilePath": null
        }]]
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
