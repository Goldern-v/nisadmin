import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useLayoutEffect } from "react";
import { Select, Input, Button, DatePicker,message } from "antd";
import { PageTitle } from "src/components/common";
import moment, { duration } from 'moment'
// import { formApplyModal } from "../FormApplyModal"; // 仓库数据
import AddPostgraduateModal from "../model/AddPostgraduateModal"; // 新建弹窗

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
  const [createClear, setCreateClear] = useState(true)
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开

  // 学历选项
  const deucOption: IDeucOption[] =[
    {value:'',item:'全部'},
    {value:'1',item:'博士'},
    {value:'2',item:'研究生'},
    {value:'3',item:'本科'},
    {value:'4',item:'大专'},
    {value:'5',item:'中专'}
  ]

  const handleEditOk = () => {
    // formApplyModal.onload();
    setEditVisible(false);
    setCreateClear(false);
    message.success('添加成功', 2, () => {
      setCreateClear(true)
    })
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
      <RightIcon>
        <span>年份</span>
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
        <span className="span">进修科室：</span>
        <Select
          style={{ width: 100 }}
          value={query.deucValue}
          onChange={(val: string) => {
            setQuery({ ...query, deucValue: val })
          }}
        >
          {deucOption.map((item:IDeucOption)=>{
            return <Option value={item.value} key={item.item}>{item.item}</Option>
          })}
        </Select>
        
        <Input
          style={{ width: 200, marginLeft: 15, marginRight: 5 }}
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
          onClick={handelInquire}
        >
          导出
        </Button>
        <Button
          className="span"
          onClick={() => setEditVisible(true)}
        >
          添加进修生
        </Button>
      </RightIcon>
      <AddPostgraduateModal
        visible={editVisible}
        allowClear={createClear}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditOk}
      />
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

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    margin-left: 15px;
  }
`;
