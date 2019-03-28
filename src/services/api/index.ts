import AuthApiService from './AuthApiService'
import UserApiService from './UserApiService'
import CommonApiService from './CommonApiService'
import SchedulingApiService from './SchedulingApiService'
import ScheduleUserApiService from './ScheduleUserApiService'
import WardDailyApiService from './WardDailyApiService'

const service = {
  authApiService: new AuthApiService(),
  userApiService: new UserApiService(),
  commonApiService: new CommonApiService(),
  schedulingApiService: new SchedulingApiService(),
  scheduleUserApiService: new ScheduleUserApiService(),
  wardDailyApiService: new WardDailyApiService()
}

export default service
