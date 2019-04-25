import styled from 'styled-components'
import React, { useState, useEffect, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import { Place } from 'src/components/common'
import { Button, DatePicker, Select, message } from 'antd'

import DeptSelect from 'src/components/DeptSelect'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker

import { badEventViewModal } from 'src/modules/badEvents/views/BadEventViewModal'

import moment from 'moment'

const Option = Select.Option

const dateFormat = 'YYYY-MM-DD'

export interface Props {
  children?: ReactNode
  title: string
  btnList?: BtnType[]
}

interface BtnType {
  label: string
  type?: string
  format?: string
  placeholder?: string
  style?: any
  options?: any
  defaultValue?: any
  btnType?: any
  onChange?: (e: any) => void
  onClick?: (e: any) => void
}

export default function BaseLayout (props: Props) {
  const [count, setCount] = useState(0)
  const [monthStart, setMonthStart] = useState(() => {
    let date = new Date()
    let firstDay = date.setDate(1)
    return moment(firstDay).format(dateFormat)
  })
  const [defaultEndTime, setdefaultEndTime] = useState(() => {
    return new Date()
  })

  useEffect(() => {
    console.log(count, setCount, monthStart, setMonthStart, defaultEndTime, setdefaultEndTime)
  }, [])
  let { title, btnList } = props
  //
  let getInputElements = (item: BtnType, gindex: any) => {
    // switch (item.type) {
    console.log('getInputElements', item)
    if (item.type === 'button') {
      return (
        <Button
          style={item.style}
          type={item.btnType}
          className={'item-head'}
          key={'BTN' + item.label}
          onClick={item.onClick}
        >
          {item.label}
        </Button>
      )
    }
    // case 'datetime':
    if (item.type === 'datetime') {
      return (
        <div className='item-head' key={gindex}>
          <span style={{ padding: '10px 0' }}>{item.label}</span>
          <RangePicker
            defaultValue={[moment(monthStart, dateFormat), moment(defaultEndTime, dateFormat)]}
            format={item.format}
            onChange={item.onChange}
          />
        </div>
      )
    }
    // case 'select':
    if (item.type === 'select') {
      return (
        <div className='item-head'>
          <span>{item.label}</span>
          {item.label && item.label.indexOf('科室') === -1 ? (
            <Select
              defaultValue={item.defaultValue}
              showSearch
              style={item.style}
              placeholder={item.placeholder}
              onChange={item.onChange}
              key={gindex}
            >
              {item.options
                ? item.options.map((option: any, index: any) => (
                    <Option value={option.code} key={'CR-' + option.code + index}>
                      {option.name}
                    </Option>
                  ))
                : ''}
            </Select>
          ) : (
            <DeptSelect key={gindex} onChange={(e) => console.log(e)} />
          )}
        </div>
      )
    }
  }
  return (
    <Wrapper>
      <Head>
        {btnList && btnList.map((item: BtnType, index: any) => getInputElements(item, index))}
        <Place />
        {/* <Title>{title}</Title> */}
      </Head>
      <MainCon>{props.children}</MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  background: #f8f8f8;
  overflow: auto;
  /* padding: 20px 30px; */
  .item-head {
    margin: 0px 5px;
    display: inline-flex;
    span {
      padding: 5px 0;
    }
  }
`
const Head = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  /* .ant-btn {
    margin-left: 0px;
  } */
  height: 45px;
  width: calc(100% - 220px);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  /* position: relative; */
  padding: 0px 15px;
  position: fixed;
  background: #f8f8f8;
  z-index: 1;
`
const Title = styled.div`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`
const MainCon = styled.div`
  padding: 0px 15px;
  margin: 50px 0;
`
