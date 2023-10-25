import useSWR from "swr";

interface ApiResponse {
  id: number;
  name: string;
}

const fetcher = async (url: string): Promise<ApiResponse[]> => {
  const response = await fetch(url);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  return response.json();
};

export const useApi = (url: string, method: string = "GET") => {
  const {
    data = null,
    error,
    mutate: swrMutateData,
    isLoading,
  } = useSWR<ApiResponse[]>(url, fetcher);

  const mutate = async (mutateUrl?: string, requestData?: any) => {
    const mutationUrl = mutateUrl || url;

    try {
      const response = await fetch(mutationUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData || {}),
      });

      swrMutateData();
    } catch (error) {
      console.error("Error performing mutation:", error);
    }
  };

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
