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
import { workSummaryReportListService } from './../api/WorkSummaryReportListService'

const Option = Select.Option

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  groupRoleList: any
}

export default observer(function CreateWorkSummaryReportModal(props: Props) {
  const refForm = React.createRef<Form>()
  const [loading, setLoading] = useState(false)

  const rules: Rules = {
    reportName: (val) => !!val || '请填写报告名称',
    groupRoleCode: (val) => !!val || '请选择片区',
    year: (val) => !!val || '请选择年度',
    indexInType: (val) => !!val || '请选择月份',
    beginDate: (val) => !!val || '请选择开始时间',
    endDate: (val) => !!val || '请选择结束时间'
  }

  const { visible, onCancel, onOk, groupRoleList, } = props
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)

  const [beginDate, setBeginDate] = useState(null as any | null)
  const [endDate, setEndDate] = useState(null as any | null)

  useEffect(() => {
    // if (!visible) setParams(initedParams)
    setTimeout(_ => {
      if (refForm.current) {
        let nowMoment = Moment();
        let month = nowMoment.format('M');

        refForm.current.setFields({
          year: nowMoment,
          beginDate: null,
          endDate: null,
          reportName: '',
          groupRoleCode: '',
          indexInType: month
        })
      }
    }, 300)

    setBeginDate(null)
    setEndDate(null)
  }, [visible])

  const handleOk = () => {
    let current = refForm.current
    if (current) {
      let formData = current.getFields()
      current
        .validateFields()
        .then((res) => {
          let { reportName, groupRoleCode, year, beginDate, endDate, indexInType } = formData
          let params: any = {
            reportName: reportName,
            groupRoleCode: groupRoleCode,
            year: year ? year.format('YYYY') : '',
            beginDate: beginDate ? beginDate.format('YYYY-MM-DD') : '',
            endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
            type: 'month',
            indexInType
          }

          return workSummaryReportListService.createReport(params)
        }).then(res => {
          onOk && onOk()
          if (res.code == 200) appStore.history.push(`/workSummaryReportView?${qs.stringify(res.data.report)}`)
        })
        .catch((e) => { })
    }
  }

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false)
    setFormItem('year', value)

    if (refForm.current) {

      setBeginDateAndEndDate(value, Number(refForm.current.getField('indexInType')) - 1)
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

  const MonthList = () => {
    let options = []
    for (let i = 12; i > 0; i--) {
      let month = i
      options.push(<Option value={`${month}`} key={`month${month}`}>{`${month}月`}</Option>)
    }

    return options
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

    if (key == 'indexInType') {
      if (refForm.current) {
        let year = refForm.current.getField('year');
        setBeginDateAndEndDate(year, Number(val) - 1)
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

      endDate.setMonth(endDate.getMonth() + 1);
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
      let { year, indexInType, groupRoleCode } = current.getFields()
      if (!year || !indexInType || !groupRoleCode) return

      let yearStr = year.format('YYYY')
      let monthStr = indexInType
      let groupRoleName: any = ''

      for (let i = 0; i < groupRoleList.length; i++) {
        if (groupRoleList[i].code == groupRoleCode) groupRoleName = groupRoleList[i].name
      }

      if (groupRoleName.split('、').length > 1) {
        groupRoleName = groupRoleName.split('、')
        groupRoleName.shift()
        groupRoleName = groupRoleName.join('、')
      }

      let reportName = `${yearStr}年${monthStr}月${groupRoleName}护理工作汇总`

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
              报告月份：
            </Col>
            <Col span={19}>
              <Form.Field name='indexInType'>
                <Select>{MonthList()}</Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={5} className='label'>
              质控日期：
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
              片区：
            </Col>
            <Col span={19}>
              <Form.Field name='groupRoleCode'>
                <Select>
                  {groupRoleList.map((item: any) => (
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
