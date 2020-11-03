import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { badEventReportModel } from './../../BadEventReportModel'
import { badEventReportService } from '../../services/BadEventReportService'

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
    const successCallback = () => {
      message.success('保存成功')
      onCancel()
    }

    if (sectionData.sectionId == '报告名称') {
      badEventReportService
        .updateReportName(data.text)
        .then((res) => {
          badEventReportModel.report.name = data.text

          badEventReportModel
            .setSectionData(
              sectionData.sectionId,
              {
                text: data.text
              }
            )

          successCallback()
        })
    } else if (sectionData.sectionId == '不良事件分类') {

      let reqData = JSON.stringify(data.list)
      badEventReportService
        .updateReport({
          reportType: 'be_total_happen',
          data: reqData
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              list: JSON.parse(reqData)
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '上报例数比较') {
      let reqData = JSON.stringify(data.list)

      badEventReportService
        .updateReport({
          reportType: 'be_contrast_before',
          data: reqData
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              list: JSON.parse(reqData)
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '上报趋势图') {
      let reqData = JSON.stringify(data.obj)

      badEventReportService
        .updateReport({
          reportType: 'be_trend_chart',
          data: reqData
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              obj: JSON.parse(reqData)
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '上报情况比较') {

      badEventReportService
        .updateReportDesc({
          reportType: 'be_report_situation',
          reportDesc: data.text
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              text: data.text
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '上报情况比较图表') {
      let reqData = JSON.stringify(data.list)

      badEventReportService
        .updateReport({
          reportType: 'be_report_situation',
          data: reqData
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              list: JSON.parse(reqData)
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '上报情况比较图表') {
      let reqData = JSON.stringify(data.list)

      badEventReportService
        .updateReport({
          reportType: 'be_classify_contrast',
          data: reqData
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              list: JSON.parse(reqData)
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '伤害程度分类') {
      badEventReportService
        .updateReportDesc({
          reportType: 'be_injury_degree',
          reportDesc: data.text
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              text: data.text
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '伤害程度分类图表') {
      let reqData = JSON.stringify({ beInjuryDegreeList: data.list })

      badEventReportService
        .updateReport({
          reportType: 'be_injury_degree',
          data: reqData
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              list: JSON.parse(JSON.stringify(data.list))
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '不良事件发生时段') {
      badEventReportService
        .updateReportDesc({
          reportType: 'be_happen_time',
          reportDesc: data.text
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              text: data.text
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '科室分布') {
      badEventReportService
        .updateReportDesc({
          reportType: 'be_dept_distribution',
          reportDesc: data.text
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              text: data.text
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '科室分布图表') {
      let reqData = JSON.stringify({ beDeptDistributionList: data.list })

      badEventReportService
        .updateReport({
          reportType: 'be_dept_distribution',
          data: reqData
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              list: JSON.parse(JSON.stringify(data.list))
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '相关人员') {
      badEventReportService
        .updateReportDesc({
          reportType: 'be_relevant_person',
          reportDesc: data.text
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              text: data.text
            })

          successCallback()
        })
    } else if (sectionData.sectionId == '发生阶段及可能原因') {
      let reqData = JSON.stringify(data.list)

      badEventReportService
        .updateReport({
          reportType: 'be_happen_reason',
          data: reqData
        })
        .then(res => {
          badEventReportModel
            .setSectionData(sectionData.sectionId, {
              list: JSON.parse(reqData)
            })

          successCallback()
        })
    }
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = badEventReportModel.getSectionData(sectionData.sectionId)
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
      {Component && data && <Component {...props.sectionData} data={data} setData={setData} index={index} />}
    </Modal>
  )
})
const Wrapper = styled.div``
