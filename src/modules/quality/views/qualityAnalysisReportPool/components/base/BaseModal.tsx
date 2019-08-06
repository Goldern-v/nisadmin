import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from '../../QualityAnalysisReportPoolViewModal'
import QualityAnalysisService from '../../../analysis/api/QualityAnalysisService'
import { qualityAnalysisReportPoolService } from '../../services/QualityAnalysisReportPoolService'

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
      qualityAnalysisReportPoolService.updateImproveItemCompareList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月质量检查扣分情况') {
      qualityAnalysisReportPoolService.updateCheckDeptDesc(data.report.checkDeptDesc).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '质量扣分比较') {
      qualityAnalysisReportPoolService.updateTypeCompareList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data.map((item: any) => {
            return Object.assign(item, {
              currentDeductScore: Number(item.currentDeductScore.toFixed(2)),
              lastDeductScore: Number(item.lastDeductScore.toFixed(2)),
              compareScore: Number(item.compareScore.toFixed(2)),
              compareScorePercent: Number(item.compareScorePercent.toFixed(2))
            })
          })
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月质量扣分科室排序') {
      qualityAnalysisReportPoolService.updateDeptItemList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
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
      qualityAnalysisReportPoolService.updateDetailItemList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
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
      qualityAnalysisReportPoolService.updateHighlightItemList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '重点问题') {
      qualityAnalysisReportPoolService.updateKeyItemList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '持续改进') {
      qualityAnalysisReportPoolService.updateCurrentImproveItemList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '追踪督导') {
      qualityAnalysisReportPoolService.updateFollowUpDeptDesc(data.report.followUpDeptDesc).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '检查重点') {
      qualityAnalysisReportPoolService.updateKeyCheckItemDesc(data.report.keyCheckItemDesc).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '问题及建议') {
      qualityAnalysisReportPoolService.updateSuggestions(data.report.suggestions).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '报告名称') {
      // console.log(data, 'data')
      // return
      qualityAnalysisReportPoolService.updateReportName(data.text).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          text: res.data.reportName
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '病区质量考核前十') {
      qualityAnalysisReportPoolService.updateNotDeductDeptDesc(data.report.notDeductDeptDesc).then(res => {
        if (res.code == 200) {
          qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
            report: res.data
          })
          message.success('保存成功')
          onCancel()
        } else {
          message.error('保存失败')
        }
      }, err => {
        message.error('保存失败')
      })
    } else if (sectionData.sectionId == '病区质量扣分前十') {
      qualityAnalysisReportPoolService.updateTopRankDeptItemList(data.list).then(res => {
        if (res.code == 200) {
          qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
            list: res.data
          })
          message.success('保存成功')
          onCancel()
        } else {
          message.error('保存失败')
        }
      }, err => {
        message.error('保存失败')
      })
    } else if (sectionData.sectionId == '特殊科室质量扣分') {
      qualityAnalysisReportPoolService.updateSpecialDeptItemList(data.list).then(res => {
        if (res.code == 200) {
          qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
            list: res.data
          })
          message.success('保存成功')
          onCancel()
        } else {
          message.error('保存失败')
        }
      }, err => {
        message.error('保存失败')
      })
    } else if (sectionData.sectionId == '特殊监护病房质量扣分') {
      qualityAnalysisReportPoolService.updateIcuDeptItemList(data.list).then(res => {
        if (res.code == 200) {
          qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
            list: res.data
          })
          message.success('保存成功')
          onCancel()
        } else {
          message.error('保存失败')
        }
      }, err => {
        message.error('保存失败')
      })
    } else if (sectionData.sectionId == '门诊科室质量扣分') {
      qualityAnalysisReportPoolService.updateOpdeptItemList(data.list).then(res => {
        if (res.code == 200) {
          qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
            list: res.data
          })
          message.success('保存成功')
          onCancel()
        } else {
          message.error('保存失败')
        }
      }, err => {
        message.error('保存失败')
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
