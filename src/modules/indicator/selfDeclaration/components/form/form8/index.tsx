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
        <Col span={8} className='title'>留置导管的主要原因：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0008001}
            onChange={(value: string) => setItemDataMap('R0008001', value)}>
            {config.R0008001.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>CVC置管位置：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0008002}
            onChange={(value: string) => setItemDataMap('R0008002', value)}>
            {config.R0008002.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>导管类型：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0008003}
            onChange={(value: string) => setItemDataMap('R0008003', value)}>
            {config.R0008003.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>是否为抗菌导管：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0008004}
            onChange={(value: string) => setItemDataMap('R0008004', value)}>
            {config.R0008004.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>发生CLABS时CVC留置时长：</Col>
        <Col span={16}>
          <Input value={itemDataMap.R0008005} suffix="天"
                 onChange={(event => setItemDataMap('R0008005', event.target.value))}/>
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