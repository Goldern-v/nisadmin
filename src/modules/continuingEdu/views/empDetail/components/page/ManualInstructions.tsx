import styled from "styled-components";
import React, { useState, useEffect } from "react";
export interface Props {}

export default function ManualInstructions() {
  return (
    <Wrapper>
      <div className="title">《护理人员层级培训手册》使用说明</div>
      <div className="content">
        <span className="bold">1.</span>
        本人及指导老师认真细读各层级护士岗位职责与能力要求和各层级培训要求，根据学习目标及要求，做好学习计划，学习考核后及时填写相应表格。
        <br />
        <span className="bold">2.个人基本情况表：</span>
        晋升情况及进修培训情况由本人负责填写；核心能力晋级考
        核情况由考核人负责填写。2年为一个周期，考核结论填写通过或不通过。
        <br />
        <span className="bold">3.各层级护士岗位职责与能力要求：</span>
        护理部根据省护士(助产士)岗位管理指导意见制定的，科室应根据要求结合本专科情况制定更详细的职责与能力要求
        <br />
        <span className="bold">4.各级护理人员层级培训要求：</span>
        要求科室结合本专科情况制定更详细的层级培训计划或方案。
        <br />
        <span className="bold">5.个人学习计划与目标：</span>
        结合专科及本人层级能力情况制定个人学习计划与目标，手写或打印出来粘贴在框格内。
        <br />
        <span className="bold">6.层级培训内容及评价：</span>
        培训内容应根据护士核心能力进阶的目标及要求来设定，具有可操作性；评价结果在相应框内打“√”；导师/护长应根据培训周期及
        培训计划来设定评价频率，具体见表下方的填表说明
        <br />
        <span className="bold">7.基础及专科技能考核登记表(N1-N3):</span>
        每周由本人及时填写；操作等项目以画“正”字填写数量，在下月10号前有知道老师/护士长确认签名。
        <br />
        <span className="bold">8.层级培训屋化登记表(N3-N6):</span>
        由本人负责填写；内容为层级相对应的高难度护理技术等。
        <br />
        <span className="bold">9.护理查房/讲课/操作示教登记表:</span>
        N1-N4每季度至少完成护理查房/讲课/操作
        示教各一次，7天内由指导老师/护长评价签名
        <br />
        <span className="bold">
          10.专科护理个案积累登记表:N1-N2级书写要求：
        </span>
        专科常见疾病观察、处理和
        效果评价，频率：1例/季度。N3-N4级书写要求：运用护理程序对急危重症的
        处理和效果评价频率：1例/年
        <br />
        <span className="bold">11.带教护理实习生/进修生情况登记表：</span>
        N2,N3-N4应具有带教能力(包括实习
        生、进修生)，带教老师每带教1名学生结束后1周内填写，护长确认签名
        <br />
        <span className="bold">12.护理科研/论文/进修情况登记表</span>
        <br />
        <span className="bold"> 13.层级培训晋级前总结及科室评价:</span>
        晋级前填写，评价包括政治思想、职业道
        德、工作能力及表现、理论知识、临床技能、岗位能力等
        <br />
        <span className="bold">14.护士执业资格/核心能力晋级备案表</span>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .title {
    font-size: 30px;
    text-align: center;
    font-weight: 600;
    font-family: "黑体" !important;
    margin-bottom: 5px;
  }
  .content {
    font-size: 20px;
  }
  .bold {
    font-weight: 600;
    font-family: "黑体" !important;
  }
`;
