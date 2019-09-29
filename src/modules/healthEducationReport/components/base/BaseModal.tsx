import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import { qualityAnalysisReportService } from '../../services/QualityAnalysisReportService'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  Component: any
  sectionData: {
    sectionId: string
    sectionTitle?: string
    modalTitle?: string
    modalWidth?: any
    [p: string]: any
  }
}

export default observer(function BaseModal(props: Props) {
  let { visible, onCancel, Component, sectionData } = props
  const [data, setData]: any = useState(null)
  const [btnLoading, setBtnLoading]: any = useState(false)

  const onSave = async () => {
    setBtnLoading(true)
    if (sectionData.sectionId == '数据概况') {
      qualityAnalysisReportService.updateOverview(data.obj).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          obj: res.data
        })
        message.success('保存成功')
        setBtnLoading(false)
        onCancel()
      })
    } else if (sectionData.sectionId == '报告名称') {
      qualityAnalysisReportService
        .updateReport({ ...qualityAnalysisReportViewModal.getDataInAllData('instance'), title: data.text })
        .then((res) => {
          qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
            text: res.data.title
          })
          message.success('保存成功')
          setBtnLoading(false)
          onCancel()
        })
    } else if (sectionData.sectionId == '数据分析') {
      qualityAnalysisReportService.updateGraphs(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        setBtnLoading(false)
        onCancel()
      })
    } else {
      setBtnLoading(false)
    }
    // qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, data) ? onCancel() : message.error('未知异常')
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = qualityAnalysisReportViewModal.getSectionData(sectionData.sectionId)
      setData(data)
    }
  }, [visible])

  return (
    <Modal
      title={sectionData && sectionData.modalTitle}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender
      width={(sectionData && sectionData.modalWidth) || 700}
      centered
      footer={
        <React.Fragment>
          <Button onClick={onCancel}>取消</Button>
          <Button onClick={onSave} loading={btnLoading} type='primary'>
            保存
          </Button>
        </React.Fragment>
      }
    >
      {Component && <Component {...props.sectionData} data={data} setData={setData} />}
    </Modal>
  )
})
const Wrapper = styled.div``
