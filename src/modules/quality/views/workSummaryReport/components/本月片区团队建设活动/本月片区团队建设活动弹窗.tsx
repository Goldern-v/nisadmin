import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input } from 'src/vendors/antd'

import { cloneJson } from 'src/utils/json/clone'
import { Report } from '../../types'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function 本月片区团队建设活动弹窗(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { text: '' })

  const updateData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setData) {
      setData({
        text: e.target.value
      })
    }
  }
  useEffect(() => { }, [])
  return (
    <Wrapper>
      <TextArea value={cloneData.text} onChange={updateData} autosize={true} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
`
