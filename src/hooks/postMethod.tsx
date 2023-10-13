const baseURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}
export async function postMethod<T>(
  endPoint: string,
  data: Record<string, any>,
  authToken?: string | undefined
): Promise<T> {
  const headers: HeadersInit = {};
  headers["Content-Type"] = "application/json";
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  const requestOptions: RequestInit = {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  };
  try {
    const apiUrl: string = baseURL + endPoint;
    const response = await fetch(apiUrl, requestOptions);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData as T;
  } catch (error: any) {
    // Now 'error' has the type of CustomError
    console.log(error.message);
    throw error; // You can rethrow it if needed
  }
}
