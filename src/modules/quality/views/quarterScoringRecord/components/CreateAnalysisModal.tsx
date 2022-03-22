import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Modal, Row, Col, Radio, Select, DatePicker, Input } from 'antd'
import Form from 'src/components/Form'
import { Rules } from 'src/components/Form/interfaces'
// import { appStore } from 'src/stores'
// import { observer } from 'mobx-react-lite'
import Moment from 'moment'
import { number } from 'echarts'

const Option = Select.Option

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  allowClear?: boolean
  loading?: boolean
}

export default function CreateAnalysisModal(props: Props) {
  const refForm = React.createRef<Form>()

  const rules: Rules = {
    reportName: (val) => !!val || '请填写报告名称',
    groupRoleCode: (val) => !!val || '请选择质控组',
    year: (val) => !!val || '请选择年度',
    quarter: (val) => !!val || '请选择季度',
    beginDate: (val) => !!val || '请选择开始时间',
    endDate: (val) => !!val || '请选择结束时间'
  }

  const { visible, onCancel, onOk, allowClear, loading } = props
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)

  const [beginDate, setBeginDate] = useState(null as any | null)
  const [endDate, setEndDate] = useState(null as any | null)

  useEffect(() => {
    // if (!visible) setParams(initedParams)
    if (visible && allowClear) {
      setTimeout(_ => {
        if (refForm.current) {
          let nowMoment = Moment();
          let months: string = nowMoment.format('M');
          let dateList: any = null;
          let reportName: any = null;
          if ([1, 2, 3].includes(+months)) {
            months = "Q1"
            reportName = `${nowMoment.format('YYYY')}年第一季度护士长实际查房率`
            dateList = setDateList(1)
          } else if ([4, 5, 6].includes(+months)) {
            months = "Q2"
            reportName = `${nowMoment.format('YYYY')}年第二季度护士长实际查房率`
            dateList = setDateList(4)
          } else if ([7, 8, 9].includes(+months)) {
            months = "Q3"
            reportName = `${nowMoment.format('YYYY')}年第三季度护士长实际查房率`
            dateList = setDateList(7)
          } else if ([10, 11, 12].includes(+months)) {
            months = "Q4"
            reportName = `${nowMoment.format('YYYY')}年第四季度护士长实际查房率`
            dateList = setDateList(10)
          }

          refForm.current.setFields({
            year: nowMoment,
            beginDate: dateList.beginDates,
            endDate: dateList.endDates,
            reportName: reportName,
            groupRoleCode: '',
            quarter: months
          })
        }
      }, 300)

      setBeginDate(null)
      setEndDate(null)
    }
  }, [visible])

  const handleOk = () => {
    let current = refForm.current

    if (current) {
      let formData = current.getFields()
      console.log('formData：', formData);
      let { reportName, groupRoleCode, year, beginDate, endDate, quarter } = formData

      let params: any = {
        title: reportName,
        groupRoleCode: groupRoleCode,
        year: year ? year.format('YYYY') : '',
        beginDate: beginDate ? beginDate.format('YYYY-MM-DD') : '',
        endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
        quarter,
      }
      console.log('params:', params)
      onOk && onOk(params)
      // current
      //   .validateFields()
      //   .then((res) => {

      //     console.log(params)


      //   })
      //   .catch((e) => { })
    }
  }

  const setDateList = (monthList: number,) => {
    let year: any = null;
    let beginDates: any = null;
    let endDates: any = null;
    endDates = new Date(Moment().month(monthList - 1).format('YYYY/MM/DD'));
    endDates.setMonth(endDates.getMonth() + 3);
    endDates.setDate(0);
    endDates = Moment(endDates);
    year = Moment().month(monthList - 1);
    beginDates = year.date(1)
    return { endDates, beginDates }
  }

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false)
    setFormItem('year', value)
    if (refForm.current) {
      if (refForm.current.getField('quarter') == 'Q1') {
        setBeginDateAndEndDate(value, Number(1) - 1)
        setFormItem('reportName', `${value.format('YYYY')}年第一季度护士长实际查房率`)
      } else if (refForm.current.getField('quarter') == 'Q2') {
        setBeginDateAndEndDate(value, Number(4) - 1)
        setFormItem('reportName', `${value.format('YYYY')}年第二季度护士长实际查房率`)
      } else if (refForm.current.getField('quarter') == 'Q3') {
        setFormItem('reportName', `${value.format('YYYY')}年第三季度护士长实际查房率`)
        setBeginDateAndEndDate(value, Number(7) - 1)
      } else if (refForm.current.getField('quarter') == 'Q4') {
        setFormItem('reportName', `${value.format('YYYY')}年第四季度护士长实际查房率`)
        setBeginDateAndEndDate(value, Number(10) - 1)
      }
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

    if (key == 'quarter') {
      if (refForm.current) {
        let year = refForm.current.getField('year');
        if (val == 'Q1') {
          setBeginDateAndEndDate(year, Number(1) - 1)
          setFormItem('reportName', `${year.format('YYYY')}年第一季度护士长实际查房率`)
        } else if (val == 'Q2') {
          setBeginDateAndEndDate(year, Number(4) - 1)
          setFormItem('reportName', `${year.format('YYYY')}年第二季度护士长实际查房率`)
        } else if (val == 'Q3') {
          setBeginDateAndEndDate(year, Number(7) - 1)
          setFormItem('reportName', `${year.format('YYYY')}年第三季度护士长实际查房率`)
        } else if (val == 'Q4') {
          setBeginDateAndEndDate(year, Number(10) - 1)
          setFormItem('reportName', `${year.format('YYYY')}年第四季度护士长实际查房率`)
        }
      }
    }

    if (key == 'endDate') setEndDate(val)

    if (key !== 'reportName') setReportName()
  }

  const setBeginDateAndEndDate = (year: any, month: number) => {
    if (year) {
      year = Moment(year);
      year.month(month);

      let beginDate = Moment(year);
      let endDate: any = new Date(year.format('YYYY/MM/DD'));

      beginDate.date(1);

      endDate.setMonth(endDate.getMonth() + 3);
      endDate.setDate(0);
      endDate = Moment(endDate);

      setBeginDate(beginDate)
      setEndDate(endDate)
      setFormItem('beginDate', beginDate)
      setFormItem('endDate', endDate)
    } else {
      setBeginDate(null)
      setEndDate(null)
      setFormItem('beginDate', null)
      setFormItem('endDate', null)
    }
  }

  const setReportName = () => {
    let current = refForm.current
    if (current) {
      let { year, quarter, groupRoleCode } = current.getFields()
      if (!year || !quarter || !groupRoleCode) return
      let yearStr = year.format('YYYY')
      console.log('dddddddddddddddddddd')

      let reportName = `${yearStr}年护长第一季度查房报告分析`

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
          <Row>
            <Col span={5} className='label'>
              报告季度：
            </Col>
            <Col span={19}>
              <Form.Field name='quarter'>
                <Select>
                  <Option value='Q1'>第一季度</Option>
                  <Option value='Q2'>第二季度</Option>
                  <Option value='Q3'>第三季度</Option>
                  <Option value='Q4'>第四季度</Option>
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className='label'>
              报告日期：
            </Col>
            <Col span={9}>
              <Form.Field name='beginDate'>
                <DatePicker placeholder='开始时间' disabledDate={lessThanEnd} />
              </Form.Field>
            </Col>
            <Col span={1}>至</Col>
            <Col span={9}>
              <Form.Field name='endDate'>
                <DatePicker placeholder='结束时间' disabledDate={moreThanStart} />
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
