import { observer } from 'mobx-react'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { handbookModel as model } from '../model'

export interface IProps {
  
}
/**附件 */
export default observer(function Template3(props: IProps) {
  const path = useMemo(() => model.detail?.attachment?.path, [model.detail])
  return (
    <Wrapper>
      <embed className='container' src={path} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
height: 100%;
.container {
  width: 100%;
  min-height: 100%;
  border: none;
}
`
