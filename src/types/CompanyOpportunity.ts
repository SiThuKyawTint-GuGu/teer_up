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

export interface CompanyOpportunityResponse {
  data: CompanyOpportunity[];
}

export interface CompanyOpportunityResponseById {
  data: CompanyOpportunity;
}
