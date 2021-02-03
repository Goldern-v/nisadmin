import { message } from 'antd'
import { action, observable, computed } from 'mobx'
import { authStore } from 'src/stores'
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

  //能够编辑学习资源的releCode列表
  private studyResourcesRoleCodes = [
    'ROLE_006', //副护士长
    'ROLE_005', //护士长
    'ROLE_000', //护理部
    'ROLE_010' //教学小组组长
  ]

  /**学习资源编辑权限 */
  @computed get studyResourcesEditAuth() {
    // if (authStore.isNotANormalNurse) return true

    let target = this.authList
      .map((item: any) => item.roleCode)
      .find((code: string) => this.studyResourcesRoleCodes.indexOf(code) >= 0)

    if (target) return true

    return false
  }

  /** 获取权限列表 */
  private getAuth() {
    this.authList = []
    this.authListLoading = true
    Promise.all([
      continuningEduService.getMyRoles(1),
      continuningEduService.getMyRoles(2),
    ])
      .then(resList => {
        this.authListLoading = false
        this.authList = [...resList[0].data || [], ...resList[1].data || []]

      }, () => this.authListLoading = false)
  }
  /** 初始化学习培训权限 */
  @action public initAuth() {
    this.getAuth()
  }
}

export const continuningEduAuth = new ContinuningEduAuth()