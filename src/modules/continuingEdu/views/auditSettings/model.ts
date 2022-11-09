import { Obj } from './../../../../libs/types';
import { computed, observable } from "mobx";
import api from 'src/services/api/continuingEdu/qualificationAdmittance'

export interface contentDataIn {
  moduleCode: string
  configList: Obj[]
}
class AuditASettingsModel {
  @observable public moduleList: any[] = []
  // 选中的moduleCode
  @observable public curItem: string = ''
  // configList
  @observable public contentData: Obj[] = []
  
  @observable public loading: boolean = false
  @observable public isEdit: boolean = false
  @observable public nodeVisible: boolean = false
  @observable public selectRoleVisible: boolean = false
  
  @observable public editContentData: Obj[] = []
  // 选中的节点
  @observable public index: number = -1

  @computed get formatContentData(): Obj[] {
    return this.isEdit ? this.editContentData : this.contentData
  }
  async getModuleList() {
    this.loading = true
    api.getModuleByParent().then((res: any) => {
      this.loading = false
      this.moduleList = res
      if (res.length) {
        this.curItem = res[0].moduleCode
      }
    }).catch(() => this.loading = false)
  }

  getDetailByModuleCode() {
    if (!this.curItem) return
    this.loading = true
    api.getDetailByModuleCode(this.curItem).then((res: any) => {
      this.loading = false
      this.contentData = res.configList
    }).catch(() => this.loading = false)
  }
  // 删除角色
  delRole(item: Obj, index: number) {
    const list = this.editContentData[index].settingList
    console.log('test-list', list)
    this.editContentData[index].settingList = list.filter((v: Obj) => {
      if (item.id) return item.id !== v.id
      return !(item.auditType === v.auditType && item.settingValueName === v.settingValueName && item.settingValue === v.settingValue)
    })
  }

  handleVisible(flag: boolean, index: number, key = 'nodeVisible') {
    this[key] = flag
    this.index = index
  }
  // 保存驳回节点配置
  handelOkByNode(flag: number) {
    this.editContentData[this.index].rollBackType = flag
    this.nodeVisible = false
  }
  onSave() {

  }
}
export const auditSettingsModel = new AuditASettingsModel()