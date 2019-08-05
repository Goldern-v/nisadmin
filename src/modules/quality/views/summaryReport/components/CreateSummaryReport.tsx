import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Row, Col, Radio, Select, DatePicker, Input, message as Message } from 'antd'
// import { appStore } from 'src/stores'
// import { observer } from 'mobx-react-lite'
import Moment from 'moment'
import summaryReportService from './../api/summaryReportService'

const api = new summaryReportService()

const Option = Select.Option;

export interface Props {
  visible: boolean,
  onOk: any,
  onCancel: any
}

export default function CreateAnalysisModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const initedParams = {
    year: Moment(),
    indexInType: '',
    type: 'month',
    reportName: ''
  }
  const [params, setParams] = useState(initedParams as any)

  useEffect(() => {
    if (!visible) setParams(initedParams)
  }, [visible])

  const handleOk = () => {
    // console.log(params);
    if (!params.indexInType) return Message.error('未选择月份/季度');

    setLoadingState(true);
    api.createReport({ ...params, year: params.year.format('YYYY') }).then(res => {
      if (res.code == 200) {
        Message.success('创建成功');
        onOk && onOk();
      } else {
        Message.success('创建失败');
      }
      setLoadingState(false);
    }, err => {
      Message.success('创建失败');
      setLoadingState(false);
    })
  }

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status)
  }

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false);

    let newParams = { ...params, year: value };
    let newReportName = setReportName(newParams);
    newParams.reportName = newReportName;

    setParams(newParams);
  }

  const RecordTypeList = () => {
    let list = [];
    // let year = params.year.format('YYYY')

    if (params.type == 'month') {
      for (let i = 1; i <= 12; i++) {
        let month = i.toString();
        list.push(<Option value={month} key={month}>{`${month}月`}</Option>)
      }
    } else {
      for (let i = 1; i <= 4; i++) {
        // let month = i * 3 - 2;
        let season = i;
        let seasonStr = season2Cn(season);

        // let monthGroup = [month, month + 1, month + 2];

        // list.push(<Option value={monthGroup.join(',')} key={season}>{`第${seasonStr}季度`}</Option>)
        list.push(<Option value={season} key={season}>{`第${seasonStr}季度`}</Option>)
      }
    }

    return list;
  }

  const setReportName = (pms: any) => {
    let year = '';
    let typeStr = '';
    if (!pms.year) return '';
    if (!pms.indexInType) return '';

    year = pms.year.format('YYYY');

    if (pms.type == 'month')
      typeStr = `${pms.indexInType}月`
    else
      typeStr = `第${season2Cn(pms.indexInType)}季度`

    return `${year}年度${typeStr}质控汇总报告`
  }

  const handleTypeChange = (e: any) => {
    let newType = e.target.value;
    let newParams = { ...params, type: newType, indexInType: '' };
    let newReportName = setReportName(newParams);
    newParams.reportName = newReportName;

    setParams(newParams)
  }

  const handleIndexInTypeChange = (indexInType: any) => {
    let newParams = { ...params, indexInType };

    let newReportName = setReportName(newParams);
    newParams.reportName = newReportName;
    setParams(newParams);
  }

  const season2Cn = (season: number) => {
    switch (season) {
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
    }
  }

  return <Modal
    title="创建报告 "
    visible={visible}
    onCancel={onCancel}
    onOk={handleOk}
    confirmLoading={loadingState}
    centered>
    <Wrapper>
      <Row>
        <Col span={5} className="label">汇总类型：</Col>
        <Col span={18}>
          <Radio.Group
            value={params.type}
            onChange={handleTypeChange}>
            <Radio value="month">月度汇总</Radio>
            {/* <Radio value="season">季度汇总</Radio> */}
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={5} className="label">报告年度：</Col>
        <Col span={18}>
          <DatePicker
            value={params.year}
            allowClear={false}
            open={yearPickerIsOpen}
            mode="year"
            className="year-picker"
            placeholder='选择年份'
            format="YYYY"
            onOpenChange={handleOpenChange}
            onPanelChange={handlePanelChange} />
        </Col>
      </Row>
      {/* 质控表单 */}
      <Row>
        <Col span={5} className="label">
          汇总{params.type == 'month' ? '月份：' : '季度：'}
        </Col>
        <Col span={18}>
          <Select value={params.indexInType} onChange={handleIndexInTypeChange}>
            {RecordTypeList()}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={5} className="label">报告名称：</Col>
        <Col span={18}>
          <Input value={params.reportName} onChange={(e: any) => setParams({ ...params, reportName: e.target.value })} />
        </Col>
      </Row>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
width: 80%;
margin: 0 auto;
.ant-col{
  line-height: 32px;
  text-align: right;
  padding-right: 5px;
  margin-bottom: 10px;
  >span{
    width: 100%;
  }
  .ant-radio-group{
    float: left;
  }
  .ant-select{
    width: 100%;
  }
}
`