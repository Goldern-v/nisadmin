import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, Modal, Row, Select } from 'antd'
import { observer } from 'mobx-react'
import { authStore } from 'src/stores'

const Option = Select.Option

export interface Props {
  editType: 'edit' | 'new',
  visible: boolean,
  editId?: string | number,
  onCancel: Function,
  onOk: Function
}

export default observer(function SatisfyInvestigationEditModal(props: Props) {
  const { editId, visible, onCancel, onOk } = props
  const [satisfiedInstance, setSatisfiedInstance] = useState({} as any)
  const [satisfiedDetail, setSatisfiedDetail] = useState([] as any[])

  return (
    <Modal
      title="满意度调查表编辑"
      centered
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => onOk()}
    >
      <Wrapper>
        <Row>
          <Col span={6}>标题</Col>
          <Col span={18}>
            <Input value={satisfiedInstance.title} />
          </Col>
        </Row>
        <Row>
          <Col span={6}>科室</Col>
          <Col span={18}>
            <Select
              showSearch
              filterOption={(input: any, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              value={satisfiedInstance.wardCode}
              onChange={(val: string) => {
                let target = authStore.deptList.find((dept: any) => dept.code === val)

                setSatisfiedInstance({
                  ...satisfiedInstance,
                  wardCode: val,
                  wardName: target?.name || ''
                })
              }}>
              {authStore.deptList.map((dept: any) => <Option value={dept.code} key={dept.code}>{dept.name}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={6}>标题</Col>
          <Col span={18}>
            <Input value={satisfiedInstance.title} />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div``