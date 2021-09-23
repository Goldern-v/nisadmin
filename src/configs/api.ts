const apiConfig = {
  baseURL: '/crNursing/api'
}

/**
 * 获取数据
 */
export interface IRespose<T = any> {
  code: number | string,//状态码
  data: T,//数据
  desc: string,//说明
  errorCode?: string,//错误信息
}

export default apiConfig
