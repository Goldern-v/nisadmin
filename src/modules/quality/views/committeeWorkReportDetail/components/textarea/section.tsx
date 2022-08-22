import React from 'react'
import EditButton from 'src/modules/quality/components/EditButton'
import LevelTitle from 'src/modules/quality/components/LevelTitle'
import styled from 'styled-components'
import { observer } from 'src/vendors/mobx-react-lite'

import { useInstance } from '../../hook/useModel'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}

export default observer(function TextareaSection(props: Props) {
  let { sectionId, sectionTitle, keyName } = props
  const {instance} = useInstance() 
  let data = instance.getSectionData(sectionId)
  let value = (data ? data.value : {}) || {}
  return (
    <Wrapper>
      <LevelTitle level={data.level} text={sectionTitle} />
      <TextCon>{value[keyName]}</TextCon>
      <EditButton onClick={() =>instance.openEditModal(sectionId)}>编辑</EditButton>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 60px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
