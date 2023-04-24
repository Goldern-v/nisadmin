import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Place } from "src/components/common";
import { Select, Input, Button,Spin } from "antd";
import emitter from "src/libs/ev";
import store, { appStore, authStore } from "src/stores";
import service from "src/services/api";
import MultipleDeptSelect from "src/components/MultipleDeptSelect";
import { DatePicker } from "src/vendors/antd";
import { aMServices } from "../services/AMServices";

const Option = Select.Option;
interface Props {
  showType: any;
  setShowType: any;
  keyword: any;
  setKeyword: any;
  needAudit: any;
  selectedDate: any;
  setSelectedDate: any;
  qcCode:any;//质控表单
  setQcCode:any;//质控表单
}
export default function SelectCon(props: Props) {
  const [visible, setVisible] = useState(false);
  const [showTypeDict, setShowTypeDict] = useState([]);

  const [qcCodeLoading, setQcCodeLoading] = useState(false);

  // 质控表单
  const [qcCodeList, setQcCodeList] = useState<any[]>([]);

  let { showType, setShowType, keyword, setKeyword,qcCode,setQcCode } = props;
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const getQcCodeList = async () => {
    setQcCodeLoading(true)
    try { 
      const res = await aMServices.getQcCodeList({
        "level":"all"
      });
      setQcCodeLoading(false)
      if (res.data)
        setQcCodeList([{ qcCode: "", qcName: "全部" }, ...res.data]);
    } catch (err) {setQcCodeLoading(false)}
  };

  // const onChange = (value: string) => {
  //   emitter.emit('refreshNurseAuditTable', searchText)
  // }
  // const onChangeSearchText = (e: any) => {
  //   setSearchText(e.target.value)
  // }

  const onSearch = () => {
    emitter.emit("refreshNurseAuditTable");
  };
  const SearchByText = (e: React.ChangeEvent<HTMLInputElement>) => { };

  useEffect(() => {
    service.commonApiService.dictInfo("audit_type").then(res => {
      setShowTypeDict(res.data);
      if (!showType) setShowType(res.data[0] ? res.data[0].code : "");
    });
  }, []);
  useEffect(()=>{
    if(appStore.HOSPITAL_ID === 'yczyy'&&showType=='qc' && qcCodeList.length<2){
      getQcCodeList()
    }
  },[showType])
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
                // qualityControlRecordVM.filterDate = value
                // props.refreshData()
              }}
            />
          </React.Fragment>
        )}

        { (appStore.HOSPITAL_ID === 'yczyy'&&showType=='qc')&&<>
          <span style={{ marginLeft: 20 }}>质控表单:</span>
            <Select showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            notFoundContent={qcCodeLoading ? <Spin size="small" /> : null}
            dropdownMatchSelectWidth={false}
            style={{ width: 180 }}
            value={qcCode}
            onChange={(value: any) => {
              setQcCode(value)
            }}
          >
           {qcCodeList.map((item: any) => (
              <Option value={item.qcCode} key={item.qcCode} style={{fontSize:'12px'}} title={item.qcName}>
                {item.qcName}
              </Option >
            ))}
            </Select>
          </>

        }

        <span style={{ marginLeft: 20 }}>类型：</span>
        <Select
          value={showType}
          onChange={(value: any) => setShowType(value)}
          style={{ minWidth: 120 }}
        >
          {showTypeDict.map((item: any) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
        </Select>

        <span style={{ marginLeft: 20 }}>科室：</span>
        {
          authStore.isOnlyRoleManage && appStore.HOSPITAL_ID === 'lcey'?
            <MultipleDeptSelect
              deptList={
                authStore.isOnlyRoleManage?
                  [{ name: authStore.defaultDeptCodeName, code: authStore.defaultDeptCode }] :
                  undefined}
            />:
            <MultipleDeptSelect deptKey="完整科室" />
        }

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
