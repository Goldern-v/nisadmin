import BaseApiService from 'src/services/api/BaseApiService'
import { fileDownload } from 'src/utils/file/file'
import {ParamsType , getPageType} from '../types/reportTypes'

class NQReportService extends BaseApiService{
  public createQcReport(query:ParamsType) {
    return this.post('/qcReport925/createQcReport', query)
  }

  public getPage(query:getPageType) {
    return this.post('/qcReport925/getPage' , query)
  }
}

export const nqreportService = new NQReportService()