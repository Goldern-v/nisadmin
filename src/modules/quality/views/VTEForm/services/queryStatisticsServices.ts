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

  // 术科与非术科VTE质量单签名接口
  public saveNurseVetNew(obj: any) {
    return this.post(`/qualityList/sign`, obj)
  }

  public exportQualityExcel(obj: any) {
    return this.post(`/qualityList/exportQualityStatistics`, obj, { responseType: 'blob' })
  }
}

export const writingFormService = new WritingFormService()
