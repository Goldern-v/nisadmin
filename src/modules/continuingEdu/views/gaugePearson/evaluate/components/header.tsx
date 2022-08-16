import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useLayoutEffect,ChangeEvent } from "react";
import { Select, Input, Button, DatePicker, Modal, message} from "antd";
import moment, { duration } from 'moment'
import {evaluateDatas} from "../data"
import {trainingSettingApi} from "../../api/TrainingSettingApi";

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

  const handleRangePicker = (value:any, dateStr:any)=>{
    evaluateDatas.planTrainBeginTime = value[0]
    evaluateDatas.planTrainEndTime = value[1]
    evaluateDatas.onload();
  }
  // 查询
  const handelInquire = ()=>{
    evaluateDatas.onload()
  }
 

  return (
    <Wrapper>
      <RightIcon>
        <span style={{marginRight:'10px',marginLeft:'10px'}}>规培时间：</span>
        <DatePicker.RangePicker
          style={{width: '250px'}}
          defaultValue={[evaluateDatas.planTrainBeginTime, evaluateDatas.planTrainEndTime]}
          onChange={handleRangePicker}
          format={"YYYY-MM-DD"}
        />
        <span style={{marginLeft:'10px'}}>科室：</span>
        <Select
          mode="multiple"
          allowClear
          style={{ minWidth: '260px', maxWidth:'500px',  maxHeight: "110px"}}
          placeholder="请选择科室"
          value={evaluateDatas.deptCodeMultiple}
          onChange={(value: any[]) => {
            evaluateDatas.deptCodeMultiple = value 
            evaluateDatas.onload()
          }}
          // onChange={handleChange}
        >
          {evaluateDatas.deptCode.map((item: any) => {
            return <Option value={item.code} key={item.code}>{item.name}</Option>
          })}
        </Select>
        <Input
          style={{ width: 180, marginLeft: 10, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={evaluateDatas.keyWord}
          onChange={e => {
            evaluateDatas.keyWord = e.target.value 
            evaluateDatas.onload()
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
          onClick={()=>{evaluateDatas.export()}}
        >
          导出
        </Button>
        <Button
          className="span"
          type="primary"
          onClick={()=>{evaluateDatas.save()}}
        >
          保存
        </Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  min-height: 55px;
  max-height: 110px;
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
    font-size:14px;
    margin-left: 15px;
  }
  .ant-select-selection--multiple{
    max-height: 90px;
  }
`;
const FileBox = styled.div`
  .file-box__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top:30px;
    .type-img {
      width: 30px;
    }
    .name {
      flex: 1;
      padding: 0 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .delete {
      width: 20px;
      height: 20px;
      font-size: 18px;
      background: #ccc;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 20px;
      margin: 0 4px;
      cursor: pointer;
    }
    .ant-btn + .ant-btn {
      margin-left: 40px;
    }
    .butName{
      width:100%;
      display: flex;
      justify-content: center;
    }
  }
  .tip {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
  }
`;
