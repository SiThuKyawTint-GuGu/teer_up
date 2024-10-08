const baseURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
export async function getMethod<T>(endPoint: string, bearerToken?: string): Promise<T> {
  try {
    const headers: HeadersInit = {};
    if (bearerToken) {
      headers["Authorization"] = `Bearer ${bearerToken}`;
    }
    // let apiUrl = baseURL + endPoint;
    const apiUrl: string = `${baseURL}/api/v1${endPoint}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
    });
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
