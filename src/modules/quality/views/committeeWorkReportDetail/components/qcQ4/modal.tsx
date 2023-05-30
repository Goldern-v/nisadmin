import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'src/vendors/antd'
import { message } from 'antd'
import { Obj } from 'src/libs/types'
import { numToChinese } from 'src/utils/number/numToChinese'
import { cloneJson } from 'src/utils/json/clone'

import { Report } from '../../types'
import { useInstance } from '../../hook/useModel'

const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function QcQ4Modal(props: Props) {
  let { sectionId, setData, data } = props
  const { instance } = useInstance()
  let list = (data ? data.list : []) || []
  let section = instance.getSection(sectionId)
  const maxLength = section?.maxLength ? section.maxLength : 1000
  const updateData = (e: React.ChangeEvent<HTMLTextAreaElement>, idx: number) => {
    if (e.target.value.length > maxLength) {
      message.warn(`最多${maxLength}个字`)
      return
    }
    if (setData) {
      const item = { ...list[idx], majorProblem: e.target.value }
      setData((v: any) => {
        const cloneData = cloneJson(v)
        cloneData.list[idx] = item
        return cloneData
      })
    }
  }
  useEffect(() => { }, [])
  return (
    <Wrapper>
      {
        list.map((v: Obj, i: number) =>
        <>
          <div key={`${i}-1`}>{numToChinese(i+1)}、{v.formName}</div>
          <TextArea key={`${i}-2`} value={v.majorProblem} onChange={(e) =>updateData(e,i)} autosize={true} />
        </>)
      }
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
`
