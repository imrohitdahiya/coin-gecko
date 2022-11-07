import BaseService from "./base-service";
import { ICoins, ICoinsDetails } from "./types";

export default class CoinsService extends BaseService {
  private static instanceRef: CoinsService;
  baseUrl: string;

  private constructor() {
    super();
    this.baseUrl = "https://api.coingecko.com/api/v3/coins/";
  }

  static get instance(): CoinsService {
    if (!this.instanceRef) {
      CoinsService.instanceRef = new CoinsService();
    }
    return this.instanceRef;
  }

  getMarketCoins(
    market_cap_desc: string,
    currency: string,
    per_page: number,
    page: number
  ): Promise<ICoins[]> {
    const url = `${this.baseUrl}markets?vs_currency=${currency}&order=${market_cap_desc}&per_page=${per_page}&page=${page}`;
    return this.get<ICoins[]>(url);
  }

  getCoinsById(id: string): Promise<ICoinsDetails> {
    const url = `${this.baseUrl}${id}`;
    return this.get<ICoinsDetails>(url);
  }
}
