import Moment from 'moment'
import Form from 'src/components/Form'
import styled from 'styled-components'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Col, DatePicker, Input, Modal, Radio, Row, Select } from 'antd'
import { Rules } from 'src/components/Form/interfaces'
import { MonthList } from 'src/modules/quality/utils/toolCon'

const Option = Select.Option

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  allowClear?: boolean
  loading?: boolean
  /**reportName的字段排列 */
  reportFn?: Function
}

export default function CreateAnalysisModal(props: Props) {
  const refForm = React.createRef<Form>()

  const rules: Rules = {
    reportName: (val) => !!val || '请填写报告名称',
    reportYear: (val) => !!val || '请选择年度',
    reportMonth: (val) => !!val || '请选择月份',
    startDate: (val) => !!val || '请选择开始时间',
    endDate: (val) => !!val || '请选择结束时间'
  }

  const { visible, onCancel, onOk, allowClear, loading } = props
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)

  const [startDate, setStartDate] = useState(null as any | null)
  const [endDate, setEndDate] = useState(null as any | null)

  useLayoutEffect(() => {
    if (visible && allowClear) {
      setTimeout(_ => {
        console.log('test-visible', refForm.current)
        if (refForm.current) {
          let nowMoment = Moment();
          let month = nowMoment.format('M');
          refForm.current.setFields({
            reportYear: nowMoment,
            startDate: null,
            endDate: null,
            reportName: '',
            groupRoleCode: '',
            reportMonth: month,
          })
        }
      }, 300)

      setStartDate(null)
      setEndDate(null)
    }
  }, [visible])

  const handleOk = () => {
    let current = refForm.current
    if (current) {
      let formData = current.getFields()
      current
        .validateFields()
        .then((res) => {
          let { reportName, reportYear, startDate, endDate, reportMonth } = formData
          let params: any = {
            reportName,
            reportYear: reportYear ? reportYear.format('YYYY') : '',
            startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
            endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
            reportMonth
          }

          onOk && onOk(params)
        })
        .catch((e) => { })
    }
  }

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false)
    setFormItem('reportYear', value)

    if (refForm.current) {
      setBeginDateAndEndDate(value, Number(refForm.current.getField('reportMonth')) - 1)
    }
  }

  const handleYearClear = () => {
    setFormItem('reportYear', null)
  }

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status)
  }

  const setFormItem = (key: any, value: any) => {
    if (refForm.current) refForm.current.setField(key, value)
  }

  const moreThanStart = (date: any) => {
    if (!startDate) return false

    if (date.format('x') >= startDate.format('x')) return false
    return true
  }

  const lessThanEnd = (date: any) => {
    if (!endDate) return false

    if (date.format('x') < endDate.format('x')) return false
    return true
  }

  const handleFormChange = (key: any, val: any) => {
    if (key == 'startDate') setStartDate(val)

    if (key == 'reportMonth') {
      if (refForm.current) {
        let reportYear = refForm.current.getField('reportYear');
        setBeginDateAndEndDate(reportYear, Number(val) - 1)
      }
    }

    if (key == 'endDate') setEndDate(val)

    if (key !== 'reportName') setReportName()
  }

  const setBeginDateAndEndDate = (reportYear: any, month: number) => {
    if (reportYear) {
      reportYear = Moment(reportYear);
      reportYear.month(month);

      let startDate = Moment(reportYear);
      let endDate: any = new Date(reportYear.format('YYYY/MM/DD'));

      startDate.date(1);

      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate = Moment(endDate);

      setStartDate(startDate)
      setEndDate(endDate)
      setFormItem('startDate', startDate)
      setFormItem('endDate', endDate)
    } else {
      setStartDate(null)
      setEndDate(null)
      setFormItem('startDate', null)
      setFormItem('endDate', null)
    }
  }

  const setReportName = () => {
    let current = refForm.current
    if (current) {
      let { reportYear, reportMonth } = current.getFields()
      if (!reportYear || !reportMonth) return

      let yearStr = reportYear.format('YYYY')
      let monthStr = reportMonth
      let reportName = `${monthStr}月份护理部三级质控问题分析汇总（${yearStr}年）`

      setFormItem('reportName', reportName)
    }
  }

  return (
    <Modal title='创建报告' visible={visible} onCancel={onCancel} onOk={handleOk} confirmLoading={loading || false} centered>
      <Wrapper>
        <Form ref={refForm} onChange={handleFormChange} rules={rules}>
          <Row>
            <Col span={5} className='label'>
              报告年度：
            </Col>
            <Col span={19}>
              <Form.Field name='reportYear'>
                <DatePicker
                  open={yearPickerIsOpen}
                  mode='year'
                  className='reportYear-picker'
                  placeholder='选择年度'
                  format='YYYY'
                  onChange={handleYearClear}
                  onOpenChange={handleOpenChange}
                  onPanelChange={handlePanelChange}
                />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className='label'>
              报告月份：
            </Col>
            <Col span={19}>
              <Form.Field name='reportMonth'>
                <Select>{MonthList()}</Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className='label'>
              报告日期：
            </Col>
            <Col span={9}>
              <Form.Field name='startDate'>
                <DatePicker placeholder='开始时间' disabledDate={lessThanEnd} disabled={true} />
              </Form.Field>
            </Col>
            <Col span={1}>至</Col>
            <Col span={9}>
              <Form.Field name='endDate'>
                <DatePicker placeholder='结束时间' disabledDate={moreThanStart} disabled={true} />
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
}

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
