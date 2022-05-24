import { SectionListItem } from '../AnalysisDetailModal'
import TextareaSection from '../components/textarea/section'
import TextareaSection2 from '../components/textarea/section2'
import TextareaModal from '../components/textarea/modal'
import ImprovementProjectSection from '../components/improvement-project/section'
import ImprovementProjectModal from '../components/improvement-project/modal'
import NursingJobEvalTableSection from '../components/nursing-job-eval-table/section'
import NursingJobEvalTableModal from '../components/nursing-job-eval-table/modal'
import LevelTitleSection from '../components/level-title/section'
// 二级质控汇总配置
export const sectionList: SectionListItem[] = [
  
  {
    sectionId: '4_4',
    sectionTitle: '4、主要护理问题改进方案：（安全隐患、发生频次高的问题等，每季度至少有一项改进）',
    modalTitle: '编辑主要护理问题改进方案',
    data: {},
    keyName: '',
    async onSave (val: any) {
      (this as any).setSectionData('4_4', val)
    },
    section: ImprovementProjectSection,
    modal: ImprovementProjectModal
  },
  {
    sectionId: '4_7',
    sectionTitle: '7、科室护士长管理工作评价结果：',
    modalTitle: '编辑科室护士长管理工作评价结果',
    data: {},
    keyName: '',
    async onSave (val: any) {
      (this as any).setSectionData('4_7', val)
    },
    section: NursingJobEvalTableSection,
    modal: NursingJobEvalTableModal
  },
  {
    sectionId: '4_8',
    sectionTitle: '8、特殊事件及需解决的问题',
    modalTitle: '编辑特殊事件及需解决的问题',
    data: {},
    keyName: 'key4_8',
    async onSave (val: any) {
      (this as any).setSectionData('4_8', val)
    },
    section: TextareaSection2,
    modal: TextareaModal
  },
  {
    sectionId: '5',
    sectionTitle: '四、下月工作重点',
    modalTitle: '',
    keyName: '',
    section: LevelTitleSection
  },
  {
    sectionId: '5_1',
    sectionTitle: '1、科室工作计划',
    modalTitle: '编辑科室工作计划',
    data: {},
    keyName: 'key5_1',
    async onSave (val: any) {
      (this as any).setSectionData('5_1', val)
    },
    section: TextareaSection2,
    modal: TextareaModal
  },
  {
    sectionId: '5_2',
    sectionTitle: '2、科室培训计划',
    modalTitle: '编辑科室培训计划',
    data: {},
    keyName: 'key5_2',
    async onSave (val: any) {
      (this as any).setSectionData('5_2', val)
    },
    section: TextareaSection2,
    modal: TextareaModal
  },
]