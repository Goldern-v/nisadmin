import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input } from 'src/vendors/antd'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 不良事件发生时段弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let text = data ? data.text : ''

  const updateData = (e: any) => {
    if (setData) {
      setData({
        text: e.target.value
      })
    }
  }

  useEffect(() => { }, [])

  return (
    <Wrapper>
      <Input.TextArea value={text} onChange={updateData} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  text {
    min-height: 200px !important;
    resize: none;
  }
`
