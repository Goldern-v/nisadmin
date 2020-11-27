import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { workSummaryReportViewModal } from '../../ReportModal'
import QualityAnalysisService from '../../../analysis/api/QualityAnalysisService'
import { workSummaryReportService } from '../../services/ReportService'

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

  const onSave = async () => {
    console.log(sectionData.sectionId, data)

    if (sectionData.sectionId == '报告名称') {
      workSummaryReportService.updateReportName(data.text).then((res) => {
        workSummaryReportViewModal.setSectionData(sectionData.sectionId, {
          text: res.data.reportName
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月片区人力资源调配') {
      workSummaryReportService.updateHrAllocationList(data.list).then((res) => {
        workSummaryReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
      })
      message.success('保存成功')
      onCancel()
    } else if (sectionData.sectionId == '本月片区不良事件汇总表') {
      workSummaryReportService.updateBadEventList(data.list).then((res) => {
        workSummaryReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月护理质量检查问题及持续改进') {
      workSummaryReportService.updateImproveItemList(data.list).then((res) => {
        workSummaryReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '下月工作重点') {
      workSummaryReportService.updateKeyItemList(data.list).then((res) => {
        workSummaryReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月片区团队建设活动') {
      workSummaryReportService.updateTeamBuildingDesc(data.text).then((res) => {
        workSummaryReportViewModal.setSectionData(sectionData.sectionId, {
          text: res.data.teamBuildingDesc
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '片区团队建设活动附件') {
      workSummaryReportService.updateAttachList(data.list).then((res) => {
        workSummaryReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    }

    // workSummaryReportViewModal.setSectionData(sectionData.sectionId, data) ? onCancel() : message.error('未知异常')
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = workSummaryReportViewModal.getSectionData(sectionData.sectionId)
      setData(data)
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
      {Component && <Component {...props.sectionData} data={data} setData={setData} />}
    </Modal>
  )
})
const Wrapper = styled.div``
