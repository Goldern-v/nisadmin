import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model"
import PdfViewer from "src/modules/nursingRulesNew-wh/components/PdfViewer";

/**附件 */
export default observer(function Template3() {
    const [replacedPdfLink, setReplacedPdfLink] = useState('')
    useEffect(() => {
        if(handbookModel.detail?.attachment?.path){
            const currentDomain = `${window.location.protocol}//${window.location.host}`;
            const pdfLink = handbookModel.detail.attachment.path;
            const url:string =pdfLink.replace(/^(https?:\/\/[^/]+)/, currentDomain)
            setReplacedPdfLink(url);
        }
    }, [handbookModel.detail.attachment?.path])
    return (
        <Wrapper>
            <PdfViewer file={replacedPdfLink} width={780 - 2}/>
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
