import { action, observable } from 'mobx'
import { authStore } from '.'

export default class ScheduleStore {
  public constructor () {
    this.startTime = ''
    this.endTime = ''
    this.department = {
      deptCode: authStore.getUser().deptCode,
      deptName: authStore.getUser().deptName,
      wardCode: '',
      wardName: ''
    }
  }
  @observable private startTime: string
  @observable private endTime: string
  @observable private department: any

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
    return this.department.deptCode
  }

  @action
  public getDeptName = () => {
    return this.department.deptName
  }
}
