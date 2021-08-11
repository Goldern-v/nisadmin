import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isAdd?: boolean
}


export default function AddDiseaseModal(props: Props) {
  const { visible, isAdd, params, onOk, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const { Option } = Select;
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  const handleChange = (e: any) => {
  }
  const children = [];
  for (let i = 1; i <= 12; i++) {
    children.push(<Option key={i}>{i}个月</Option>);
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
        <Input
          style={{ width: 300 }}
          value={searchText}
          onChange={onChangeSearchText}
        />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          随访周期：
        </Col>
        <Col span={16}>
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
          >
            {children}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          随访问卷：
        </Col>
        <Col span={16}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder=""
            onChange={handleChange}
          >
            {children}
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