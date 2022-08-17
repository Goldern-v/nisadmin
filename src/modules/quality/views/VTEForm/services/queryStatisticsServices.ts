import BaseApiService from 'src/services/api/BaseApiService'
class WritingFormService extends BaseApiService {
  public getNurseVet(obj: { Start_time: string; End_time: string; Ward_code: string }) {
    return this.post(`/hisDataAnalysis/getNurseVet`, obj)
  }

  public exportExcel(obj: { beginDate: string; endDate: string; wardCode: string }) {
    return this.post(`/qcItem/count/docWriteExport`, obj, { responseType: 'blob' })
  }
}

export const writingFormService = new WritingFormService()
