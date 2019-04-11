import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, message } from 'antd'
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

export default function ModalBox (props: Props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [contant, setContant] = useState('')
  const [boxWidth, setBoxWidth] = useState(400)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    emitter.removeAllListeners('打开')
    emitter.removeAllListeners('关闭')

    emitter.addListener('打开弹框', (config: any) => {
      setModalVisible(true)
      console.log('打开弹框', config)
      setContant(config.contant)
      if (config.width) {
        setBoxWidth(config.width)
      }
    })

    emitter.addListener('关闭弹框', () => {
      setModalVisible(false)
    })
    //
    console.log(modalVisible, setModalVisible, open)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  const open = () => {
    setModalVisible(true)
  }
  return (
    <Wrapper>
      <Modal
        title={props.title}
        centered
        width={boxWidth}
        visible={modalVisible}
        onOk={() => message.success('onOk')}
        onCancel={() => {
          setModalVisible(false)
          message.success('onCancel')
        }}
      >
        {contant}
      </Modal>
    </Wrapper>
  )
}
const Wrapper = styled.colgroup`
  .ant-form-item {
    margin-bottom: 0px !important;
  }
  .ant-input-number-input {
    text-align: center !important;
  }
`
