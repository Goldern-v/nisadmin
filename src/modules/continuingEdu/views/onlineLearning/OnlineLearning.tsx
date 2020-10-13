import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTabs from "src/components/BaseTabs";
import Table from "./components/Table";
import { onlineLearningModal } from "./OnlineLearningModal";
interface Props {}
export default observer(function OnlineLearning(props: Props) {
  const user = JSON.parse(sessionStorage.getItem("user") || "[]"); // 获取登录人员信息
  const [hourName, setHourName] = useState(""); // 当前时间段对应名称

  // 初始化
  useEffect(() => {
    getNowHour();
    onlineLearningModal.init();
  }, []);

  // 获取当前时间段对应名称
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

  const TABS_LIST_NURSE = [
    {
      title: `全部（${onlineLearningModal.taskCount.unFinishedTaskCount}）`,
      component: <Table />
    },
    {
      title: `待学习（${onlineLearningModal.taskCount.toStudyTaskCount}）`,
      component: <Table />
    },
    {
      title: `待培训（${onlineLearningModal.taskCount.toTrainTaskCount}）`,
      component: <Table />
    },
    {
      title: `待考试（${onlineLearningModal.taskCount.toExamTaskCount}）`,
      component: <Table />
    },
    {
      title: `待练习（${onlineLearningModal.taskCount.toExerciseTaskCount}）`,
      component: <Table />
    },
    {
      title: `待实操（${onlineLearningModal.taskCount.toPractiseTaskCount}）`,
      component: <Table />
    },
    {
      title: `待演练（${onlineLearningModal.taskCount.toWtTaskCount}）`,
      component: <Table />
    },
    {
      title: `待实践（${
        onlineLearningModal.taskCount.toSocialPractiseTaskCount
      }）`,
      component: <Table />
    },
    {
      title: `已结束（${onlineLearningModal.taskCount.finishedTaskCount}）`,
      component: <Table />
    }
  ];

  //tabs变化函数
  const tabsChanged = (key: any) => {
    const arr: any = [null, 1, 2, 3, 4, 5, 6, 7, "finished"];
    let res = arr[key];
    if (res === "finished") {
      onlineLearningModal.tpStatus = "finished";
    } else {
      onlineLearningModal.teachingMethod = res;
      onlineLearningModal.tpStatus = "tobeginAndongoing";
    }
    onlineLearningModal.onload();
  };

  return (
    <Wrapper>
      <HeadCon>
        {user.empName}，{hourName}
      </HeadCon>
      <MainCon>
        <BaseTabs
          config={TABS_LIST_NURSE}
          onChange={(key: any) => tabsChanged(key)}
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
`;
const HeadCon = styled.div`
  margin: 0 10px 10px 0;
  font-size: 22px;
  font-weight: bold;
  height： 40px;
`;
const MainCon = styled.div`
  height: calc(100vh - 120px);
`;
