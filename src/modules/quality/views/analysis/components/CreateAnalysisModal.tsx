import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal, Row, Col, Radio, Select, DatePicker } from 'antd'
// import { appStore } from 'src/stores'
// import { observer } from 'mobx-react-lite'
import Moment from 'moment'

const Option = Select.Option;

export interface Props {
  visible: boolean,
  onOk: any,
  onCancel: any
}

export default function CreateAnalysisModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false);
  const initedParams = {
    year: Moment(),
    month: Moment().format('M'),
    recodeType: '月度报告',
    formType: '',
  }
  const [params, setParams] = useState(initedParams as any)

  useEffect(() => {
    if (!visible) setParams(initedParams)
  }, [visible])

  const handleOk = () => {
    onOk(params)
  }

  const handleOpenChange = (status: boolean) => {
    setYearPickerIsOpen(status)
  }

  const handlePanelChange = (value: any) => {
    setYearPickerIsOpen(false);
    setParams({ ...params, year: value })
  }

  const RecordTypeList = () => {
    let list = [];
    // let year = params.year.format('YYYY')

    if (params.recodeType == '月度报告') {
      for (let i = 1; i <= 12; i++) {
        let month = i.toString();
        list.push(<Option value={month} key={month}>{`${month}月`}</Option>)
      }
    } else {
      for (let i = 1; i <= 4; i++) {
        let month = i * 3 - 2;
        let season = i;
        let seasonStr = '';
        switch (season) {
          case 1:
            seasonStr = '一'; break;
          case 2:
            seasonStr = '二'; break;
          case 3:
            seasonStr = '三'; break;
          case 4:
            seasonStr = '四'; break;
        }

        let monthGroup = [month, month + 1, month + 2];

        list.push(<Option value={monthGroup.join(',')} key={season}>{`第${seasonStr}季度`}</Option>)
      }
    }

    return list;
  }

  return <Modal
    title="创建报告"
    visible={visible}
    onCancel={onCancel}
    onOk={handleOk}
    centered>
    <Wrapper>
      <Row>
        <Col span={5} className="label">类型：</Col>
        <Col span={18}>
          <Radio.Group
            value={params.recodeType}
            onChange={(e: any) => setParams({ ...params, recodeType: e.target.value, month: '' })}>
            <Radio value="季度报告">季度报告</Radio>
            <Radio value="月度报告">月度报告</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={5} className="label">年度：</Col>
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
          {params.recodeType == '月度报告' ? '月份：' : '季度：'}
        </Col>
        <Col span={18}>
          <Select value={params.month} onChange={(month: any) => setParams({ ...params, month })}>
            {RecordTypeList()}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={5} className="label">质控表单：</Col>
        <Col span={18}>
          <Select value={params.formType} onChange={(formType: any) => setParams({ ...params, formType })}></Select>
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