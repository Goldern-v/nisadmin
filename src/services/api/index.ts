import AuthApiService from './AuthApiService'
import UserApiService from './UserApiService'
import CommonApiService from './CommonApiService'
import WardDailyApiService from './WardDailyApiService'
// 排班
import SchedulingApiService from './Schedule/SchedulingApiService'
import ScheduleUserApiService from './Schedule/ScheduleUserApiService'
import ScheduleShiftApiService from './Schedule/ScheduleShiftApiService'

const service = {
  authApiService: new AuthApiService(),
  userApiService: new UserApiService(),
  commonApiService: new CommonApiService(),
  schedulingApiService: new SchedulingApiService(),
  scheduleUserApiService: new ScheduleUserApiService(),
  wardDailyApiService: new WardDailyApiService(),
  scheduleShiftApiService: new ScheduleShiftApiService()
}

export default service
