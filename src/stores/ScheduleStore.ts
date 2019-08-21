import { action, observable } from 'mobx'
import { authStore } from '.'
import moment from 'moment'

export default class ScheduleStore {
  public constructor() {
    this.startTime = sessionStorage.scheduleStartTime || ''
    this.endTime = sessionStorage.scheduleEndTime || ''
    this.weekStartTime = sessionStorage.scheduleWeekStartTime || ''
    this.weekEndTime = sessionStorage.scheduleWeekEndTime || ''
    this.selectedWeekIndex = '0'
    this.department = {
      deptCode: authStore.selectedDeptCode || authStore.getUser().deptCode,
      deptName: authStore.getUser().deptName,
      wardCode: '',
      wardName: ''
    }
  }
  @observable public groupList: any[] = sessionStorage.groupList ? JSON.parse(sessionStorage.groupList) : []
  @observable public selectedGroupId: any = ''
  @observable private weekStartTime: string
  @observable private weekEndTime: string
  @observable private startTime: string
  @observable private endTime: string
  @observable private selectedWeekIndex: string
  @observable private department: any

  @action
  public setSelectedWeekIndex = (selectedWeekIndex: string) => {
    this.selectedWeekIndex = selectedWeekIndex
  }

  @action
  public getSelectedWeekIndex = () => {
    return this.selectedWeekIndex
  }
  @action
  public setWeekStartTime = (weekStartTime: string) => {
    sessionStorage.scheduleWeekStartTime = weekStartTime
    this.weekStartTime = weekStartTime
  }

  @action
  public getWeekStartTime = () => {
    return this.weekStartTime
  }

  @action
  public setWeekEndTime = (weekEndTime: string) => {
    sessionStorage.scheduleWeekEndTime = weekEndTime
    this.weekEndTime = weekEndTime
  }

  @action
  public getWeekEndTime = () => {
    return this.weekEndTime
  }

  @action
  public setStartTime = (startTime: string) => {
    this.startTime = startTime
    sessionStorage.scheduleStartTime = startTime
  }

  @action
  public getStartTime = () => {
    return this.startTime
  }

  @action
  public setEndTime = (endTime: string) => {
    this.endTime = endTime
    sessionStorage.scheduleEndTime = endTime
  }

  @action
  public getEndTime = () => {
    return this.endTime
  }

  @action
  public setDepartment = (department: string) => {
    this.department = department
  }

  @action
  public setDepartmentValue = (key: string, value: string) => {
    this.department[key] = value
  }
  @action
  public setGroupList = (value: any[]) => {
    this.groupList = value
    sessionStorage.groupList = JSON.stringify(value)
  }

  @action
  public getDepartment = () => {
    return this.department
  }

  @action
  public getDeptCode = () => {
    return authStore.selectedDeptCode
  }

  @action
  public getDeptName = () => {
    return authStore.selectedDeptName
  }

  @action
  public getWeeks = () => {
    let startWeekNumber = moment(this.getStartTime()).isoWeek()
    let endWeekNumber = moment(this.getEndTime()).isoWeek()
    if (startWeekNumber == endWeekNumber) {
      return [startWeekNumber]
    } else {
      return [startWeekNumber, endWeekNumber]
    }
  }
}
