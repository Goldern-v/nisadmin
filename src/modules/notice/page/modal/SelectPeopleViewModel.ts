import { observable, computed, action } from 'mobx'
import { authStore } from 'src/stores'

class SelectPeopleViewModel {
  @observable public selectTreeData = [
    {
      label: authStore.selectedDeptName
    },
    {
      label: '按护理单元选择'
    },
    {
      label: '按职务选择'
    },
    {
      label: '按职称选择'
    },
    {
      label: '按层级选择'
    }
  ]
  @observable stepState = []

  pushStep(step: string) {
    // stepState
  }
}

export const selectPeopleViewModel = new SelectPeopleViewModel()
