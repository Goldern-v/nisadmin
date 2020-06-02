import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
export interface Props {
  info?: any;
}

export default function answerInfo(props: Props) {
  const { info } = props;
  const questionList = info.questionList || [];

  //单选题列表
  let singleChoiceArr = questionList.filter(
    (item: any) => item.questionType == 1
  );

  //多选题列表
  let multiChoiceArr = questionList.filter(
    (item: any) => item.questionType == 2
  );

  //填空题
  let fullArr = questionList.filter((item: any) => item.questionType == 3);

  //问答题
  let wendaArr = questionList.filter((item: any) => item.questionType == 4);

  return (
    <Wrapper>
      <div className="main-title">参考答案</div>
      <div className="title">{info.title}</div>
      {singleChoiceArr && singleChoiceArr.length > 0 && (
        <div>
          <div>【单选题】</div>
          <div>
            {singleChoiceArr.map((item: any) => (
              <span key={item.sort}>
                {item.sort}.
                {(item.answerList || [])
                  .filter((answer: any) => answer.isRight)
                  .map((answer: any) => answer.optionLabel)
                  .join(",")}
                ;<span> </span>
              </span>
            ))}
          </div>
        </div>
      )}
      {multiChoiceArr && multiChoiceArr.length > 0 && (
        <div>
          <div>【多选题】</div>
          <div>
            {multiChoiceArr.map((item: any) => (
              <span key={item.sort}>
                {item.sort}.
                {(item.answerList || [])
                  .filter((answer: any) => answer.isRight)
                  .map((answer: any) => answer.optionLabel)
                  .join(",")}
                ;<span> </span>
              </span>
            ))}
          </div>
        </div>
      )}
      {fullArr && fullArr.length > 0 && (
        <div>
          <div>【填空题】</div>
          <div>
            {fullArr.map((item: any, idx: number) => (
              <React.Fragment key={idx}>
                <span>
                  {item.sort}.{item.answer && item.answer.rightAnswer};
                  <span> </span>
                </span>
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      {wendaArr && wendaArr.length > 0 && (
        <div>
          <div>【问答题】</div>
          <div>
            {wendaArr.map((item: any, idx: number) => (
              <React.Fragment key={idx}>
                <span>
                  {item.sort}.{item.answer && item.answer.suggestedAnswer};
                  <span> </span>
                </span>
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      {info.teachingMethod == 3 && (
        <div className="notice">
          <div>特别提醒：</div>
          试卷预览，只是临时性的模拟一次考试试题，不会保存当前你所看到的记录。如果你的题目是
          <span style={{ color: "red" }}>随机排序</span>
          的，可能下次你看到的就会不一样。
        </div>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 15px 10px;
  .main-title {
    font-size: 22px;
    color: #000;
    font-weight: bold;
  }
  .title {
    margin-top: 18px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .notice {
    margin-top: 15px;
    padding: 15px;
    background: #eee;
  }
`;
