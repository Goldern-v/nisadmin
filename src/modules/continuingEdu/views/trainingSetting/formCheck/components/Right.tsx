import styled from "styled-components";
import React, { useEffect } from "react";
import { BaseStepCon, BaseStepBox } from "src/components/BaseStep";
import { getWeekString } from "src/utils/date/week";

interface Props {
  detailData: any;
}

export default function Right(props: Props) {
  let nodeDataList = props.detailData.flowTaskHisList || [];

  return (
    <Wrapper>
      <TopTitleCon>
        <div className="topTitleIcon" />
        <div className="topTitle">流程轨迹</div>
      </TopTitleCon>
      <BaseStepCon>
        {nodeDataList &&
          nodeDataList.map((item: any, index: number) => (
            <BaseStepBox
              success={item.flag == "1" && (item.noPass ? "fail" : "success")}
              key={index}
            >
              <StepBox>
                {item.flag == "1" ? (
                  <React.Fragment>
                    <div className="title">{item.taskTitle}</div>
                    <div className="info">{item.handlerEmpName}</div>
                    <div className="info">
                      {item.handleTime} ({item.handleDayOfWeek})
                    </div>
                    {item.handleRemark && (
                      <div
                        className="text-box"
                        style={item.noPass ? { color: "red" } : {}}
                      >
                        <div className="text-box-title">整改措施：</div>
                        <div className="text-box-content">
                          {item.handleRemark}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="title">{item.taskTitle}</div>
                    <div className="info">
                      <span>审核中</span> <span>已耗时{item.takeTimeDesc}</span>
                    </div>

                    <span className="noDo">未完成</span>
                  </React.Fragment>
                )}
              </StepBox>
            </BaseStepBox>
          ))}
      </BaseStepCon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 20px;

  .ant-steps-item-icon {
    margin-right: 8px;
  }
  .ant-steps-item-title {
    font-size: 14px;
    font-weight: bold;
  }
  .ant-steps-item-description {
    font-size: 13px;
    font-weight: 400;
    color: rgba(104, 113, 121, 1);
  }
`;
const TopTitleCon = styled.div`
  margin-bottom: 16px;
  .topTitleIcon {
    margin-left: -5px;
    display: inline-block;
    width: 6px;
    height: 12px;
    background: rgba(75, 176, 141, 1);
  }
  .topTitle {
    margin-left: 10px;
    display: inline-block;
    font-size: 16px;
    color: #333333;
  }
`;
const StepBox = styled.div`
  padding-bottom: 10px;
  * {
    font-size: 12px;
  }
  .title {
    color: #000;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .info,
  .date,
  .noDo {
    color: #687179;
    margin-bottom: 3px;
  }
  .text-box {
    color: 12px;
    background: #e6eceb;
    border-radius: 2px;
    padding: 10px 12px;
    margin: 5px 0 0;
    .text-box-title {
      font-weight: bold;
    }
    .text-box-content {
      text-indent: 2em;
    }
  }
`;
