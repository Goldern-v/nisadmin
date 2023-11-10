import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Radio, Select, message as Message } from 'antd'
import YearPicker from "src/components/YearPicker";
import Moment from 'moment'
import { nqreportService as api } from '../api/NQreportApi'
import { appStore, authStore } from "src/stores";
import { handleReplace, handleStartEenDate } from '../utils'

const Option = Select.Option

export interface Props {
  visible: boolean
  onOk: any
  onCancel: any
  groupRoleList: any
}

export default function CreateSummearyReportModal(props: Props) {
  const { queryObj } = appStore;
  let nowMoment = Moment()
  const initedParams = {
    reportLevel: queryObj.qcLevel || "3",
    reportYear: nowMoment,
    qcTime: nowMoment.format('M')+'月',
    reportType: '月度',
    reportName: `${nowMoment.format('YYYY')}年${nowMoment.format('M')}月全院质控组护理质量分析`,
    hospitalCode: "925",
    templateName: "护理质量分析报告",
    startDate: nowMoment.startOf('month').format('YYYY-MM-DD'),
    endDate: nowMoment.endOf('month').format('YYYY-MM-DD'),
    dataSourceType: 0
  }
  const [params, setParams] = useState(initedParams as any)
  const { visible, onCancel, onOk,  groupRoleList} = props
  const {typeList, reportList} = groupRoleList
  const [loadingState, setLoadingState] = useState(false)
  

  useEffect(() => {
    if (!visible) setParams(initedParams)
  }, [visible])

  const handleOk = () => {
    if (!params.reportType) return Message.error('未选择报告类型')
    if (!params.reportYear) return Message.error('报告年度')
    let reportYear = "";
    if (params.reportYear !== null) reportYear = params.reportYear.format("YYYY");
    let reqQuery = {
      ...params,
      reportYear
    }
    setLoadingState(true)
    api.createQcReport(reqQuery).then(
      (res) => {
        if (res.code == 200) {
          Message.success('创建成功')
          onOk && onOk({...res.data, ...reqQuery})
        }
        setLoadingState(false)
      },
      (err) => {
        setLoadingState(false)
      }
    )
  }

  const setReportName = (pms: any) => {
    let reportYear = ''
    if (!pms.reportYear) return ''
    reportYear = pms.reportYear.format('YYYY')
    
    return `${reportYear}年${pms.qcTime}全院质控组护理质量分析`
  }

  
  const handleTypeChange = (e: any) => {
    let newType = e.target.value
    let newqcTime = handleReplace(newType)
    let {startDate,endDate } = handleStartEenDate(newType, newqcTime || params.qcTime, params.reportYear)
    let newParams = { ...params, reportType: newType, qcTime:newqcTime, startDate,endDate }
    const newReportName = setReportName(newParams)
    newParams.reportName = newReportName
    setParams(newParams)
  }
  const handleSource = (e: any) => {
    let newType = e.target.value
    let newParams = { ...params, dataSourceType: newType}
    const newReportName = setReportName(newParams)
    newParams.reportName = newReportName
    setParams(newParams)
  }

  const handleIndexInTypeChange = (indexInType: any) => {
    let {startDate,endDate } = handleStartEenDate(params.reportType, indexInType || params.qcTime, params.reportYear)
    let newParams = { ...params, qcTime:indexInType,startDate,endDate }
    const newReportName = setReportName(newParams)
    newParams.reportName = newReportName
    setParams(newParams)
  }
  // 处理年
  const handleYear = (e: any) => {
    let {startDate,endDate } = handleStartEenDate(params.reportType, params.qcTime, e)
    let newParams = { ...params, reportYear: e ,startDate,endDate}
    const newReportName = setReportName(newParams)
    newParams.reportName = newReportName
    setParams(newParams)
  }

  return (
    <Modal
      title='新建护理质量分析报告'
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loadingState}
      centered
    >
      <Wrapper>
        <Row>
          <Col span={5} className='label'>
            报告类型：
          </Col>
          <Col span={19}>
            <Radio.Group value={params.reportType} onChange={handleTypeChange}>
              {typeList.map((item: string, index: number)=>(
                 <Radio value={item} key={index}>{item}</Radio>
              ))}
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={5} className='label'>
            报告年度：
          </Col>
          <Col span={19}>
            <YearPicker
              value={params.reportYear}
              onChange={handleYear}
            />
          </Col>
        </Row>
        {
          params.reportType != '年度' &&
          <Row>
            <Col span={5} className='label'>
              时间:
            </Col>
            <Col span={19}>
              <Select value={params.qcTime} onChange={handleIndexInTypeChange}>
              {reportList[params.reportType]&& reportList[params.reportType].map((item: any, index: number) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
              </Select>
            </Col>
          </Row>
        }
        {
          params.reportLevel == '3' && <Row>
            <Col span={5} className='label'>
              数据来源:
            </Col>
            <Col span={19}>
              <Radio.Group value={params.dataSourceType} onChange={handleSource}>
                <Radio value={0}>仅三级质控</Radio>
                <Radio value={1}>二级质控+三级质控</Radio>
              </Radio.Group>
            </Col>
          </Row>
        }
        
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
