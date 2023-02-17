import React from 'react'
import EditPage from './editPage'
import { nurseHandbookRecordModel as model } from '../model'
import { observer } from 'mobx-react'
import GSYHZSC_2 from './GSYHZSC_2'
import GSYHZSC_4 from './GSYHZSC_4'
import GSYHZSC_5 from './GSYHZSC_5'
import GSYHZSC_6 from './GSYHZSC_6'
export interface Props {
}
export default observer(function (props: Props) {
  const { menuCode = '' } = model.detail?.record || {}

  if (['GSYHZSC_1', 'GSYHZSC_3'].includes(menuCode))
    return <EditPage />
  
  else if ('GSYHZSC_2' === menuCode)  return <GSYHZSC_2 />
  else if ('GSYHZSC_4' === menuCode)  return <GSYHZSC_4 />
  else if ('GSYHZSC_5' === menuCode)  return <GSYHZSC_5 />
  else if ('GSYHZSC_6' === menuCode)  return <GSYHZSC_6 />
  return <div></div>
})
