import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Radio, Select, DatePicker, Input } from 'antd'
import Form from 'src/components/Form'
import { Rules } from 'src/components/Form/interfaces'
import Moment from 'moment'
import storage from "src/utils/loginTimeOut/storage";
// import { getTypeName } from "../utils";
import { appStore, authStore } from 'src/stores'

const Option = Select.Option

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  wardList: any
  // allowClear?: boolean
  loading?: boolean
  /**reportName的字段排列 */
  // reportFn?: Function
  // defDept?: string
}

export default function CreateAnalysisModal(props: Props) {
  const refForm = React.createRef<Form>()

  const rules: Rules = {
    reportName: (val) => !!val || '请填写报告名称',
    wardCode: (val) => !!val || '请选择科室',
    reportYear: (val) => !!val || '请选择年度',
    reportMonth: (val) => !!val || '请选择月份',
    startDate: (val) => !!val || '请选择开始时间',
    endDate: (val) => !!val || '请选择结束时间'
  }

  const { visible, onCancel, onOk, wardList, loading } = props
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)

  const [startDate, setStartDate] = useState(null as any | null)
  const [endDate, setEndDate] = useState(null as any | null)
  const [year, setYear] = useState(null as any)

  useEffect(() => {
    // if (!visible) setParams(initedParams)
    if (visible ) {
      setTimeout(_ => {
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
            wardCode: authStore.defaultDeptCode
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
          let { reportName, wardCode, reportYear, startDate, endDate, reportMonth } = formData
          let params: any = {
            templateName: '广州市花都人民医院术科VTE质量表',
            reportName,
            wardCode,
            wardName: authStore.defaultDeptCodeName,
            startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
            endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
            reportLevel: "0", // 非必须
            reportMonth,
            reportYear: reportYear ? reportYear.format('YYYY') : '',
            hospitalCode: 'hd',
            tableName: "operationVTEQualityTable",
            jsonMap: {
              tradeCode: "nurse_VTE",
              Ward_code: wardCode,
              Start_time: startDate ? startDate.format('YYYY-MM-DD') : '',
              End_time: endDate ? endDate.format('YYYY-MM-DD') : '',
            }
          }

          onOk && onOk(params)
        })
        .catch((e) => { })
    }
  }

  const handlePanelChange = (value: any) => {
    console.log(value.format('YYYY'), refForm.current, 88888)
    setYear(value.format('YYYY'))
    
    setYearPickerIsOpen(false)
    setFormItem('reportYear', value)
    if (refForm.current) {
      setBeginDateAndEndDate(value, Number(refForm.current.getField('reportMonth')) - 1)
      let { reportMonth } = refForm.current.getFields()
      let reportName = `${value.format('YYYY')}年${authStore.defaultDeptCodeName}${reportMonth}月术科VTE质量统计`

      setFormItem('reportName', reportName)
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

  const MonthList = () => {
    let options = []
    for (let i = 12; i > 0; i--) {
      let month = i
      options.push(<Option value={`${month}`} key={`month${month}`}>{`${month}月`}</Option>)
    }

    return options
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

    if (key === 'reportMonth' || key === 'reportYear') {
      setReportName()
    }
    
  }

  const setBeginDateAndEndDate = (reportYear: any, month: number) => {
    if (reportYear) {
      reportYear = Moment(reportYear);
      reportYear.month(month);

      let startDate = Moment(reportYear);
      console.log(startDate, 888)
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
      if (!reportYear || !reportMonth ) return
      let yearStr = reportYear.format('YYYY')
      
      let monthStr = reportMonth
      let reportName = `${yearStr}年${authStore.defaultDeptCodeName}${monthStr}月术科VTE质量统计`
      setFormItem('reportName', reportName)
    }
  }

  // console.log(authStore.defaultDeptCodeName, authStore.deptList, 777777777)

  return (
    <Modal title='创建术科VTE质量单统计' visible={visible} onCancel={onCancel} onOk={handleOk} confirmLoading={loading || false} centered>
      <Wrapper>
        <Form ref={refForm} onChange={handleFormChange} rules={rules}>
          <Row>
            <Col span={5} className='label'>
              统计年度：
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
              统计月份：
            </Col>
            <Col span={19}>
              <Form.Field name='reportMonth'>
                <Select>{MonthList()}</Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className='label'>
              日期：
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
              科室:
            </Col>
            <Col span={19}>
              <Form.Field name='wardCode'>
                <Select showSearch
                  disabled
                >
                  {authStore.deptList.map((item: any) => (
                    <Option value={item.code} key={item.code}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className='label'>
              统计名称：
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
