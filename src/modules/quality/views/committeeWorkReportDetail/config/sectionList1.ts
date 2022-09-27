import QcThreeResult1Modal from '../components/qcThreeResult1/modal'
import QcThreeResult1Section from '../components/qcThreeResult1/section'
import tableSection from "../components/table/section";
import tableModal from "../components/table/modal";
import IndMonitoringResSection from '../components/IndMonitoringRes/section'
import IndMonitoringResModal from '../components/IndMonitoringRes/modal'
import SumDeptProModal from '../components/SumDeptPro/modal'
import SumDeptProSection from '../components/SumDeptPro/section'
import { SectionListItem } from '../model'

// 三级质控结果汇总表
export const sectionList: SectionListItem[] = [
  {
    sectionId: '1',
    sectionTitle: '上月问题：',
    modalTitle: "编辑上月问题",
    data: {},
    async onSave (val: any) {
      (this as any).setSectionData('1', val)
    },
    section: QcThreeResult1Section,
    modal: QcThreeResult1Modal
  },
  {
    sectionId: "2",
    sectionTitle: '',
    modalTitle: "编辑科室问题汇总表",
    data: {
      tableName: 'summaryDepartmentProblems'
    },
    modalWidth: 1300,
    async onSave(val: any) {
      (this as any).setSectionData("2", val);
    },
    // listConfig: {
    //   showIndex: true,
    //   setDataCb(setData: any, cloneData: any, index: number, key: string) {
    //     if (['qualificationRate','score'].includes(key)) {
    //       let item = cloneData.list[index]
    //       item['']
    //     }
    //   },
    // },
    section: SumDeptProSection,
    modal: SumDeptProModal,
  },
  {
    sectionId: "3",
    sectionTitle: '',
    modalTitle: "编辑指标监测结果表",
    data: {
      tableName: 'indexMonitoringResults'
    },
    modalWidth: 1300,
    async onSave(val: any) {
      (this as any).setSectionData("3", val);
    },
    section: IndMonitoringResSection,
    modal: IndMonitoringResModal,
  },
]