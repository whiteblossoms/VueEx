import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { MYRequestConfig, MYRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'

class MYRequest {
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors
  showLoading: boolean
  loading?: any
  /** 传入任意拦截器 */
  constructor(config: MYRequestConfig) {
    this.showLoading = config.showLoading ?? true
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    /**global interceptors */
    this.instance.interceptors.request.use(
      (config) => {
        console.log('global request')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading~',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('global interceptor')

        this.loading?.close()

        const data = res.data
        console.log(res)
        /**错误码 不止一个*/
        if (data.returnCode === '-1001') {
          console.log('res fail')
        } else {
          return data
        }
      },
      (err) => {
        if (err.response.status === 404) console.log('404')
        return err
      }
    )
  }
  /** method interceptor */
  request<T = any>(config: MYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (typeof config.showLoading === 'boolean') {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            // res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)
          this.showLoading = true
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
        })
    })
  }

  get<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MYRequest
