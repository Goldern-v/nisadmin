import { observable, computed, action, reaction } from 'mobx'
import { nurseFilesService, NurseQuery } from '../../services/NurseFilesService'
import { authStore } from 'src/stores'
import { DictItem } from 'src/services/api/CommonApiService'
import { reverseKeyValue } from 'src/utils/object/object'
import service from 'src/services/api'

let dictList = {
  职务: 'job',
  职称: 'new_title',
  学历: 'education',
  层级: 'nurse_hierarchy'
}
type DictList = typeof dictList
type DictName = keyof DictList
class NurseFilesListViewModel {
  public constructor() {
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
  @observable public isOpenFilter: boolean = true
  /**字典对象 */
  @observable public dict: { [P: string]: DictItem[] } = {}
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
  initDict() {
    service.commonApiService.multiDictInfo(Object.keys(reverseKeyValue(dictList))).then((res) => {
      this.dict = res.data
    })
  }

  getDict(dictName: DictName) {
    let list = (this.dict[dictList[dictName]] || []).map((item) => item.name)
    return ['全部', ...list]
  }

  init() {
    this.initDict()
  }
}

export const nurseFilesListViewModel = new NurseFilesListViewModel()
