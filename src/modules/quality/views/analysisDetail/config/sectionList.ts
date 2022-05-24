import { SectionListItem } from '../AnalysisDetailModal'
import ProblemImpModal from '../components/ProblemImp/ProblemImpModal'
import ProblemImpSection from '../components/ProblemImp/ProblemImpSection'
import qualityIndexSection from '../components/qualityIndex/qualityIndexSection'
import qualityIndexModal from '../components/qualityIndex/qualityIndexModal'
import departmentResultSection from '../components/departmentResult/departmentResultSection'
import departmentResultModal from '../components/departmentResult/departmentResultModal'
import conclusionSection from '../components/conclusion/conclusionSection'
import conclusionModal from '../components/conclusion/conclusionModal'
export const sectionList: SectionListItem[] = [
  {
    sectionId: '1_1',
    sectionTitle: '一、上月护理质量问题改进反馈:(手填)',
    modalTitle: '上月护理质量问题改进反馈',
    data: {},
    keyName: 'key1_1',
    async onSave (val: any) {
      console.log('test-val', val);
      (this as any).setSectionData('1_1', val)
    },
    section: ProblemImpSection,
    modal: ProblemImpModal
  },
  {
    sectionId: '2_1',
    sectionTitle: '1、科室一级质量结果',
    modalTitle: '编辑质量指标',
    data: {},
    keyName: 'key2_1',
    async onSave (val: any) {
      console.log('test-val', val);
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
      console.log('test-val', val);
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
      console.log('test-val', val);
      (this as any).setSectionData('2_2', [{}])
    },
    section: conclusionSection,
    modal: conclusionModal
  },
]
