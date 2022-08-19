import React, { useEffect, useState } from 'react'
import { appStore } from 'src/stores'

import { ReportDetail } from '../model'
import { sectionList } from '../config/sectionList'
import { obj } from '../config/callback/callback'

export const model = new ReportDetail({ sectionList: sectionList, ...obj })

/**获取对路由的class实例 */
export const useInstance = () => {
  const [id, setId] = useState()
  const getInstance = () => {
    // const queryObj = appStore.queryObj
    return model
  }
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