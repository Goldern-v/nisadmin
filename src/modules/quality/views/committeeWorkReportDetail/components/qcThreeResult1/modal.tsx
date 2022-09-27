import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from 'src/vendors/antd'
import { message } from 'antd'

import { useInstance } from '../../hook/useModel'

const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default function QcThreeResult1Modal(props: Props) {
  let { sectionId, setData, data } = props
  const {instance} = useInstance()
  let value: any = (data ? data.value : {}) || {}
  let section = instance.getSection(sectionId)
  const maxLength=section?.maxLength ? section.maxLength : 1000
  const updateData = (e: any, key:string) => {
    if (key === 'lastProblem' && e.target.value.length > maxLength) {
      message.warn(`最多${maxLength}个字`)
      return
    }
    if (setData) {
      setData({
        value: {...value,[key]:e.target.value}
      })
    }
  }
  useEffect(() => {
  }, [])
  return (
    <Wrapper>
      <TextArea value={value.lastProblem} onChange={(e) => updateData(e, 'lastProblem')} autosize={true} />
      <div className='line-2'>
        质控项目：
        <Input value={value.checkPeople} onChange={(e) => updateData(e, 'checkPeople')}/>
        质控组检查成员：
        <Input value={value.item} onChange={(e) => updateData(e, 'item')}/>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  textarea {
    min-height: 200px !important;
    resize: none;
  }
  .line-2 {
    display: flex;
    align-items: center;
    padding: 10px 0px;
    .ant-input {
      width: 200px;
    }
  }

`
