import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosConfig } from "../../common/interface/axios";

export class AxiosClient {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = this.createAxiosInstance();
  }

  createAxiosInstance(): AxiosInstance {
    const baseAxiosConfig = {
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.create(baseAxiosConfig);
  }

  async request(url: string, config: AxiosConfig, body?: unknown) {
    const configObject: AxiosRequestConfig = {
      method: config.method,
    };
    const headerBody: Record<string, any> = {};
    try {
      if (typeof body == "object") {
        headerBody["Content-Type"] = "application/x-www-form-urlencoded";
        configObject.data = JSON.stringify(config.data);
      }
    } catch (error) {
      console.error("Error making api request", error);
      throw error;
    }
  }

  async get(url: string) {
    try {
      return await this.request(url, { method: "GET" });
    } catch (error) {
      console.error("Error making  GET api request", error);
      throw error;
    }
  }
  async post(url: string, config: AxiosConfig, body?: unknown) {
    try {
    } catch (error) {
      console.error("Error making  POST api request", error);
      throw error;
    }
  }
  async patch(url: string, config: AxiosConfig, body?: unknown) {
    try {
    } catch (error) {
      console.error("Error making  PATCH api request", error);
      throw error;
    }
  }
  async put(url: string, config: AxiosConfig, body?: unknown) {
    try {
    } catch (error) {
      console.error("Error making  PUT api request", error);
      throw error;
    }
  }
  async delete(url: string, config: AxiosConfig, body?: unknown) {
    try {
    } catch (error) {
      console.error("Error making  DELETE api request", error);
      throw error;
    }
  }
}
