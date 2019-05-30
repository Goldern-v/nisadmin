import { observable, computed, action } from 'mobx'
class HomeViewModel {
  @observable public PatientDistributeData: any = [{}, {}, {}]
  @observable public NurseSituationData: any = {}
  @observable public jobArr: any = []

  // @computed
  // public get getTitle () {
  //   return Object.keys(this.NurseSituationData)
  // }
}

const homeViewModel = new HomeViewModel()
export default homeViewModel
