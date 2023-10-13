import dayjs from 'dayjs';

// Define the shape of the optional parameters that can be passed to API requests.
export interface ParameterType {}

//? This code is intended for server-side use.
export class FetchAPI {
  // Define the API domain using an environment variable.
  apiDomain: string = process.env.NEXT_PUBLIC_API_URL as string;
  baseUrl: string;
  constructor() {
    // Create the base URL using the API domain.
    this.baseUrl = `${this.apiDomain}/api/v1`;
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
    // Create a query string from the parameters.
    const queryString = new URLSearchParams(parameters as any);
    const url = `${this.baseUrl}/${api}?${queryString.toString()}`;

    // Define the request options including the HTTP method and headers.
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 3600,
      },
    };

    // Include the request body data if provided.
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      // Send the HTTP request and await the response.
      const response: Response = await fetch(url, requestOptions);

      // Check if the response status is not OK (e.g., 404, 500).
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Parse the JSON response and return it along with a timestamp.
      const result = await response.json();
      return {
        ...result,
        lastFetchUpdated: dayjs().format('ddd, DD MMM YYYY HH:mm:ss [GMT]'),
      };
    } catch (error) {
      // Handle and log any errors that occur during the request.
      console.error('Error:', error);
      throw error;
    }
  }

  async getUser(params: ParameterType) {
    return await this.sendApiRequest('/user', params);
  }
}
