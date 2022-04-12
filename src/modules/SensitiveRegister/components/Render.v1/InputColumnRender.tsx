// import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { AutoComplete, Input } from 'antd'
import styled from 'styled-components'
import { appStore } from 'src/stores'

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
  selectAll?: boolean,
  /**登记本类型 */
  registerCode?: string,
}

const getId = () => {
  return `input${new Date().getTime()}${parseInt((Math.random() * 1000000000000).toString())}`
}

export default function InputColumnRender(props: Props) {
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
    registerCode,
  } = props

  const [editValue, setEditValue] = useState('')
  const [editVisible, setEditVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [id] = useState(getId())

  useEffect(() => {
    if (record[itemCode] !== editValue)
      setEditValue(record[itemCode])
  }, [record[itemCode]])

  let _options = undefined as any[] | undefined

  if (options) {
    if (multiple && selectAll && options.length > 0) _options = ['全部', ...options]
    else _options = options
  }

  useLayoutEffect(() => {
    if (editVisible) {
      let el = document.getElementById(id)
      let inputEl = el?.querySelector('textarea')
      if (inputEl) inputEl.focus()
    }
  }, [editVisible])

  return editVisible ? (
    <AutoComplete
      className={className || ''}
      id={id}
      disabled={cellDisabled(record, {itemCode})}
      dataSource={_options}
      value={editValue}
      onChange={value => {
        value = value ? value.toString().replace(/\n/g, '') : ''
        setEditValue(value)
      }}
      onFocus={() => setOpen(true)}

      onBlur={() => {
        setOpen(false)
        setEditVisible(false)

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
        className={!cellDisabled(record, {itemCode}) ? 'focus-allow' : 'focus-disabled'}
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
  ) : (
    <TextRender
      className={[
        className || '',
        !cellDisabled(record, {itemCode}) ? 'focus-allow' : 'focus-disabled'
      ].join(' ')}
      onClick={() => {
        if (!cellDisabled(record, {itemCode})) {
          setEditVisible(true)
        }
      }}>
      <span>{['fqfybjy'].includes(appStore.HOSPITAL_ID) && registerCode === 'QCRG_22_3' && editValue !== '' && (itemCode + '').indexOf('率') > -1 && !isNaN(Number(editValue)) ? Number(editValue) * 100 + '%' : editValue}</span>
    </TextRender>
  )
}

const TextRender = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  .focus-disabled{
    cursor: not-allowed;
  }
  span{
    word-break: break-all;
    vertical-align: middle;
    display: inline-block;
    width: calc(100% - 1px);
  }
  &::after{
    content: '';
    display: inline-block;
    width: 1px;
    height: 100%;
    vertical-align: middle;
  }
`