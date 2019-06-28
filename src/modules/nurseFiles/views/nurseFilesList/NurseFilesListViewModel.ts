import { observable, computed, action, reaction } from 'mobx'
import { nurseFilesService, NurseQuery } from '../../services/NurseFilesService'
import { authStore } from 'src/stores'

class NurseFilesListViewModel {
  public constructor () {
    /** 监听 */
    reaction(
      () => this.filterXl + this.filterZc + this.filterCj + this.filterZw,
      () => {
        this.loadNursingList()
      }
    )
  }
  /** 筛选条件 */
  @observable public filterText: string = ''
  @observable public filterXl: string = '全部'
  @observable public filterZc: string = '全部'
  @observable public filterCj: string = '全部'
  @observable public filterZw: string = '全部'
  @observable public pageIndex: number = 1
  @observable public pageSize: number = 10
  @observable public totalCount: number = 0
  @observable public listSpinning: boolean = false
  @observable public nurseList: any = []

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
      pageSize: this.pageSize /**   每页页数 */,
      empName: this.filterText /**   每页页数 */
    }
    this.listSpinning = true
    nurseFilesService.getByFormCodePC(obj).then((res) => {
      this.pageIndex = res.data.pageIndex
      this.totalCount = res.data.totalCount
      this.nurseList = res.data.list
      this.listSpinning = false
    })
  }
}

export const nurseFilesListViewModel = new NurseFilesListViewModel()
