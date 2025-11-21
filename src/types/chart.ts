interface TransDetailType {
  official: string;
  common: string;
}
interface TransType {
  ara: TransDetailType[];
  bre: TransDetailType[];
  ces: TransDetailType[];
  cym: TransDetailType[];
  deu: TransDetailType[];
  est: TransDetailType[];
  fin: TransDetailType[];
  fra: TransDetailType[];
  hrv: TransDetailType[];
  hun: TransDetailType[];
  ita: TransDetailType[];
  jpn: TransDetailType[];
  kor: TransDetailType[];
  nld: TransDetailType[];
  per: TransDetailType[];
  pol: TransDetailType[];
  por: TransDetailType[];
  rus: TransDetailType[];
  slk: TransDetailType[];
  spa: TransDetailType[];
  srp: TransDetailType[];
  swe: TransDetailType[];
  tur: TransDetailType[];
  urd: TransDetailType[];
  zho: TransDetailType[];
}
interface SortDataProps {
  translations: TransType[];
  population: number;
}
export interface DataProps {
  index: number;
  array: SortDataProps[];
  translations: {
    kor: {
      official: string;
      common: string;
    };
  };
  population: number;
  name: CountryFullName;
}

export interface CountryFullName {
  official: string;
  [key: string]: unknown;
}
