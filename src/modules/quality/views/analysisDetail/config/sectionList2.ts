import { SectionListItem } from '../AnalysisDetailModal'
import TextareaSection from '../components/textarea/section'
import TextareaModal from '../components/textarea/modal'
// 二级质控汇总配置
export const sectionList: SectionListItem[] = [
  {
    sectionId: '5_1',
    sectionTitle: '1、科室工作计划',
    modalTitle: '编辑科室工作计划',
    data: {},
    keyName: 'key5_1',
    async onSave (val: any) {
      console.log('test-val', val);
      (this as any).setSectionData('5_1', val)
    },
    section: TextareaSection,
    modal: TextareaModal
  }
]
