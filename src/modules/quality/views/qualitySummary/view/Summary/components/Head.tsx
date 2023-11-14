import styled from 'styled-components'
import React from 'react'
import { Button } from 'antd'
import { TableHeadCon } from 'src/components/BaseTable'
import { Select, Tooltip } from 'src/vendors/antd'
import { DatePicker } from 'antd'
import { summaryModal } from '../SummaryModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { PageTitle } from 'src/components/common'

const { RangePicker } = DatePicker
export interface Props { }

export default observer(function Head() {

  const handleChange: any = async (val: any) => {
    summaryModal.qcLevel = val
    await summaryModal.getTemplateList()
    summaryModal.onload()
  }
  const options = summaryModal.qcLevelList.map((d: any) => (
    <Select.Option key={d.name} value={d.code}>
      {d.name}
    </Select.Option>
  ))
  const toExport = ()=>{
    if(summaryModal.showtype == "2"){
      summaryModal.changeExport(true)
      if(summaryModal.isPrint){
        setTimeout(() => {
          summaryModal.setImg()
          summaryModal.toPrint()
        }, 0);
      }
    }else{
      summaryModal.exportExcel()
    }
  }

  return (
    <Wrapper>
      <LeftIcon>
        <PageTitle>质量检查汇总</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>质控日期：</span>
        <RangePicker
          style={{ width: 250 }}
          value={summaryModal.selectedDate}
          onChange={(date) => {
            summaryModal.selectedDate = date
            summaryModal.onload()
          }}
          allowClear={false}
        />

        <span>质控级别：</span>
        <Select
          mode="multiple"
          value={summaryModal.qcLevel}
          placeholder='请选择质控级别'
          onChange={handleChange}
        >
          {options}
        </Select>

        <span>表单：</span>
        <Select
          style={{ width: 120 }}
          value={summaryModal.qcCode}
          onChange={(val: string) => {
            summaryModal.qcCode = val
            summaryModal.onload()
          }}
        >
          {summaryModal.qcCodeList.map((item: any, index: number) => (
            <Select.Option value={item.qcCode} key={index}>
              {item.qcName}
            </Select.Option>
          ))}
        </Select>

        <Button type='primary' onClick={() => summaryModal.onload()} className='checkButton'>查询</Button>
        <Button onClick={toExport} >导出</Button>
      </RightIcon>
    </Wrapper>
  )
})
const Wrapper = styled(TableHeadCon)`
  justify-content: space-between;
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
  .checkButton {
    margin-left: 0px;
  }
  .ant-select-selection-selected-value span {
    color: #000 !important;
  }
`
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0;
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`
