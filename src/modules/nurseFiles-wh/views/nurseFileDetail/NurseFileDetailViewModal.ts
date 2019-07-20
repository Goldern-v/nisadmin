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
  性别: 'sex'
}

type DictList = typeof dictList
type DictName = keyof DictList

class NurseFileDetailViewModal {
  @observable public badgeTotal: number = 0
  @observable public nurserInfo: any = {}
  @observable public pageSpinning: boolean = false

  /**字典对象 */
  @observable public dict: { [P: string]: DictItem[] } = {}

  initDict() {
    service.commonApiService.multiDictInfo(Object.keys(reverseKeyValue(dictList))).then((res) => {
      this.dict = res.data
    })
  }
  getDict(dictName: DictName): DictItem[] {
    return this.dict[dictList[dictName]] || []
  }
  init() {
    this.initDict()
  }
}

export const nurseFileDetailViewModal = new NurseFileDetailViewModal()
