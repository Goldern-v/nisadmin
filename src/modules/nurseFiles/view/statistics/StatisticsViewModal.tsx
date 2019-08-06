import service from 'src/services/api'
import { observable, computed, action } from 'mobx'
import { reverseKeyValue } from 'src/utils/object/object'
import { DictItem } from 'src/services/api/CommonApiService'
import { authStore } from 'src/stores'
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
  科室隶属部: 'dept_be_department',
  学位: 'degree',
  论文收录网站: 'Influencing_factors',
  获奖类别: 'winning_type',
  获奖级别: 'winning_level',
  专利类型: 'patent_type',
  文章类别: 'article_type',
  政治面貌: 'politics_look',
  鞋码大小: 'shoe_size',
  专业技术工作: 'professional_work'
}

type DictList = typeof dictList
type DictName = keyof DictList

class StatisticsViewModal {
  @observable public badgeTotal: number = 0
  @observable public nurserInfo: any = {}
  @observable public pageSpinning: boolean = false
  @observable public hadData: boolean = false
  @observable public allDeptAll: { name: string; code: string }[] = []
  /**字典对象 */
  @observable public dict: { [P: string]: DictItem[] } = {}

  async initDict() {
    if (this.hadData) return
    await service.commonApiService.multiDictInfo(Object.keys(reverseKeyValue(dictList))).then((res) => {
      this.dict = res.data
    })
    await service.commonApiService.getUintList().then((res) => {
      if (authStore.post === '护理部' || authStore.isAdmin) {
        this.allDeptAll = [{ name: '全院', code: '' }, ...res.data.deptList]
        authStore.selectedDeptCode = ''
      } else {
        this.allDeptAll = res.data.deptList
        if ((authStore.selectedDeptCode = '')) {
          authStore.selectedDeptCode = res.data.defaultDeptCode
        }
      }
    })

    this.hadData = true
  }
  getDict(dictName: DictName | '全部科室'): DictItem[] {
    if (dictName == '全部科室') {
      return this.allDeptAll
    } else {
      return [{ name: '全部', code: '' }, ...(this.dict[dictList[dictName]] || [])]
    }
  }
  async init() {
    await this.initDict()
  }
}

export const statisticsViewModal = new StatisticsViewModal()
