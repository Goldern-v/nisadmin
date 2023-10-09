import React from 'react'
import { nurseHandbookRecordModel as model } from '../model'
import { observer } from 'mobx-react'
import  QHWYHYHSQK from './QHWYHYHSQK'
import QHWYCJCFJL from "./QHWYCJCFJL";
import QHWYJJRZBQK from  './QHWYJJRZBQK'
import QHWYYWCFJL from "./QHWYYWCFJL";
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
  }
  return <div></div>
})
