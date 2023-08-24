import { observer } from 'mobx-react'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model"

/**附件 */
export default observer(function Template3() {
    return (
    <Wrapper>
      <iframe src={handbookModel?.detail?.attachment?.path} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
height: 100%;
  width: 80%;
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
`
