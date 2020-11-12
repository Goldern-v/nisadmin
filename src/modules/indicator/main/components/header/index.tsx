import styled from "styled-components";
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Button, Select} from "src/vendors/antd";
import {IModal} from "src/modules/indicator/main/interface";
import YearPicker from 'src/components/YearPicker'
import moment from "moment";

interface Props {
  modal: IModal
}

export default observer(function Header(props: Props) {
  const title = props.modal.name; //获取当前页面标题

  return (
    <Wrapper>
      <PageTitle maxWidth={1000}>{title}</PageTitle>
      <RightCon>
        {/* 年份 */}
        <div className="con-item">
          <span>年份：</span>
          <YearPicker
            style={{width: '100px'}}
            allowClear={false}
            value={moment(`${props.modal.selectedDate}-01-01`) || undefined}
            onChange={(val: any) => {
              props.modal.selectedDate = val.format('YYYY')
              props.modal.search()
            }}/>
        </div>

        {/* 科室 */}
        <div className="con-item">
          <span>科室：</span>
          <Select
            style={{width: 200}}
            value={props.modal.selectedDeptType}
            onChange={(val: string) => {
              props.modal.selectedDeptType = val
              props.modal.search()
            }}
          >
            {props.modal.deptList.map((item: any, index: number) => (
              <Select.Option value={item.code} key={item.code}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>


        {/* 查询按钮 */}
        <Button type="primary" className="con-item" onClick={() => {
          props.modal.search()
        }}>查询</Button>

        {/* 导出按钮 */}
        {/*<Button className="con-item" onClick={() => {*/}
        {/*}}>导出</Button>*/}
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