import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Modal } from 'antd'
import { Place, ScrollBox } from 'src/components/common'
import { appStore } from 'src/stores'
import FormPage from 'src/modules/nursingFollowUp/components/formPage/FormPage'
import printing from 'printing'
import { followUpDetailService } from '../services/FollowUpDetailService'

export interface Props {
  loading?: boolean,
  masterId?: string | number,
  onAddOpen?: Function,
  onRefresh?: Function
}

export default function MainCon(props: Props) {
  const { masterId, onRefresh, loading, onAddOpen } = props

  const [editable, setEditable] = useState(true)

  const [itemData, setItemData] = useState({} as any)

  const [formDataLoading, setFormDataLoading] = useState(false)

  const operateLoading = loading || formDataLoading
  const btnDisabled = operateLoading || !masterId

  const handlePrint = () => {
    setEditable(false)

    setTimeout(() => {
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
                page-break-after: always;
              }
            `
          }
        )

      setEditable(true)
    }, 300)
  }

  const getFormData = () => {
    setFormDataLoading(true)

    followUpDetailService
      .getFormDetailById(masterId || '')
      .then((res) => {
        setFormDataLoading(false)
        console.log(res.data)

      }, () => setFormDataLoading(false))
  }

  const handleDeleteConfirm = () => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该记录?',
      onOk: () => {
        setFormDataLoading(true)
        console.log('删除')
        setTimeout(() => {
          setFormDataLoading(true)
          onRefresh && onRefresh({
            deleteSelected: true
          })
        }, 500)
      }
    })
  }

  useEffect(() => {
    if (masterId) getFormData()
  }, [masterId])

  const formContent = () => {
    if (loading)
      return (
        <div className="full-pannel">
          <div className="loading-text">
            <Icon type="loading" />
          </div>
        </div>
      )

    if (masterId)
      return (
        <FormPage
          style={{ display: masterId ? '' : 'none' }}
          editable={editable}
          formCode="脑卒中高危人群院内综合干预量表"
          itemData={itemData}
          onItemDataChange={(payload: any) =>
            setItemData(payload)} />
      )

    return (
      <div
        className="full-pannel"
        style={{ display: masterId ? 'none' : '' }}>
        <div
          className="add-button"
          onClick={() => onAddOpen && onAddOpen()}>
          <Icon type="file-add" style={{ marginRight: 5 }} />
          <span>添加随访表</span>
        </div>
      </div>
    )
  }

  return <Wrapper>
    <div className="tool-bar">
      <Button
        className="mr-10"
        onClick={() => appStore.history.goBack()}>
        返回
      </Button>
      <Button
        className="mr-10"
        disabled={btnDisabled}
        type="primary">
        保存
      </Button>
      <Button
        className="mr-10"
        disabled={btnDisabled}
        type="danger"
        onClick={() => handleDeleteConfirm()}>
        删除
      </Button>
      <Button
        className="mr-10"
        disabled={btnDisabled} >
        推送给患者
      </Button>
      <Place />
      <Button
        className="mr-10"
        onClick={() => handlePrint()}
        disabled={btnDisabled}>打印</Button>
      <Button onClick={() => onRefresh && onRefresh()}>刷新</Button>
    </div>
    <FormPageContainer>
      {formContent()}
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
    .ant-btn.ant-btn-danger{
      &[disabled]{
        color: rgba(0, 0, 0, 0.25);
        background-color: #f5f5f5;
        border-color: #d9d9d9;
      }
    }
  }
  .mr-10{
    margin-right: 10px;
  }
  .form-page-container{
    flex: 1;
  }
  .full-pannel{
    width: 100%;
    height: calc(100vh - 100px);
    position: relative;
    .loading-text{
      font-size: 36px;
      letter-spacing: 3px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .add-button{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: #00A680;
      width: 150px;
      color: #fff;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 14px;
      border-radius: 3px;
      cursor: pointer;
      letter-spacing: 3px;
      transition: background-color .3s;
      &:hover{
        background-color: #1db38b;
      }
    }
  }
`

// @ts-ignore
const FormPageContainer = styled(ScrollBox)`
  flex: 1;
`