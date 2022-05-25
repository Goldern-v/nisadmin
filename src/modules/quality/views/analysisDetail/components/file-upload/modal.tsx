import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Input } from 'src/vendors/antd'
import { Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import { message } from 'antd'
import MultiFileUploader from 'src/components/MultiFileUploader'
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function FileUploaderModal(props: Props) {
  let { sectionId, setData, data } = props

  let value: any[] = (data ? data.value : []) || []
  const handleChange = (e: any[]) => {
    console.log('test-e', e)
    if (setData) {
      setData({
        value: e
      })
    }
  }
  return (
    <Wrapper>
      <MultiFileUploader maxSize={2097152} typeList={['jpeg','png', 'jpg', 'gif']} data={value} onChange={(e: any[])=> handleChange(e)} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
`
