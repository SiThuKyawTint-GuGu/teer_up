interface OptionType {
  label: string;
  value: string;
}

export interface InputConfig {
  id?: number;
  name?: string;
  placeholder?: string;
  type?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  input_options?: OptionType[];
}
export interface FormConfig {
  id?: number;
  name: string;
  formdetails_configs?: FormDetails[];
}

export interface FormDetails {
  required: true;
  order: number;
  input_config: number;
}

export interface InputConfigResponse {
  data: InputConfig[];
}
