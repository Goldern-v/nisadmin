import styled from "styled-components";
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {modal} from "../../modal";
import {Button, DatePicker, Select} from "src/vendors/antd";

interface Props {
  title: string,
}

export default observer(function Header(props: Props) {
  const {title} = props; //获取当前页面标题

  return (
    <Wrapper>
      <PageTitle maxWidth={1000}>{title}</PageTitle>
      <RightCon>
        {/* 日期 */}
        <div className="con-item">
          <span>日期：</span>
          <DatePicker.RangePicker
            allowClear={false}
            style={{width: 220}}
            value={modal.selectedDate}
            onChange={date => {
              modal.selectedDate = date;
              modal.onload();
            }}
          />
        </div>

        {/* 科室 */}
        <div className="con-item">
          <span>科室：</span>
          <Select
            style={{width: 200}}
            value={modal.selectedDeptType}
            onChange={(val: string) => {
              modal.selectedDeptType = val;
              modal.onload();
            }}
          >
            <Select.Option value="">全部</Select.Option>
            {modal.deptList.map((item: any, index: number) => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
            <Select.Option value="-1">其他</Select.Option>
          </Select>
        </div>


        {/* 查询按钮 */}
        <Button type="primary" className="con-item" onClick={() => {
        }}>查询</Button>

        {/* 导出按钮 */}
        <Button className="con-item" onClick={() => {
        }}>导出</Button>
      </RightCon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;

export const PageTitle = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  @media (max-width: ${(props: { maxWidth?: number }) => props.maxWidth || 1400}px) {
    display: none;
  }
`

export const RightCon = styled.div`
  display: flex;
  .con-item{
    margin-left: 15px;
  }
`