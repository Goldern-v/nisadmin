import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Input, InputNumber, Modal, Row, Select, Icon } from 'antd'
import FormCreateModal from './FormCreateModal'
import DiseaseManageServices from '../diseaseManage/services/DiseaseManageServices'
import { message } from 'antd/es'
import FormPageBody from '../components/FormPageBody'

import { appStore, authStore } from 'src/stores'
const api = new DiseaseManageServices();
export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isOtherEmp?: boolean,
}
export default function SpeedDialModal(props: Props) {
  const { visible, onOk, onCancel, params, isOtherEmp } = props
  const handleCancel = () => {
    message.error('待开发！')
  }
  const handleOk = () => {
    message.error('待开发！')
    // setLoading(true)
    // api
    //   .saveOrUpdate(editParmas)
    //     .then(res => {
    //       setLoading(false)
    //       message.success('操作成功')
    //       onOk && onOk()
    //     }, () => setLoading(false))
  }

  return <Modal
    title={""}
    width={400}
    centered
    visible={visible}
    footer={null}
    onCancel={() => onCancel()}>
    <Wrapper>
      <h2 className='title'>快速拨号</h2>
      <div className='body'>
        <h3 className='tip'>即将呼叫此号码</h3>
        <div className='number'>159 9899 2617</div>
      </div>
      <div className='foot'>
        <Button
          className="mr-20"
          onClick={() => handleCancel()}>
          &nbsp;取消呼叫&nbsp;
        </Button>
        <Button
          type="primary"
          onClick={() => handleOk()}>
          &nbsp;立即呼叫&nbsp;
        </Button>

      </div>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  .title{
    text-align: center;
    border-bottom: 1px solid #cccccc;
  }
  .body{
    padding: 10px;
    .tip{
      margin-left: 10px;
    }
    .number{
      height: 40px;
      line-height: 40px;
      font-size: 47px;
      font-weight: 700;
      text-align: center;
    }
  }
  .foot{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .mr-20{
      margin-right: 20px;
    }
  }
  
`