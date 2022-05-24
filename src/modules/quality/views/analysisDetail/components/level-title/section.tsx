import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import { observer } from 'src/vendors/mobx-react-lite'
import OneLevelTitle from 'src/modules/quality/components/OneLevelTitle'
export interface Props {
  sectionTitle?: string | undefined
}

export default observer(function LevelTitleSection(props: Props) {
  let { sectionTitle } = props

  return (
    <Wrapper>
      <OneLevelTitle text={sectionTitle} />

    </Wrapper>
  )
})
const Wrapper = styled.div`
`
