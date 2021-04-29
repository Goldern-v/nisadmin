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
        <Col span={8} className='title'>压力性损伤风险评估工具：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0002001}
            onChange={(value: string) => setItemDataMap('R0002001', value)}>
            {config.R0002001.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>人病区时是否进行压力性损伤风险评估：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0002002}
            onChange={(value: string) => setItemDataMap('R0002002', value)}>
            {config.R0002002.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>最近一次压力性损伤风险评估距离发现时间：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0002004}
            onChange={(value: string) => setItemDataMap('R0002004', value)}>
            {config.R0002004.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>最近一次压性损伤风险评估级别：</Col>
        <Col span={16}>
          <Select
            className='full'
            value={itemDataMap.R0002003}
            onChange={(value: string) => setItemDataMap('R0002003', value)}>
            {config.R0002003.map((item, index) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='title'>入本病区24小时后新发2期及以上院内压力性损伤部位数：</Col>
        <Col span={16}>
          <Input value={itemDataMap.R0002006} suffix="人"
                 onChange={(event => setItemDataMap('R0002006', event.target.value))}/>
        </Col>
      </Row>
      <SameTable>
        <Row>
          <Col span={4}>分期、类型</Col>
          <Col span={10}>入院病区24小时后新发2期及以上院内压力性损伤部位数</Col>
          <Col span={10}>其中，医疗器械相关压力性损伤部位数</Col>
        </Row>
        <Row>
          <Col span={4}>2期</Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002007}
                   onChange={(event => setItemDataMap('R0002007', event.target.value))}/>
          </Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002008}
                   onChange={(event => setItemDataMap('R0002008', event.target.value))}/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>3期</Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002009}
                   onChange={(event => setItemDataMap('R0002009', event.target.value))}/>
          </Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002010}
                   onChange={(event => setItemDataMap('R0002010', event.target.value))}/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>4期</Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002011}
                   onChange={(event => setItemDataMap('R0002011', event.target.value))}/>
          </Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002012}
                   onChange={(event => setItemDataMap('R0002012', event.target.value))}/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>深部位组织损伤</Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002013}
                   onChange={(event => setItemDataMap('R0002013', event.target.value))}/>
          </Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002014}
                   onChange={(event => setItemDataMap('R0002014', event.target.value))}/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>不可分期</Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002015}
                   onChange={(event => setItemDataMap('R0002015', event.target.value))}/>
          </Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002016}
                   onChange={(event => setItemDataMap('R0002016', event.target.value))}/>
          </Col>
        </Row>
        <Row>
          <Col span={4}>粘膜压力性损伤</Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002017}
                   onChange={(event => setItemDataMap('R0002017', event.target.value))}/>
          </Col>
          <Col span={10}>
            <Input value={itemDataMap.R0002018}
                   onChange={(event => setItemDataMap('R0002018', event.target.value))}/>
          </Col>
        </Row>
      </SameTable>
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