import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model"
import PdfViewer from "src/modules/nursingRulesNew-wh/components/PdfViewer";

/**附件 */
export default observer(function Template3() {
    return (
    <Wrapper>
        <PdfViewer file={handbookModel?.detail?.attachment?.path} width={780 - 2} />
      {/*<iframe src={handbookModel?.detail?.attachment?.path} />*/}
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
