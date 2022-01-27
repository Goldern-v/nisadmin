import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, InputNumber } from 'antd'
import Form from 'src/components/Form'
import { AutoComplete, Select } from 'src/vendors/antd'
export interface Props {
  dictList?: any[]
  onChange?: any
  unit?: string
  name?: any
  label?: string, 
  numberUntilInput?: boolean
  step?: number | string
}

export default function numberUntilSelect(props: Props) {
  let {onChange, step, numberUntilInput, dictList, unit, name, label} = props

  return (
    <Wrapper className="item">
      <Form.Field label={label} name={name.name}>
        {!numberUntilInput ? <Select className="select" placeholder='请选择'
        onChange={(value: any) => onChange && onChange(value)} 
        allowClear
        >
          {dictList?.map((item: any) => (
            <Select.Option value={item} key={item}>
              {item}
            </Select.Option>
          ))}
        </Select> :
        <InputNumber placeholder='请输入' className="InputNumber" step={step} min={0} />}
      </Form.Field>
      <div className={!numberUntilInput ? 'unit' : 'unitInputNumber'}>-</div>
      <Form.Field name={name.name1}>
        {!numberUntilInput ? <Select placeholder='请选择' className="select" onChange={(value: any) => onChange && onChange(value)} 
          allowClear={true}>
          {dictList?.map((item: any) => (
            <Select.Option value={item} key={item}>
              {item}
            </Select.Option>
          ))}
        </Select> : 
        <InputNumber placeholder='请输入' className="InputNumber" step={step} min={0} />}
      </Form.Field>
      <div className={!numberUntilInput ? 'unit' : 'unitInputNumber'}>{unit}</div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  .unit{
    margin: 5px 3px 0 90px;
  }
  .unitInputNumber{
    margin: 5px 3px 0 82px;
  }
  .select{
    width: 86px !important;
  }
  .InputNumber{
    width: 80px !important;
  }
`
