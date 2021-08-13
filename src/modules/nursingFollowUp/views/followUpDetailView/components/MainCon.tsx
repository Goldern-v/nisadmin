import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Place, ScrollBox } from 'src/components/common'
import { appStore } from 'src/stores'
import FormPage from 'src/modules/nursingFollowUp/components/formPage/FormPage'
import printing from 'printing'

export interface Props {
  loading?: boolean
}

export default function MainCon(props: Props) {
  const { loading } = props

  const handlePrint = () => {
    let printEl = document.querySelector('.form-page-wrapper') as HTMLElement

    if (printEl)
      printing.preview(
        printEl,
        {
          injectGlobalCss: true,
          scanStyles: false,
          css: `
            @page{
              margin: 0mm 0mm;
              padding: 0mm 0mm;
            }
            .form-page-wrapper{
              margin: 0 auto;
            }
            .page-item{
              box-shadow: none!important;
            }
          `
        }
      )
  }

  return <Wrapper>
    <div className="tool-bar">
      <Button className="mr-10" onClick={() => appStore.history.goBack()}>返回</Button>
      <Button className="mr-10" type="primary" ghost>保存</Button>
      <Button className="mr-10" type="danger" ghost>删除</Button>
      <Button className="mr-10">推送给患者</Button>
      <Place />
      <Button className="mr-10" onClick={() => handlePrint()}>打印</Button>
      <Button>刷新</Button>
    </div>
    <FormPageContainer>
      <FormPage editable={true} formCode="脑卒中高危人群院内综合干预量表" />
    </FormPageContainer>
  </Wrapper>
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .tool-bar{
    display: flex;
    background: #fff;
    padding: 8px 15px;
    border-bottom: 1px solid rgba(0,0,0,0.105);
  }
  .mr-10{
    margin-right: 10px;
  }
  .form-page-container{
    flex: 1;
  }
`

// @ts-ignore
const FormPageContainer = styled(ScrollBox)`
  flex: 1;
`