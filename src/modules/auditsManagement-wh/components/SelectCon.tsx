import styled from "styled-components";
import React, { useContext, useMemo, useState } from "react";
import { Place } from "src/components/common";
import { Select, Input, Button } from "antd";
// import DeptSelect from "src/components/DeptSelect";
import emitter from "src/libs/ev";
import { authStore, appStore } from "src/stores";
// import service from "src/services/api";
import MultipleDeptSelect from "src/components/MultipleDeptSelect";
import { DatePicker } from "src/vendors/antd";
import { Obj } from "src/libs/types";
import { ContextCon } from "../AuditsManagementView";
const Option = Select.Option;
interface Props extends Obj {
  showType: any;
  setShowType: any;
  keyword: any;
  setKeyword: any;
  needAudit: any;
  setNeedAudit: any;
  selectedDate: any;
  setSelectedDate: any;
}
export default function SelectCon(props: Props) {
  const { showTypeDict } = useContext(ContextCon)
  const [visible, setVisible] = useState(false);
  // const [showTypeDict, setShowTypeDict] = useState([]);
  let { showType, setShowType, keyword, setKeyword } = props;
  // const handleOk = () => {
  //   setVisible(false);
  // };

  // const handleCancel = () => {
  //   setVisible(false);
  // };

  // const onChange = (value: string) => {
  //   emitter.emit('refreshNurseAuditTable', searchText)
  // }
  // const onChangeSearchText = (e: any) => {
  //   setSearchText(e.target.value)
  // }
  /**
   * 允许出现全院选项
   */
  const deptKey = appStore.hisMatch({
    map: {
      gxjb: '全部科室',
      dghm: authStore.isDepartment || authStore.isQcLeader ? '完整科室' : '全部科室',
      'whyx,whhk': !authStore.isDepartment ? '全部科室' : '完整科室',
      other: '完整科室'
    },
    vague: true
  })

  const onSearch = () => {
    emitter.emit("refreshNurseAuditTable");
  };
  // const SearchByText = (e: React.ChangeEvent<HTMLInputElement>) => { };

  return (
    <React.Fragment>
      <Wrapper>
        <Title>审核管理</Title>
        {/* <DeptSelect onChange={onChange} /> */}
        <Place />
        {!props.needAudit && (
          <React.Fragment>
            <span>时间：</span>
            <DatePicker.RangePicker
              style={{ width: 220 }}
              value={props.selectedDate}
              onChange={value => {
                props.setSelectedDate(value);
                setTimeout(() => {
                  onSearch();
                }, 100);
              }}
            />
          </React.Fragment>
        )}

        <span style={{ marginLeft: 20 }}>类型：</span>
        <Select
          value={showType}
          onChange={(value: any) => setShowType(value)}
          style={{ minWidth: 120 }}
        >
          {showTypeDict.map((item: any) => (
            <Option value={item.code} key={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>

        <span style={{ marginLeft: 20 }}>科室：</span>
        <MultipleDeptSelect deptKey={deptKey} />

        <Input
          style={{ marginLeft: 20, width: 360 }}
          placeholder="输入要搜索的关键字，包括科室，提交人"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        <Button type="primary" onClick={onSearch} style={{ marginLeft: 20 }}>
          搜索
        </Button>
        {/* <Button onClick={() => setVisible(true)}>+添加护士</Button> */}
      </Wrapper>
    </React.Fragment>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  height: 32px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
