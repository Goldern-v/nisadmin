import { AxiosRequestConfig } from 'axios'

import apiConfig from '../../configs/api'

const config: AxiosRequestConfig = {
  baseURL: apiConfig.baseURL
}

export default config
