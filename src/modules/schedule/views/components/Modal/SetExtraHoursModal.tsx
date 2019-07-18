import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
// import { RouteComponentProps } from 'react-router'

// {props.th.map((item, index) => (
//   <col key={index} width={item.width} />
// ))}
// export interface Props extends RouteComponentProps {
//   title: string
// }
import emitter from 'src/libs/ev'
import { Form, InputNumber, message } from 'src/vendors/antd'
import { scheduleStore } from 'src/stores'

interface Props {
  title: string
}

export default function SetExtraHoursModal(props: Props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [boxWidth, setBoxWidth] = useState(400)
  const [inputValue, setInputValue] = useState(0)
  const [shiftItem, setShiftItem]: any = useState({})
  const [config, setConfig] = useState<{
    obj: any
    refreshData: (obj: any) => void
  }>({
    obj: {},
    refreshData: () => {}
  })

  emitter.removeAllListeners('打开设置工时弹框')
  emitter.removeAllListeners('关闭设置工时弹框')

  emitter.addListener('打开设置工时弹框', (config: any) => {
    console.log(config, 'config')
    setConfig(config)
    setInputValue(config.obj.EffectiveTime)
    emitter.emit('根据班次code获取班次详情', config.obj.Name, (shiftItem: any) => {
      shiftItem = shiftItem || {}
      setShiftItem(shiftItem)
    })
    open()
  })

  emitter.addListener('关闭设置工时弹框', () => {
    setModalVisible(false)
  })

  const open = () => {
    setModalVisible(true)
  }
  const onOK = () => {
    let { refreshData } = config

    if (Number(inputValue) < shiftItem.effectiveTime) {
      return message.error('设置工时不能低于默认工时')
    }
    refreshData({
      EffectiveTime: inputValue
    })
    setModalVisible(false)
  }
  return (
    <Wrapper>
      <Modal
        title={props.title}
        centered
        destroyOnClose
        width={boxWidth}
        visible={modalVisible}
        onOk={onOK}
        onCancel={() => {
          setModalVisible(false)
          // message.success('onCancel')
        }}
      >
        <FormCon>
          <Info>
            {shiftItem.name}(默认{shiftItem.effectiveTime}小时)
          </Info>
          <Form layout={'inline'}>
            <Form.Item label='修改此班次工时：'>
              <InputNumber
                size={'default'}
                autoFocus
                value={inputValue}
                onChange={(value) => value !== undefined && setInputValue(value)}
              />
              <span style={{ marginLeft: 10 }}>小时</span>
            </Form.Item>
          </Form>
        </FormCon>
      </Modal>
    </Wrapper>
  )
}
const Wrapper = styled.div``
const FormCon = styled.div`
  .ant-modal-body > .ant-form-item {
    margin-bottom: 0px !important;
  }
  .ant-form-inline {
    text-align: center !important;
  }
  .ant-modal-body > .ant-row {
    display: inline-flex !important;
  }
`

const Info = styled.div`
  text-align: center;
  margin-bottom: 10px;
`
