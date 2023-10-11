const baseURL: string | undefined = process.env.NEXT_PUBLIC_URL;
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}
export async function usePost<T>(
  url: string,
  data: Record<string, any>,
  headers: Record<string, string> = {}
): Promise<T> {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  };
  try {
    const apiUrl: string = baseURL + url;
    const response = await fetch(apiUrl, requestOptions);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData as T;
  } catch (error: CustomError) {
    // Now 'error' has the type of CustomError
    console.log(error.message);
    throw error; // You can rethrow it if needed
  }
}
