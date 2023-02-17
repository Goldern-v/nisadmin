import { useMemo } from "react";
import { Obj } from "src/libs/types";

export interface Props extends Obj {
  record?: Obj
  nodeList?: Obj[]
  curCodeName?: string
}
/**审核页面审核流程的状态 */
export default function useAuditStatus(props: Props) {
  const { record = {}, nodeList = [], curCodeName = 'currentNode' } = props
  
  const curNode: Obj = useMemo(() => {
    if (record[curCodeName] === '') return { canHandle: true }
    if (!(record[curCodeName] && nodeList.length)) return {}
    // 未提交状态
    const current = nodeList.find((item: any) => {
      return record[curCodeName] === item.nodeCode
    })
    return current || {}
  }, [record, nodeList])

  return { curNode }
}