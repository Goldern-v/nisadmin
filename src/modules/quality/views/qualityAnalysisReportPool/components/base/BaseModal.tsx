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

    // } else if (sectionData.sectionId == '本月质量检查扣分情况') {
    //   qualityAnalysisReportPoolService.updateCheckDeptDesc(data.report.checkDeptDesc).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       report: res.data
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '质量扣分比较') {
    //   qualityAnalysisReportPoolService.updateTypeCompareList(data.list).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       list: res.data.map((item: any) => {
    //         return Object.assign(item, {
    //           currentDeductScore: Number(item.currentDeductScore.toFixed(2)),
    //           lastDeductScore: Number(item.lastDeductScore.toFixed(2)),
    //           compareScore: Number(item.compareScore.toFixed(2)),
    //           compareScorePercent: Number(item.compareScorePercent.toFixed(2))
    //         })
    //       })
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '本月质量扣分科室排序') {
    //   qualityAnalysisReportPoolService.updateDeptItemList(data.list).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       list: res.data.map((item: any) => {
    //         return Object.assign(item, {
    //           deductScore: Number(Number(item.deductScore).toFixed(2))
    //         })
    //       })
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '本月主要质量问题') {
    //   qualityAnalysisReportPoolService.updateDetailItemList(data.list).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       list: res.data.map((item: any) => {
    //         return Object.assign(item, {
    //           totalDeductScore: Number(Number(item.totalDeductScore).toFixed(2))
    //         })
    //       })
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '本月质量检查亮点') {
    //   qualityAnalysisReportPoolService.updateHighlightItemList(data.list).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       list: res.data
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '重点问题') {
    //   qualityAnalysisReportPoolService.updateKeyItemList(data.list).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       list: res.data
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '持续改进') {
    //   qualityAnalysisReportPoolService.updateCurrentImproveItemList(data.list).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       list: res.data
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '追踪督导') {
    //   qualityAnalysisReportPoolService.updateFollowUpDeptDesc(data.report.followUpDeptDesc).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       report: res.data
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '检查重点') {
    //   qualityAnalysisReportPoolService.updateKeyCheckItemDesc(data.report.keyCheckItemDesc).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       report: res.data
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else if (sectionData.sectionId == '问题及建议') {
    //   qualityAnalysisReportPoolService.updateSuggestions(data.report.suggestions).then((res) => {
    //     qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
    //       report: res.data
    //     })
    //     message.success('保存成功')
    //     onCancel()
    //   })
    // } else 
    if (sectionData.sectionId == '报告名称') {
      qualityAnalysisReportPoolService.updateReportName(data.text).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          text: res.data.reportName
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '查房内容') {
      qualityAnalysisReportPoolService.updateCheckWardDesc(data.report.checkWardDesc).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '检查形式') {
      qualityAnalysisReportPoolService.updateCheckWayDesc(data.report.checkWayDesc).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '亮点') {
      qualityAnalysisReportPoolService.updateHighlightItemList(data.list).then((res) => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '本月总扣分') {
      qualityAnalysisReportPoolService.updateGroupList(data.list).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '扣分比较') {
      qualityAnalysisReportPoolService.updateGroupCompareList(data.list).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '病区质量考核前十') {
      qualityAnalysisReportPoolService.updateNotDeductDeptDesc(data.report.notDeductDeptDesc).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          report: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '病区质量扣分前十') {
      qualityAnalysisReportPoolService.updateTopRankDeptItemList(data.list).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '特殊科室质量扣分') {
      qualityAnalysisReportPoolService.updateSpecialDeptItemList(data.list).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '特殊监护病房质量扣分') {
      qualityAnalysisReportPoolService.updateIcuDeptItemList(data.list).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '门诊科室质量扣分') {
      qualityAnalysisReportPoolService.updateOpdeptItemList(data.list).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (/^4_\d*$/.test(sectionData.sectionId)) {
      let { year, type, indexInType, qcGroupName, qcGroupCode } = data.baseInfo;
      let contentKey = data.contentKey;
      let childrenItemList = data.list.map((item: any) => {
        let childQcGroupName = item.qcGroupName || qcGroupName;
        let childQcGroupCode = item.qcGroupCode || qcGroupCode;
        let highlightItem = item.highlightItem || 'true';

        let newItem: any = {
          qcGroupName: childQcGroupName,
          qcGroupCode: childQcGroupCode,
          highlightItem,
          [contentKey]: item[contentKey]
        }
        if (item.id) newItem.id = item.id

        return newItem
      });
      let params = {
        year,
        type,
        indexInType,
        qcGroupName,
        qcGroupCode,
        childrenItemList
      }

      qualityAnalysisReportPoolService.updateDetailItemList(params).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data.childrenItemList || []
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (/^5_\d*$/.test(sectionData.sectionId)) {
      let { year, type, indexInType, qcGroupName, qcGroupCode } = data.baseInfo;
      let contentKey = data.contentKey;
      let childrenItemList = data.list.map((item: any) => {
        let childQcGroupName = item.qcGroupName || qcGroupName;
        let childQcGroupCode = item.qcGroupCode || qcGroupCode;
        let highlightItem = item.highlightItem || 'true';

        let newItem: any = {
          qcGroupName: childQcGroupName,
          qcGroupCode: childQcGroupCode,
          highlightItem,
          [contentKey]: item[contentKey],
          itemCode: item.itemCode || ''
        }

        if (item.id) newItem.id = item.id

        return newItem
      });
      let params = {
        year,
        type,
        indexInType,
        qcGroupName,
        qcGroupCode,
        childrenItemList
      }

      qualityAnalysisReportPoolService.updateImproveItemList(params).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data.childrenItemList || []
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '6_1') {
      let contentKey = data.contentKey;
      let newList = data.list.map((item: any) => {
        let newItem: any = {
          qcGroupName: item.qcGroupName || '',
          qcGroupCode: item.qcGroupCode || '',
          [contentKey]: item[contentKey],
          itemCode: item.itemCode
        }

        if (item.id) newItem.id = item.id

        return newItem
      })

      qualityAnalysisReportPoolService.updateImproveResultList(newList).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data || []
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '7_1') {
      let contentKey = data.contentKey;
      let newList = data.list.map((item: any) => {
        let newItem: any = {
          qcGroupName: item.qcGroupName || '',
          qcGroupCode: item.qcGroupCode || '',
          [contentKey]: item[contentKey]
        }

        if (item.id) newItem.id = item.id

        return newItem
      })

      qualityAnalysisReportPoolService.updateKeyItemList(newList).then(res => {
        qualityAnalysisReportViewModal.setSectionData(sectionData.sectionId, {
          list: res.data || []
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
