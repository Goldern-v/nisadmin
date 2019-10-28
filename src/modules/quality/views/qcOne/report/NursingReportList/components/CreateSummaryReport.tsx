import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Modal, Row, Col, Radio, Select, DatePicker, Input, message as Message } from 'antd'
// import { appStore } from 'src/stores'
// import { observer } from 'mobx-react-lite'
import Moment from 'moment'
import { summaryReportService as api } from '../api/SummaryReportService'
import { numToChinese } from 'src/utils/number/numToChinese'
import { authStore } from 'src/stores'
import { getCurrentMonth } from 'src/utils/date/currentMonth'

const Option = Select.Option

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
}

export default function CreateSummearyReportModal(props: Props) {
  const { visible, onCancel, onOk } = props
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)
  const [loadingState, setLoadingState] = useState(false)
  let nowMoment = Moment()
  const initedParams = {
    year: nowMoment,
    indexInType: nowMoment.format('M'),
    type: 'month',
    reportName: `${nowMoment.format('YYYY')}年${nowMoment.format('M')}月${authStore.selectedDeptName}护理工作报表`
  }
  const [params, setParams] = useState(initedParams as any)

  useEffect(() => {
    if (!visible) setParams(initedParams)
  }, [visible])

  const handleOk = () => {
    // console.log(params);
    if (!params.indexInType) return Message.error('未选择汇总月份/季度')
    if (!params.reportName) return Message.error('未填写报告名称')

    setLoadingState(true)
    api
      .createReport({
        year: params.year.format('YYYY'),
        month: params.indexInType,
        reportName: params.reportName,
        wardCode: authStore.selectedDeptCode,
        beginDate: getCurrentMonth(params.indexInType)[0].format('YYYY-MM-DD'),
        endDate: getCurrentMonth(params.indexInType)[1].format('YYYY-MM-DD')
      })
      .then(
        (res) => {
          if (res.code == 200) {
            Message.success('创建成功')
            onOk && onOk(res.data.report)
          }
          setLoadingState(false)
        },
        (err) => {
          setLoadingState(false)
        }
      )
  }

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status)
  }

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false)

    let newParams = { ...params, year: value }
    let newReportName = setReportName(newParams)
    newParams.reportName = newReportName

    setParams(newParams)
  }

  const IndexInTypeOptions = () => {
    let options = []
    // let year = params.year.format('YYYY')

    if (params.type == 'month') {
      for (let i = 1; i <= 12; i++) {
        let month = i.toString()
        options.push(<Option value={month} key={month}>{`${month}月`}</Option>)
      }
    } else {
      for (let i = 1; i <= 4; i++) {
        // let month = i * 3 - 2;
        let season = i
        let seasonStr = numToChinese(season)

        // let monthGroup = [month, month + 1, month + 2];

        // options.push(<Option value={monthGroup.join(',')} key={season}>{`第${seasonStr}季度`}</Option>)
        options.push(<Option value={season} key={season}>{`第${seasonStr}季度`}</Option>)
      }
    }

    return options
  }

  const setReportName = (pms: any) => {
    let year = ''
    let typeStr = ''
    if (!pms.year) return ''
    if (!pms.indexInType) return ''

    year = pms.year.format('YYYY')

    if (pms.type == 'month') typeStr = `${pms.indexInType}月`
    else typeStr = `第${numToChinese(pms.indexInType)}季度`

    return `${year}年${pms.indexInType}月${authStore.selectedDeptName}护理工作报表`
  }

  const handleTypeChange = (e: any) => {
    let newType = e.target.value
    let newParams = { ...params, type: newType, indexInType: '' }
    let newReportName = setReportName(newParams)
    newParams.reportName = newReportName

    setParams(newParams)
  }

  const handleIndexInTypeChange = (indexInType: any) => {
    let newParams = { ...params, indexInType }

    let newReportName = setReportName(newParams)
    newParams.reportName = newReportName
    setParams(newParams)
  }

  return (
    <Modal
      title='创建报告'
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loadingState}
      centered
    >
      <Wrapper>
        <Row>
          <Col span={5} className='label'>
            报告年度：
          </Col>
          <Col span={18}>
            <DatePicker
              value={params.year}
              allowClear={false}
              open={yearPickerIsOpen}
              mode='year'
              className='year-picker'
              placeholder='选择年份'
              format='YYYY'
              onOpenChange={handleOpenChange}
              onPanelChange={handlePanelChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={5} className='label'>
            汇总月份：
          </Col>
          <Col span={18}>
            <Select value={params.indexInType} onChange={handleIndexInTypeChange}>
              {IndexInTypeOptions()}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={5} className='label'>
            报告名称：
          </Col>
          <Col span={18}>
            <Input
              value={params.reportName}
              onChange={(e: any) => setParams({ ...params, reportName: e.target.value })}
            />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  )
}

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
`
