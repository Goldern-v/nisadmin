import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Button,
  Input,
  Select,
  Col,
  Row,
  Radio
} from "antd"
import { DatePicker } from "src/vendors/antd"
import DateTimePicker from "src/components/DateTimePicker"
import formModel from '../../editPage/model'
import config from './config'
import { getAge } from '../utils'
import DeptSelect from "src/components/DeptSelect";

interface Props {
  handlePatientClick: Function
}

export default observer((props: Props) => {
  const master = formModel.getMaster()
  const itemDataMap = formModel.getItemDataMap()

  const setAge = () => {
    setMaster('age', getAge(master.birthday, master.happenDate))
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
        <Col span={5} className='title'>发生病区名称</Col>
        <Col span={7}>
          <DeptSelect deptCode={master.wardCode} style={{ width: '100%' }}
                      onChange={deptCode => setMaster("wardCode", deptCode)}/>
        </Col>
        <Col span={5} className='title'>住院患者病案号</Col>
        <Col span={7} style={{ 'display': 'flex' }}>
          <Input value={master.inpNo} style={{ marginRight: '10px' }}
                 onChange={(event => setMaster('inpNo', event.target.value))}/>
          <Button onClick={() => props.handlePatientClick()}>+</Button>
        </Col>
      </Row>
      <Row>
        <Col span={5} className='title'>入院时间</Col>
        <Col span={7}>
          <DatePicker value={master.admissionDate} style={{ width: '100%' }}
                      onChange={(val) => setMaster('admissionDate', val)}/>
        </Col>
        <Col span={5} className='title'>性别</Col>
        <Col span={7}>
          <Radio.Group value={master.sex} onChange={(e => setMaster('sex', e.target.value))}>
            <Radio value={'男'}>男</Radio>
            <Radio value={'女'}>女</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={5} className='title'>年龄</Col>
        <Col span={7}>
          <Select
            value={master.age} className='full'
            onChange={(val: string) => setMaster('age', val)}
          >
            {config.age.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
        <Col span={5} className='title'>发生地点</Col>
        <Col span={7}>
          <Select
            className='full'
            value={itemDataMap.R0001002}
            onChange={(v: string) => setItemDataMap('R0001002', v)}>
            {config.R0001002.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={5} className='title'>发生日期</Col>
        <Col span={17}>
          <DateTimePicker value={master.happenDate}
                          onChange={(v: string) => setMaster('happenDate', v)}/>
        </Col>
      </Row>
      <Row>
        <Col span={5} className='title'>该患者本次住院跌倒(坠床)第次</Col>
        <Col span={7}>
          <Select
            className='full'
            value={itemDataMap.R0001001}
            onChange={(v: string) => setItemDataMap('R0001001', v)}>
            {config.R0001001.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <div style={{ borderTop: '1px solid #eee', margin: '20px 0' }}/>
      <Row>
        <Col span={10} className='title'>跌倒(坠床)前患者活动能力：</Col>
        <Col span={14}>
          <Select
            className='full'
            value={itemDataMap.R0001003}
            onChange={(value: string) => setItemDataMap('R0001003', value)}>
            {config.R0001003.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={10} className='title'>跌倒(坠床)发生于何项活动过程：</Col>
        <Col span={14}>
          <Select
            className='full'
            value={itemDataMap.R0001004}
            onChange={(value: string) => setItemDataMap('R0001004', value)}>
            {config.R0001004.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={10} className='title'>跌倒(坠床)伤害级别：</Col>
        <Col span={14}>
          <Select
            className='full'
            value={itemDataMap.R0001005}
            onChange={(value: string) => setItemDataMap('R0001005', value)}>
            {config.R0001005.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={10} className='title'>跌倒(坠床)前有无跌倒(坠床)风险评估：</Col>
        <Col span={14}>
          <Select
            className='full'
            value={itemDataMap.R0001007}
            onChange={(value: string) => setItemDataMap('R0001007', value)}>
            {config.R0001007.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      {
        itemDataMap.R0001007 === '有' &&
        <React.Fragment>
          <Row>
            <Col span={10} className='title'>跌倒(坠床)风险评估工具：</Col>
            <Col span={14}>
              <Select
                className='full'
                value={itemDataMap.R0001008}
                onChange={(value: string) => setItemDataMap('R0001008', value)}>
                {config.R0001008.map((item, index) =>
                  <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                )}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={10} className='title'>跌倒(坠床)前跌倒风险评估级别：</Col>
            <Col span={14}>
              <Select
                className='full'
                value={itemDataMap.R0001009}
                onChange={(value: string) => setItemDataMap('R0001009', value)}>
                {config.R0001009.map((item, index) =>
                  <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                )}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={10} className='title'>最近一次跌倒(坠床)风险评估距离跌倒(坠床)发生时间：</Col>
            <Col span={14}>
              <Select
                className='full'
                value={itemDataMap.R0001010}
                onChange={(value: string) => setItemDataMap('R0001010', value)}>
                {config.R0001010.map((item, index) =>
                  <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                )}
              </Select>
            </Col>
          </Row>
        </React.Fragment>
      }
      <Row>
        <Col span={10} className='title'>跌倒(坠床)时有无约束：</Col>
        <Col span={14}>
          <Select
            className='full'
            value={itemDataMap.R0001011}
            onChange={(value: string) => setItemDataMap('R0001011', value)}>
            {config.R0001011.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={10} className='title'>跌倒(坠床)发生时当班责任护士工作年限：</Col>
        <Col span={14}>
          <Select
            className='full'
            value={itemDataMap.R0001012}
            onChange={(value: string) => setItemDataMap('R0001012', value)}>
            {config.R0001012.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={10} className='title'>跌倒(坠床)发生时在岗责任护士人数：</Col>
        <Col span={14}>
          <Input value={itemDataMap.R0001013} suffix="人"
                 onChange={(event => setItemDataMap('R0001013', event.target.value))}/>
        </Col>
      </Row>
      <Row>
        <Col span={10} className='title'>跌倒(坠床)发生时病区在原患者数：</Col>
        <Col span={14}>
          <Input value={itemDataMap.R0001014} suffix="人"
                 onChange={(event => setItemDataMap('R0001014', event.target.value))}/>
        </Col>
      </Row>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  width: 50%;
  background: #fff;
  padding: 30px;
  margin: 0 auto;
  border-radius: 5px;
    
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