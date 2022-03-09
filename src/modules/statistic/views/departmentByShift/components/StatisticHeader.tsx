import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import SelectDepartment from '../common/SelectDepartment'
import DeptSelect from 'src/components/DeptSelect'
import SelectData from 'src/modules/statistic/common/SelectData'
import StatisticsApi from 'src/modules/statistic/api/StatisticsApi'
import statisticViewModel from 'src/modules/statistic/StatisticViewModel'
import { Button, message, Select } from 'antd'
import emitter from 'src/libs/ev'
import { appStore } from "src/stores";
import { fileDownload } from 'src/utils/file/file'
// import { observer } from 'mobx-react-lite'

const { Option } = Select;

export interface Props {
  onChange?: Function
  onExport?: Function
  query?: any
}

export default function BedSituation(props: Props) {
  const { query, onChange, onExport } = props

  // 查询
  function searchButtonClick() {
    onChange && onChange()
  }

  const exportButtonClick = () => onExport && onExport()

  return (
    <Con>
      <Spacing />
      <SelectData handleDateChange={(payload: any[]) => {
        onChange && onChange({
          ...query,
          startTime: payload[0],
          endTime: payload[1],
        })
      }} />
      {appStore.HOSPITAL_ID==='lcey' && <span style={{marginLeft: '20px'}}>时令状态：</span>}
      {appStore.HOSPITAL_ID==='lcey' && 
        <Select defaultValue="summer" style={{ width: 120 }} onChange={(value: string) => onChange && onChange({
          ...query, 
          season: value
        })
        }>
          <Option value="summer">夏令时</Option>
          <Option value="winter">冬令时</Option>
        </Select>
      }
      <Button type='primary' style={{ margin: '0 0 0 60px', width: '90px' }} onClick={searchButtonClick}>
        查询
      </Button>
      <Button
        style={{ margin: '0 10px', width: '90px' }}
        disabled={!(query?.type)}
        onClick={exportButtonClick}>
        导出Excel
      </Button>
    </Con>
  )
}

const Con = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  line-height: 45px;
  padding-left: 14px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
`
const Spacing = styled.div`
  width: 20px;
`
