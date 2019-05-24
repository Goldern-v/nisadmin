import { observable, computed, action } from 'mobx'

class NurseFileDetailViewModal {
  @observable public badgeTotal: number = 0
  @observable public nurserInfo: any = {}
  @observable public pageSpinning: boolean = false
}

export const nurseFileDetailViewModal = new NurseFileDetailViewModal()
