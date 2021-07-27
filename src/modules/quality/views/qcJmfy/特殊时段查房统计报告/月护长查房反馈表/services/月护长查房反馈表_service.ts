import BaseApiService from 'src/services/api/BaseApiService'

class MonthNursingCheckWard extends BaseApiService {
  public queryList(query: any) {
    return this.get('/abc', query)
  }
}

export const monthNursingCheckWard = new MonthNursingCheckWard()