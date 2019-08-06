import { authStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
class queryStatisticsServices extends BaseApiService {
  //1、统计质控单
  public getEvalRateMenu(data:any) {
    let postData = {
      beginDate: data.beginDate, //开始日期 string非必须 
      endDate: data.endDate, //结束日期 string非必须 
      wardCode: authStore.selectedDeptCode,//科室 string非必须
      qcGroupCode: data.qcGroupCode, //科室 string非必须
      groupByDept: data.groupByDept,//科室分组还是质控组分组 boolean非必须
    }
    return this.post(`/qcItem/count/qcMsaterEvalRate`,postData)
  }

}

export default new queryStatisticsServices()
