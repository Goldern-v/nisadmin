import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { starRatingReportEditModel } from './../../model/StarRatingReportEditModel'
import { starRatingReportService } from './../../api/StarRatingReportService'

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
      starRatingReportService.updateReportName(data.text).then((res) => {
        starRatingReportEditModel.setSectionData(sectionData.sectionId, {
          text: res.data.reportName
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '星级考核') {
      starRatingReportService.updateStarRattingList(data.list).then((res) => {
        starRatingReportEditModel.setSectionData(sectionData.sectionId, {
          list: res.data || []
        })
        message.success('保存成功')
        onCancel()
      })
    }

    // starRatingReportEditModel.setSectionData(sectionData.sectionId, data) ? onCancel() : message.error('未知异常')
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = starRatingReportEditModel.getSectionData(sectionData.sectionId)
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
