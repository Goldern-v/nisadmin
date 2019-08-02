import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Form from 'src/components/Form'
import { Row, Col, DatePicker, Input, Select } from 'src/vendors/antd'
import { PageObj, filterItem } from '../config/getPageObj'
export interface Props {
  pageObj: PageObj
}

export default function FilterCon(props: Props) {
  let { pageObj } = props
  let refForm = React.createRef<Form>()
  const onFieldChange = () => {}

  const getComponent = (item: filterItem) => {
    switch (item.type) {
      case 'select': {
        return (
          <Select>
            {item.dataSource.map((item, index) => (
              <Select.Option value={item.code} key={index}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        )
      }
      case 'input': {
        return <Input />
      }
    }
  }

  return (
    <Wrapper>
      <Form ref={refForm} labelWidth={120} onChange={onFieldChange}>
        <Row>
          {pageObj.filterList.map((item, index) => (
            <Col span={6} key={index}>
              <Form.Field label={item.label} name={item.name}>
                {getComponent(item)}
              </Form.Field>
            </Col>
          ))}
        </Row>
      </Form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  min-height: 100px;
  margin-top: 10px;
  padding: 25px 30px 0 0;
`
