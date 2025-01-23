import { Interceptor } from '../types';

class HTTPClient {
  private baseURL: string;
  private requestInterceptors: Interceptor[] = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  addRequestInterceptor(interceptor: Interceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  private async request<T = any>(url: string, options: RequestInit): Promise<T | void> {
    try {
      // Intercept request before sending
      for (const interceptor of this.requestInterceptors) {
        options = interceptor(options);
      }

      const response = await fetch(`${this.baseURL ?? ''}${url}`, options);
      if (response.status === 204) {
        return;
      }
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Fetching failed');
      }

      return data as T;
    } catch (error) {
      throw error;
    }
  }

  async get<T = any>(url: string, reqOptions: RequestInit = {}): Promise<T | void> {
    const options: RequestInit = {
      method: 'GET',
      ...reqOptions,
    };

    return this.request<T>(url, options);
  }

  async post<T = any, P = any>(
    url: string,
    data: P,
    reqOptions: RequestInit = {}
  ): Promise<T | void> {
    const options: RequestInit = {
      ...reqOptions,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...reqOptions.headers,
      },
      body: JSON.stringify(data),
    };

    return this.request<T>(url, options);
  }

  async put<T = any, P = any>(
    url: string,
    data: P,
    reqOptions: RequestInit = {}
  ): Promise<T | void> {
    const options: RequestInit = {
      ...reqOptions,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...reqOptions.headers,
      },
      body: JSON.stringify(data),
    };

    return this.request<T>(url, options);
  }

  async delete<T = any>(url: string, reqOptions: RequestInit = {}): Promise<T | void> {
    const options: RequestInit = {
      method: 'DELETE',
      ...reqOptions,
    };

    return this.request<T>(url, options);
  }

  async withAuthGet<T = any>(url: string, token: string): Promise<T | void> {
    return this.get<T>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async withAuthPost<T = any, P = any>(url: string, token: string, data: P): Promise<T | void> {
    return this.post<T, P>(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async withAuthDelete<T = any>(url: string, token: string): Promise<T | void> {
    return this.delete<T>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async withAuthPut<T = any, P = any>(url: string, token: string, data: P): Promise<T | void> {
    return this.put<T, P>(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default HTTPClient;
