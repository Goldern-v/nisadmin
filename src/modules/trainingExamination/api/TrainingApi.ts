import BaseApiService from 'src/services/api/BaseApiService'
import { authStore } from 'src/stores/index'

class TrainingApi extends BaseApiService {
  public async postNurseScheduling() {
    let postData = {}
    let trancePostData = this.stringify(postData)

    // return this.post(`/scheduling/User`, trancePostData, { responseType: 'blob' }
  }
}

let trainingApi = new TrainingApi()

export default trainingApi

export { trainingApi }
