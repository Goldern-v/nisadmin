import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import MultiFileUploader from 'src/components/MultiFileUploader'
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function FileUploaderModal(props: Props) {
  let { sectionId, setData, data } = props

  let list: any = (data ? data.list : []) || []
  const handleChange = (e: any[]) => {
    if (setData) {
      setData({
        list: e.map((v: any) => ({name: v.name, path: v.path}))
      })
    }
  }
  return (
    <Wrapper>
      <MultiFileUploader type="summaryReport" maxSize={2097152} typeList={['jpeg','png', 'jpg', 'gif']} data={list} onChange={(e: any[])=> handleChange(e)} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
`
