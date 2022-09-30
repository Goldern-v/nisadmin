import React, { useCallback, useEffect, useState } from 'react'
import { appStore } from 'src/stores'

import { ReportDetail } from '../model'
import { sectionList } from '../config/sectionList'
import { obj } from '../config/callback/callback'
import { sectionList as sectionList1 } from '../config/sectionList1'
import { obj as obj1 } from '../config/callback/callback1'

export const model = new ReportDetail({ sectionList: sectionList, ...obj })
export const model1 = new ReportDetail({ sectionList: sectionList1, ...obj1 })

/**获取对路由的class实例 */
export const useInstance = () => {
  const [id, setId] = useState()
  const getInstance = useCallback(() => {
    if (window.location.hash.match('qcThreeResult')) return model1
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