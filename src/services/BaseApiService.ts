import * as qs from 'qs'
import { AxiosRequestConfig } from 'axios'

import http from '../libs/http'

export default abstract class BaseApiService {

  public request<T = any> (config: AxiosRequestConfig): Promise<T> {
    return http.request(config) as any
  }

  public get<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.get(url, config) as any
  }

  public head<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.head(url, config) as any
  }

  public post<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return http.post(url, data, config) as any
  }

  public put<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return http.put(url, data, config) as any
  }

  public patch<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return http.patch(url, data, config) as any
  }

  public delete<T = any> (url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.delete(url, config) as any
  }

  public stringify (obj: any, option?: qs.IStringifyOptions): string {
    return qs.stringify(obj, option)
  }

}
