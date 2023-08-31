import { observer } from "mobx-react-lite";
import React,{ useState, useEffect, useLayoutEffect,useRef }  from 'react';
import { Radio } from "antd";
import styled from "styled-components";
import { trainingResultService } from './../../api/TrainingResultService'
import qs from 'qs';

export interface Props {
  cetpId?: string | number;
  empNo?: string | number;
  visible: boolean;
  children: React.ReactNode;
}

export default observer(function AnswerSheetTemplate(props: Props) {
  const {
    cetpId,
    empNo,
    visible
  } = props;
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  const [baseInfo, setBaseInfo] = useState({} as any);
  const [questionList, setQuestionList] = useState([] as any);

  useLayoutEffect(() => {
    let urlParmas = window.location.href.split("?")[1]
    let params = qs.parse(urlParmas)
    console.log(params,'params');
    
    if(params.cetpId && params.empNo){
      let {cetpId,empNo} = params
      getAnswerInfo(cetpId,empNo);
    }
  },[])
  useLayoutEffect(() => {
     if (visible) {
      getAnswerInfo(cetpId,empNo);
    }
  }, [visible]);
  const getAnswerInfo = (cetpId:any,empNo:any) => {
    let req: Promise<any>;
    req = trainingResultService.reviewExamPaper(cetpId || "", empNo || "");
    req.then(
      res => {
        if (res.data) {
          setBaseInfo(res.data.summaryInfo);
          setQuestionList(
            res.data.questionList.map((item: any) => {
              if (item.questionType == 4)
                return {
                  ...item,
                  deduction: item.deduction || 0
                };
              return item;
            })
          );
        }
      },
    );
  };
  const questionCon = ()=>{
    return (
      <QuestionLi>
        {questionList.map((ques:any,index:number)=>(
          <div key={index+'ques'} className="quesCon">
            <div className="questltCon">
              {index+1}.{ques.questionContent}
              <span>分值{ques.scores}</span>
            </div>
            {answerList(ques.answersList)}
            <div style={{color:ques.answerRight==1?'green':'red'}}>{ques.answerRight==1?`回答正确（+${ques.scores}）分`:'回答错误（+0分）'}</div>
          </div>
        ))}
      </QuestionLi>
    )
  }
  const answerList = (answersList:any)=>{
    return (
      <div>
        {answersList.map((ans:any,index:number)=>(
          <Radio key={index+'radio'} style={radioStyle} checked={ans.isSelected==1} value={ans.id}>
            {ans.optionContent}
          </Radio>
        ))}
      </div>
    )
  }
  const InfoDetail = ()=>{
    return (
      <InfoDetai>
        <p className="modalTil">{baseInfo.title}</p>
        <div className="item-info">
          <div className="info-tlt">答题人</div>
          <span className="pad-Left10">{baseInfo.empName}</span>
        </div>
        <div className="item-info">
          <div className="info-tlt">成绩单</div>
          <div className="scoreInfo">
            <span>得分：{`${baseInfo.totalGainScores}/${baseInfo.totalScores}`}</span>
            <span>答对题数：{`${baseInfo.answerRightCount}/${baseInfo.singleChoiceQuestionCount}`}</span>
          </div>
        </div>
        <div className="item-info">
          <div className="info-tlt">答题解析</div>
          <div className="info-tltlabel pad-Left10">基本信息：</div>
          <div className="item-info-li">
            <span>(1)姓名：</span>
            <span className="grey">{baseInfo.empName}</span>
          </div>
          <div className="item-info-li">
            <span>(2)科室：</span>
            <span className="grey">{baseInfo.deptName}</span>
          </div>
          <div className="item-info-li">
            <span>(3)工号:</span>
            <span className="grey">{baseInfo.empNo}</span>
          </div>
        </div>
      </InfoDetai>
    )
  }
  return (
    <InfoDetailContainer id="InfoDetailContainer">
        {InfoDetail()}
        {questionCon()}
    </InfoDetailContainer>
  )
})

const InfoDetailContainer = styled.div`
  padding:20px 20px;
  .modalTil{
    font-size: 26px;
    text-align: center;
  }
  .grey{
    color:grey;
  }
  .pad-Left10{
    padding-left:10px;
  }
  .item-info{
    margin-bottom: 20px;
    .info-tlt{
      font-size: 24px;
      padding-left:10px;
      font-weight: 500;
    }
    .info-tltlabel{
      font-size: 20px;
      margin: 10px 0;
    }
    .item-info-li{
      display: flex;
      flex-direction: column;
      padding: 10px 0 10px 5px;
      margin-bottom: 20px;
      position: relative;
      overflow: hidden;
      span{
        position: relative;
        z-index: 2;
      }
      &::after{
        content: "";
        background: rgb(247,247,247);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        z-index: 1;
        border-bottom: 100px solid rgb(247,247,247);
      }
    }
    span{
      font-size: 20px;
    }
    .scoreInfo{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 40px;
      line-height: 40px;
      position:relative;
      border: 1px solid rgb(215,215,215);
      overflow: hidden;
      &::after{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        z-index: 1;
        border-bottom: 100px solid rgb(250,250,250);
      }
      span{
        flex:1;
        position:relative;
        z-index:2;
        padding-left:10px;
        &:first-of-type{
          border-right: 1px solid rgb(215,215,215);
        }
      }
    }
  }
`;

const InfoDetai = styled.div`
`;
const QuestionLi = styled.div`
  padding:0;
  .ant-radio-checked .ant-radio-inner{
    overflow: hidden;
    border-color:transparent;
    &::after{
      width: 100%;
      background: transparent;
      height: 1px;
      transform: scale(1);
      left: 0;
      top: 0;
      position: absolute;
      border-bottom: 50px solid grey;
    }
  }
  .quesCon{
    margin-bottom: 20px;
    .questltCon{
      font-size: 16px;
      span{
        font-size: 14px;
        margin-left: 20px;
      }
    }
  }
`;
