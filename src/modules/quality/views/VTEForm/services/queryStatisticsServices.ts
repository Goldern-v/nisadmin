import BaseApiService from 'src/services/api/BaseApiService'
class WritingFormService extends BaseApiService {
  public getNurseVet(obj: any) {
    return this.post(`/qualityList/queryList`, obj)
  }

  public exportExcel(obj: any) {
    return this.post(`/qualityList/exportQualityList`, obj, { responseType: 'blob' })
  }

  public saveNurseVet(obj: any) {
    return this.post(`/qualityList/saveList`, obj)
  }
}

export const writingFormService = new WritingFormService()
