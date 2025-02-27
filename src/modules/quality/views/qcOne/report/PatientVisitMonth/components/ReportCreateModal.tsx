import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Row, Col, Select, message, DatePicker } from 'antd'
// import { numToChinese } from 'src/utils/number/numToChinese'
import { ScrollBox } from 'src/components/common'
import { getCurrentMonth } from 'src/utils/date/currentMonth'
import YearPicker from 'src/components/YearPicker'
import qs from 'qs'
import MultiFileUploader, { FileItem } from 'src/components/MultiFileUploader'
const RangePicker = DatePicker.RangePicker

import { patientVisitMonthService } from '../api/PatientVisitMonthService'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

const Option = Select.Option

export interface Props {
  title?: string,
  onOk?: Function,
  onCancel?: Function,
  deptCode?: string,
  visible: boolean
}

export default observer(function WorkPlainEditModal(props: Props) {
  const { history } = appStore

  const { title, visible, onCancel, onOk, deptCode } = props

  const [loading, setLoading] = useState(false)

  const wardCode = deptCode || authStore.selectedDeptCode
  const wardTarget = authStore.deptList.find((item: any) => item.code === wardCode)
  const wardName = wardTarget ? wardTarget.name : authStore.selectedDeptName

  const [editQuery, setEditQuery] = useState({
    year: moment().format('YYYY'),
    month: moment().format('M'),
    wardCode: wardCode,
    reportName: '',
    beginDate: '',
    attachmentList: [],
    endDate: '',
    dischargeNumber: '',
    visitNumber: '',
    wardRemark: ''
  } as any)

  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })()

  const handleCreate = () => {
    let params = { ...editQuery }

    if (!params.reportName) {
      message.error('名称未填写')
      return
    }

    setLoading(true)

    patientVisitMonthService
      .createReport({
        "wardCode": params.wardCode,
        "year": params.year,
        "month": params.month,
        "beginDate": params.beginDate,
        "endDate": params.endDate,
        "reportName": params.reportName,
        "attachmentList": params.attachmentList,
        dischargeNumber: params.dischargeNumber,
        visitNumber: params.visitNumber,
        wardRemark: params.wardRemark
      })
      .then(res => {
        if (res.data) {
          message.success('创建成功', 1, () => {
            setLoading(false)
            history.push(`/patientVisitMonthEdit?${qs.stringify({ ...params })}`)
            onOk && onOk()
          })
        }
      }, () => setLoading(false))
  }

  const reportName = (params: any) => {
    const { year, month } = params
    return `${year}年${month}月${wardName}出院病人随访表`
  }

  useEffect(() => {
    if (visible) {
      let newQuery = {
        year: moment().format('YYYY'),
        month: moment().format('M'),
        wardCode: wardCode,
        reportName: '',
        attachmentList: [],
        beginDate: getCurrentMonth()[0].format('YYYY-MM-DD'),
        endDate: getCurrentMonth()[1].format('YYYY-MM-DD'),
        dischargeNumber: '',
        visitNumber: '',
        wardRemark: ''
      }
      newQuery.reportName = reportName(newQuery)

      setEditQuery(newQuery)
    }

  }, [visible])

  const setEditQueryAndInit = (newQuery: any) => {
    let newReportName = reportName(newQuery)
    let newRangeDate = moment(`${newQuery.year}-${newQuery.month}`)
    let newBeginDate = newRangeDate.format('YYYY-MM-01')

    let newEndDate = moment(newBeginDate).add(1, 'M').subtract(1, 'd').format('YYYY-MM-DD')

    newQuery.reportName = newReportName
    newQuery.beginDate = newBeginDate
    newQuery.endDate = newEndDate
    setEditQuery(newQuery)
  }

  const handleFilesChange = (payload: any) => {
    let newList = payload.map((item: any) => {
      return {
        attachId: item.id,
        name: item.name,
        path: item.path,
        type: item.type
      }
    })

    setEditQuery({ ...editQuery, attachmentList: newList })
  }

  const handleNumChange = (key: string, val: any) => {
    let newVal = parseInt(Math.abs(val).toString())
    if (isNaN(newVal)) newVal = 0

    setEditQuery({ ...editQuery, [key]: newVal })
  }

  return <React.Fragment>
    <Modal
      confirmLoading={loading}
      visible={visible}
      centered
      onOk={handleCreate}
      onCancel={() => onCancel && onCancel()}
      title={title || "添加月度随访表"}>
      <Wrapper>
        <Row>
          <Col span={7}>科室:</Col>
          <Col span={16}>
            <Input disabled value={wardName} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>年份:</Col>
          <Col span={16}>
            <YearPicker
              value={editQuery.year ? moment(`${editQuery.year}-01-01`) : undefined}
              allowClear={false}
              onChange={(_moment: any) =>
                setEditQueryAndInit({ ...editQuery, year: _moment.format('YYYY') })} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>月份:</Col>
          <Col span={16}>
            <Select
              value={editQuery.month}
              onChange={(month: string) =>
                setEditQueryAndInit({ ...editQuery, month })}
              className="month-select">
              {monthList.map((month: number) =>
                <Option value={`${month}`} key={month}>{month}月</Option>
              )}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={7}>起止日期:</Col>
          <Col span={16}>
            <RangePicker
              value={[moment(editQuery.beginDate), moment(editQuery.endDate)]}
              onChange={(dates: any) => {
                setEditQuery({
                  ...editQuery,
                  beginDate: dates[0].format('YYYY-MM-DD'),
                  endDate: dates[1].format('YYYY-MM-DD')
                })
              }}
              allowClear={false} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>名称:</Col>
          <Col span={16}>
            <Input
              style={{
                position: 'relative',
                zIndex: 1,
              }}
              value={editQuery.reportName}
              onChange={(e: any) => setEditQuery({ ...editQuery, reportName: e.target.value })} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>出院人数:</Col>
          <Col span={16}>
            <Input
              value={editQuery.dischargeNumber}
              onChange={(e) => handleNumChange('dischargeNumber', e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>回访数:</Col>
          <Col span={16}>
            <Input
              value={editQuery.visitNumber}
              onChange={(e) => handleNumChange('visitNumber', e.target.value)} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>备注(病区原因):</Col>
          <Col span={16}>
            <Input.TextArea
              value={editQuery.wardRemark}
              onChange={(e: any) => setEditQuery({ ...editQuery, wardRemark: e.target.value })} />
          </Col>
        </Row>
        <Row>
          <Col span={7}>附件(上传表格文件):</Col>
          <Col span={16} style={{ textAlign: 'left' }}>
            <MultiFileUploader
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              type="pvm"
              data={editQuery.attachmentList.map((item: any) => {
                return {
                  id: item.attachId,
                  name: item.name,
                  path: item.path,
                  type: item.type
                }
              })}
              onChange={handleFilesChange} />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  </React.Fragment >
})

const ScrollBody = styled(ScrollBox)`
  position: absolute;
  left: 0;
  top: 55px;
  /* bottom: 45px; */
  bottom: 0;
  width: 100%;
  padding: 20px;
`

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  .ant-col {
    line-height: 32px;
    text-align: right;
    padding-right: 5px;
    margin-bottom: 10px;
    > span {
      width: 100%;
    }
    .ant-radio-group {
      float: left;
    }
    .ant-select {
      width: 100%;
    }
  }
  .ant-calendar-picker{
    text-align: left;
  }
`