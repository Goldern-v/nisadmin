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
import { getAge } from '../utils'
import formModel from "src/modules/indicator/selfDeclaration/components/editPage/model";
import DeptSelect from "src/components/DeptSelect";

interface Props {

}

export default observer((props: Props) => {
  const master = formModel.getMaster()
  const itemDataMap = formModel.getItemDataMap()

  const setAge = () => {
    master.age = getAge(master.birthday, master.happenDate)
  }

  const setMaster = (key: string, value: any) => {
    formModel.setMaster({ [key]: value })
  }
  const setItemDataMap = (key: string, value: any) => {
    formModel.setItemDataMap({ [key]: value })
  }

  useEffect(() => {
    setAge()
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
        <Col span={8}>
          <Input value={master.inpNo} onChange={(event => setMaster('inpNo', event.target.value))}/>
        </Col>
      </Row>
      <Row>
        <Col span={4} className='title'>入院时间</Col>
        <Col span={8}>
          <DatePicker value={master.admissionDate} onChange={(val) => setMaster('admissionDate', val)}/>
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
        <Col span={4} className='title'>发生地点</Col>
        <Col span={8}>
          <Select
            className='full'
            value={itemDataMap.R0003002}
            onChange={(v: string) => setItemDataMap('R0003002', v)}>
            {config.R0003002.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={4} className='title'>发生日期</Col>
        <Col span={18}>
          <DateTimePicker value={master.happenDate}
                          onChange={(v: string) => master.happenDate = v}/>
        </Col>
      </Row>
      <Row>
        <Col span={4} className='title'>该患者本次住院跌倒(坠床)第次</Col>
        <Col span={8}>
          <Select
            className='full'
            value={itemDataMap.R0003001}
            onChange={(v: string) => setItemDataMap('R0003001', v)}>
            {config.R0003001.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <div style={{ borderTop: '1px solid #eee', margin: '20px 0' }}/>
      <Row>
        <Col span={8} className='title'>非计划拔管主要原因：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0003003}
            onChange={(value: string) => setItemDataMap('R0003003', value)}>
            {config.R0003003.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>是否重置：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0003004}
            onChange={(value: string) => setItemDataMap('R0003004', value)}>
            {config.R0003004.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>非计划拔管时有无约束：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0003005}
            onChange={(value: string) => setItemDataMap('R0003005', value)}>
            {config.R0003005.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>非计划拔管时患者状态：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0003006}
            onChange={(value: string) => setItemDataMap('R0003006', value)}>
            {config.R0003006.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>非计划拔管时患者神志：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0003007}
            onChange={(value: string) => setItemDataMap('R0003007', value)}>
            {config.R0003007.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>非计划拔管时患者是否镇静：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0003008}
            onChange={(value: string) => setItemDataMap('R0003008', value)}>
            {config.R0003008.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>非计划拔管时患者镇静评分工具：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0003009}
            onChange={(value: string) => setItemDataMap('R0003009', value)}>
            {config.R0003009.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>非计划拔管发生时当班责任护士工作年限：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0003011}
            onChange={(value: string) => setItemDataMap('R0003011', value)}>
            {config.R0003011.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>非计划拔管发生时在岗责任护士人数：</Col>
        <Col span={16}>
          <Input value={itemDataMap.R0003012} suffix="人"
                 onChange={(event => setItemDataMap('R0003012', event.target.value))}/>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>非计划拔管发生时病区在院患者数：</Col>
        <Col span={16}>
          <Input value={itemDataMap.R0003013} suffix="人"
                 onChange={(event => setItemDataMap('R0003013', event.target.value))}/>
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