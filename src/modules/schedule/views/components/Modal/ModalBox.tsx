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

interface Props {
  title: string
}

export default function ModalBox(props: Props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [contant, setContant] = useState('')
  const [configBox, setConfigBox] = useState(new Object() as any)
  const [boxWidth, setBoxWidth] = useState(400)
  // const [onOKFunc, setOnOKFunc] = useState(new Function())
  // let onOKFunc: any = null

  let onOK = () => {
    if (configBox.hasOwnProperty('onOK')) {
      configBox.onOK(true)
    }
    setModalVisible(false)
  }

  const afterClose = () => {}

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    emitter.removeAllListeners('打开弹框')
    emitter.removeAllListeners('关闭弹框')

    emitter.addListener('打开弹框', (config: any) => {
      // setModalVisible(true)
      setContant(config.contant)
      setConfigBox(config)
      if (config.width) {
        setBoxWidth(config.width)
      }
      open()
    })

    emitter.addListener('关闭弹框', () => {
      setModalVisible(false)
    })
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const open = () => {
    setModalVisible(true)
  }
  return (
    <Wrapper>
      <Modal
        title={props.title}
        centered
        destroyOnClose
        afterClose={afterClose}
        width={boxWidth}
        visible={modalVisible}
        onOk={onOK}
        onCancel={() => {
          setModalVisible(false)
          // message.success('onCancel')
        }}
      >
        {contant}
      </Modal>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .ant-modal-body > .ant-form-item {
    margin-bottom: 0px !important;
  }
  .ant-input-number-input {
    text-align: center !important;
  }
  .ant-modal-body > .ant-row {
    display: inline-flex !important;
  }
`
