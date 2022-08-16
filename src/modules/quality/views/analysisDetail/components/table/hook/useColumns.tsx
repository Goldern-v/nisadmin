import { ColumnProps } from "antd/es/table"
import React, { useEffect, useState } from "react"
import TableInput from '../../common/TableInput'
/**
 * tempList 后端table模板
 * isEdit 是否编辑
 * setData 设置数据回调
 */
interface Props {
  tempList: any[]
  isEdit?: boolean
  setData?: Function
}
const INPUT_ENUMS = {
  textarea: 'TextArea',
  DatePicker:'DatePicker',
  TimePicker:'TimePicker'

}
export const useColumns = (props: Props) => {
  const { tempList, isEdit = false, setData } = props
  const [columns, setColumns] = useState<ColumnProps<any>[]>([])
  useEffect(() => {
    const columns: ColumnProps<any>[] = []
    tempList.map((v: any) => {
      if (v.hidden) return
      const item: ColumnProps<any> = {
        title: v.fieldComment,
        key: v.fieldName,
        dataIndex: v.fieldName,
      }
      if (v.fieldWidth) item.width = v.fieldWidth
      if (v.editable && isEdit) {
        item.render = (text: any, row: any, index: number) => {
          if (['text', 'textarea','DatePicker','TimePicker'].includes(v.widgetType)) {
            return <TableInput type={INPUT_ENUMS[v.widgetType]} row={row} index={index} setVal={setData} str={v.fieldName} />
          }
        }
      }
      columns.push(item)
    })
    setColumns(columns)
  }, [tempList])
  return columns
}