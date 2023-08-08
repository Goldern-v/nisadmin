import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";

export interface IProps {
  
}
/**附件 */
export default observer(function Template3(props: IProps) {
  return (
    <Wrapper>
      <iframe src={handbookModel?.catalogueData?.attachment?.path} />
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
