import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'

export interface IProps {
  
}
/**附件 */
export default observer(function Template3(props: IProps) {
  return (
    <Wrapper>
      <iframe src='http://192.168.1.54:9885/crNursing/asset/nurseAttachment/20230801/20230801155831WMggONA5.pdf' />
    </Wrapper>
  )
})

const Wrapper = styled.div`
height: 100%;
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
`
