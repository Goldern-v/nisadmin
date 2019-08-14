import { format } from 'date-fns'
import { fileDownload } from 'src/utils/file/file'
import { authStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import moment from 'moment'
import 病区明细表 from '../component/病区明细表'
import 门诊汇总表 from '../component/门诊汇总表'
import 病区汇总表 from '../component/病区汇总表'
import 门诊明细表 from '../component/门诊明细表'
class ProblemSummaryServices extends BaseApiService {
  public turnOverExcel(obj: any) {
    let postData = {
      type: 'month',
      year: obj.year.format('YYYY'),
      indexInType: obj.month
    }
    return this.post(`/qcTurnOver/import/turnOverExcel`, postData, { responseType: 'blob' }).then((res) => {
      fileDownload(res)
    })
  }

  getTableData(obj: any, setPageObj: any) {
    let postData = {
      type: 'month',
      year: obj.year.format('YYYY'),
      indexInType: obj.month
    }

    if (obj.type == '住院' && obj.sheet == '明细表') {
      return this.post(`/qcTurnOver/getDenDetailList`, postData).then((res) => {
        setPageObj({
          title: `${postData.year}年${postData.indexInType}月病区质量考核明细表`,
          component: 病区明细表,
          dataSource: res.data
        })
      })
    } else if (obj.type == '门诊' && obj.sheet == '汇总表') {
      return this.post(`/qcTurnOver/getOpdScoreList`, postData).then((res) => {
        setPageObj({
          title: `${postData.year}年${postData.indexInType}月门诊质量考核汇总表`,
          component: 门诊汇总表,
          dataSource: res.data
        })
      })
    } else if (obj.type == '住院' && obj.sheet == '汇总表') {
      return this.post(`/qcTurnOver/getGenScoreList`, postData).then((res) => {
        setPageObj({
          title: `${postData.year}年${postData.indexInType}月病区质量考核汇总表`,
          component: 病区汇总表,
          dataSource: []
        })
      })
    } else if (obj.type == '门诊' && obj.sheet == '明细表') {
      return this.post(`/qcTurnOver/getOpdDetailList`, postData).then((res) => {
        setPageObj({
          title: `${postData.year}年${postData.indexInType}月门诊质量考核明细表`,
          component: 门诊明细表,
          dataSource: []
        })
      })
    }
  }
}

export const problemSummaryServices = new ProblemSummaryServices()
