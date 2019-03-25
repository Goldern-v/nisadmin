import AuthApiService from './AuthApiService'
import UserApiService from './UserApiService'
import SchedulingApiService from './SchedulingApiService'

const service = {
  authApiService: new AuthApiService(),
  userApiService: new UserApiService(),
  schedulingApiService: new SchedulingApiService()
}

export default service
