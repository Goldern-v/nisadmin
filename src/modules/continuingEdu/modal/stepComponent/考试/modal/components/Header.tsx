import styled from "styled-components";
import React from "react";
import { TableHeadCon } from "src/components/BaseTable";
import { Radio, Select, Input, Button, Modal, message as Message } from "antd";
import { quesBankView } from "../QuesBankView";
import { observer } from "mobx-react-lite";
import { appStore } from "src/stores";

export default observer(function Header() {
  //加入试卷
  const handleAdd = () => {
    let arr: any = [];
    let arr1: any = [];
    let obj: any = {};
    if (quesBankView.selectedRows && quesBankView.selectedRows.length > 0) {
      // 过滤重复数据
      arr1 = [...quesBankView.questionList, ...quesBankView.selectedRows];
      quesBankView.questionList = arr1.reduce((item: any, next: any) => {
        obj[next.id] ? " " : (obj[next.id] = true && item.push(next));
        return item;
      }, []);
      quesBankView.questionList.map((item: any) => {
        arr.push(item.id);
      });
      quesBankView.questionIdList = Array.from(new Set(arr));
      quesBankView.questionNum();
      if (quesBankView.questionList && quesBankView.questionList.length > 0) {
        quesBankView.onload();
        Message.success("已成功加入试卷");
      } else {
        Message.error("加入试卷失败");
      }
    } else {
      Message.error("点击按钮前请先选择您想加入的试卷题目！");
    }
  };

  return (
    <Wrapper>
      <LeftIcon>
        <Button
          className="checkButton"
          onClick={() => {
            handleAdd();
          }}
        >
          加入考卷
        </Button>
      </LeftIcon>
      <RightIcon>
        <Radio.Group
          buttonStyle="solid"
          style={{ marginRight: "15px" }}
          value={quesBankView.bankType}
          onChange={(e: any) => {
            quesBankView.bankType = e.target.value;
            quesBankView.pageIndex = 1;
            quesBankView.onload();
          }}
        >
          <Radio.Button value={1}>系统题库</Radio.Button>
          <Radio.Button value={2}>科室题库</Radio.Button>
          <Radio.Button value={3}>我的收藏</Radio.Button>
        </Radio.Group>
        {quesBankView.bankType == 2 && (appStore.HOSPITAL_ID == 'hj' || appStore.HOSPITAL_ID=='dgxg') && (
          <span>
            <span>科室：</span>
            <Select
              style={{ width: 120 }}
              value={quesBankView.deptCode}
              onChange={(val: string) => {
                quesBankView.deptCode = val;
                quesBankView.pageIndex = 1;
                quesBankView.onload();
              }}
              showSearch
              filterOption={(input: any, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="">全部</Select.Option>
              {quesBankView.deptCodeList.length && quesBankView.deptCodeList.map((item: any) => (
                <Select.Option value={item.code} key={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </span>
        )}
        <span>类型：</span>
        <Select
          style={{ width: 120 }}
          value={quesBankView.questionType}
          onChange={(val: string) => {
            quesBankView.questionType = val;
            quesBankView.pageIndex = 1;
            quesBankView.onload();
          }}
        >
          <Select.Option value="单选题">单选题</Select.Option>
          <Select.Option value="多选题">多选题</Select.Option>
          <Select.Option value="填空题">填空题</Select.Option>
          <Select.Option value="问答题">问答题</Select.Option>
        </Select>
        <Input
          style={{ width: 150, marginLeft: 5, marginRight: -5 }}
          placeholder="请输入要搜索的关键字"
          value={quesBankView.keyWord}
          onChange={e => {
            quesBankView.keyWord = e.target.value;
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            quesBankView.onload();
          }}
        >
          查询
        </Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled(TableHeadCon)`
      height: 31px !important;
      justify-content: space-between;
  .ant-select {
        width: 150px;
      margin-right: 15px;
    }
    .ant-calendar-picker {
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .ant-select-selection-selected-value span {
    color: #000 !important;
  }
`;
const LeftIcon = styled.div``;

const RightIcon = styled.div``;
