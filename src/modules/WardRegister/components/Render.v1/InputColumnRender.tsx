// import styled from 'styled-components'
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
  onBlur?: Function,
  multiple?: boolean,
  selectAll?: boolean
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
    selectAll,
    onBlur,
    onSelect,
    multiple,
  } = porps

  const [editValue, setEditValue] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (record[itemCode] !== editValue)
      setEditValue(record[itemCode])
  }, [record[itemCode]])

  let _options = undefined as any[] | undefined

  if (options) {
    if (multiple && selectAll && options.length > 0) _options = ['全部', ...options]
    else _options = options
  }

  return <AutoComplete
    className={className || ''}
    disabled={cellDisabled(record)}
    dataSource={_options}
    value={editValue}
    onChange={value => {
      value = value ? value.toString().replace(/\n/g, '') : ''
      setEditValue(value)
    }}
    onFocus={() => setOpen(true)}

    onBlur={() => {
      setOpen(false)

      let oldVal = record[itemCode]

      if (record[itemCode] !== editValue) {
        record.modified = true
        record[itemCode] = editValue;
        updateDataSource()
      }
      onBlur && onBlur(editValue, oldVal)
    }}
    onSelect={(payload: any) => {
      if (multiple) {
        let newPayload = ''

        if (payload == '全部') {
          newPayload = options?.join(';') || ''
        } else {
          let editValueArr = (editValue || '').split(';')
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
      autosize={{ minRows: 1 }}
      data-key={itemCode}
      onClick={() => setOpen(true)}
      onKeyUp={(e) => {
        if (e.keyCode == 40 || e.keyCode == 38)
          setOpen(true)

        if (e.keyCode == 27)
          setOpen(false)

        if (!multiple || !open)
          handleNextIptFocus && handleNextIptFocus(e)
      }}
      style={{
        lineHeight: 1.2,
        overflow: "hidden",
        padding: "9px 2px",
        textAlign: "center"
      }}
    />
  </AutoComplete>
}