import { shallowMount } from '@vue/test-utils';
import CountryDetail from '../../src/components/CountryDetail.vue';
import { Country } from '../../src/types/country';

describe('CountryDetail.vue', () => {
    it('renders country detail correctly', () => {
        const country: Country = {
            name: 'Germany',
            population: 83000000,
            region: 'Europe',
            capital: 'Berlin',
            alpha3Code: 'DEU',
            flag: 'https://restcountries.com/v2/alpha/deu/flag',
            nativeName: 'Deutschland',
            subregion: 'Central Europe',
            topLevelDomain: ['.de'],
            currencies: [
                { code: 'EUR', name: 'Euro', symbol: '€' },
            ],
            languages: [
                {
                    iso639_1: 'de',
                    iso639_2: 'ger',
                    name: 'German',
                    nativeName: 'Deutsch'
                },
            ],
            borders: ['Austria', 'Belgium', 'Czech Republic', 'Denmark', 'France', 'Luxembourg', 'Netherlands', 'Poland', 'Switzerland']
        };

        const wrapper = shallowMount(CountryDetail, {
            props: { country }
        });

        expect(wrapper.text()).toContain('Germany');
        expect(wrapper.text()).toContain('Population: 83000000');
        expect(wrapper.text()).toContain('Region: Europe');
        expect(wrapper.text()).toContain('Capital: Berlin');
        expect(wrapper.text()).toContain('Native Name: Deutschland');
        expect(wrapper.text()).toContain('Sub Region: Central Europe');
        expect(wrapper.text()).toContain('Top Level Domain: .de');
        expect(wrapper.text()).toContain('Currencies: Euro');
        expect(wrapper.text()).toContain('Languages: German');
    });
});
