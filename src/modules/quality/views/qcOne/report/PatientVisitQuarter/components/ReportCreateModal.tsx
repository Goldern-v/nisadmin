import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Row, Col, Select, message, DatePicker } from 'antd'
import { numToChinese } from 'src/utils/number/numToChinese'
import { ScrollBox } from 'src/components/common'
import { getCurrentMonth } from 'src/utils/date/currentMonth'
import YearPicker from 'src/components/YearPicker'
import qs from 'qs'
const RangePicker = DatePicker.RangePicker

import { patientVisitQuarterService } from '../api/PatientVisitQuarterService'
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
    month: moment().quarter().toString(),
    wardCode: wardCode,
    reportName: '',
    beginDate: '',
    endDate: '',
  } as any)

  const monthList = (() => {
    let currentMonth = 4;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(4 - currentMonth)
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

    patientVisitQuarterService
      .createReport({
        "wardCode": params.wardCode,
        "year": params.year,
        "month": params.month,
        "beginDate": params.beginDate,
        "endDate": params.endDate,
        "reportName": params.reportName
      })
      .then(res => {
        if (res.data) {
          message.success('创建成功', 1, () => {
            setLoading(false)
            history.push(`/patientVisitQuarterEdit?${qs.stringify({ ...params })}`)
            onOk && onOk()
          })
        }
      }, () => setLoading(false))
  }

  const reportName = (params: any) => {
    const { year, month } = params
    return `${year}年${wardName}第${numToChinese(month)}季度出院患者家庭访视季度汇总表`
  }

  const getQuaterRange = (quater: string, year: string) => {
    let quaterNum = Number(quater)
    let endMonth = quaterNum * 3
    let beginMonth: string = `${endMonth - 2}`
    if (beginMonth.length <= 1) beginMonth = `0${beginMonth}`

    let beginDate = `${year}-${beginMonth}-01`

    let endMonthDays = moment(year + '-' + endMonth).daysInMonth()
    let endDate = `${year}-${endMonth}-${endMonthDays}`

    return {
      beginDate,
      endDate
    }
  }

  useEffect(() => {
    if (visible) {
      let quater = moment().quarter().toString()
      let year = moment().format('YYYY')
      const quaterRange = getQuaterRange(quater, year)

      let newQuery = {
        year,
        month: quater,
        wardCode: wardCode,
        reportName: '',
        ...quaterRange
      }
      newQuery.reportName = reportName(newQuery)

      setEditQuery(newQuery)
    }

  }, [visible])

  const setEditQueryAndInit = (newQuery: any) => {
    let newReportName = reportName(newQuery)

    const quaterRange = getQuaterRange(newQuery.month, newQuery.year)

    newQuery.reportName = newReportName
    newQuery.beginDate = quaterRange.beginDate
    newQuery.endDate = quaterRange.endDate
    setEditQuery(newQuery)
  }

  return <React.Fragment>
    <Modal
      confirmLoading={loading}
      visible={visible}
      centered
      onOk={handleCreate}
      onCancel={() => onCancel && onCancel()}
      title={title || "添加季度家访汇总表"}>
      <Wrapper>
        <Row>
          <Col span={5}>科室:</Col>
          <Col span={18}>
            <Input disabled value={wardName} />
          </Col>
        </Row>
        <Row>
          <Col span={5}>年份:</Col>
          <Col span={18}>
            <YearPicker
              value={editQuery.year ? moment(`${editQuery.year}-01-01`) : undefined}
              allowClear={false}
              onChange={(_moment: any) =>
                setEditQueryAndInit({ ...editQuery, year: _moment.format('YYYY') })} />
          </Col>
        </Row>
        <Row>
          <Col span={5}>季度:</Col>
          <Col span={18}>
            <Select
              value={editQuery.month}
              onChange={(month: string) =>
                setEditQueryAndInit({ ...editQuery, month })}
              className="month-select">
              {monthList.map((month: number) =>
                <Option value={`${month}`} key={month}>第{numToChinese(month)}季度</Option>
              )}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={5}>起止日期:</Col>
          <Col span={18}>
            <RangePicker
              disabled={true}
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
        </Row><Row>
          <Col span={5}>名称:</Col>
          <Col span={18}>
            <Input
              value={editQuery.reportName}
              onChange={(e: any) => setEditQuery({ ...editQuery, reportName: e.target.value })} />
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
  width: 80%;
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