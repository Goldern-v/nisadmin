import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import classNames from 'classnames'
import { InputNumber, Select } from 'src/vendors/antd'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  value?: any
  onChange?: any
}

let dataSource = [{ name: '全部', code: '' },
{ name: '130', code:  '130'},{ name: '140', code:  '140'},{ name: '150', code:  '150'},{ name: '160', code:  '160'},
{ name: '170', code:  '170'},{ name: '180', code:  '180'},{ name: '190', code:  '190'},{ name: '200', code:  '200'},
{ name: '210', code:  '210'}]

export default function HeightRangePicker(props: Props) {
  let { value, onChange } = props
  const [heights, setHeights]: any = useState(['', ''])
  // const [heights, setHeights] = useState([undefined,undefined]);

  useEffect(() => {
    setHeights(value || ['', ''])
  }, [value])

  return (
    <Wrapper>
      {/* <InputNumber allowClear={true} value={heights && heights[0]} /> */}
      <Select
        allowClear={true}
        value={heights && heights[0]}
        onChange={(value: any) => {
          setHeights([value, heights[1]])
          onChange && onChange([value, heights[1]])
        }}
      >
        {dataSource.map((item) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <div className={'split'}>-</div>
      <Select
        allowClear={true}
        value={heights && heights[1]}
        onChange={(value: any) => {
          onChange && onChange([heights[0], value])
        }}
      >
        {dataSource.map((item) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      {/* <div className={'unit'}>月</div> */}
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
