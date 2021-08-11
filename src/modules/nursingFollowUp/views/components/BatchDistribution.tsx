import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'antd'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isAdd?: boolean
}

export default function EidtModal(props: Props) {
  const { visible, isAdd, params, onOk, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [editParams, setEidtParams] = useState({} as any)
  const handleOk = () => {
  }

  const editPannel = () => {
        return <div>
          <Row>
            <Col span={6}>
              随访小组：
            </Col>
            <Col span={18}>
              <Select
                style={{ width: '100%' }}
                value={editParams.education}
                onChange={(education: any) => setEidtParams({
                  ...editParams,
                  education,
                })}>
                {/* {educationList.map((item: any) => <Option value={item.name} key={item.name}>{item.name}</Option>)} */}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              病种：
            </Col>
            <Col span={18}>
              <Select
                style={{ width: '100%' }}
                value={editParams.education}
                onChange={(education: any) => setEidtParams({
                  ...editParams,
                  education,
                })}>
                {/* {educationList.map((item: any) => <Option value={item.name} key={item.name}>{item.name}</Option>)} */}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              随访周期：
            </Col>
            <Col span={18}>
              <Select
                style={{ width: '100%' }}
                value={editParams.education}
                onChange={(education: any) => setEidtParams({
                  ...editParams,
                  education,
                })}>
                {/* {educationList.map((item: any) => <Option value={item.name} key={item.name}>{item.name}</Option>)} */}
              </Select>
            </Col>
          </Row>
        </div>
  }

  return <Modal
    title={'分配随访护士'}
    width={400}
    centered
    confirmLoading={loading}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Spin spinning={loading}>
        {editPannel()}
      </Spin>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  .ant-row{
    line-height: 32px;
    margin-bottom: 10px;

    &:last-of-type{
      margin-bottom: 0;
    }

    .ant-col:nth-of-type(2n-1){
      text-align: right;
      padding-right: 5px;
    }
    .star{
      color: red;
    }
  }
  
`