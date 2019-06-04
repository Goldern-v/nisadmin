import { action, observable } from 'mobx'
import { authStore } from '.'

export default class ScheduleStore {
  public constructor () {
    this.startTime = ''
    this.endTime = ''
    this.weekStartTime = ''
    this.weekEndTime = ''
    this.selectedWeekIndex = '0'
    this.department = {
      deptCode: authStore.selectedDeptCode || authStore.getUser().deptCode,
      deptName: authStore.getUser().deptName,
      wardCode: '',
      wardName: ''
    }
  }
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
    this.weekStartTime = weekStartTime
  }

  @action
  public getWeekStartTime = () => {
    return this.weekStartTime
  }

  @action
  public setWeekEndTime = (weekEndTime: string) => {
    this.weekEndTime = weekEndTime
  }

  @action
  public getWeekEndTime = () => {
    return this.weekEndTime
  }

  @action
  public setStartTime = (startTime: string) => {
    this.startTime = startTime
  }

  @action
  public getStartTime = () => {
    return this.startTime
  }

  @action
  public setEndTime = (endTime: string) => {
    this.endTime = endTime
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
}
