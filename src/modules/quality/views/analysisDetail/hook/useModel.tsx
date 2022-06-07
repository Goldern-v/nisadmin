import React, { useEffect, useState } from "react"
import { appStore } from "src/stores"
import { analysisDetailModal1Dept, analysisDetailModal1Em, analysisDetailModal2 } from "../AnalysisDetailModal"


/**获取对路由的class实例 */
export const useInstance = () => {
  const [instance,setInstance] = useState<any>({})
  const getInstance = () => {
    const queryObj = appStore.queryObj
    // level=1&deptName=病区
    if (queryObj?.level == '2') {
      return analysisDetailModal2
    }
    if (queryObj?.level == '1' && queryObj.deptName == '急诊') return analysisDetailModal1Em
    return analysisDetailModal1Dept

  }
  useEffect(() => {
    setInstance(getInstance())
    return () => {
      console.log('test-only-2')
    }
  },[appStore.queryObj])
  return {instance, getInstance}
}