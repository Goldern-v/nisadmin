import styled from 'styled-components'
import React from 'react'
import { Button, InputNumber } from 'antd'
import { Select } from 'src/vendors/antd'
import { DatePicker } from 'antd'
import { Place, PageHeader } from 'src/components/common'
import { retiredRetireesViewModal as model } from '../RetiredRetireesViewModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { NURSE_HIERARCHY_TYPES, TITLE_TYPES } from 'src/modules/nurseFiles/enums'

const { RangePicker } = DatePicker
export interface Props { }

export default observer(function Head() {
  return (
    <Wrapper>
      <PageHeader>
        <span>片区：</span>
        <Select
          value={model.query.bigDept}
          onChange={(val: string) => {
            model.query.bigDept = val
            model.onChangeBigDept1(val)
          }}
        >
          <Select.Option value=''>全部</Select.Option>
          {model.bigDeptList.map((item: any, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span>科室：</span>

        <Select
          mode='multiple'
          showSearch
          allowClear
          style={{ width: 200 }}
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={model.query.deptCodes}
          onChange={(value: any) => {
            if (value.length > 1) {
              if (value[value.length - 1] == '全院') {
                value = ['全院']
              } else if (value.includes('全院')) {
                value = value.filter((item: any) => item != '全院')
              } else if (value[value.length - 1] == '全部') {
                value = ['全部']
              } else if (value.includes('全部')) {
                value = value.filter((item: any) => item != '全部')
              }
            }
            model.query.deptCodes = value
            model.onload()
          }}
        >
          {!model.deptList.find((item: any) => item.code == '') && (
            <Select.Option value='全部'>全部</Select.Option>
          )}

          {model.deptList.map((item: any, index: number) => (
            <Select.Option value={item.code || '全部'} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span>日期：</span>
        <RangePicker
          style={{ width: 200 }}
          value={model.query.selectedDate}
          onChange={(date) => {
            model.query.selectedDate = date
            model.onload()
          }}
        />
        <span>状态：</span>
        <Select
          style={{ width: 100 }}
          value={model.query.selectedStatus}
          onChange={(val: string) => {
            model.query.selectedStatus = val
            model.onload()
          }}
        >
          {model.stateList.map((item: any, index: number) => (
            <Select.Option value={item} key={item}>
              {item}
            </Select.Option>
          ))}
        </Select><Place />
        <Button onClick={() => model.onload()} type='primary'>
          查询
        </Button>
        <Button onClick={() => model.export()}>导出</Button>
      </PageHeader>
      <div className='head-2'>
        <span>职称：</span>
        <Select
          style={{ width: 100 }}
          value={model.query.newTitle}
          onChange={(val: string) => {
            model.query.newTitles = val
            model.onload()
          }}
        >
          {TITLE_TYPES.map((item: any, index: number) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span>层级：</span>
        <Select
          style={{ width: 100 }}
          value={model.query.nurseHierarchy}
          onChange={(val: string) => {
            model.query.nurseHierarchy = val
            model.onload()
          }}
        >
          {NURSE_HIERARCHY_TYPES.map((item: any, index: number) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span>工龄：</span>
        <InputNumber
          value={model.query.takeWorkYearGe}
          min={0}
          max={50}
          onChange={(val: any) => {
            model.query.takeWorkYearGe = val
            model.onload()
          }}
        />
        <span className='line'>-</span>
        <InputNumber
          value={model.query.takeWorkYearLe}
          min={0}
          max={50}
          onChange={(val: any) => {
            model.query.takeWorkYearLe = val
            model.onload()
          }}
        />
        <span>在院工龄：</span>
        <InputNumber
          value={model.query.goHospitalWorkDateYearGe}
          min={0}
          max={50}
          onChange={(val: any) => {
            model.query.goHospitalWorkDateYearGe = val
            model.onload()
          }}
        />
        <span className='line'>-</span>
        <InputNumber
          value={model.query.goHospitalWorkDateYearLe}
          min={0}
          max={50}
          onChange={(val: any) => {
            model.query.goHospitalWorkDateYearLe = val
            model.onload()
          }}
        />
      </div>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: auto;
  min-height: 50px;

  .ant-select {
    width: 150px;
    margin-right: 15px;
  }
  .ant-calendar-picker {
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
  .ant-select-selection--multiple {
    padding-bottom: 1px;
    overflow: hidden;
  }
  .ant-input-number {
    width: 60px;
  }
  .head-2 {
    padding-bottom: 10px;
  }
  .line {
    display: inline-block;
    padding: 0 3px;
  }
`
