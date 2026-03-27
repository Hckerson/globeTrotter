export interface AxiosConfig {
  timeout?: number;
  method?: AxiosMethod;
  params?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
  status?: number;
  message?: string;
}
