import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Col, Modal, Row, Select, Spin } from 'antd'
import FollowUpPatientsManageServices from '../followUpPatientsManage/services/FollowUpPatientsManageServices'
import { ModalComponentProps } from 'src/libs/createModal'
export interface Props extends ModalComponentProps {
  templateList: any,
  diseaseList: any,
}
const api = new FollowUpPatientsManageServices();
export default function BatchDistribution(props: Props) {
  const { visible, onCancel,  } = props
  const [loading, setLoading] = useState(false)
  const [editParams, setEidtParams] = useState({} as any)
  const [selectedTemplate1, setSelectedTemplate1]: any = useState('')
  const [selectedTemplate2, setSelectedTemplate2]: any = useState('')
  const [selectedTemplate3, setSelectedTemplate3]: any = useState('')
  const handleOk = () => { 
  }
  
  const editPannel = (props:Props) => {
       let templateList = props.templateList || []
       let diseaseList = props.diseaseList || []
        return <div>
          <Row>
            <Col span={6}>
              随访小组
            </Col>
            <Col span={18}>
            <Select style={{ width: '100%' }} value={selectedTemplate1} onChange={(value: any) => setSelectedTemplate1(value)}>
              {templateList.map((item: any, index: number) => (
                <Select.Option key={index} value={item.teamId}>
                  {item.teamName}
                </Select.Option>
              ))}
            </Select>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              病种：
            </Col>
            <Col span={18}>
            <Select style={{ width: '100%' }} value={selectedTemplate2} onChange={(value: any) => setSelectedTemplate2(value)}>
              {diseaseList.map((item: any, index: number) => (
                <Select.Option key={index} value={item.diseaseTypeId}>
                  {item.diseaseTypeName}
                </Select.Option>
              ))}
            </Select>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              随访周期：
            </Col>
            <Col span={18}>
            <Select style={{ width: '100%' }} value={selectedTemplate3} onChange={(value: any) => setSelectedTemplate3(value)}>
              {diseaseList.map((item: any, index: number) => (
                <Select.Option key={index} value={item.periods}>
                  {item.periods}
                </Select.Option>
              ))}
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
        {editPannel(props)}
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