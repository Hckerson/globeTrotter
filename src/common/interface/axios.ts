export interface AxiosConfig {
  timeout?: number;
  method?: AxiosMethod;
  params?: Record<string, any>;
  headers?: Record<string, any>;
}


export interface ApiResponse <T>{
  data: T | null;
  error?: string;
  status?: number;
  message?: string;
}