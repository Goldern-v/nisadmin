import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import { Modal, Row, Col, Radio, Select, DatePicker, Input, message as Message } from 'antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import Moment from 'moment'
import { badEventReportListService as api } from '../api/BadEventReportListService'
import { numToChinese } from 'src/utils/number/numToChinese'

const Option = Select.Option

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
}

export default observer(function CreateSummearyReportModal(props: Props) {
  const { visible, onCancel, onOk } = props
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false)
  const [loadingState, setLoadingState] = useState(false)
  const { history } = appStore
  let nowMoment = Moment()
  const initedParams = {
    year:nowMoment,
    dateBegin: Moment(`${nowMoment.format('YYYY-MM')}-1`).format('YYYY-MM-DD'),
    dateEnd: Moment(`${nowMoment.format('YYYY-MM')}-${nowMoment.daysInMonth()}`).format('YYYY-MM-DD'),
    name: `${nowMoment.format('YYYY')}年不良事件分析报告`,
    beginMonth:`${nowMoment.format('M')}`,
    endMonth:`${nowMoment.format('M')}`
  }
  const [params, setParams] = useState(initedParams as any)

  useEffect(() => {
    if (!visible) setParams(initedParams)
  }, [visible])

  const handleOk = () => {
    // console.log(params);
    console.log(params);
    
    let user = JSON.parse(sessionStorage.getItem('user')||'')
    let createParams = {
      name: params.name,
      dateBegin: params.dateBegin,
      dateEnd: params.dateEnd,
      creator:user.empNo,
      creatorName:user.empName,
    }
    let url = '/BadEventReportViewGzsrm?'

    let parseRecord = JSON.parse(JSON.stringify(createParams))
    for(let key in parseRecord){
      url+=`${key}=${parseRecord[key]}&`
    }
    onOk && onOk()
    history.push(url)
  }

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status)
  }

  const handlePanelChange = (value: any) => {
   setParams({...params,year:value})
  }

  const IndexInTypeOptions = () => {
    let options = []
      for (let i = 1; i <= 12; i++) {
        let month = i.toString()
        options.push(<Option value={month} key={month}>{`${month}月`}</Option>)
      }
    return options
  }

  // const setReportName = (pms: any) => {
  // }

  // const handleTypeChange = (e: any) => {
  //   let newType = e.target.value
  //   let newParams = { ...params, type: newType, indexInType: '' }
  //   let newReportName = setReportName(newParams)
  //   newParams.reportName = newReportName

  //   setParams(newParams)
  // }

  // const handleIndexInTypeChange = (indexInType: any) => {
  //   let newParams = { ...params, indexInType }

  //   let newReportName = setReportName(newParams)

  //   if (newParams.type == 'month') {
  //     let currentMoment = Moment(`${newParams.year.format('YYYY')}-${newParams.indexInType}`)
  //     newParams.dateBegin = Moment(`${currentMoment.format('YYYY-MM')}-1`)
  //     newParams.dateEnd = Moment(`${currentMoment.format('YYYY-MM')}-${currentMoment.daysInMonth()}`)
  //   }
  //   newParams.reportName = newReportName
  //   setParams(newParams)
  // }
  const changeBeginMonth=(month: any)=>{
    let dateBegin = Moment(`${params.year.format('YYYY')}-${month.length==0?month:`0${month}`}-01`).format('YYYY-MM-DD')
    setParams({...params,beginMonth:month,dateBegin})
  }
  const changeEndMonth=(month: any)=>{
    if(month<params.beginMonth)return Message.warning('结束月份不得小于开始月份！');
    let date = Moment(`${params.year.format('YYYY')}-${month.length==0?month:`0${month}`}-01`)
    let dateEnd = Moment(`${params.year.format('YYYY')}-${month.length==0?month:`0${month}`}-${date.daysInMonth()}`).format('YYYY-MM-DD')
    setParams({...params,endMonth:month,dateEnd})
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
              onChange={handlePanelChange}
              onPanelChange={handlePanelChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={5} className='label'>
            开始月份：
          </Col>
          <Col span={18}>
            <Select value={params.beginMonth} onChange={changeBeginMonth}>
              {IndexInTypeOptions()}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={5} className='label'>
            结束月份：
          </Col>
          <Col span={18}>
            <Select value={params.endMonth} onChange={changeEndMonth}>
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
              value={params.name}
              onChange={(e: any) => setParams({ ...params, name: e.target.value })}
            />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  )
})

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
