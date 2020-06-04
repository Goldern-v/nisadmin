import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { observer } from 'src/vendors/mobx-react-lite'
import { safetyCheckEditModel } from './../../model/SafetyCheckEditModel'
import { safetyCheckReportService } from './../../api/SafetyCheckReportService'

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
      safetyCheckReportService.updateReportName(data.text).then((res) => {
        safetyCheckEditModel.setSectionData(sectionData.sectionId, {
          text: res.data.reportName
        })
        message.success('保存成功')
        onCancel()
      })
    } else if (sectionData.sectionId == '安全隐患排查') {
      console.log(data)
      let reqArr = []

      let { safetyCheckList, safetyCheckRecordList } = data

      safetyCheckList = JSON.parse(JSON.stringify(safetyCheckList))
      safetyCheckRecordList = JSON.parse(JSON.stringify(safetyCheckRecordList))

      reqArr.push(safetyCheckReportService.updateRecordList({
        itemList: safetyCheckRecordList
      }))

      for (let i = 0; i < safetyCheckList.length; i++) {
        let item = safetyCheckList[i]
        reqArr.push(
          safetyCheckReportService.updateContentList({
            itemList: item.list
          }, item.code.replace('List', ''))
        )
      }

      Promise.all(reqArr).
        then(res => {
          let res0 = res[0]

          safetyCheckRecordList = res0.data || safetyCheckRecordList

          res.splice(0, 1)

          for (let i = 0; i < res.length; i++) {
            if (res[i].data) safetyCheckList[i].list = res[i].data
          }

          safetyCheckEditModel.setSectionData(sectionData.sectionId, {
            safetyCheckList,
            safetyCheckRecordList
          })
          message.success('保存成功')
          onCancel()
        })
    }

    // safetyCheckEditModel.setSectionData(sectionData.sectionId, data) ? onCancel() : message.error('未知异常')
  }

  useLayoutEffect(() => {
    if (visible) {
      let data = safetyCheckEditModel.getSectionData(sectionData.sectionId)
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
