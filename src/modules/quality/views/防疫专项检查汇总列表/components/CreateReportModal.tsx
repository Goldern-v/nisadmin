import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Modal, Row, Col, Radio, Select, DatePicker, Input } from 'antd'
import Form from 'src/components/Form'
import { Rules } from 'src/components/Form/interfaces'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import Moment from 'moment'
import { workSummaryReportListService } from '../api/ReportListService'

const Option = Select.Option

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
}

export default observer(function CreateWorkSummaryReportModal(props: Props) {
  const refForm = React.createRef<Form>()
  const [loading, setLoading] = useState(false)

  const rules: Rules = {
    reportName: (val) => !!val || '请填写报告名称',
    year: (val) => !!val || '请选择年度',
    // indexInType: (val) => !!val || '请选择月份',
    beginDate: (val) => !!val || '请选择开始时间',
    endDate: (val) => !!val || '请选择结束时间'
  }

  const { visible, onCancel, onOk, } = props
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)

  const [beginDate, setBeginDate] = useState(null as any | null)
  const [endDate, setEndDate] = useState(null as any | null)

  useEffect(() => {
    // if (!visible) setParams(initedParams)
    setTimeout(_ => {
      if (refForm.current) {
        let nowMoment = Moment();
        // let month = nowMoment.format('M');
        let currentWeek = weekStartAndEnd(nowMoment)

        refForm.current.setFields({
          year: nowMoment,
          beginDate: Moment(currentWeek.beginDate),
          endDate: Moment(currentWeek.endDate),
          reportName: '',
          indexInType: ''
        })
      }
    }, 300)

    setBeginDate(null)
    setEndDate(null)
  }, [visible])

  const handleOk = () => {
    let current = refForm.current
    if (current) {
      setLoading(true)
      let formData = current.getFields()
      current
        .validateFields()
        .then((res) => {
          let { reportName, year, beginDate, endDate } = formData
          let indexInType = beginDate.dayOfYear()

          let params: any = {
            reportName: reportName,
            year: year ? year.format('YYYY') : '',
            beginDate: beginDate ? beginDate.format('YYYY-MM-DD') : '',
            endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
            type: 'day',
            groupRoleCode: '1',
            indexInType
          }

          return workSummaryReportListService.createReport(params)
        }).then(res => {
          setLoading(false)
          onOk && onOk()
          if (res.code == 200) appStore.history.push(`/防疫专项检查汇总报告?${qs.stringify(res.data.report)}`)
        })
        .catch((e) => setLoading(false))
    }
  }

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false)
    setFormItem('year', value)

    if (refForm.current) {

      setBeginDateAndEndDate(value)
    }
  }

  const handleYearClear = () => {
    setFormItem('year', null)
  }

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status)
  }

  const setFormItem = (key: any, value: any) => {
    if (refForm.current) refForm.current.setField(key, value)
  }

  // const MonthList = () => {
  //   let options = []
  //   for (let i = 12; i > 0; i--) {
  //     let month = i
  //     options.push(<Option value={`${month}`} key={`month${month}`}>{`${month}月`}</Option>)
  //   }

  //   return options
  // }

  const moreThanStart = (date: any) => {
    if (!beginDate) return false

    if (date.format('x') >= beginDate.format('x')) return false
    return true
  }

  const lessThanEnd = (date: any) => {
    if (!endDate) return false

    if (date.format('x') < endDate.format('x')) return false
    return true
  }

  const handleFormChange = (key: any, val: any) => {
    if (key == 'beginDate') setBeginDate(val)

    if (key == 'year') {
      if (refForm.current) {
        let year = refForm.current.getField('year');
        setBeginDateAndEndDate(year)
      }
    }

    if (key == 'endDate') setEndDate(val)

    if (key !== 'reportName') setReportName()
  }

  const setBeginDateAndEndDate = (year: any) => {
    if (year) {
      let currentDate = Moment().set('year', year.year())
      let currentWeek = weekStartAndEnd(currentDate)

      setBeginDate(Moment(currentWeek.beginDate))
      setFormItem('beginDate', Moment(currentWeek.beginDate))
      setEndDate(Moment(currentWeek.endDate))
      setFormItem('endDate', Moment(currentWeek.endDate))
    }
  }

  const weekStartAndEnd = (currentDate: Moment.Moment) => {
    let currentWeekDay = Moment(currentDate).week(currentDate.weeks())
    return {
      beginDate: currentWeekDay.startOf('week').format('YYYY-MM-DD'),
      endDate: currentWeekDay.endOf('week').format('YYYY-MM-DD')
    }
  }

  const setReportName = () => {
    let current = refForm.current
    if (current) {
      let fields = current.getFields()
      let { year, } = fields

      if (!year || !fields.beginDate || !fields.endDate) return

      let year1Str = fields.beginDate.format('YYYY') + '年'
      let year2Str = fields.endDate.format('YYYY') + '年'
      if (year1Str === year2Str) year2Str = ''

      let reportName = `${year1Str}${fields.beginDate.format('MM.DD')}至${year2Str}${fields.endDate.format('MM.DD')}防疫专项检查汇总报告`

      setFormItem('reportName', reportName)
    }
  }

  return (
    <Modal
      title='创建报告'
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      width={600}
      confirmLoading={loading || false}
      centered
      forceRender>
      <Wrapper>
        <Form ref={refForm} onChange={handleFormChange} rules={rules}>
          <Row>
            <Col span={5} className='label'>
              报告年度：
            </Col>
            <Col span={19}>
              <Form.Field name='year'>
                <DatePicker
                  open={yearPickerIsOpen}
                  mode='year'
                  className='year-picker'
                  placeholder='选择年度'
                  format='YYYY'
                  onChange={handleYearClear}
                  onOpenChange={handleOpenChange}
                  onPanelChange={handlePanelChange}
                />
              </Form.Field>
            </Col>
          </Row>
          {/* <Row>
            <Col span={5} className='label'>
              报告月份：
            </Col>
            <Col span={19}>
              <Form.Field name='indexInType'>
                <Select>{MonthList()}</Select>
              </Form.Field>
            </Col>
          </Row> */}
          <Row>
            <Col span={5} className='label'>
              质控日期：
            </Col>
            <Col span={9}>
              <Form.Field name='beginDate'>
                <DatePicker placeholder='开始时间' allowClear={false} disabledDate={lessThanEnd} />
              </Form.Field>
            </Col>
            <Col span={1}>至</Col>
            <Col span={9}>
              <Form.Field name='endDate'>
                <DatePicker placeholder='结束时间' allowClear={false} disabledDate={moreThanStart} />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className='label'>
              报告名称：
            </Col>
            <Col span={19}>
              <Form.Field name='reportName'>
                <Input />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
  width: 90%;
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
`
