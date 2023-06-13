import React, { useCallback, useEffect, useState } from 'react'
import { appStore } from 'src/stores'

import { ReportDetail } from '../model'
import { sectionList } from '../config/sectionList'
import { obj } from '../config/callback/callback'
import { sectionList as sectionList1 } from '../config/sectionList1'
import { obj as obj1 } from '../config/callback/callback1'
import { sectionList as sectionList3MQ1 } from '../config/sectionList3MQ1'
import { obj as obj3MQ1 } from '../config/callback/callback3MQ1'
import { sectionList as sectionList3MQ2 } from '../config/sectionList3MQ2'
import { obj as obj3MQ2 } from '../config/callback/callback3MQ2'
import { sectionList as sectionListQ } from '../config/sectionListQ'
import { obj as objQ } from '../config/callback/callbackQ'

export const model = new ReportDetail({ sectionList: sectionList, ...obj })
export const model1 = new ReportDetail({ sectionList: sectionList1, ...obj1 })
export const model3MQ1 = new ReportDetail({ sectionList: sectionList3MQ1, ...obj3MQ1 })
export const model3MQ2 = new ReportDetail({ sectionList: sectionList3MQ2, ...obj3MQ2 })
export const modelQ = new ReportDetail({ sectionList: sectionListQ, ...objQ })

/**获取对路由的class实例 */
export const useInstance = () => {
  const [id, setId] = useState()
  const getInstance = useCallback(() => {
    if (window.location.hash.match('qcThreeResult')) return model1
    if (window.location.hash.match('qcThreeMQSummary')) {
      if (['3.4', '2.2', '1.2'].includes(appStore.queryObj?.level))  return model3MQ1
      return model3MQ2
    }
    if (['3.6', '2.1', '1.1'].includes(appStore.queryObj?.level))  return modelQ
    return model
  }, [])
  const [instance,setInstance] = useState<any>(getInstance())
  useEffect(() => {
    if (id && id == appStore.queryObj?.id) return
    appStore.queryObj?.id && setId(appStore.queryObj.id)
    setInstance(getInstance())
    return () => {
    }
  },[appStore.queryObj])
  return {instance, getInstance}
}