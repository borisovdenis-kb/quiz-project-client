import { shallow } from '@vue/test-utils'
import Question from '../../../src/components/quiz/Question'
import Bus from "../../../src/Bus"
import {globalEvents, soundTargetNames} from "../../../src/Common";
import { testData } from '../../fixture/test-data/quiz/question-test-data';
import _ from 'lodash';

describe('Question test', () => {
  let wrapper, vm;

  beforeEach(() => {
    wrapper = shallow(Question, {
      propsData: {
        questions: testData.questions
      }
    });
    vm = wrapper.vm;
  });

  describe('component methods', () => {
    it('resetAllFlags', () => {
      wrapper.setData({
        isTimeOver: true,
        isAnswerVisible: true,
        isPlayersAnswersVisible: true
      });

      vm.resetAllFlags();

      expect(vm.isTimeOver).toBeFalsy();
      expect(vm.isAnswerVisible).toBeFalsy();
      expect(vm.isPlayersAnswersVisible).toBeFalsy();
    });

    describe('nextQuestion', () => {
      it('should not change question (current question is very last)', () => {
        wrapper.setData({roundIndex: 1, currentQuestionIndex: 0});

        expect(vm.currentQuestion.question).toEqual('Раунд 2 Вопрос 1');

        vm.nextQuestion();

        expect(vm.currentQuestion.question).toEqual('Раунд 2 Вопрос 1');
      });

      it('should go to next question', () => {
        expect(vm.currentQuestion.question).toEqual('Раунд 1 Вопрос 1');

        vm.nextQuestion();

        expect(vm.currentQuestion.question).toEqual('Раунд 1 Вопрос 2');
      });

      it('should go to next question of next round', () => {
        wrapper.setData({roundIndex: 0, currentQuestionIndex: 1});

        expect(vm.currentQuestion.question).toEqual('Раунд 1 Вопрос 2');

        vm.nextQuestion();

        expect(vm.currentQuestion.question).toEqual('Раунд 2 Вопрос 1');
      });
    });

    describe('prevQuestion', () => {
      it('should not change question (current question is very first)', () => {
        expect(vm.currentQuestion.question).toEqual('Раунд 1 Вопрос 1');

        vm.prevQuestion();

        expect(vm.currentQuestion.question).toEqual('Раунд 1 Вопрос 1');
      });

      it('should go to previous question', () => {
        wrapper.setData({roundIndex: 0, currentQuestionIndex: 1});

        expect(vm.currentQuestion.question).toEqual('Раунд 1 Вопрос 2');

        vm.prevQuestion();

        expect(vm.currentQuestion.question).toEqual('Раунд 1 Вопрос 1');
      });

      it('should go to previous question of previous round', () => {
        wrapper.setData({roundIndex: 1, currentQuestionIndex: 0});

        expect(vm.currentQuestion.question).toEqual('Раунд 2 Вопрос 1');

        vm.prevQuestion();

        expect(vm.currentQuestion.question).toEqual('Раунд 1 Вопрос 2');
      });
    });

  });

  describe('events', () => {
    let spy;

    const messageTemplate = {
      command: {
        metaInfo: {
          target: null,
          volume: null
        }
      }
    };

    describe('changeVolume', () => {
      it('target is sound', () => {
        const spy = jest.spyOn(vm, 'changeVolume');

        _.set(messageTemplate, 'command.metaInfo', {target: soundTargetNames.sound, volume: 100});
        vm.sound = new Audio();
        vm.funnyStaff = null;

        Bus.bus.$emit(globalEvents.changeVolume, messageTemplate);

        expect(spy).toHaveBeenCalledWith(vm.sound, 100);
      });

      it('target is funnyStuff', () => {
        const spy = jest.spyOn(vm, 'changeVolume');

        _.set(messageTemplate, 'command.metaInfo', {target: soundTargetNames.funnyStaff, volume: 100});
        vm.funnyStaff = new Audio();
        vm.sound = null;

        Bus.bus.$emit(globalEvents.changeVolume, messageTemplate);

        expect(spy).toHaveBeenCalledWith(vm.funnyStaff, 100);
      });
    });

    describe('pauseSound', () => {
      it('target is sound', () => {
        const spy = jest.spyOn(vm, 'pauseAudio');

        _.set(messageTemplate, 'command.metaInfo', {target: soundTargetNames.sound});
        vm.sound = new Audio();
        vm.funnyStaff = null;

        Bus.bus.$emit(globalEvents.pauseSound, messageTemplate);

        expect(spy).toHaveBeenCalledWith(vm.sound);
      });

      it('target is funnyStuff', () => {
        const spy = jest.spyOn(vm, 'pauseAudio');

        _.set(messageTemplate, 'command.metaInfo', {target: soundTargetNames.funnyStaff});
        vm.funnyStaff = new Audio();
        vm.sound = null;

        Bus.bus.$emit(globalEvents.pauseSound, messageTemplate);

        expect(spy).toHaveBeenCalledWith(vm.funnyStaff);
      });
    });

    describe('playSound', () => {
      it('target is sound', () => {
        const spy = jest.spyOn(vm, 'playAudio');

        _.set(messageTemplate, 'command.metaInfo', {target: soundTargetNames.sound});
        vm.sound = new Audio();
        vm.funnyStaff = null;

        Bus.bus.$emit(globalEvents.playSound, messageTemplate);

        expect(spy).toHaveBeenCalledWith(vm.sound);
      });

      it('target is funnyStuff', () => {
        const spy = jest.spyOn(vm, 'playAudio');

        _.set(messageTemplate, 'command.metaInfo', {target: soundTargetNames.funnyStaff});
        vm.funnyStaff = new Audio();
        vm.sound = null;

        Bus.bus.$emit(globalEvents.playSound, messageTemplate);

        expect(spy).toHaveBeenCalledWith(vm.funnyStaff);
      });
    });

    it('showPlayersAnswers', () => {
      const spy = jest.spyOn(vm, 'changePlayersAnswersVisibility');

      const message = {content: 'test'};

      Bus.bus.$emit(globalEvents.showPlayersAnswers, message);

      expect(vm.playersAnswers).toEqual('test');
      expect(spy).toHaveBeenCalled();
    });

    it('showAnswer', () => {
      const spy = jest.spyOn(vm, 'changeAnswerVisibility');

      Bus.bus.$emit(globalEvents.showAnswer);

      expect(spy).toHaveBeenCalled();
    });

    it('nextQuestion', () => {
      const resetAllFlagsSpy = jest.spyOn(vm, 'resetAllFlags');
      const nextQuestionSpy = jest.spyOn(vm, 'nextQuestion');

      Bus.bus.$emit(globalEvents.nextQuestion);

      expect(resetAllFlagsSpy).toHaveBeenCalled();
      expect(nextQuestionSpy).toHaveBeenCalled();
    });

    it('prevQuestion', () => {
      const resetAllFlagsSpy = jest.spyOn(vm, 'resetAllFlags');
      const prevQuestionSpy = jest.spyOn(vm, 'prevQuestion');

      Bus.bus.$emit(globalEvents.prevQuestion);

      expect(resetAllFlagsSpy).toHaveBeenCalled();
      expect(prevQuestionSpy).toHaveBeenCalled();
    });

    it('timeIsOver', () => {
      expect(vm.isTimeOver).toEqual(false);

      Bus.bus.$emit(globalEvents.timeIsOver, true);

      expect(vm.isTimeOver).toEqual(true);

      Bus.bus.$emit(globalEvents.timeIsOver, false);

      expect(vm.isTimeOver).toEqual(false);
    });

  });
});
