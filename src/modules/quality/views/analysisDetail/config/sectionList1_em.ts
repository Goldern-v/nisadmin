import { SectionListItem } from '../AnalysisDetailModal'
import TextareaSection from '../components/textarea/section'
import TextareaSection2 from '../components/textarea/section2'
import TextareaModal from '../components/textarea/modal'
import ImprovementProjectSection from '../components/improvement-project/section'
import ImprovementProjectModal from '../components/improvement-project/modal'
import NursingJobEvalTableSection from '../components/nursing-job-eval-table/section'
import NursingJobEvalTableModal from '../components/nursing-job-eval-table/modal'
import LevelTitleSection from '../components/level-title/section'
import ProblemImpModal from '../components/ProblemImp/ProblemImpModal'
import ProblemImpSection from '../components/ProblemImp/ProblemImpSection'
import qualityIndexSection from '../components/qualityIndex/qualityIndexSection'
import qualityIndexModal from '../components/qualityIndex/qualityIndexModal'
import departmentResultSection from '../components/departmentResult/departmentResultSection'
import departmentResultModal from '../components/departmentResult/departmentResultModal'
import conclusionSection from '../components/conclusion/conclusionSection'
import conclusionModal from '../components/conclusion/conclusionModal'
import ProblemImproveTableSection from '../components/problem-improve-table/section'
import ProblemImproveTableModal from "../components/problem-improve-table/modal";
import FileUploaderSection from '../components/file-upload/section'
import FileUploaderModal from '../components/file-upload/modal'
// 二级质控汇总配置
export const sectionList: SectionListItem[] = [
  {
    sectionId: '1_1',
    sectionTitle: '一、上月护理质量问题改进反馈:',
    modalTitle: '上月护理质量问题改进反馈',
    data: {},
    keyName: 'key1_1',
    async onSave (val: any) {
      (this as any).setSectionData('1_1', val)
    },
    section: ProblemImpSection,
    modal: ProblemImpModal
  },
  {
    sectionId: '2',
    sectionTitle: '二、护理质量指标',
    modalTitle: '',
    keyName: '',
    section: LevelTitleSection
  },
  {
    sectionId: '2_1',
    sectionTitle: '1、科室一级质量结果',
    modalTitle: '编辑质量指标',
    data: {},
    keyName: 'key2_1',
    async onSave (val: any) {
      (this as any).setSectionData('2_1', [{}])
    },
    section: qualityIndexSection,
    modal: qualityIndexModal
  },
  {
    sectionId: '2_2',
    sectionTitle: '2、科室专科护理监测指标结果',
    modalTitle: '编辑监测指标结果',
    data: {},
    keyName: 'key2_2',
    async onSave (val: any) {
      (this as any).setSectionData('2_2', [{}])
    },
    section: departmentResultSection,
    modal: departmentResultModal
  },
  {
    sectionId: '2_3',
    sectionTitle: '3、结论:',
    modalTitle: '编辑结论',
    data: {},
    keyName: 'key2_2',
    async onSave (val: any) {
      (this as any).setSectionData('2_2', [{}])
    },
    section: conclusionSection,
    modal: conclusionModal
  },
  
  {
    sectionId: '3_3',
    sectionTitle: '3、本月护理主要问题分析改进',
    modalTitle: '编辑本月护理主要问题分析改进',
    data: {},
    keyName: '',
    async onSave (val: any) {
      (this as any).setSectionData('3_3', val)
    },
    section: ProblemImproveTableSection,
    modal: ProblemImproveTableModal
  },
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
    sectionId: '4_0',
    sectionTitle: '四、现场图片',
    modalTitle: '编辑现场图片',
    keyName: '',
    data: {},
    async onSave (val: any) {
      (this as any).setSectionData('4_0', val)
    },
    section: FileUploaderSection,
    modal: FileUploaderModal
  },
  {
    sectionId: '5',
    sectionTitle: '五、下月工作重点',
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