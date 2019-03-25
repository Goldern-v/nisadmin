import AuthApiService from './AuthApiService'
import UserApiService from './UserApiService'
import SchedulingApiService from './SchedulingApiService'

const authApiService = new AuthApiService()
const userApiService = new UserApiService()
const schedulingApiService = new SchedulingApiService()

const service = {
  userApiService,
  authApiService,
  schedulingApiService
}

export default service
