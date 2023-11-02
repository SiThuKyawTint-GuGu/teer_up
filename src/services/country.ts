"use client";
import useSWR, { SWRResponse } from "swr";

export const useGetCountries = <CountriesResponse>(): SWRResponse<CountriesResponse, any> => {
  return useSWR<CountriesResponse>(`/details/countries`);
};
