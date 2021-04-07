import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, DatePicker, Select } from "antd";
import BaseTabs from "src/components/BaseTabs";
import Table from "./components/Table";
import { onlineLearningModal } from "./OnlineLearningModal";
interface Props {
  getId: any;
}
export default observer(function OnlineLearning(props: Props) {
  const { getId } = props; //获取当前页面标题
  const user = JSON.parse(sessionStorage.getItem("user") || "[]"); // 获取登录人员信息
  const [hourName, setHourName] = useState(""); // 当前时间段对应名称

  /** 初始化表格数据 */
  useEffect(() => {
    getNowHour();
    onlineLearningModal.getTaskCount();
    onlineLearningModal.onload();
  }, [getId]);

  /** 获取当前时间段对应名称 */
  const getNowHour = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour < 10) {
      setHourName("上午好！");
    } else if (hour < 12) {
      setHourName("中午好！");
    } else if (hour < 18) {
      setHourName("下午好！");
    } else {
      setHourName("晚上好！");
    }
  };

  /** tabs选项 */
  const TABS_LIST_NURSE = [
    {
      title: `全部（${onlineLearningModal.taskCount.unFinishedTaskCount ||
        0}）`,
      component: <Table />
    },
    {
      title: `待学习（${onlineLearningModal.taskCount.toStudyTaskCount || 0}）`,
      component: <Table />
    },
    {
      title: `待培训（${onlineLearningModal.taskCount.toTrainTaskCount || 0}）`,
      component: <Table />
    },
    {
      title: `待考试（${onlineLearningModal.taskCount.toExamTaskCount || 0}）`,
      component: <Table />
    },
    {
      title: `待练习（${onlineLearningModal.taskCount.toExerciseTaskCount ||
        0}）`,
      component: <Table />
    },
    {
      title: `待实操（${onlineLearningModal.taskCount.toPractiseTaskCount ||
        0}）`,
      component: <Table />
    },
    {
      title: `待演练（${onlineLearningModal.taskCount.toWtTaskCount || 0}）`,
      component: <Table />
    },
    {
      title: `待实践（${onlineLearningModal.taskCount
        .toSocialPractiseTaskCount || 0}）`,
      component: <Table />
    },
    {
      title: `已结束（${onlineLearningModal.taskCount.finishedTaskCount ||
        0}）`,
      component: <Table />
    }
  ];

  return (
    <Wrapper>
      <HeadCon>
        <div style={{ float: "left" }}>
          <span className="empName">
            {user.empName}，{hourName}
          </span>
        </div>
        <div style={{ float: "right" }}>
          <span>开始时间：</span>
          <DatePicker.RangePicker
            allowClear
            style={{ width: 220, marginRight: 15 }}
            value={onlineLearningModal.selectedDate}
            onChange={date => {
              onlineLearningModal.selectedDate = date;
              onlineLearningModal.getTaskCount();
              onlineLearningModal.onload();
            }}
          />
          <span>任务状态：</span>
          <Select
            style={{ width: 140, marginRight: 15 }}
            value={onlineLearningModal.taskStatus}
            onChange={(val: string) => {
              onlineLearningModal.taskStatus = val;
              onlineLearningModal.pageIndex = 1;
              onlineLearningModal.getTaskCount();
              onlineLearningModal.onload();
            }}
          >
            <Select.Option value={0}>未完成</Select.Option>
            <Select.Option value={1}>已完成</Select.Option>
            <Select.Option value="">全部</Select.Option>
          </Select>
          <Button
            type="primary"
            onClick={() => {
              onlineLearningModal.getTaskCount();
              onlineLearningModal.onload();
            }}
          >
            查询
          </Button>
        </div>
      </HeadCon>
      <MainCon>
        <BaseTabs
          defaultActiveKey={onlineLearningModal.key}
          config={TABS_LIST_NURSE}
          onChange={(key: any) => {
            onlineLearningModal.tabsChanged(key);
            onlineLearningModal.key = key;
          }}
        />
      </MainCon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px 10px 10px;
  box-sizing: border-box;
  .empName {
    font-size: 22px;
    font-weight: bold;
  }
`;
const HeadCon = styled.div`
  margin: 0 10px 10px 0;
  height: 40px;
  overflow: hidden
`;
const MainCon = styled.div`
  height: calc(100vh - 140px);
`;
