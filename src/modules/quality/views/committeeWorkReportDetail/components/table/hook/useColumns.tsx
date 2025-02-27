import { ColumnProps } from "antd/es/table"
import React, { useEffect, useState } from "react"
import TableInput from '../../common/TableInput'
/**
 * tempList 后端table模板
 * 
 * isEdit 是否编辑
 * 
 * setData 设置数据方法
 * 
 * setDataCb 设置数就回调
 * 
 * showIndex 显示序号
 */
export interface Props extends Record<string, any> {
  tempList: any[]
  isEdit?: boolean
  setData?: Function
  setDataCb?: Function
  showIndex?: boolean
}
const INPUT_ENUMS = {
  textarea: 'TextArea',
  DatePicker:'DatePicker',
  TimePicker:'TimePicker'

}
export const useColumns = (props: Props) => {
  const { tempList, isEdit = false, setData, setDataCb, showIndex } = props
  const [columns, setColumns] = useState<ColumnProps<any>[]>([])
  useEffect(() => {
    const columns: ColumnProps<any>[] = []
    if (showIndex) {
      columns.push({
        title: '序号',
        align: 'center',
        key: 'index',
        width: 40,
        render(text: any, record: any, index: number) {
          return index + 1;
        },
      })
    }
    tempList.map((v: any) => {
      if (v.hidden) return
      const item: ColumnProps<any> = {
        title: v.fieldComment,
        key: v.fieldName,
        dataIndex: v.fieldName,
        width: v.fieldWidth || 100
      }
      if (v.editable && isEdit) {
        item.render = (text: any, row: any, index: number) => {
          if (['text', 'textarea','DatePicker','TimePicker'].includes(v.widgetType)) {
            return <TableInput type={INPUT_ENUMS[v.widgetType]} row={row} index={index} setVal={setData} str={v.fieldName} setValCb={setDataCb} />
          }
        }
      }
      columns.push(item)
    })
    setColumns(columns)
  }, [tempList])
  return columns
}