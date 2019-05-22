import { observable, computed, action } from 'mobx'
class HomeViewModel {
  @observable public PatientDistributeData: any = []
}

const homeViewModel = new HomeViewModel()
export default homeViewModel
