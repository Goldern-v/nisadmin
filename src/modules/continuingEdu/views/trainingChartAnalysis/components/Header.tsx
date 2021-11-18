import { Radio, Select, DatePicker, Button } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import Tabs from '../../trainingManual/components/Tabs'
import { trainingChartAnalysisModal, TabsItem } from '../trainingChartAnalysisModal'

export interface Props {
}
export default observer(function Header(props: Props) {
  const { tabs } = trainingChartAnalysisModal
  return (
    <Wrapper>
      <Radio.Group value={trainingChartAnalysisModal.selectedTab} onChange={e => trainingChartAnalysisModal.onChangeTab(e)}>
        {
          tabs.map((v: TabsItem) => (
            <Radio.Button value={v.key} key={v.key}>{v.label}</Radio.Button>
          ))
        }
        </Radio.Group>
      <RightIcon>
        <span className="label">科室</span>
        <Select
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          disabled={trainingChartAnalysisModal.selectedTab == tabs[0].key}
          value={trainingChartAnalysisModal.selectedDeptCode}
          onChange={(value: any, option: any) => trainingChartAnalysisModal.onChangeDept(value, option)
          }
        >
          {trainingChartAnalysisModal.filterDeptList.map((item: any) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>

        <span className="label">成员</span>
        <Select
        value={trainingChartAnalysisModal.selectedPerCode}
        onChange={(val:string, option: any) => {
          trainingChartAnalysisModal.selectedPerCode = val
          trainingChartAnalysisModal.selectedPerName = option.props.children
          trainingChartAnalysisModal.getData()

        }}
        disabled={[tabs[0].key,tabs[1].key].includes(trainingChartAnalysisModal.selectedTab)}>
          <Select.Option value={1}>全部</Select.Option>
        </Select>

        <DatePicker.RangePicker
        allowClear={true}
        value={trainingChartAnalysisModal.selectedDate}
        onChange={date => {
          trainingChartAnalysisModal.selectedDate = date
          trainingChartAnalysisModal.getData()
        }}/>
        <Button
        type="primary" onClick={() => trainingChartAnalysisModal.getData()}>查询</Button>
        <Button onClick={() => trainingChartAnalysisModal.print()}>打印</Button>
      </RightIcon>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
`

const RightIcon = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  font-size: 13px;
  
  .label, >.ant-select, >.ant-calendar-picker {
    margin-right: 15px;
    margin-bottom: 12px;
  }
  >.ant-select {
    max-width: 150px;
    min-width: 100px;
  }
  .ant-calendar-picker {
    max-width: 220px;
  }
  .ant-btn {
    margin-bottom: 15px;
  }
  .ant-btn + .ant-btn {
    margin-left: 10px;
  }
`
