import { observable, computed, action } from 'mobx'

class WardRegisterViewModal {
  @observable public startDate = ''
  @observable public endDate = ''
  @observable public classes = ''
}

export const wardRegisterViewModal = new WardRegisterViewModal()
