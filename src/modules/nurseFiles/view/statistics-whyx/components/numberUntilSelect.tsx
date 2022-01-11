import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Form from 'src/components/Form'
import { AutoComplete, Select } from 'src/vendors/antd'
export interface Props {
  dictList?: any[]
  onChange?: any
  value?: any
  unit?: string
  name?: any
  label?: string
}

export default function numberUntilSelect(props: Props) {
  let {onChange, value, dictList, unit, name, label} = props
  // let list: any= []
  // for (let i = 0; i < 100; i++) {
  //   list.push(i)
  // }
  return (
    <Wrapper className="item">
      <Form.Field label={label} name={name.name}>
        <Select className="select"
        onChange={(value: any) => onChange && onChange(value)} 
        allowClear
        value={value}
        >
          {dictList?.map((item: any) => (
            <Select.Option value={item} key={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Field>
      <div className='unit'>-</div>
      <Form.Field name={name.name1}>
        <Select className="select" onChange={(value: any) => onChange && onChange(value)} 
        allowClear={true} value={value}>
          {dictList?.map((item: any) => (
            <Select.Option value={item} key={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Field>
      <div className='unit'>{unit}</div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25% !important;
  .unit{
    margin: 5px 3px 0 92px;
  }
  .select{
    width: 89px !important;
  }
`
