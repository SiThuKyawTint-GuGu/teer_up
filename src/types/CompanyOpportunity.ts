export interface CompanyOpportunity {
  id: number;
  content_id: number;
  formconfig_id: number;
  location: string;
  link: string;
  body: string;
  content: OpportunityContent;
}

export interface OpportunityContent {
  id: number;
  title: string;
  description: string;
  type: string;
  image_url: string;
  user_id: number;
  slug: string;
  status: string;
  category_id: number;
}

export interface OpportunityContentArgType {
  arg: {
    description: string;
    title: string;
    type: string;
    content_opportunity: {
      formconfig_id: number;
      location: string;
      location_type: string;
      link: string;
      body: string;
      employment_type: string;
      job_nature: string;
      school_id: number;
      degree_id: number;
      major_id: number;
    };
    status: string;
    image_url: string;
    categories: number[];
    industries: number[];
    departments: number[];
  };
}

export interface CompanyOpportunityResponse {
  data: CompanyOpportunity[];
}

export interface CompanyOpportunityResponseById {
  data: CompanyOpportunity;
}
