import LevelTitle from 'src/modules/quality/components/LevelTitle'

import Bottom from '../components/bottomNote/section'
import TextareaModal from '../components/textarea/modal'
import TextareaSection from '../components/textarea/section'
import { SectionListItem } from '../model'

// 一级质控病区汇总配置
export const sectionList: SectionListItem[] = [

  {
    sectionId: '1',
    sectionTitle: '一、监测质量指标情况',
    section: (props: any) => LevelTitle({text: props.sectionTitle})
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