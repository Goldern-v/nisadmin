import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useLayoutEffect } from "react";
import { Select, Input, Button, DatePicker } from "antd";
import { PageTitle } from "src/components/common";
import moment, { duration } from 'moment'
import Left from "src/modules/quality/views/checkWard/view/details/components/Left";
// import { formApplyModal } from "../FormApplyModal"; // 仓库数据
// import FormEditModal from "../modal/FormEditModal"; // 新建弹窗

const Option = Select.Option;

interface Props {}
interface IDeucOption {
  value: string;
  item: string;
}
export default observer(function ApplyHeader(props: Props) {
  const [query, setQuery] = useState({
    year: moment() as null | moment.Moment,
    deucValue:'',
    sexValue:'',
    keyWord:'',
  } as any) //初始化默认值
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开


  const handleEditOk = () => {
    // formApplyModal.onload();
    setEditVisible(false);
  };
  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    setQuery({ ...query, year: value })
  }

  const handleOpenChange = (status: boolean) => {
    setyearPickerIsOpen(status)
  }

  const handleYearClear = () => {
    setQuery({ ...query, year: null, indexInType: '' })
  }
  // 查询
  const handelInquire = ()=>{

  }

  return (
    <Wrapper>
      <LeftIcon>
        <PageTitle>{`${moment(query.year).format("YYYY")}年护理实习生教学计划`}</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span style={{marginRight:'10px'}}>年份</span>
        <DatePicker
          style={{ width: 100 }}
          value={query.year}
          open={yearPickerIsOpen}
          mode='year'
          className='year-picker'
          placeholder='全部'
          format='YYYY'
          onChange={handleYearClear}
          onOpenChange={handleOpenChange}
          onPanelChange={handlePanelChange}
        />
        <span style={{marginLeft:'10px'}}>关键字：</span>
        <Input
          style={{ width: 300, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={query.keyWord}
          onChange={e => {
            setQuery({ ...query, keyWord: e.target.value })
          }}
        />
        <Button
         type="primary"
         className="span"
          onClick={handelInquire}
        >
          查询
        </Button>
        <Button
          className="span"
          type="primary"
          onClick={handelInquire}
        >
          导入
        </Button>
      </RightIcon>
      {/* <FormEditModal
        visible={editVisible}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditOk}
      /> */}
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 15px 0 15px;
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;
const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    font-size:16px;
    margin-left: 15px;
  }
`;
