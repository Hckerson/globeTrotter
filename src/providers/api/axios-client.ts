import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiResponse, AxiosConfig } from "../../common/interface/axios";

export class AxiosClient {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error("AxiosClient requires a baseUrl");
    }
    this.baseUrl = baseUrl;
    this.axiosInstance = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    const baseAxiosConfig = {
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    return axios.create(baseAxiosConfig);
  }

  private async request<T>(url: string, config: AxiosConfig, body?: unknown) {
    const configObject: AxiosRequestConfig = {
      method: config.method,
      params: config?.params,
      timeout: config?.timeout,
      headers: config?.headers,
    };
    const { headers, ...rest } = configObject;
    const headerBody: Record<string, any> = {};
    try {
      if (typeof body == "object") {
        headerBody["Content-Type"] = "application/json";
        configObject.data = JSON.stringify(body);
      } else if (body instanceof FormData) {
        headerBody["Content-Type"] = "multipart/form-data";
        configObject.data = body;
      } else {
        configObject.data = body;
      }


      const response = await this.axiosInstance.request({
        url,
        ...rest,
        headers: { ...headers, ...headerBody },
      });

      // create api response

      const apiResponse: ApiResponse<T> = {
        data: response.data as T,
        status: response?.status,
        message: response?.data?.message,
        error: response?.data?.error,
      };

      return apiResponse;
    } catch (error) {
      console.error("Error making api request", error);
      throw error;
    }
  }

  async get<T = any>(url: string, config: AxiosConfig) {
    try {
      return await this.request<T>(url, { ...config, method: "GET" });
    } catch (error) {
      console.error("Error making  GET api request", error);
      throw error;
    }
  }
  async post<T = any>(url: string, config: AxiosConfig, body?: unknown) {
    try {
      return await this.request<T>(url, { ...config, method: "POST" }, body);
    } catch (error) {
      console.error("Error making  POST api request", error);
      throw error;
    }
  }
  async patch<T = any>(url: string, config: AxiosConfig, body?: unknown) {
    try {
      return await this.request<T>(url, { ...config, method: "PATCH" }, body);
    } catch (error) {
      console.error("Error making  PATCH api request", error);
      throw error;
    }
  }
  async put<T = any>(url: string, config: AxiosConfig, body?: unknown) {
    try {
      return await this.request<T>(url, { ...config, method: "PUT" }, body);
    } catch (error) {
      console.error("Error making  PUT api request", error);
      throw error;
    }
  }
  async delete<T = any>(url: string, config: AxiosConfig, body?: unknown) {
    try {
      return await this.request<T>(url, { ...config, method: "DELETE" }, body);
    } catch (error) {
      console.error("Error making  DELETE api request", error);
      throw error;
    }
  }
}
