import BaseApiService from 'src/services/api/BaseApiService'
class WritingFormService extends BaseApiService {
  public docWrite(obj: { beginDate: string; endDate: string }) {
    return this.post(`/qcItem/count/docWrite`, obj)
  }
}

export const writingFormService = new WritingFormService()
