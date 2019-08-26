import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {}

export default function ContextMenu() {
  return <Wrapper>Wrapper</Wrapper>
}

function createContextMenu() {
  let _SetShow: any = null
  return {
    Component: () => {
      const [show, SetShow] = useState(false)
      _SetShow = SetShow
      return show && <ContextMenu />
    },
    show() {
      _SetShow(true)
    },
    close() {
      _SetShow(false)
    }
  }
}
const Wrapper = styled.div``
