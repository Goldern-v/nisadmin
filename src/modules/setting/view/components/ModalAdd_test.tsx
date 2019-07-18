import styled from 'styled-components'
import React, { useState } from 'react'
import { Modal, Button } from 'antd'

// import React, { useState, useEffect } from 'react'
export interface Props {
  // showModal: () => void
  addButtonClick: () => void
}
export default function BedSituation (props: Props) {
  const [visible, setVisible] = useState(false)
  // Props.showModal = () => {
  //   setVisible(true)
  // }

  const handleOk = (e: any) => {
    setVisible(false)
  }
  const handleCancel = (e: any) => {
    setVisible(false)
  }
  // 
  // useEffect(() => {
  //   
  // })
  return (
    <div>
      <Con>demo</Con>
      <Modal title='Basic Modal' visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

const Con = styled.div`
  width: 100%;
`
