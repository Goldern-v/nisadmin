import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { starRatingReportEditModel } from './../../model/StarRatingReportEditModel'
import { starRatingYearReportService } from '../../api/StarRatingYearReportService'

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

  const formatNum = (num: number | string) => {
    num = Number(num)

    if (isNaN(num)) return '0.0'

    let numArr = num.toString().split('.')
    if (!numArr[0]) numArr[0] = '0'

    if (numArr[1]) {
      numArr[1] = numArr[1][0]
    } else {
      numArr[1] = '0'
    }

    return numArr.join('.')
  }

  const onSave = async () => {
    console.log(sectionData.sectionId, data)

    if (sectionData.sectionId == '报告名称') {
      starRatingYearReportService.updateReportName(data.text).then((res) => {
        starRatingReportEditModel.setSectionData(sectionData.sectionId, {
          text: res.data.reportName
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '星级考核') {
      let reqList = data.list.map((item: any) => {
        let nursingDeduct = Number(formatNum(item.nursingDeduct))
        let workloadDeduct = Number(formatNum(item.workloadDeduct))
        let satisfactionDeduct = Number(formatNum(item.satisfactionDeduct))
        if (isNaN(nursingDeduct)) nursingDeduct = 0
        if (nursingDeduct < 0) nursingDeduct = -nursingDeduct

        if (isNaN(workloadDeduct)) workloadDeduct = 0
        if (workloadDeduct < 0) workloadDeduct = -workloadDeduct

        if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0
        if (satisfactionDeduct < 0) satisfactionDeduct = -satisfactionDeduct
        return {
          ...item,
          nursingDeduct,
          workloadDeduct,
          satisfactionDeduct
        }
      })

      starRatingYearReportService.updateStarRattingList(reqList).then((res) => {
        starRatingReportEditModel.setSectionData(sectionData.sectionId, {
          list: res.data.itemList.map((item: any) => {
            let nursingDeduct = -Number(item.nursingDeduct)
            if (isNaN(nursingDeduct)) nursingDeduct = 0

            let workloadDeduct = -Number(item.workloadDeduct)
            if (isNaN(workloadDeduct)) workloadDeduct = 0

            let satisfactionDeduct = -Number(item.satisfactionDeduct)
            if (isNaN(satisfactionDeduct)) satisfactionDeduct = 0

            return {
              ...item,
              nursingDeduct,
              workloadDeduct,
              satisfactionDeduct
            }
          }) || []
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
      {Component && data && <Component {...props.sectionData} data={data} setData={setData} />}
    </Modal>
  )
})
const Wrapper = styled.div``
