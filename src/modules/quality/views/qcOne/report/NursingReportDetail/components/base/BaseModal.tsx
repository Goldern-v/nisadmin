import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import { qualityAnalysisReportPoolService } from '../../services/QualityAnalysisReportPoolService'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  Component: any
  index?: any
  sectionData: {
    sectionId: string
    sectionTitle?: string
    modalTitle?: string
    modalWidth?: any
    [p: string]: any
  }
}

export default observer(function BaseModal(props: Props) {
  let { visible, onCancel, Component, sectionData, index } = props
  const [data, setData]: any = useState(null)

  const onSave = async () => {
    if (sectionData.sectionId == '报告名称') {
      qualityAnalysisReportPoolService.updateReportName(data.text).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          text: res.data.reportName
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '护理工作计划') {
      qualityAnalysisReportPoolService.updateWorkScheduleList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '病区护理质量检查') {
      qualityAnalysisReportPoolService.updateWardCheckList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '护士会议记录') {
      qualityAnalysisReportPoolService.updateNurseMeetingList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '不良事件') {
      qualityAnalysisReportPoolService.updateBadEventList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '人力资源调配') {
      qualityAnalysisReportPoolService.updateHrAllocationList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    }
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = qualityAnalysisReportViewModal.getSectionData(sectionData.sectionId)
      setData(data)
    } else {
      setData(undefined)
    }
  }, [visible])

  let title: any = ''
  if (sectionData && sectionData.data && sectionData.data.baseInfo && sectionData.data.baseInfo.qcGroupName) {
    title = '编辑' + sectionData.data.baseInfo.qcGroupName
  } else if (sectionData) {
    title = sectionData.modalTitle
  }
  return (
    <Modal
      title={title || ''}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender
      width={(sectionData && sectionData.modalWidth) || 700}
      centered
    >
      {Component && data && <Component {...props.sectionData} data={data} setData={setData} index={index} />}
    </Modal>
  )
})
const Wrapper = styled.div``
