import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useLayoutEffect } from "react";
import { Select, Input, Button, DatePicker,message } from "antd";
import { PageTitle } from "src/components/common";
import moment, { duration } from 'moment'
import { bacisManagData } from "../bacisPostgraduate";
// import { formApplyModal } from "../FormApplyModal"; // 仓库数据
import AddInternModal from "../model/AddInternModal"; // 新建弹窗

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
    {value:'9',item:'博士'},
    {value:'8',item:'研究生'},
    {value:'7',item:'本科'},
    {value:'6',item:'大专'},
    {value:'5',item:'中专'}
  ]

  const handleEditOk = () => {
    // formApplyModal.onload();
    setEditVisible(false);
    setCreateClear(false);
    message.success('添加成功', 2, () => {
      setCreateClear(true)
      bacisManagData.onload()
    })
  };
  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    bacisManagData.year = value
    bacisManagData.onload()
  }

  const handleOpenChange = (status: boolean) => {
    setyearPickerIsOpen(status)
  }

  const handleYearClear = () => {
    bacisManagData.year = undefined
  }
  // 查询
  const handelInquire = ()=>{
    bacisManagData.onload()
  }

  return (
    <Wrapper>
      <RightIcon>
        <span>年份</span>
        <DatePicker
          style={{ width: 100 }}
          value={bacisManagData.year}
          open={yearPickerIsOpen}
          mode='year'
          className='year-picker'
          placeholder='全部'
          format='YYYY'
          onChange={handleYearClear}
          onOpenChange={handleOpenChange}
          onPanelChange={handlePanelChange}
        />
        <span className="span">学历：</span>
        <Select
          style={{ width: 100 }}
          value={bacisManagData.education}
          onChange={(val: string) => {
            bacisManagData.education = val;
            bacisManagData.onload()
          }}
        >
          {deucOption.map((item:IDeucOption)=>{
            return <Option value={item.value} key={item.item}>{item.item}</Option>
          })}
        </Select>
        <span className="span">性别：</span>
        <Select
          style={{ width: 100 }}
          value={bacisManagData.sex}
          onChange={(val: string) => {
            bacisManagData.sex = val
            bacisManagData.onload()
          }}
        >
          <Option value="">全部</Option>
          <Option value="0">男</Option>
          <Option value="1">女</Option>
        </Select>
        <Input
          style={{ width: 200, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={bacisManagData.keyWord}
          onChange={e => {
            bacisManagData.keyWord = e.target.value
            bacisManagData.onload()
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
          导入
        </Button>
        <Button
          className="span"
          onClick={handelInquire}
        >
          导出
        </Button>
        <Button
          className="span"
          onClick={() =>{
            setEditVisible(true)
          } }
        >
          添加实习生
        </Button>
      </RightIcon>
      <AddInternModal
       allowClear={createClear}
        visible={editVisible}
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
