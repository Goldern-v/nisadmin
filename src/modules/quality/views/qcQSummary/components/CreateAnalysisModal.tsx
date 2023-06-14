import moment from 'moment'
import Form from 'src/components/Form'
import styled from 'styled-components'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Checkbox, Col, Input, Modal, Row, Select } from 'antd'
import { Rules } from 'src/components/Form/interfaces'

import { EXTRA_QUARTER, TYPE_LIST } from '../enums'
import { Obj } from 'src/libs/types'
import SelectForm from '../../qcThreeProblem/components/SelectForm'
import { QuarterList } from 'src/modules/quality/utils/toolCon'
import YearPicker from 'src/components/YearPicker'
import { templateName } from '../../qcQSummary'
import { appStore, authStore } from 'src/stores'

export interface Props {
  visible: boolean,
  onOk: any,
  onCancel: any,
  allowClear?: boolean,
  loading?: boolean,
  /**reportName的字段排列 */
  reportFn?: Function
}

export default function CreateAnalysisModal(props: Props) {
  const refForm = useRef<any>()
  const rules: Rules = {
    reportName: (val) => !!val || '请填写报告名称',
    reportYear: (val) => !!val || '请选择年度',
    summaryFormCode: (val) => val.length > 0 || '请选择汇总表单'
  }

  const { visible, onCancel, onOk, allowClear, loading } = props

  useLayoutEffect(() => {
    if (visible && allowClear) {
      setTimeout(_ => {
        if (refForm.current) {
          let nowMoment = moment();
          refForm.current.setFields({
            reportYear: nowMoment,
            reportName: '',
            reportMonth: moment().month() + 1 + '',
            templateName,
            // flag: false,
            summaryFormCode: [],
          })
        }
      }, 300)
    }
  }, [visible])
  const [curType, setCurType] = useState('')
  const handleOk = () => {
    let current = refForm.current
    if (current) {
      let formData = current.getFields()
      current
        .validateFields()
        .then((res: any) => {
          let { reportName, reportYear, templateName, reportMonth, reportQuarter, flag, summaryFormCode } = formData

          let params: Obj = {
            reportName,
            reportYear: reportYear ? reportYear.format('YYYY') : '',
            templateName,
            summaryFormCode: summaryFormCode.map((v: Obj) => v.qcCode).join(','),
            summaryFormName: summaryFormCode.map((v: Obj) => v.qcName).join(','),
          }

          params.reportQuarter = reportQuarter
          // flag && (params.templateName = EXTRA_QUARTER)

          onOk && onOk(params)
        })
        .catch((e: any) => { })
    }
  }

  const setFormItem = (key: any, value: any) => {
    if (refForm.current) refForm.current.setField(key, value)
  }

  const handleFormChange = (key: any, val: any) => {
    if (!['reportName', 'summaryFormCode'].includes(key)) setReportName()
    if (key === 'templateName') {
      setCurType(val)
      refForm.current.setFields({
        reportQuarter: moment().quarter() + '',
        // flag: false,
      })
    }
  }
  const quarterList = QuarterList(true)

  const setReportName = () => {
    let current = refForm.current
    if (current) {
      let { reportYear, templateName, reportMonth, reportQuarter, flag } = current.getFields()
      if (!reportYear) return
      const year = reportYear.format('YYYY')
      const date = quarterList[Number(reportQuarter) - 1]
      //  + (flag ? '（含月份）' : '')
      let reportName = `${year}年${date}${authStore.defaultDeptCodeName}质量汇总`
      setFormItem('reportName', reportName)
    }
  }

  return (
    <Modal title='创建报告' visible={visible} onCancel={onCancel} onOk={handleOk} confirmLoading={loading || false} centered>
      <Wrapper>
        <Form ref={refForm} onChange={handleFormChange} rules={rules}>
          {/* <Row>
            <Col span={8} className='label'>汇总类型：</Col>
            <Col span={16}>
              <Form.Field name='templateName'>
                <Select>
                  {TYPE_LIST.map((v: Obj) => (
                    <Select.Option value={v.value} key={v.value}>{v.label}</Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row> */}
          <Row>
            <Col span={8} className='label'>
              报告年度：
            </Col>
            <Col span={16}>
              <Form.Field name='reportYear'>
                <YearPicker />
              </Form.Field>
            </Col>
          </Row>


          <Row>
            <Col span={8} className='label'>
              汇总季度：
            </Col>
            <Col span={16}>
              <Form.Field name='reportQuarter'>
                <Select>
                  {QuarterList()}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          {/* <Row>
                <Col span={8} className='label'>
                  显示每个月表单汇总：
                </Col>
                <Col span={4}>
                  <Form.Field name='flag'>
                    <Checkbox>显示</Checkbox>
                  </Form.Field>
                </Col>
              </Row> */}
          <Row>
            <Col span={8} className='label'>
              汇总表单：
            </Col>
            <Col span={16}>
              <Form.Field name='summaryFormCode'>
                <SelectForm maxSize={5} level={(parseInt(appStore.queryObj.level) + '')} />
              </Form.Field>
            </Col>
          </Row>

          <Row>
            <Col span={8} className='label'>
              报告名称：
            </Col>
            <Col span={16}>
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
