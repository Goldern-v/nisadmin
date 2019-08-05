import AuthApiService from './AuthApiService'
import UserApiService from './UserApiService'
import CommonApiService from './CommonApiService'
import WardDailyApiService from './WardDailyApiService'
// 排班
import SchedulingApiService from './Schedule/SchedulingApiService'
import ScheduleUserApiService from './Schedule/ScheduleUserApiService'
import ScheduleShiftApiService from './Schedule/ScheduleShiftApiService'
// 首页
import HomeDataApiServices from './Home/HomeDataApiService'
import HomeApiServices from './Home/HomeApiService'
// 统计
import ScheduleMealApiService from './Schedule/ScheduleMealApiService'
import StatisticApiService from './statistic/StatisticApiService'
// 健康宣教
import HealthyApiService from './HealthyDictionaries/HealthyApiService'
//人员分组
import PersonnelSettingApiService from './Schedule/PersonnelSettingApiService'


const service = {
  authApiService: new AuthApiService(),
  userApiService: new UserApiService(),
  commonApiService: new CommonApiService(),
  schedulingApiService: new SchedulingApiService(),
  scheduleUserApiService: new ScheduleUserApiService(),
  wardDailyApiService: new WardDailyApiService(),
  scheduleShiftApiService: new ScheduleShiftApiService(),
  homeDataApiServices: new HomeDataApiServices(),
  homeApiServices: new HomeApiServices(),
  scheduleMealApiService: new ScheduleMealApiService(),
  statisticApiService: new StatisticApiService(),
  healthyApiService: new HealthyApiService(),
  personnelSettingApiService: new PersonnelSettingApiService()
}

export default service
