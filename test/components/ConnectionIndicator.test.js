import { mount } from '@vue/test-utils'
import ConnectionIndicator from '../../src/components/ConnectionIndicator'


describe('AnswerResolverPage test', () => {
  let wrapper, vm;

  beforeEach(() => {
    wrapper = mount(ConnectionIndicator);
    vm = wrapper.vm;
  });

  describe('templates', () => {
    it('html should contain .indicator_connected div block', () => {
      wrapper.setData({isConnected: true});
      const connectedDiv = wrapper.find('.indicator_connected');
      const disconnectedDiv = wrapper.find('.indicator_disconnected');

      expect(connectedDiv).toBeDefined();
      expect(connectedDiv.text()).toEqual('Connected');

      expect(() => {disconnectedDiv.text()}).toThrow();
    });

    it('html should contain .indicator_disconnected div block', () => {
      wrapper.setData({isConnected: false});
      const disconnectedDiv = wrapper.find('.indicator_disconnected');
      const connectedDiv = wrapper.find('.indicator_connected');

      expect(disconnectedDiv).toBeDefined();
      expect(disconnectedDiv.text()).toEqual('Disconnected');

      expect(() => {connectedDiv.text()}).toThrow();
    });
  });
});
