import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import BaseTable from 'src/components/BaseTable'
import { DoCon } from 'src/components/BaseTable'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isAdd?: boolean
}


export default function AddDiseaseModal(props: Props) {
  const { visible, isAdd, params, onOk, onCancel } = props
  const [editUserType, setEditUserType] = useState('1')
  const [loading, setLoading] = useState(false)
  const [editParams, setEidtParams] = useState({} as any)
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  
  const addFollowUpGroup = () => {}

  //删除
  const onDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除该记录吗',
      centered: true,
      onOk: () => {
        // setPageLoading(true)

        // wardLogService
        //   .deleteRecord(record.id)
        //   .then(res => {
        //     message.success('删除成功', 1, () => getData())
        //   }, err => setPageLoading(false))

      }
    })
  }

  

  const handleOk = () => {
    // let currentRules = rules(userType) as any
    // let errMsgList = []
    // let ruleKeys = Object.keys(currentRules)
    // for (let key in currentRules) {
    //   let item = currentRules[key]
    //   let val = editParams[key] || ''
    //   for (let i = 0; i < item.length; i++) {
    //     let rule = item[i]
    //     let result = rule(val)
    //     if (result !== true) errMsgList.push(result)
    //   }
    // }

    // if (errMsgList.length > 0) {
    //   Modal.error({
    //     title: '提示',
    //     content: <div>
    //       {errMsgList.map((text: string, idx: number) => <div key={idx}>{text}</div>)}
    //     </div>
    //   })
    //   return
    // }

    // let saveParams = { ...editParams }
    // if (isAdd) saveParams.userType = editUserType

    // setLoading(true)
    // otherEmpService
    //   .addOrUpdatePerson(saveParams)
    //   .then(res => {
    //     setLoading(false)
    //     message.success('操作成功')
    //     onOk && onOk()
    //   }, () => setLoading(false))
  }
  

  return <Modal
    title={'添加疾病'}
    width={500}
    centered
    confirmLoading={loading}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Row>
            <Col span={6}>
              疾病名称：
            </Col>
            <Col span={16}>
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
            <Col span={16}>
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
              随访问卷：
            </Col>
            <Col span={16}>
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