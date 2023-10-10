import dayjs from 'dayjs';

// import { ApiResponse } from '@/types';

export interface ParameterType {
  search?: string | string[] | undefined;
  format?: string;
  page?: number;
}

export class FetchAPI {
  apiDomain: string = 'swapi.dev'; // process.env.API_DOMAIN
  baseUrl: string;
  constructor() {
    this.baseUrl = `https://${this.apiDomain}/api`;
  }
  async sendApiRequest(
    api: string,
    parameters: ParameterType,
    method: string = 'GET',
    body?: {
      name: string;
      email: string;
      phone: string;
    }
  ) {
    let isLoading = true;
    const queryString = new URLSearchParams(parameters as any);
    const url = `${this.baseUrl}/${api}?${queryString.toString()}`;
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 3600,
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response: Response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const result = await response.json();
      isLoading = false;
      return {
        ...result,
        lastFetchUpdated: dayjs().format('ddd, DD MMM YYYY HH:mm:ss [GMT]'),
        isLoading,
      };
    } catch (error) {
      console.error('Error:', error);
      isLoading = false;
      throw error;
    }
  }

  // async getPeoples(path: string, params: ParameterType) {
  //   return await this.sendApiRequest(path, params);
  // }
  async getPeoples(path: string, params: ParameterType) {
    const isLoading = true; // Initialize isLoading as true before making the API request

    try {
      const response = await this.sendApiRequest(path, params);

      // Set isLoading to false before returning the response
      return {
        data: response,
        isLoading: false,
      };
    } catch (error) {
      // Set isLoading to false in case of an error
      return {
        data: null,
        isLoading: false,
        error,
      };
    }
  }
}
