import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Input } from 'src/vendors/antd'

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function TitleModal(props: Props) {
  let { sectionId, setData, data } = props
  let text = data ? data.text : ''

  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setData) {
      setData({
        text: e.target.value
      })
    }
  }
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <Input value={text} onChange={updateData} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  text {
    min-height: 200px !important;
    resize: none;
  }
`
