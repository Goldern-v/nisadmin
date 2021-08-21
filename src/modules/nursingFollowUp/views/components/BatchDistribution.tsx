import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Col, Modal, Row, Select, Spin } from 'antd'
import FollowUpPatientsManageServices from '../followUpPatientsManage/services/FollowUpPatientsManageServices'
import { ModalComponentProps } from 'src/libs/createModal'
import { message } from 'antd/es'

export interface Props {
  templateList: any,
  diseaseList: any,
  patientId: any,
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
  isAdd?: boolean,
}

const api = new FollowUpPatientsManageServices();
export default function BatchDistribution(props: Props) {
  const { visible, onOk, onCancel, isAdd, params, isOtherEmp, templateList, diseaseList, patientId } = props
  const [loading, setLoading] = useState(false)
  const [editParams, setEidtParams] = useState({} as any)
  const [selectedTemplate1, setSelectedTemplate1]: any = useState([])
  const [selectedTemplate2, setSelectedTemplate2]: any = useState([])
  const [selectedTemplate3, setSelectedTemplate3]: any = useState([])
  const [periodsList, setPeriodsList]: any = useState([])
  const cancel = () => {
    setSelectedTemplate1([])
    setSelectedTemplate2([])
    setSelectedTemplate3([])
  }
  const handleOk = () => { 
    let allotVisitTeamList:any = []
    if(props.patientId.length > 0) {
      props.patientId.map((item: any, index: number) => (
        allotVisitTeamList.push({
          patientId:item,
          teamId:selectedTemplate1,
          periods:selectedTemplate3,
          diseaseTypeIdList:selectedTemplate2,
        })
      ))
    }else{
      allotVisitTeamList.push({
        patientId:props.params.patientId,
        teamId:selectedTemplate1,
        periods:selectedTemplate3,
        diseaseTypeIdList:selectedTemplate2,
      })
    }
    if (selectedTemplate1.length == 0) {
      message.error('随访小组不能为空')
      return
    }
    if (selectedTemplate2.length == 0) {
      message.error('病种不能为空')
      return
    }
    if (selectedTemplate3.length == 0) {
      message.error('随访周期不能为空')
      return
    }
    setLoading(true)
    api.allotVisitTeam({allotVisitTeamList:allotVisitTeamList}).then(res => {
      setLoading(false)
      message.success('操作成功')
      onOk && onOk()
    })
    
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
            <Select mode="multiple" style={{ width: '100%' }} value={selectedTemplate2} onChange={(value: any) => {
              setSelectedTemplate2(value)
              setSelectedTemplate3([])
              
              api.getByPeriodsListByDiseaseTypeId({diseaseTypeIdList:value}).then(res => {
                setPeriodsList(res.data.periodsList)
              })
              
              }
            }>
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
              {periodsList.map((item: any, index: number) => (
                <Select.Option key={index} value={item}>
                  {item}个月
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
    afterClose={() => cancel()}
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