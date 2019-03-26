import AuthApiService from './AuthApiService'
import UserApiService from './UserApiService'
import SchedulingApiService from './SchedulingApiService'
import WardDailyApiService from './WardDailyApiService'

const service = {
  authApiService: new AuthApiService(),
  userApiService: new UserApiService(),
  schedulingApiService: new SchedulingApiService(),
  wardDailyApiService: new WardDailyApiService()
}

export default service
