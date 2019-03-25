import AuthApiService from './AuthApiService'
import UserApiService from './UserApiService'
import SchedulingApiService from './SchedulingApiService'

const authApiService = new AuthApiService()
const userApiService = new UserApiService()

const service = {
  userApiService,
  authApiService,
  SchedulingApiService
}

export default service
