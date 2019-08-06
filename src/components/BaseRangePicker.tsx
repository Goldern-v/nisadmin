import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import classNames from 'classnames'
import { DatePicker, Select } from 'src/vendors/antd'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  value?: any
  onChange?: any
  dataSource?: { name: any; code: any }[]
  unit?: string
}

// let dataSource = [{ name: '全部', code: '' }, ...numberToArray(100).map((item) => ({ name: item, code: item }))]

export default function BaseRangePicker(props: Props) {
  let { value, onChange, dataSource, unit } = props
  const [ages, setAges]: any = useState(['', ''])

  useEffect(() => {
    setAges(value || ['', ''])
  }, [value])

  return (
    <Wrapper>
      <Select
        value={ages && ages[0]}
        onChange={(value: any) => {
          setAges([value, ages[1]])
          onChange && onChange([value, ages[1]])
        }}
      >
        {dataSource &&
          dataSource.map((item) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
      </Select>
      <div className={'split'}>-</div>
      <Select
        value={ages && ages[1]}
        onChange={(value: any) => {
          onChange && onChange([ages[0], value])
        }}
      >
        {dataSource &&
          dataSource.map((item) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
      </Select>
      {unit && <div className={'unit'}>{unit}</div>}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  .ant-select {
    flex: 1;
  }
  .split {
    margin: 0 8px;
    color: #aaa;
  }
  .unit {
    margin-left: 8px;
  }
`
