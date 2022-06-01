import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'

import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from 'src/modules/quality/components/OneLevelTitle'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import { getModal } from '../../AnalysisDetailModal'
export interface Props {
  sectionTitle?: string | undefined
  sectionId?: string | undefined
}

export default observer(function LevelTitleSection(props: Props) {
  let { sectionTitle, sectionId = '' } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId)
  let level: number = (data ? data.level : 1)
  return (
    <Wrapper>
      {level == 1 && <OneLevelTitle text={sectionTitle} />}
      {level == 2 && <TwoLevelTitle text={sectionTitle} />}

    </Wrapper>
  )
})
const Wrapper = styled.div`
`
