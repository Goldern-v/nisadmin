import { observable, computed, action } from 'mobx'

class NurseFilesListViewModel {
  /** 筛选条件 */
  @observable public filterXl: string = '全部'
  @observable public filterZc: string = '全部'
  @observable public filterCj: string = '全部'
  @observable public filterZw: string = '全部'

  // @computed
  // public get getTitle () {
  //   return this.title
  // }
  // @action
  // public setTitle = (newTitle: any) => {
  //   this.title = newTitle
  // }
}

const nurseFilesListViewModel = new NurseFilesListViewModel()
export default nurseFilesListViewModel
