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
    title={'表单详情'}
    width={1000}
    centered
    confirmLoading={loading}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  
  
`