import styled from "styled-components";
import React from "react";
import { Button } from "antd";
import BaseTable from "src/components/BaseTable";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { onlineLearningReviewModel } from "../onlineLearningReview/OnlineLearningReviewModel";
import AnswerSheetModal from "src/modules/continuingEdu/views/trainingResult/components/AnswerSheetModal/AnswerSheetModal";
import createModal from "src/libs/createModal";

export interface Props { }
export default observer(function ExamScore(props: Props) {
  const answerSheet = createModal(AnswerSheetModal);
  const { queryObj } = appStore;
  const { examScore } = onlineLearningReviewModel;

  const columns: any = [
    {
      title: "名称",
      dataIndex: "questionName",
      align: "center"
    },
    {
      title: "满分",
      dataIndex: "fullScores",
      width: 120,
      align: "center"
    },
    {
      title: "扣分",
      dataIndex: "deduction",
      width: 120,
      align: "center",
      render: (text: any) => {
        return <span style={{ color: "red" }}>-{text}</span>;
      }
    },
    {
      title: "得分",
      dataIndex: "gainScores",
      width: 120,
      align: "center"
    }
  ];

  // 查看试卷
  const handleAnwserSheetReview = () => {
    answerSheet.show({
      title: `${examScore.title}考卷`,
      type: "view",
      cetpId: queryObj.id,
      dataType: "在线考试"
    });
  };

  return (
    <Wrapper>
      <Exam>
        <div className="main-title">
          <div className={Number(examScore.totalScores) < 60 ? "red" : "green"}>
            {examScore.totalScores && examScore.totalScores}
          </div>
          <div style={{ fontSize: "12px" }}>考试得分</div>
          <span className="checkExam">
            <Button type="primary" onClick={() => handleAnwserSheetReview()}>
              查看试卷
            </Button>
          </span>
        </div>
        <div className="test-info">
          <div className="test-info-item">名称: {examScore.title}</div>
          <div className="test-info-item">是否及格: {examScore.passedDesc}</div>
          <div className="test-info-item">
            获得学分: {`${examScore.creditTypeName}(${examScore.credit})`}
          </div>
          <div className="test-info-item">获得学时: {examScore.classHours}</div>
        </div>
        <BaseTable
          dataSource={examScore.scoresList}
          columns={columns}
          surplusHeight={410}
        />
      </Exam>
      <answerSheet.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  #baseTable {
    padding: 20px 0 !important;
  }
`;
const Footer = styled.div`
  height: 40px;
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
`;
const Exam = styled.div` 
  width: 750px;
  height: calc(100vh - 80px);
  margin: 15px auto;
  background: #fff;
  padding: 25px;
  box-size: border-box;
  border: 1px solid #e8e8e8;
  .test-info{
    font-size: 14px;
    background: #eee;
    padding: 15px 0;
    overflow: hidden;
    .test-info-item{
      width: 50%;
      padding-left: 15px;
      padding-right: 15px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
    }
  }
  .main-title{
    font-size: 30px;
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
    position: relative;
    .red {
      color: red
    }
    .green {
      color: green
    }
    .checkExam {
      position: absolute;
      right: 0;
      top: 20px;
    }
  }
  .question-list {
    margin-bottom: 15px;
  }
  .question-item{
    padding-left: 10px;
    font-size: 13px;
    margin-top: 15px;
    .question-type{
      color: #F59A23;
    }
    .question-content {
      margin-bottom: 5px;
    }
    .answer-content{
      padding: 0 5px;
      &pre{
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
    .choice-item{
      position: relative;
      margin-right: 15px;
      .correct-choice{
        position: absolute;
        top: -2px;
        left: -2px;
        img{
          width: 14px;
        }
      }
    }

    .refer{
      margin-right:15px;
      cursor: pointer;
      color:#027DB4;
      display: inline-block;
      text-decoration: underline;
    }

    .de-score{
      .de-score-ipt{
        margin: 0 2px;
        width: 60px;
        .ant-input-number-input{
          color: red;
        }
        .ant-input-number-handler-wrap{
          display:none;
        }
      }
    }
    pre{
      white-space: pre-wrap;
      word-break: break-all;
      &.answer{
        color: #00f;
      }
    }
  }
  .choiceCss {
    display: block;
    margin-left: 20px;
    line-height: 25px;
  }
}
`;
