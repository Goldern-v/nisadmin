import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, DatePicker, Select } from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { getCurrentMonth } from "src/utils/date/currentMonth";

interface Props {
  handleSelect: Function,
  handleCreate: Function,
  search: boolean
}

export default observer((props: Props) => {
  const [form, setForm]: any = useState({
    wardCode: '',
    status: '',
    time: getCurrentMonth()
  })
  const setFormItem = (item: {}) => {
    const temp = { ...form, ...item }
    temp.wardCode === '全院' && delete temp.wardCode
    setForm(temp)
    props.handleSelect(temp)
  }

  useEffect(() => {
    props.handleSelect(form)
  }, [props.search])
  return (
    <Wrapper>
      <PageTitle>国家数据填报</PageTitle>
      <RightCon>
        <span className="label">科室:</span>
        <DeptSelect hasAllDept onChange={deptCode => setFormItem({ wardCode: deptCode })}/>
        <span className="label">状态:</span>
        <Select value={form.status} style={{ width: '140px' }}
                onChange={(val: string) => setFormItem({ status: val })}>
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="1">在院</Select.Option>
          <Select.Option value="2">出院</Select.Option>
        </Select>
        <span className="label">时间:</span>
        <DatePicker.RangePicker
          value={form.time}
          onChange={(dates) => setFormItem({ time: dates })}/>

        {/* 查询按钮 */}
        <Button type="primary" className="con-item" onClick={() => props.handleSelect(form)}>查询</Button>
        {/* 新增按钮 */}
        <Button type="primary" className="con-item" onClick={() => props.handleCreate()}>新增</Button>
      </RightCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
`;

export const PageTitle = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
`

export const RightCon = styled.div`
  display: flex;
  align-items: center;
      
  .label{
    margin: 0 5px;
  }
  
  .con-item{
    margin-left: 15px;
  }
`