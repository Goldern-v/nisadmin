
import TextareaModal from '../components/textarea/modal'
import TextareaSection from '../components/textarea/section'

import tableSection from "../components/table/section";
import tableModal from "../components/table/modal";
import { SectionListItem } from '../model'
 
// 三级委员会小组工作报告
export const sectionList: SectionListItem[] = [
  // {
  //   sectionId: 'group',
  //   sectionTitle: '上报小组名称：',
  //   modalTitle: '编辑上报小组名称',
  //   data: {
  //     level: 2
  //   },
  //   keyName: 'problemAnalysisImprove',
  //   async onSave (val: any) {
  //     (this as any).setSectionData('group', val)
  //   },
  //   section: TextareaSection,
  //   modal: TextareaModal
  // },
  {
    sectionId: "1",
    sectionTitle: '一、监测质量指标情况',
    modalTitle: "编辑监测质量指标情况",
    data: {
      level: 1,
      tableName: 'monitorQualityIndicators'
    },
    async onSave(val: any) {
      (this as any).setSectionData("1", val);
    },
    section: tableSection,
    modal: tableModal,
  },
  {
    sectionId: '1_1',
    sectionTitle: '主要问题分析、改进：',
    modalTitle: '编辑主要问题分析、改进',
    data: {
      level: 2
    },
    keyName: 'problemAnalysisImprove',
    async onSave (val: any) {
      (this as any).setSectionData('1_1', val)
    },
    section: TextareaSection,
    modal: TextareaModal
  },
  {
    sectionId: "2",
    sectionTitle: '二、工作计划完成情况',
    modalTitle: "编辑工作计划完成情况",
    data: {
      level: 1,
      tableName: 'workPlanFinishCase'
    },
    async onSave(val: any) {
      (this as any).setSectionData("2", val);
    },
    section: tableSection,
    modal: tableModal,
  },
  {
    sectionId: '3',
    sectionTitle: '三、工作常规、技术规范改进、服务创新等',
    modalTitle: '编辑工作常规、技术规范改进、服务创新等',
    data: {},
    keyName: 'workTechnicalImprove',
    async onSave (val: any) {
      (this as any).setSectionData('3', val)
    },
    section: TextareaSection,
    modal: TextareaModal
  },
  {
    sectionId: "4",
    sectionTitle: '四、下季度的主要工作计划',
    modalTitle: "编辑下季度的主要工作计划",
    data: {
      level: 1,
      tableName: 'nextQuarterMajorWorkPlan'
    },
    async onSave(val: any) {
      (this as any).setSectionData("4", val);
    },
    section: tableSection,
    modal: tableModal,
  },
  {
    sectionId: '5',
    sectionTitle: '五、需要协调事宜',
    modalTitle: '编辑需要协调事宜',
    data: {},
    keyName: 'coordinateMatters',
    async onSave (val: any) {
      (this as any).setSectionData('5', val)
    },
    section: TextareaSection,
    modal: TextareaModal
  },
]