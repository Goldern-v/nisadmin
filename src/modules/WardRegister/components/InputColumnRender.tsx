import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { AutoComplete, Input } from 'antd'

const TextArea = Input.TextArea

export interface Props {
  className?: string,
  cellDisabled: any,
  record: any,
  itemCode: string | number,
  options?: any[],
  onSelect?: any,
  updateDataSource: any,
  handleNextIptFocus: any,
  onBlur?: any
}

export default function InputColumnRender(porps: Props) {
  const {
    className,
    cellDisabled,
    record,
    options,
    itemCode,
    updateDataSource,
    handleNextIptFocus,
    onBlur,
    onSelect,
  } = porps

  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    if (record[itemCode] !== editValue)
      setEditValue(record[itemCode])
  }, [record[itemCode]])

  return <AutoComplete
    className={className || ''}
    disabled={cellDisabled(record)}
    dataSource={options || undefined}
    value={editValue}
    onChange={value => {
      value = value ? value.toString().replace(/\n/g, '') : ''
      setEditValue(value)
    }}

    onBlur={() => {
      if (record[itemCode] !== editValue) {
        record.modified = true
        record[itemCode] = editValue;
        updateDataSource()
      }
      onBlur && onBlur(editValue)
    }}
    onSelect={onSelect || undefined}
  >
    <TextArea
      autosize={{ minRows: 1 }}
      data-key={itemCode}
      onKeyUp={handleNextIptFocus}
      style={{
        lineHeight: 1.2,
        overflow: "hidden",
        padding: "9px 2px",
        textAlign: "center"
      }}
    />
  </AutoComplete>
}