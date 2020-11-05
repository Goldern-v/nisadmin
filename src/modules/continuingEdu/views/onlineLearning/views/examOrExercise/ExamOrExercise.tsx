import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Radio, message, Spin, Checkbox, Input, Button } from "antd";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { examOrExerciseModel } from "./ExamOrExerciseModel";
import { examOrExerciseApi } from "./api/ExamOrExerciseApi";
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
export interface Props {}
export default observer(function OnlineLearningReview(props: Props) {
  const { queryObj } = appStore;
  const { examInfo, examLoading } = examOrExerciseModel;
  const questionList = (examInfo && examInfo.questionList) || [];
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    examOrExerciseModel.init();
  }, [queryObj.id]);

  // 题目类型名称
  const typeName = (type: number) => {
    switch (type) {
      case 1:
        return "单选题";
      case 2:
        return "多选题";
      case 3:
        return "填空题";
      case 4:
        return "问答题";
      default:
        return "";
    }
  };

  // 题目类容类型
  const answerCon = (item: any, qsIdx: number) => {
    switch (item.questionType) {
      case 1:
        return (
          <RadioGroup
            value={item.isSelected}
            onChange={(e: any) => {
              item.isSelected = e.target.value;
              // item.answersList.find(
              //   (o: any) => o.optionLabel === e.target.value
              // ).isSelected = 1;
            }}
          >
            {(item.answersList || []).map((answer: any, asIdx: any) => {
              return (
                <Radio
                  key={`${qsIdx}-${asIdx}`}
                  value={answer.optionLabel}
                  className="choiceCss"
                >
                  {answer.optionLabel}.{answer.optionContent}
                </Radio>
              );
            })}
          </RadioGroup>
        );
      case 2:
        return (
          <CheckboxGroup
            value={item.isSelected}
            onChange={(checkedValue: any) => {
              item.isSelected = checkedValue;
              // item.answersList
              //   .filter((o: any) => item.isSelected.includes(o.optionLabel))
              //   .map((o: any) => (o.isSelected = 1));
            }}
          >
            {(item.answersList || []).map((answer: any, asIdx: any) => {
              return (
                <Checkbox
                  key={`${qsIdx}-${asIdx}`}
                  value={answer.optionLabel}
                  className="choiceCss"
                >
                  {answer.optionLabel}.{answer.optionContent}
                </Checkbox>
              );
            })}
          </CheckboxGroup>
        );
      default:
        return (
          <Input.TextArea
            rows={item.questionType === 3 ? 2 : 4}
            placeholder={
              item.questionType === 3
                ? "请输入您的答案，若有多个请用空格隔开"
                : "请输入你的答案"
            }
            style={{ width: "100%" }}
            value={item.answerContent}
            onChange={(e: any) => (item.answerContent = e.target.value)}
          />
        );
    }
  };

  // 交卷
  const handInExamPaper = () => {
    // 处理单选 多选入参
    questionList.map((item: any) => {
      if (item.isSelected) {
        if (item.questionType === 1) {
          item.answersList.find(
            (o: any) => o.optionLabel === item.isSelected
          ).isSelected = 1;
        } else if (item.questionType === 2) {
          item.answersList
            .filter((o: any) => item.isSelected.includes(o.optionLabel))
            .map((o: any) => (o.isSelected = 1));
        }
      }
      return;
    });
    let obj: any = {
      paperCode: queryObj.paperCode ? queryObj.paperCode : examInfo.paperCode,
      questionList
    };
    setBtnLoading(true);
    examOrExerciseApi
      .handInExamPaper(obj)
      .then((res: any) => {
        setBtnLoading(false);
        if (res.code === "200") {
          message.success("已成功提交试卷！");
          appStore.history.goBack();
        } else {
          message.error(`${res.desc}`);
        }
      })
      .catch(err => setBtnLoading(false));
  };

  return (
    <Wrapper>
      <Exam style={{ overflowY: examLoading ? "hidden" : "scroll" }}>
        <Spin spinning={examLoading}>
          <div className="main-title">
            {examInfo.title && `《${examInfo.title}》`}
          </div>
          <div className="test-info">
            <div className="test-info-item">
              开始时间: {examInfo.answerBeginTime}
            </div>
            <div className="test-info-item">
              结束时间: {examInfo.answerEndTime}
            </div>
            <div className="test-info-item">
              考试时间: {examInfo.examDuration}分钟
            </div>
            <div className="test-info-item">
              及格分数线: {examInfo.passScores}
            </div>
            <div className="test-info-item">
              题目数量: {examInfo.questionCount}题
            </div>
            <div className="test-info-item">
              考试时长: {examInfo.examDuration}分钟
            </div>
            <div className="test-info-item">总分: {examInfo.totalScores}分</div>
          </div>
          <div className="question-list">
            {(questionList || []).map((item: any, qsIdx: number) => (
              <div className="question-item" key={qsIdx}>
                <div className="question-content">
                  <span className="index">{qsIdx + 1}、</span>
                  <span className="question-type">
                    [{typeName(item.questionType)}]
                  </span>
                  <span>（{item.scores}分）</span>
                  <span
                    className="question-desc"
                    dangerouslySetInnerHTML={{
                      __html: item.questionContent.replace(
                        /##/g,
                        '<span class="fill">____</span>'
                      )
                    }}
                  />
                </div>
                {answerCon(item, qsIdx)}
              </div>
            ))}
          </div>
        </Spin>
      </Exam>
      <Footer>
        <Button
          type="primary"
          loading={btnLoading}
          onClick={() => handInExamPaper()}
        >
          提交试卷
        </Button>
      </Footer>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
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
  height: calc(100vh - 120px);
  margin: 15px auto;
  background: #fff;
  padding: 25px;
  box-size: border-box;
  border: 1px solid #e8e8e8;
  .test-info{
    background: #eee;
    padding: 15px 0;
    overflow: hidden;
    .test-info-item{
      width: 50%;
      padding-left: 15px;
      padding-right: 15px;
      display: inline-block;
    }
  }
  .main-title{
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
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
