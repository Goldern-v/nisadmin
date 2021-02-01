import { action, observable, computed } from 'mobx'
import { continuningEduService } from './../service/ContinuningEduService'
/** 当前用户学习培训权限列表模块*/
class ContinuningEduAuth {
  /** 当前用户学习培训权限列表*/
  @observable public authList = [] as { roleCode: string, roleName: string }[]
  /** 当前用户学习培训权限列表加载状态*/
  @observable public authListLoading = false

  /**是否教学组长 */
  @computed get isTeachingGroupLeader() {
    let target = this.authList
      .find((item: any) => item.roleCode === 'ROLE_010')

    if (target) return true

    return false
  }
  /** 获取权限列表 */
  private getAuth() {
    this.authListLoading = true
    continuningEduService.getMyRoles(2)
      .then(res => {
        this.authListLoading = false
        this.authList = res.data
      }, () => this.authListLoading = false)
  }
  /** 初始化学习培训权限 */
  @action public initAuth() {
    this.getAuth()
  }
}

export const continuningEduAuth = new ContinuningEduAuth()