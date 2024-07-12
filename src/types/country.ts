export interface Country {
    name: string;
    alpha3Code: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
    nativeName: string;
    subregion: string;
    topLevelDomain: string[];
    currencies: { code: string; name: string; symbol: string }[];
    languages: { iso639_1: string; iso639_2: string; name: string; nativeName: string }[];
    borders: string[];
}
