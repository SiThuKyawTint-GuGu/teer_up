export interface FormConfigDataType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  formdetails_configs: any[];
}

export interface FormConfigResponse {
  data: FormConfigDataType[];
}
