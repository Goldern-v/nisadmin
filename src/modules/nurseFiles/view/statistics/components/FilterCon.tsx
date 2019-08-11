import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Form from 'src/components/Form'
import { Row, Col, DatePicker, Input, Select } from 'src/vendors/antd'
import { PageObj, filterItem } from '../config/getPageObj'
import YearRangePicker from 'src/components/YearRangePicker'
import { to } from 'src/libs/fns'
import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import YearMonthRangePicker from 'src/components/YearMonthRangePicker'
import { statisticsViewModal } from '../StatisticsViewModal'
import { useLayoutEffect } from 'src/types/react'
import SelectOrAutoInput from '../../nurseFiles-wh/views/nurseFileDetail/components/SelectOrAutoInput'
const { RangePicker } = DatePicker
export interface Props {
  pageObj: PageObj
  filterRef: any
  onload: any
}

export default function FilterCon(props: Props) {
  let { pageObj, filterRef, onload } = props
  let refForm = React.createRef<Form>()
  useLayoutEffect(() => {
    if (refForm.current) {
      refForm.current.clean()
      let form = refForm.current
      form.setFields({
        deptCode: statisticsViewModal.selectedDeptCode
      })
    }
  }, [pageObj.title])
  const onFieldChange = async (name: string, text: any, form: Form<any>) => {
    let [err, value] = await to(form.validateFields())
    if (err) return
    let result: any = {}
    if (value.deptCode.length > 1) {
      if (value.deptCode[value.deptCode.length - 1] == '全院') {
        value.deptCode = ['全院']
        form.setField('deptCode', value.deptCode)
      } else if (value.deptCode.includes('全院')) {
        value.deptCode = value.deptCode.filter((item: any) => item != '全院')
        form.setField('deptCode', value.deptCode)
      }
    }

    for (let item of pageObj.filterList) {
      if (item.name && (item.type == 'input' || item.type == 'select' || item.type == 'multiplesSelect')) {
        result[item.name] = value[item.name] || ''
      } else if (item.name && item.type == 'yearRangePicker' && item.nameList) {
        if (value[item.name]) {
          for (let i = 0; i < item.nameList.length; i++) {
            result[item.nameList[i]] = moment(value[item.name][i]).format('YYYY')
          }
        }
      } else if (item.name && item.type == 'dateRangePicker' && item.nameList) {
        if (value[item.name]) {
          for (let i = 0; i < item.nameList.length; i++) {
            result[item.nameList[i]] = moment(value[item.name][i]).format('YYYY-MM-DD')
          }
        }
      }
    }

    statisticsViewModal.selectedDeptCode = value.deptCode
    result.deptCodes = result.deptCode
    delete result.deptCode
    filterRef.current = result
    onload()
  }

  const getComponent = (item: filterItem) => {
    switch (item.type) {
      case 'select': {
        return (
          <SelectOrAutoInput dictList={item.dataSource || []} />
          // <Select>
          //   {item.dataSource &&
          //     item.dataSource.map((item, index) => (
          //       <Select.Option value={item.code} key={index}>
          //         {item.name}
          //       </Select.Option>
          //     ))}
          // </Select>
        )
      }
      case 'multiplesSelect': {
        return (
          <Select mode='multiple'>
            {item.dataSource &&
              item.dataSource.map((item, index) => (
                <Select.Option value={item.code} key={index}>
                  {item.name}
                </Select.Option>
              ))}
          </Select>
        )
      }
      case 'input': {
        return <Input />
      }
      case 'yearRangePicker': {
        return <YearRangePicker />
      }
      case 'dateRangePicker': {
        return <RangePicker />
      }
      case 'yearPicker': {
        return <YearPicker />
      }
      case 'yearMonthRangePicker': {
        return <YearMonthRangePicker />
      }
    }
  }
  // useEffect(() => {
  //   refForm.current && refForm.current.clean()
  // }, [pageObj.title])
  return (
    <Wrapper id={'filterCon'}>
      <Form ref={refForm} labelWidth={80} onChange={onFieldChange}>
        <Row>
          {pageObj.filterList.map((item, index) => (
            <Col span={6} key={index} style={item.name == 'deptCode' ? { marginBottom: -6 } : {}}>
              <Form.Field label={item.label} name={item.name}>
                {getComponent(item)}
              </Form.Field>
            </Col>
          ))}
          <Col span={6}>
            <Button type='primary' style={{ marginLeft: 40, marginBottom: 20 }} onClick={() => onload()}>
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  min-height: 100px;
  margin-top: 10px;
  padding: 25px 30px 0 0;
  .label {
    margin-right: 6px;
  }
  .ant-select {
    height: 26px;
  }
  .ant-select-selection--multiple {
    padding-bottom: 1px;
    height: 26px;
    overflow: hidden;
  }
`
