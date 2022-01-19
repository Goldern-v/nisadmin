import service from 'src/services/api'
import { observable, computed, action } from 'mobx'
import { reverseKeyValue } from 'src/utils/object/object'
import { DictItem } from 'src/services/api/CommonApiService'

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
  授予学分: 'credit_granted',
  专业技术工作: 'professional_work',
  专利排名: 'patent_level',
  作者: 'article_author',
  工作服码数: 'work_clothes_size',
  参与成员: 'emp_name', // TODO
  授权类别: 'grant_type', // todo
  创新类别: 'innovation_type',
  创新级别: 'innovation_level',
  推广区域: 'promotion_area',
}

type DictList = typeof dictList
export type DictName = keyof DictList

class NurseFileDetailViewModal {
  @observable public badgeTotal: number = 0
  @observable public nurserInfo: any = {}
  @observable public pageSpinning: boolean = false
  @observable public allDeptAll: { name: string; code: string }[] = []
  /**字典对象 */
  @observable public dict: { [P: string]: DictItem[] } = {}

  initDict() {
    service.commonApiService.multiDictInfo(Object.keys(reverseKeyValue(dictList))).then((res) => {
      this.dict = res.data
    })
    service.commonApiService.getNursingUnitAll().then((res) => {
      this.allDeptAll = res.data.deptList
    })
  }
  getDict(dictName: DictName | '全部科室'): DictItem[] {
    if (dictName == '全部科室') {
      return this.allDeptAll
    } else {
      return this.dict[dictList[dictName]] || []
    }
  }
  init() {
    this.initDict()
  }
}

export const nurseFileDetailViewModal = new NurseFileDetailViewModal()
