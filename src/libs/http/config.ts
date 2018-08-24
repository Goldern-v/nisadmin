import { AxiosRequestConfig } from 'axios'

import apiConfig from '../../configs/api'

const config: AxiosRequestConfig = {
  baseURL: apiConfig.baseURL,
  // headers: {
  //   common: {
  //     [apiConfig.staticTokenKey]: apiConfig.staticTokenValue,
  //   },
  // },
}

export default config
