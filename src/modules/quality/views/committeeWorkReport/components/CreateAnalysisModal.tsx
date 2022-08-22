import Moment from 'moment'
import Form from 'src/components/Form'
import styled from 'styled-components'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Col, DatePicker, Input, Modal, Row } from 'antd'
import { Rules } from 'src/components/Form/interfaces'
import { appStore } from 'src/stores'
import { currentMonth } from 'src/utils/date/rangeMethod'

import { getTypeName } from '../../analysisWhyx/utils'

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
  const refForm = useRef<any>()

  const rules: Rules = {
    reportName: (val) => !!val || '请填写报告名称',
    reportYear: (val) => !!val || '请选择年度',
    dates: (val) => !!val || '请选择质控日期',
  }

  const { visible, onCancel, onOk, allowClear, loading } = props
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)


  useLayoutEffect(() => {
    if (visible && allowClear) {
      setTimeout(_ => {
        if (refForm.current) {
          let nowMoment = Moment();
          refForm.current.setFields({
            reportYear: nowMoment,
            dates: currentMonth(),
            reportName: '',
          })
        }
      }, 300)
    }
  }, [visible])

  const handleOk = () => {
    let current = refForm.current
    if (current) {
      let formData = current.getFields()
      current
        .validateFields()
        .then((res: any) => {
          let { reportName, reportYear, dates } = formData
          let params: any = {
            reportName,
            reportYear: reportYear ? reportYear.format('YYYY') : '',
            startDate: dates[0] ? dates[0].format('YYYY-MM-DD') : '',
            endDate: dates[1] ? dates[1].format('YYYY-MM-DD') : '',
          }
          onOk && onOk(params)
        })
        .catch((e: any) => {})
    }
  }

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false)
    
    if (refForm.current) {
      setFormItem('reportYear', value)
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

  const handleFormChange = (key: any, val: any) => {
    if (key !== 'reportName') setReportName()
  }

  const setReportName = () => {
    let current = refForm.current
    if (current) {
      let { reportYear, dates } = current.getFields()
      if (!reportYear || !dates) return
      let reportName = ''
      let yearStr = reportYear.format('YYYY')
      let [d1, d2] = dates
      if (d2 && d2.diff(d1, 'days') < 32 && d1.format('YYYY') == yearStr) {
        reportName = `护理委员会${yearStr}年${d1.format('M')}月工作报表`
      }
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
              质控日期：
            </Col>
            <Col span={19}>
              <Form.Field name='dates'>
                <DatePicker.RangePicker format="YYYY-MM-DD" />
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
