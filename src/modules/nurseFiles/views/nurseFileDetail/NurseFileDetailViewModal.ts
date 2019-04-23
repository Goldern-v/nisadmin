import { observable, computed, action } from 'mobx'

class NurseFileDetailViewModal {
  @observable public badgeTotal: number = 0
  @observable public nurserInfo: any = {}
}

export const nurseFileDetailViewModal = new NurseFileDetailViewModal()
