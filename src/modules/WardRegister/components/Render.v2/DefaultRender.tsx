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
  multiple?: boolean,
  selectAll?: boolean,
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
    className,
    multiple,
    selectAll,
  } = props

  const [editValue, setEditValue] = useState('')
  const [open, setOpen] = useState(false)

  let _options = undefined as any[] | undefined

  if (options) {
    if (multiple && selectAll && options.length > 0) _options = ['全部', ...options]
    else _options = options
  }

  useEffect(() => {
    if (record[itemCode] !== editValue) setEditValue(record[itemCode])
  }, [record[itemCode]])

  return <AutoComplete
    className={className}
    disabled={cellDisabled(record)}
    dataSource={options}
    value={editValue}
    onFocus={() => setOpen(true)}
    onChange={(value: any) => {
      value = value ? value.replace(/\n/g, '') : ''
      setEditValue(value)
    }}
    onBlur={(payload: any) => {
      setOpen(false)
      onChange(editValue, itemCode, index)
    }}
    onSelect={(payload: any) => {
      if (multiple) {
        let newPayload = ''

        if (payload == '全部') {
          newPayload = options?.join(';') || ''
        } else {
          let editValueArr = editValue.split(';')
          if (editValueArr.indexOf(payload) >= 0)
            newPayload = editValue
          else
            newPayload = [...editValueArr, payload]
              .filter((str: string) => str).join(';')
        }

        setTimeout(() => setEditValue(newPayload))

        onSelect && onSelect(newPayload)
      } else {
        setOpen(false)
        onSelect && onSelect(payload)
      }
    }}
    open={open}>
    <TextArea
      autosize
      data-key={itemCode}
      onKeyUp={(e) => {
        if (e.keyCode == 40 || e.keyCode == 38)
          setOpen(true)

        if (e.keyCode == 27)
          setOpen(false)

        if (!multiple || !open)
          focusNextIpt && focusNextIpt(e)
      }}
      onClick={() => setOpen(true)}
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