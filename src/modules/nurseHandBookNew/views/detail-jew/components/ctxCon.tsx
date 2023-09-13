import React from 'react'
import EditPage from './editPage'
import { nurseHandbookRecordModel as model } from '../model'
import { observer } from 'mobx-react'
import GSYHZSC_2 from './GSYHZSC_2'
import GSYHZSC_4 from './GSYHZSC_4'
import GSYHZSC_5 from './GSYHZSC_5'
import GSYHZSC_6 from './GSYHZSC_6'
import MonthlyWork from "src/modules/nurseHandBookNew/views/detail-jew/components/MonthlyWork";
import HLLWDJ_9_1 from './925HLLWDJ_9/925HLLWDJ_9_1'
import JSGXDJ_9_2 from './925HLLWDJ_9/925JSGXDJ_9_2'
import JSGXDJ_9_3 from './925HLLWDJ_9/925JSGXDJ_9_3'
import WCXXJXDJ_9_4 from './925HLLWDJ_9/925WCXXJXDJ_9_4'
import JSJXJXDJ_9_5 from './925HLLWDJ_9/925JSJXJXDJ_9_5'
import HLRYJDDJ_9_6 from './925HLLWDJ_9/925HLRYJDDJ_9_6'
import HRHSDJ_9_7 from './925HLLWDJ_9/925HRHSDJ_9_7'
import YearWork from "src/modules/nurseHandBookNew/views/detail-jew/components/YearWork";
import QuarterWork from "src/modules/nurseHandBookNew/views/detail-jew/components/QuarterWork";
import PdfViewer from "src/modules/nursingRulesNew-wh/components/PdfViewer";
import {appStore} from "src/stores";

export interface Props {
}
export default observer(function (props: Props) {
  const { menuCode = '' } = model.detail?.record || {}

  if (['925NDXLJH_2','925NDGZJH_2', '925BNGZZJ_6'].includes(menuCode))
    return <EditPage />
  
  else if ('GSYHZSC_2' === menuCode)  return <GSYHZSC_2 />
  else if ('925HLLWDJ_9_1' === menuCode) return <HLLWDJ_9_1 />
  else if ('925JSGXDJ_9_2' === menuCode) return <JSGXDJ_9_2 />
  else if ('925JSGXDJ_9_3' === menuCode) return <JSGXDJ_9_3 />
  else if ('925WCXXJXDJ_9_4' === menuCode) return <WCXXJXDJ_9_4 />
  else if ('925JSJXJXDJ_9_5' === menuCode) return <JSJXJXDJ_9_5 />
  else if ('925HLRYJDDJ_9_6' === menuCode) return <HLRYJDDJ_9_6 />
  else if ('925HRHSDJ_9_7' === menuCode) return <HRHSDJ_9_7 />
  else if ('GSYHZSC_5' === menuCode)  return <GSYHZSC_5 />
  else if ('GSYHZSC_6' === menuCode)  return <GSYHZSC_6 />
  else if ('GSYHZSC_6' === menuCode)  return <GSYHZSC_6 />
  else if('925GZJHJZZD_5' === menuCode)return  <MonthlyWork/>
  else if('925NDXLJH_3' ===menuCode)return  <YearWork/>
  else if('925JDGZJH_4' ===menuCode)return  <QuarterWork/>
  else if ('925SCFM_1' === menuCode) return <PdfViewer file={ appStore.queryObj.url || model.editorData.url} width={780 - 2} />
  return <div></div>
})
