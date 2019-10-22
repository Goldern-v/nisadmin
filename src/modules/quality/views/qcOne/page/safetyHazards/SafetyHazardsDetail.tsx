import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Row, Col, Select, Input } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore } from 'src/stores'
import BaseTabs from 'src/components/BaseTabs'
import Table from './components/Table'
import Form from 'src/components/Form'
export interface Props {}

export default function SafetyHazardsDetail() {
  const [activeKey, setActiveKey] = useState('1')
  const refForm = React.createRef<Form>()
  return (
    <Wrapper>
      <BreadcrumbBox
        data={[
          {
            name: '物品交接登记本',
            link: '/wardRegister'
          },
          {
            name: '物品交接登记本设置'
          }
        ]}
      />
      <PageHeader>
        <PageTitle>物品交接登记本设置</PageTitle>
        <Place />
        <Button>保存</Button>
        <Button onClick={() => appStore.history.push('/wardRegister')}>返回</Button>
      </PageHeader>
      <Line />
      <PageHeader style={{ marginTop: 10 }}>
        <span className='label'>排查日期:</span>
        <DatePicker.RangePicker allowClear={false} style={{ width: 220 }} />
        <span className='label'>科室:</span>
        <DeptSelect onChange={() => {}} />
      </PageHeader>
      <Table />
      <FormCon>
        <Form ref={refForm} labelWidth={150}>
          <Row>
            <Col span={24}>
              <Form.Field label={`需协助科室`} name='publicDate' required>
                <Select />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`需大科协调的问题`} name='publicDate' required>
                <Input.TextArea />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`需护理部协调的问题`} name='publicDate' required>
                <Input.TextArea />
              </Form.Field>
            </Col>
            <Col span={24}>
              <Form.Field label={`查新及建议`} name='publicDate' required>
                <Input.TextArea />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </FormCon>
    </Wrapper>
  )
}
const Wrapper = styled.div``

const Line = styled.div`
  border-top: 1px solid #d8d8d8;
`
const FormCon = styled.div`
  margin: 20px 30px;
  width: 700px;
`
