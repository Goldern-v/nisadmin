import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, DatePicker, Select } from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import config from '../../config'

interface Props {
  handleSelect: Function,
  handleCreate: Function,
  handleExport: Function,
  search: boolean
}

export default observer((props: Props) => {
  const [form, setForm]: any = useState({
    wardCode: '',
    status: '',
    time: getCurrentMonth(),
    formCodes: ''
  })
  const setFormItem = (item: {}) => {
    const temp = { ...form, ...item }
    temp.wardCode === '全院' && delete temp.wardCode
    setForm(temp)
    props.handleSelect(temp)
  }

  const handleExport = () => {
    const temp = { ...form }
    temp.wardCode === '全院' && delete temp.wardCode
    props.handleExport(temp)
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
        <span className="label">表单:</span>
        <Select
          value={form.formCodes}
          style={{ width: '160px' }}
          onChange={(val: any) => setFormItem({ 'formCodes': val })}>
          <Select.Option value=''>全部</Select.Option>
          {config.tableList.map((item) =>
            <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
          )}
        </Select>
        <span className="label">状态:</span>
        <Select value={form.status} style={{ width: '140px' }}
                onChange={(val: string) => setFormItem({ status: val })}>
          <Select.Option value=''>全部</Select.Option>
          <Select.Option value="0">保存</Select.Option>
          <Select.Option value="1">提交</Select.Option>
        </Select>
        <span className="label">时间:</span>
        <DatePicker.RangePicker
          value={form.time}
          style={{ width: '220px' }}
          onChange={(dates) => setFormItem({ time: dates })}/>

        {/* 查询按钮 */}
        <Button type="primary" className="con-item" onClick={() => props.handleSelect(form)}>查询</Button>
        {/* 新增按钮 */}
        <Button type="primary" className="con-item" onClick={() => props.handleCreate()}>新增</Button>
        {/* 导出按钮 */}
        <Button type="primary" className="con-item"
                onClick={() => handleExport()}>导出</Button>
      </RightCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PageTitle = styled.div`
  font-size: 16px;
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