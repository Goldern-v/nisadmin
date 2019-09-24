import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { checkWardReportViewModal } from '../../CheckWardReportViewModal'
import { checkWardReportService } from '../../services/CheckWardReportService'

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
      checkWardReportService.updateImproveItemCompareList(data.list).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月质量检查扣分情况') {
      checkWardReportService.updateCheckDeptDesc(data.report.checkDeptDesc).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '2-1') {
      checkWardReportService.updateReport(data.report).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '质量扣分比较') {
      checkWardReportService.updateTypeCompareList(data.list).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data.map((item: any) => {
            return Object.assign(item, {
              currentDeductScore: Number((item.currentDeductScore || 0).toFixed(2)),
              lastDeductScore: Number((item.lastDeductScore || 0).toFixed(2)),
              compareScore: Number((item.compareScore || 0).toFixed(2)),
              compareScorePercent: Number((item.compareScorePercent || 0).toFixed(2))
            })
          })
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月质量扣分科室排序') {
      checkWardReportService.updateDeptItemList(data.list).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data.map((item: any) => {
            return Object.assign(item, {
              deductScore: Number(Number(item.deductScore).toFixed(2))
            })
          })
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月主要质量问题') {
      checkWardReportService.updateDetailItemList(data.list).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data.map((item: any) => {
            return Object.assign(item, {
              totalDeductScore: Number(Number(item.totalDeductScore).toFixed(2))
            })
          })
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月质量检查亮点') {
      checkWardReportService.updateHighlightItemList(data.list).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '重点问题') {
      checkWardReportService.updateKeyItemList(data.list).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '持续改进') {
      checkWardReportService.updateCurrentImproveItemList(data.list).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '追踪督导') {
      checkWardReportService.updateFollowUpDeptDesc(data.report.followUpDeptDesc).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '检查重点') {
      checkWardReportService.updateKeyCheckItemDesc(data.report.keyCheckItemDesc).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '问题及建议') {
      checkWardReportService.updateSuggestions(data.report.suggestions).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '报告名称') {
      // console.log(data, 'data')
      // return
      checkWardReportService.updateReportName(data.text).then((res) => {
        checkWardReportViewModal.setSectionData(sectionData.sectionId, {
          text: res.data.reportName
        })
        message.success('保存成功')
        onCancel()
      })
    }
    // checkWardReportViewModal.setSectionData(sectionData.sectionId, data) ? onCancel() : message.error('未知异常')
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = checkWardReportViewModal.getSectionData(sectionData.sectionId)
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
