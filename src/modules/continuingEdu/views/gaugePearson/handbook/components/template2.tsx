import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'

export interface IProps {
  info?: any
}
export default observer(function Template2(props: IProps) {
  return (
    <Wrapper>
      2
    </Wrapper>
  )
})

const Wrapper = styled.div`

`
