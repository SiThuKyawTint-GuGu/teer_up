export interface Company {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  company_admin_id: number;
}

export interface CompanyResponse {
  data: Company[];
}
