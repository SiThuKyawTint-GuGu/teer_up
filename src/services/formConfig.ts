'use client';
import appAxios from '@/lib/appAxios';

export type ParamsType = {
  page?: number;
  pageSize?: number;
  id?: string;
};

export interface OptionType {
  label: string;
  value: string;
}
export interface FormConfigArgType {
  name?: string;
  placeholder?: string;
  type?: string;
  status?: string;
  input_options?: OptionType[];
}

export const usePostFormConfig = async (arg: FormConfigArgType) => {
  try {
    const response = await appAxios.post<any>('/admin/inputconfig', arg);

    // Handle response if needed
    console.log('Post request successful:', response.data);

    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error posting content:', error);
    throw new Error('Failed to post content');
  }
};
