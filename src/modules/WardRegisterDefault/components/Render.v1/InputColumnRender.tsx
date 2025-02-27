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
  selectAll?: boolean
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
  const [newOptions, setNewOptions] = useState(_options)
  const [multiSearchFlag, setMultiSearchFlag] = useState(false)
  useLayoutEffect(() => {
    if (editVisible) {
      let el = document.getElementById(id)
      let inputEl = el?.querySelector('textarea')
      if (inputEl) inputEl.focus()
    }
  }, [editVisible])

  const handleSearch = (val: string) => {
    if (_options && _options.length > 0 && ['whyx', 'lyyz', 'qhwy', 'whhk', 'dglb'].includes(appStore.HOSPITAL_ID)) {

      if (multiple) {
        val = val.slice(val.lastIndexOf(';') + 1)
        if (val) {
          setMultiSearchFlag(true)
        }
      }
      setNewOptions(val ? _options?.filter(v => v.indexOf(val) > -1) : _options)
    }
  }

  const shiftColor = (record: any) => {
    if (['whyx', 'whhk'].includes(appStore.HOSPITAL_ID) && record['班次'] && itemCode == '班次') {
      if (editValue == 'A班') {
        return 'green'
      } else if (editValue == 'P班') {
        return 'blue'
      } else if (editValue == 'N班') {
        return 'yellow'
      } else {
        return 'gray'
      }
    } else {
      return ''
    }
  }

  return editVisible ? (
    <AutoComplete
      className={className || ''}
      id={id}
      disabled={cellDisabled(record)}
      dataSource={newOptions}
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
      onSearch={handleSearch}
      onSelect={(payload: any) => {
        if (multiple) {
          let newPayload = ''

          if (payload == '全部') {
            newPayload = options?.join(';') || ''
          } else {
            let editValueArr = (editValue || '').split(';')
            if (multiSearchFlag) {
              editValueArr.pop()
              setMultiSearchFlag(false)
            }
            if (editValueArr.indexOf(payload) >= 0)
              newPayload = editValue
            else
              newPayload = [...editValueArr, payload]
                .filter((str: string) => str).join(';')
          }

          setTimeout(() => setEditValue(newPayload))
          console.log("newPayload===",newPayload);
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
        className={!cellDisabled(record) ? 'focus-allow' : 'focus-disabled'}
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
        !cellDisabled(record) ? 'focus-allow' : 'focus-disabled',
        shiftColor(record)
      ].join(' ')}
      onClick={() => {
        if (!cellDisabled(record)) {
          setEditVisible(true)
        }
      }}>
      <span>{editValue}</span>
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
  &.green {
    background: #32b378;
    color: #fff;
  }
  &.blue {
    background: #007aff;
    color: #fff;
  }
  &.yellow {
    background: #ffa500;
    color: #fff;
  }
  &.gray {
    background: #999999;
    color: #fff;
  }
`