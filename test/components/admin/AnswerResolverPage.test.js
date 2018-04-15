import { mount } from '@vue/test-utils'
import AnswerResolverPage from '../../../src/components/admin/AnswerResolverPage'
import Vue from 'vue';
import VueResource from 'vue-resource';
import {endpoints} from "../../http/fake-endpoints/answer-endpoints";

Vue.use(VueResource);

Vue.http.interceptors.unshift((request, next) => {
  let endpoint = endpoints.find((item) => {
    return (request.method === item.method && request.url === item.url);
  });

  if (!endpoint) {
    next(request.respondWith({status: 404, statusText: 'Oh no! Not found!'}));
  } else {
    next(
      request.respondWith(endpoint.response, {status: 200})
    );
  }
});


describe('AnswerResolverPage test', () => {
  let wrapper, vm;

  beforeEach(() => {
    wrapper = mount(AnswerResolverPage);
    vm = wrapper.vm;
  });

  describe('user interactions', () => {
    let updateAnswersSpy;

    beforeEach(() => {
      updateAnswersSpy = jest.spyOn(vm, 'updateAnswers');
    });

    it('click on "save" button should call updateAnswer()', () => {
      const button = wrapper.find('#save-button');
      button.trigger('click');
      expect(updateAnswersSpy).toBeCalled();
    });
  });
});
