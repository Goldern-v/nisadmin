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
import { Form, InputNumber } from 'src/vendors/antd'
import { scheduleStore } from 'src/stores'

interface Props {
  title: string
}

export default function SetExtraHoursModal(props: Props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [boxWidth, setBoxWidth] = useState(400)
  const [inputValue, setInputValue] = useState(0)
  const [config, setConfig] = useState<{
    label: string
    obj: any
    key: string
    refreshData: (newLabel: string) => void
  }>({
    label: '',
    obj: {},
    key: '',
    refreshData: () => {}
  })

  emitter.removeAllListeners('打开设置工时弹框')
  emitter.removeAllListeners('关闭设置工时弹框')

  emitter.addListener('打开设置工时弹框', (config: any) => {
    console.log(config, 'configconfig')
    setConfig(config)
    let str = config.label

    let extraObj = scheduleStore.hasExtraWord(str)
    extraObj && setInputValue(Number(extraObj!.effectiveTime))

    open()
  })

  emitter.addListener('关闭设置工时弹框', () => {
    setModalVisible(false)
  })

  const open = () => {
    setModalVisible(true)
  }
  const onOK = () => {
    let { obj, key, label, refreshData } = config
    let newLabel = label.replace(/\(.*?\)/g, '') + `(${inputValue}h)`
    obj[key] = newLabel
    console.log(obj, 'obj')
    refreshData(newLabel)
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
          <Form layout={'inline'}>
            <Form.Item label='工时(小时)：'>
              <InputNumber
                size={'default'}
                autoFocus
                value={inputValue}
                onChange={(value) => value !== undefined && setInputValue(value)}
              />
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
