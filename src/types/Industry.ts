/* eslint-disable no-unused-vars */
export interface IndustryData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IndustryResponse {
  name: any;
  data: {
    length: number;
    map(arg0: (each: IndustryData, index: number) => import("react").JSX.Element): import("react").ReactNode;
    published: IndustryData[];
    unpublished: IndustryData[];
  };
}
