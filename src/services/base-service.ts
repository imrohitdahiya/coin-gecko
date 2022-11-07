enum HttpMethods {
  GET = "GET",
}

export default class BaseService {
  get<T = unknown>(url: string): Promise<T> {
    const opts = {
      method: HttpMethods.GET,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.makeRequest<T>(url, opts);
  }

  private async makeRequest<T = unknown>(
    url: string,
    opts: RequestInit
  ): Promise<T> {
    let response: Response | undefined = undefined;
    opts.headers = {
      ...opts.headers,
    };
    try {
      response = await fetch(url, { ...opts });
    } catch (e) {
      throw console.log(e);
    }
    return await response.json();
  }
}
