import service from 'src/services/api'
import { observable} from 'mobx'
import { reverseKeyValue } from 'src/utils/object/object'
import { DictItem } from 'src/services/api/CommonApiService'
import { appStore, authStore } from 'src/stores'
import { IDENTITY_TYPES } from '../../enums'
let dictList = {
  民族: 'nation',
  初始学历: 'initial_education',
  最高学历类型: 'highest_Education',
  职务: 'job',
  技术职称: 'new_title',
  工作编制: 'work_conversion',
  院内工作地点: 'work_address',
  级别: 'level',
  进修单位: 'study_unit',
  参编: 'participation',
  学历: 'education',
  层级: 'nurse_hierarchy',
  完成情况: 'course_completion',
  性别: 'sex',
  编制名称: 'work_conversion_old',
  现科室隶属部门: 'dept_be_department',
  学位: 'degree',
  论文收录网站: 'Influencing_factors',
  获奖类别: 'winning_type',
  获奖级别: 'winning_level',
  专利类型: 'patent_type',
  文章类别: 'article_type',
  政治面貌: 'politics_look',
  鞋码大小: 'shoe_size',
  专业技术工作: 'professional_work',
  家庭住址: 'address'
}

type DictList = typeof dictList
type DictName = keyof DictList

class StatisticsViewModal {
  @observable public badgeTotal: number = 0
  @observable public nurserInfo: any = {}
  @observable public pageSpinning: boolean = false
  @observable public hadData: boolean = false
  @observable public selectedDeptCode: string[] = []
  @observable public allDeptAll: { name: string; code: string }[] = []
  @observable public fullDeptAll: { name: string; code: string }[] = []
  /**字典对象 */
  @observable public dict: { [P: string]: DictItem[] } = {}

  async initDict() {
    if (this.hadData) return
    await service.commonApiService.multiDictInfo(Object.keys(reverseKeyValue(dictList))).then((res) => {
      this.dict = res.data
    })
    const fn = appStore.hisMatch({
      map: {
        'sdlj,nfsd,qzde': service.commonApiService.nursingUnit4Area.bind(service.commonApiService),
        'other': service.commonApiService.getUintList.bind(service.commonApiService)
      },
      vague: true
    })
    
    await fn().then((res: any) => {
      if (['sdlj', 'nfsd', 'qzde'].includes(appStore.HOSPITAL_ID)) {
        authStore.treeDeptList = res.data.deptList
      }
      if (authStore.isDepartment) {
        this.allDeptAll = [{ name: '全院', code: '全院' }, ...res.data.deptList]
        this.selectedDeptCode = ['全院']
      } else if (authStore.isSupervisorNurse) {
        this.allDeptAll = [{ name: '全部', code: '全部' }, ...res.data.deptList]
        this.selectedDeptCode = ['全部']
      } else {
        this.allDeptAll = res.data.deptList
        this.selectedDeptCode = [res.data.defaultDept]
      }
    })
    await service.commonApiService.getNursingUnitAll().then((res) => {
      this.fullDeptAll = res.data.deptList
    })
    this.hadData = true
  }
  getDict(dictName: DictName | '全部科室' | '完整科室' | '身份类别'): DictItem[] {
    if (dictName == '全部科室') {
      return this.allDeptAll
    } else if (dictName == '完整科室') {
      return this.fullDeptAll
    } else if (dictName == '身份类别') {
      return IDENTITY_TYPES
    } else {
      return this.dict[dictList[dictName]] || []
    }
  }
  async init() {
    await this.initDict()
  }

  reSetDept() {
    if (authStore.isDepartment) {
      return ['全院']
    } else if (authStore.isSupervisorNurse) {
      return ['全部']
    } else {
      return [authStore.defaultDeptCode]
    }
  }
}

export const statisticsViewModal = new StatisticsViewModal()
