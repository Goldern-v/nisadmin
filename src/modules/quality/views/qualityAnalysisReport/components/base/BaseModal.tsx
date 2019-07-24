import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportViewModal'
import QualityAnalysisService from '../../../analysis/api/QualityAnalysisService'
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

  const onSave = async () => {
    if (sectionData.sectionId == '上月质量问题') {
      qualityAnalysisReportService.updateImproveItemCompareList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月质量检查扣分情况') {
      qualityAnalysisReportService.updateCheckDeptDesc(data.report.checkDeptDesc).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '质量扣分比较') {
      qualityAnalysisReportService.updateTypeCompareList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data.map((item: any) => {
            return Object.assign(item, {
              currentDeductScore: Number(item.currentDeductScore.toFixed(1)),
              lastDeductScore: Number(item.lastDeductScore.toFixed(1)),
              compareScore: Number(item.compareScore.toFixed(1)),
              compareScorePercent: Number(item.compareScorePercent.toFixed(1))
            })
          })
        })
        message.success('保存成功')
        onCancel()
      })
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
    >
      {Component && <Component {...props.sectionData} data={data} setData={setData} />}
    </Modal>
  )
})
const Wrapper = styled.div``
