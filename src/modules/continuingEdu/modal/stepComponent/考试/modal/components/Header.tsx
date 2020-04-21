import styled from "styled-components";
import React, { useLayoutEffect } from "react";
import { TableHeadCon } from "src/components/BaseTable";
import { Radio, Select, Input, Button, Modal, message as Message } from "antd";
import { quesBankView } from "../QuesBankView";
import { observer } from "mobx-react-lite";

export default observer(function Header() {
  useLayoutEffect(() => {
    quesBankView.onload();
  }, []);

  //加入试卷
  const handleAdd = () => {
    let content = (
      <div>
        <div>您确定要将选中题目加入试卷吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        quesBankView.questionList = [...quesBankView.selectedRows];
        quesBankView.questionList.map((item: any) => {
          quesBankView.questionIdList.push(item.id);
        });

        quesBankView.allQuestionNum = quesBankView.questionList.length;
        quesBankView.RadioQuestionNum = quesBankView.questionList.filter(
          (item: any) => item.choiceType === "单选题"
        ).length;
        quesBankView.checkBoxQuestionNum = quesBankView.questionList.filter(
          (item: any) => item.choiceType === "多选题"
        ).length;
        quesBankView.TKQuestionNum = quesBankView.questionList.filter(
          (item: any) => item.choiceType === "填空题"
        ).length;
        quesBankView.JDQuestionNum = quesBankView.questionList.filter(
          (item: any) => item.choiceType === "简答题"
        ).length;
        console.log(
          quesBankView.questionList,
          "iiiiiiii",
          quesBankView.allQuestionNum
        );

        if (quesBankView.selectedRows && quesBankView.selectedRows.length > 0) {
          Message.success("已成功加入试卷"); //choiceType
        } else {
          Message.error("加入试卷失败");
        }
        quesBankView.onload();
      }
    });
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
          <Radio.Button value="系统题库">系统题库</Radio.Button>
          <Radio.Button value="医院题库">医院自建</Radio.Button>
        </Radio.Group>
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
