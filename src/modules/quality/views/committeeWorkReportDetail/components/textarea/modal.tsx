import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'src/vendors/antd'
import { message } from 'antd'

import { Report } from '../../types'
import { useInstance } from '../../hook/useModel'

const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function TextareaModal(props: Props) {
  let { sectionId, setData, data } = props
  const {instance} = useInstance() 
  let report: Report = (data ? data.value : {}) || {}
  let section = instance.getSection(sectionId)
  const keyName = section?.keyName ? section.keyName : ''
  const maxLength=section?.maxLength ? section.maxLength : 1000
  const updateData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxLength) {
      message.warn(`最多${maxLength}个字`)
      return
    }
    if (setData) {
      setData({
        value: {...report,[keyName]:e.target.value}
      })
    }
  }
  useEffect(() => {}, [])
  return (
    <Wrapper>
      <TextArea value={report[keyName]} onChange={updateData} autosize={true} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
`
