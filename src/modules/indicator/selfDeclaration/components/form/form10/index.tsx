import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Button,
  Input,
  Select,
  Col,
  Row, Radio
} from "antd"
import { DatePicker } from "src/vendors/antd"
import DateTimePicker from "src/components/DateTimePicker"
import config from './config'
import { getAge } from "../utils";
import formModel from "src/modules/indicator/selfDeclaration/components/editPage/model";
import DeptSelect from "src/components/DeptSelect";
import api from "src/modules/indicator/selfDeclaration/api";

interface Props {
  handlePatientClick: Function
}

export default observer((props: Props) => {
  const master = formModel.getMaster()
  const itemDataMap = formModel.getItemDataMap()

  const setAge = () => {
    master.age = getAge(master.birthday, master.happenDate)
  }

  const getDefaultValue = async () => {
    if (master.id || !master.patientId || !master.happenDate) return
    const { data: { itemDataMap } } = await api.getDefaultValue(master)
    formModel.setItemDataMap(itemDataMap)
  }

  const setMaster = (key: string, value: any) => {
    formModel.setMaster({ [key]: value })
  }
  const setItemDataMap = (key: string, value: any) => {
    formModel.setItemDataMap({ [key]: value })
  }

  useEffect(() => {
    setAge()
  }, [master.birthday, master.happenDate])

  useEffect(() => {
    getDefaultValue().then()
  }, [master.happenDate])

  return (
    <Wrapper>
      <Row>
        <Col span={4} className='title'>发生病区名称</Col>
        <Col span={8}>
          <DeptSelect deptCode={master.wardCode} style={{ width: '100%' }}
                      onChange={deptCode => setMaster("wardCode", deptCode)}/>
        </Col>
        <Col span={4} className='title'>住院患者病案号</Col>
        <Col span={8} style={{ 'display': 'flex' }}>
          <Input value={master.inpNo} style={{ marginRight: '10px' }}
                 onChange={(event => setMaster('inpNo', event.target.value))}/>
          <Button onClick={() => props.handlePatientClick()}>+</Button>
        </Col>
      </Row>
      <Row>
        <Col span={4} className='title'>入院时间</Col>
        <Col span={8}>
          <DatePicker className='full' value={master.admissionDate}
                      onChange={(val) => setMaster('admissionDate', val)}/>
        </Col>
        <Col span={4} className='title'>性别</Col>
        <Col span={8}>
          <Radio.Group value={master.sex} onChange={(e => setMaster('sex', e.target.value))}>
            <Radio value={'男'}>男</Radio>
            <Radio value={'女'}>女</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={4} className='title'>年龄</Col>
        <Col span={8}>
          <Select
            value={master.age} className='full'
            onChange={(val: string) => setMaster('age', val)}
          >
            {config.age.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={4} className='title'>发生日期</Col>
        <Col span={20}>
          <DateTimePicker value={master.happenDate}
                          onChange={(v: string) => setMaster('happenDate', v)}/>
        </Col>
      </Row>
      <div style={{ borderTop: '1px solid #eee', margin: '20px 0' }}/>
      <Row>
        <Col span={12} className='title'>人工气管类型：</Col>
        <Col span={12}>
          <Select
            className='full'
            value={itemDataMap.R0010001}
            onChange={(value: string) => setItemDataMap('R0010001', value)}>
            {config.R0010001.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={12} className='title'>导管类型：</Col>
        <Col span={12}>
          <Select
            className='full'
            value={itemDataMap.R0010002}
            onChange={(value: string) => setItemDataMap('R0010002', value)}>
            {config.R0010002.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={12} className='title'>湿化装置：</Col>
        <Col span={12}>
          <Select
            className='full'
            value={itemDataMap.R0010003}
            onChange={(value: string) => setItemDataMap('R0010003', value)}>
            {config.R0010003.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={12} className='title'>吸痰方式：</Col>
        <Col span={12}>
          <Select
            className='full'
            value={itemDataMap.R0010004}
            onChange={(value: string) => setItemDataMap('R0010004', value)}>
            {config.R0010004.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={12} className='title'>口腔护理方式：</Col>
        <Col span={12}>
          <Select
            className='full'
            value={itemDataMap.R0010005}
            onChange={(value: string) => setItemDataMap('R0010005', value)}>
            {config.R0010005.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={12} className='title'>该患者每天口腔护理次数：</Col>
        <Col span={12}>
          <Input value={itemDataMap.R0010006}
                 onChange={(event => setItemDataMap('R0010006', event.target.value))}/>
        </Col>
      </Row>
      <Row>
        <Col span={12} className='title'>口腔护理液选择：</Col>
        <Col span={12}>
          <Select
            className='full'
            value={itemDataMap.R0010007}
            onChange={(value: string) => setItemDataMap('R0010007', value)}>
            {config.R0010007.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={12} className='title'>经人工气道通气的同时，是否有经鼻胃管内营养：</Col>
        <Col span={12}>
          <Select
            className='full'
            value={itemDataMap.R0010008}
            onChange={(value: string) => setItemDataMap('R0010008', value)}>
            {config.R0010008.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={12} className='title'>发生VAP时，经人工气道机械通气时长：</Col>
        <Col span={12}>
          <Input value={itemDataMap.R0010009} suffix="天"
                 onChange={(event => setItemDataMap('R0010009', event.target.value))}/>
        </Col>
      </Row>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  width: 50%;
  background: #fff;
  padding: 30px;
  margin: 30px auto;
  .ant-row{
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  .title{
    font-size: 14px;
    text-align:right;
    padding-right:5px;
  }
  .full{
    width: 100%;
  }
`

const SameTable = styled.div`
  borderTop: '1px solid #eee';
  marginTop: '20px';
  font-size: 14px;
  line-height: 32px;
  
  .ant-row{
    display: flex;
    align-items: center;
    margin: 0;
    border: 1px solid #ccc;
    border-bottom: none;
    .ant-col{
      padding: 0 10px;
      text-align: center;
    }
    .ant-col-10{
      border-left: 1px solid #ccc;
      padding: 0 10px;
    }
    & :nth-last-of-type(1) {
      border-bottom: 1px solid #ccc;
    }
  }
`