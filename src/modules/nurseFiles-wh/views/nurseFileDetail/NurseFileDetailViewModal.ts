import { observable, computed, action } from 'mobx'
let dictList = [
  { name: '民族', code: 'nation' },
  { name: '初始学历', code: 'initial_education' },
  { name: '最高学历类型', code: 'highest_Education' },
  { name: '职务', code: 'job' },
  { name: '技术职称', code: 'new_title' },
  { name: '工作编制', code: 'work_conversion' },
  { name: '院内工作地点', code: 'work_address' },
  { name: '级别', code: 'level' },
  { name: '进修单位', code: 'study_unit' },
  { name: '参编', code: 'participation' },
  { name: '学历', code: 'education' },
  { name: '层级', code: 'nurse_hierarchy' },
  { name: '完成情况', code: 'course_completion' }
]

type DictList = typeof dictList
class NurseFileDetailViewModal {
  @observable public badgeTotal: number = 0
  @observable public nurserInfo: any = {}
  @observable public pageSpinning: boolean = false
  /**字典对象 */
  @observable public dict: {} = {}

  initDict() {}
  init() {}
}

export const nurseFileDetailViewModal = new NurseFileDetailViewModal()
