import BaseApiService from 'src/services/api/BaseApiService'
class WritingFormService extends BaseApiService {
  public docWrite(obj: { beginDate: string; endDate: string; wardCode: string }) {
    return this.post(`/qcItem/getCountConsultation`, obj)
  }
  public exportExcel(obj: { beginDate: string; endDate: string; wardCode: string }) {
    return this.post(`/qcItem/count/consultationExport`, obj, { responseType: 'blob' })
  }
}

export const writingFormService = new WritingFormService()
