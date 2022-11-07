export interface ICoins {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: string;
  high_24h: number;
  low_24h: number;
}

export interface ICoinsDetails {
  name: string;
  symbol: string;
  hashing_algorithm: string;
  description: {
    en: string;
  }
  genesis_date: string;
  links: {
    homepage: Array<string>;
  };
  id: string;
}
