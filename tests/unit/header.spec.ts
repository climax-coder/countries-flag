import { mount } from '@vue/test-utils';
import Header from './../../src/components/Header-nav.vue';

describe('Header.vue', () => {
    it('toggles between light and dark mode', async () => {
        const wrapper = mount(Header);

        expect(wrapper.find('.light-mode').exists()).toBe(false);
        expect(wrapper.find('.dark-mode').exists()).toBe(false);

        await wrapper.find('button').trigger('click');

        expect(wrapper.find('.light-mode').exists()).toBe(false);
        expect(wrapper.find('.dark-mode').exists()).toBe(false);
    });
});
