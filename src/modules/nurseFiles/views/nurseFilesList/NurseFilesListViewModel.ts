import { observable, computed, action } from 'mobx'
import { nurseFilesService, NurseQuery } from '../../services/NurseFilesService'
import { authStore } from 'src/stores'

class NurseFilesListViewModel {
  /** 筛选条件 */
  @observable public filterXl: string = '全部'
  @observable public filterZc: string = '全部'
  @observable public filterCj: string = '全部'
  @observable public filterZw: string = '全部'
  @observable public pageIndex: number = 1
  @observable public pageSize: number = 10

  // @computed
  // public get getTitle () {
  //   return this.title
  // }

  @action
  public loadNursingList = () => {
    // this.title = newTitle
    let obj: NurseQuery = {
      deptCode: authStore.selectedDeptCode /** 部门编码 */,
      education: this.filterXl /** 学历 */,
      title: this.filterZc /** 职称 */,
      currentLevel: this.filterCj /** 能级、层级 */,
      post: this.filterZw /**  职务  */,
      pageIndex: this.pageIndex /**  当前页数 */,
      pageSize: this.pageSize /**   每页页数 */
    }
    nurseFilesService.getByFormCodePC(obj).then((res) => {
      console.log(res, 'res')
    })
  }
}

const nurseFilesListViewModel = new NurseFilesListViewModel()
export default nurseFilesListViewModel
