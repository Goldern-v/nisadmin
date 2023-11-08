import React from 'react'
import { nurseHandbookRecordModel as model } from '../model'
import { observer } from 'mobx-react'
import  QHWYHYHSQK from './QHWYHYHSQK'
import QHWYCJCFJL from "./QHWYCJCFJL";
import QHWYJJRZBQK from  './QHWYJJRZBQK'
import QHWYYWCFJL from "./QHWYYWCFJL";
import QHWYYB_1 from "./QHWYYB_1";
import QHWYZB_1 from "./QHWYZB_1";
import QHWYHDDJ from "src/modules/nurseHandBookNew/views/detail-qhwy/components/QHWYHDDJ";
export interface Props {
}
export default observer( function (props: Props) {
  const { menuCode = '' } = model.detail?.record || {}

  if('QHWYHYHSQK' ===menuCode){
    return <QHWYHYHSQK/>
  }else if('QHWYCJCFJL' ===menuCode){
    return <QHWYCJCFJL/>
  }else if('QHWYJJRZBQK' ===menuCode){
    return <QHWYJJRZBQK/>
  }else if('QHWYYWCFJL' ===menuCode){
    return <QHWYYWCFJL/>
  }else if('QHWYZB_1' ===menuCode){
    return <QHWYZB_1 />
  }else if('QHWYYB_1' ===menuCode){
    return <QHWYYB_1 />
  }else if(['QHWYHDDJ_2','QHWYHDDJ_1'].includes(menuCode)){
    return  <QHWYHDDJ/>
  }
  return <div></div>
})
