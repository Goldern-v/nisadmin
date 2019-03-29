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

interface Props {
  title: string
}

export default function ModalBox (props: Props) {
  const [modalVisible, setModalVisible] = useState(true)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    console.log(modalVisible, setModalVisible)
  }, []) // <= 执行初始化操作，需要注意的是，如果你只是想在渲染的时候初始化一次数据，那么第二个参数必须传空数组。

  return (
    <Wrapper>
      <Modal
        title={props.title}
        centered
        visible={modalVisible}
        onOk={() => message.success('onOk')}
        onCancel={() => {
          setModalVisible(false)
          message.success('onCancel')
        }}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </Wrapper>
  )
}
const Wrapper = styled.colgroup``
