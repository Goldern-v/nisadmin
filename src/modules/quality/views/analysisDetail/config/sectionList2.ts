import { SectionListItem } from '../AnalysisDetailModal'
import TextareaSection2 from '../components/textarea/section2'
import TextareaModal from '../components/textarea/modal'
import ImprovementProjectSection from '../components/improvement-project/section'
import ImprovementProjectModal from '../components/improvement-project/modal'
import LevelTitleSection from '../components/level-title/section'
import ProblemImpModal from '../components/ProblemImp/ProblemImpModal'
import ProblemImpSection from '../components/ProblemImp/ProblemImpSection'
import qualityIndexSection from '../components/qualityIndex/qualityIndexSection'
import qualityIndexModal from '../components/qualityIndex/qualityIndexModal'
import departmentResultSection from '../components/departmentResult/departmentResultSection'
import departmentResultModal from '../components/departmentResult/departmentResultModal'
import conclusionSection from '../components/conclusion/conclusionSection'
import conclusionModal from '../components/conclusion/conclusionModal'
import tableSection from "../components/table/section";
import tableModal from "../components/table/modal";
import planCompletionSection from "../components/planCompletion/planCompletionSection";
import planCompletionModal from "../components/planCompletion/planCompletionModal";

import Operation2Section from '../components/operation-2/section'
import Operation2Modal from '../components/operation-2/modal'
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
    sectionTitle: '1、二级质量指标结果',
    modalTitle: '编辑二级质量指标结果',
    data: {
      tableName: 'deptSecondQualityIndexResult'
    },
    keyName: 'key2_1',
    async onSave (val: any) {
      (this as any).setSectionData('2_1', val)
    },
    section: qualityIndexSection,
    modal: qualityIndexModal
  },
  {
    sectionId: '2_2',
    sectionTitle: '2、区域监测指标结果',
    modalTitle: '编辑监测指标结果',
    data: {
      tableName: 'areaCareMonitorIndexResult'
    },
    async onSave (val: any) {
      (this as any).setSectionData('2_2', val)
    },
    section: departmentResultSection,
    modal: departmentResultModal
  },
  {
    sectionId: '2_3',
    sectionTitle: '3、结论:',
    modalTitle: '编辑结论',
    data: {
      tableName: 'areaNotPassIndexImprove'
    },
    async onSave (val: any) {
      (this as any).setSectionData('2_3', val)
    },
    section: conclusionSection,
    modal: conclusionModal
  },
  {
    sectionId: "3",
    sectionTitle: "三、本月工作完成情况",
    data: {
      level: 1,
    },
    section: LevelTitleSection,
  },
  {
    sectionId: "3_1",
    sectionTitle: "1、本月计划完成情况:",
    modalTitle: "编辑本月计划完成情况",
    data: {},
    async onSave(val: any) {
      (this as any).setSectionData("3_1", val);
    },
    section: planCompletionSection,
    modal: planCompletionModal,
  },
  {
    sectionId: '3_2',
    sectionTitle: '2、科室经营情况:',
    modalTitle: '编辑科室经营情况',
    data: {
    },
    async onSave (val: any) {
      (this as any).setSectionData('3_2', val)
    },
    section: Operation2Section,
    modal: Operation2Modal
  },
  {
    sectionId: "3_3",
    sectionTitle: "3、本月护理质量问题分析改进",
    modalTitle: "编辑本月护理质量问题分析改进",
    data: {
      tableName:"monthCareProblemImprove"
    },
    async onSave(val: any) {
      (this as any).setSectionData("3_3", val);
    },
    section: tableSection,
    modal: tableModal,
  },
  {
    sectionId: '3_4',
    sectionTitle: '4、主要护理问题改进方案：（安全隐患、发生频次高的问题等，每季度至少有一项改进）',
    modalTitle: '编辑主要护理问题改进方案',
    data: {},
    keyName: '',
    async onSave (val: any) {
      (this as any).setSectionData('3_4', val)
    },
    section: ImprovementProjectSection,
    modal: ImprovementProjectModal
  },
  {
    sectionId: "3_5",
    sectionTitle: "5、区域护理不良事件",
    modalTitle: "编辑区域护理不良事件",
    data: {
      tableName:"areaNursingAdverseEvents"
    },
    async onSave(val: any) {
      (this as any).setSectionData("3_5", val);
    },
    section: tableSection,
    modal: tableModal,
  },
  {
    sectionId: "3_6",
    sectionTitle: "6、参与安全讨论及床边查房：（科室、主要内容）",
    modalTitle: "编辑参与安全讨论及床边查房",
    data: {
      tableName: 'joinSafetyDiscussAndBedside'
    },
    async onSave(val: any) {
      (this as any).setSectionData("3_6", val);
    },
    section: tableSection,
    modal: tableModal,
  },
  {
    sectionId: '3_7',
    sectionTitle: '7、科室护士长管理工作评价结果：',
    modalTitle: '编辑科室护士长管理工作评价结果',
    data: {
      tableName: 'headNurseWorkAssessResults'
    },
    async onSave (val: any) {
      (this as any).setSectionData('3_7', val)
    },
    section: tableSection,
    modal: tableModal
  },
  {
    sectionId: '3_8',
    sectionTitle: '8、特殊事件及需解决的问题',
    modalTitle: '编辑特殊事件及需解决的问题',
    data: {
    },
    keyName: 'specialEventSolvedProblem',
    maxLength:100,
    async onSave (val: any) {
      (this as any).setSectionData('3_8', val)
    },
    section: TextareaSection2,
    modal: TextareaModal
  },
  {
    sectionId: '4',
    sectionTitle: '四、下月工作重点',
    modalTitle: '',
    keyName: '',
    section: LevelTitleSection
  },
  {
    sectionId: '4_1',
    sectionTitle: '1、科室工作计划',
    modalTitle: '编辑科室工作计划',
    data: {},
    keyName: 'deptWorkPlanForNextMonth',
    async onSave (val: any) {
      (this as any).setSectionData('4_1', val)
    },
    section: TextareaSection2,
    modal: TextareaModal
  },
  {
    sectionId: '4_2',
    sectionTitle: '2、科室培训计划',
    modalTitle: '编辑科室培训计划',
    data: {},
    keyName: 'nextMonthDeptTrainingPlan',
    async onSave (val: any) {
      (this as any).setSectionData('4_2', val)
    },
    section: TextareaSection2,
    modal: TextareaModal
  },
]