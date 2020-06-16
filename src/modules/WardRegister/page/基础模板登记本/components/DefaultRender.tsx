import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { AutoComplete, Input } from 'antd'

const TextArea = Input.TextArea

/**带下拉选项的输入框 */
export interface Props {
  cellDisabled: Function,
  options?: string[] | undefined,
  record: any,
  itemCode: string,
  index: number,
  onChange: Function,
  onSelect?: any,
  focusNextIpt?: any,
  className?: string,
}

export default function DefaultRender(props: Props) {
  const {
    cellDisabled,
    record,
    options,
    itemCode,
    index,
    onChange,
    focusNextIpt,
    onSelect,
    className
  } = props

  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    if (record[itemCode] !== editValue) setEditValue(record[itemCode])
  }, [record[itemCode]])

  return <AutoComplete
    className={className}
    disabled={cellDisabled(record)}
    dataSource={options}
    value={editValue}
    onSelect={onSelect}
    onChange={(value: any) => {
      value = value.replace(/\n/g, '')
      setEditValue(value)
    }}
    onBlur={() => onChange(editValue, itemCode, index)}>
    <TextArea
      autosize
      data-key={itemCode}
      onKeyUp={focusNextIpt}
      style={{
        lineHeight: 1.2,
        padding: "9px 2px",
        textAlign: "center",
        overflow: 'hidden'
      }}
    />
  </AutoComplete>
}
const Wrapper = styled.div``