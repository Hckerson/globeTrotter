export interface AxiosConfig {
  timeout?: number;
  method: AxiosMethod;
  params?: Record<string, any>;
  headers?: Record<string, any>;
}
