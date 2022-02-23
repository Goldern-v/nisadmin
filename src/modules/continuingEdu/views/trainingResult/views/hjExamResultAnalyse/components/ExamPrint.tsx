import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  ContentSpecial,
  Title,
  TableTitle,
  ChartCon,
} from "./components/styleCss";
import { observer } from "mobx-react-lite";
import { hjExamModal } from "../HjExamModal";
import { appStore } from "src/stores";
export interface Props {
  printRef?: any;
}

export default observer(function ExamPrint(props: Props) {
  // 南医三根据当前页面tab值动态打印页面
  const getPage = () => {
    if (appStore.HOSPITAL_ID == "nys" && hjExamModal.keyIdx == "2") {
      switch (hjExamModal.exportType) {
        case "byDept":
          return (
            <Report>
              <ContentSpecial>
                <Title>《科室参与人数柱状图》</Title>
                <ChartCon>
                  <img src={hjExamModal.deptImg} className="chart-con-img" />
                </ChartCon>
                <TableTitle>科室维度分析</TableTitle>
                <table>
                  <colgroup>
                    <col width="16%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>科室</th>
                      <th>应参与人数</th>
                      <th>已参与人数</th>
                      <th>未参与人数</th>
                      <th>参与率</th>
                      <th>未参与率</th>
                      <th>科室平均正确率</th>
                      <th>科室平均分</th>
                    </tr>
                    {hjExamModal.excelTableListByDept.map(
                      (item: any, index: any) => (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>
                            {item.deptName}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.totalPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.finishedPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.unFinishedPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.participateRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.unParticipateRate * 100}%}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.avgCorrectRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.avgScores}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </ContentSpecial>
            </Report>
          );
        case "byTitle":
          return (
            <Report>
              <ContentSpecial>
                <Title>《各职称参与人数柱状图》</Title>
                <ChartCon>
                  <img src={hjExamModal.titleImg} className="chart-con-img" />
                </ChartCon>
                <TableTitle>职称维度分析</TableTitle>
                <table>
                  <colgroup>
                    <col width="16%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>职称</th>
                      <th>应参与人数</th>
                      <th>已参与人数</th>
                      <th>未参与人数</th>
                      <th>参与率</th>
                      <th>未参与率</th>
                      <th>科室平均正确率</th>
                      <th>科室平均分</th>
                    </tr>
                    {hjExamModal.excelTableListByTitle.map(
                      (item: any, index: any) => (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>
                            {item.empTitle}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.totalPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.finishedPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.unFinishedPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.participateRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.unParticipateRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.avgCorrectRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.avgScores}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </ContentSpecial>
            </Report>
          );
        case "byHierarchy":
          return (
            <Report>
              <ContentSpecial>
                <Title>《层级参与人数柱状图》</Title>
                <ChartCon>
                  <img
                    src={hjExamModal.hierarchyImg}
                    className="chart-con-img"
                  />
                </ChartCon>
                <TableTitle>层级维度分析</TableTitle>
                <table>
                  <colgroup>
                    <col width="16%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                    <col width="12%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>层级</th>
                      <th>应参与人数</th>
                      <th>已参与人数</th>
                      <th>未参与人数</th>
                      <th>参与率</th>
                      <th>未参与率</th>
                      <th>科室平均正确率</th>
                      <th>科室平均分</th>
                    </tr>
                    {hjExamModal.excelTableListByHierarchy.map(
                      (item: any, index: any) => (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>
                            {item.nurseHierarchy}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.totalPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.finishedPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.unFinishedPersonCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.participateRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.unParticipateRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.avgCorrectRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.avgScores}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </ContentSpecial>
            </Report>
          );
        case "byScoresSection":
          return (
            <Report>
              <ContentSpecial>
                <Title>《各分数段人数数据图》</Title>
                <ChartCon>
                  <img
                    src={hjExamModal.scoresSectionImgYuan}
                    className="chart-con-scoresSectionImgYuan"
                  />
                  <img
                    src={hjExamModal.scoresSectionImgZhu}
                    className="chart-con-scoresSectionImgZhu"
                  />
                </ChartCon>
                <TableTitle>分数段维度分析</TableTitle>
                <table>
                  <colgroup>
                    <col width="24%" />
                    <col width="19%" />
                    <col width="19%" />
                    <col width="19%" />
                    <col width="19%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>分数段</th>
                      <th>人数</th>
                      <th>人数占比</th>
                      <th>该分数段平均正确率</th>
                      <th>该分数段平均分</th>
                    </tr>
                    {hjExamModal.excelTableListByScoresSection.map(
                      (item: any, index: any) => (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>
                            {item.scoresSection}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.personCount}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.personRatio * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.avgCorrectRate * 100}%
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.avgScores}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </ContentSpecial>
            </Report>
          );
        default:
          return (
            <React.Fragment>
              <Report>
                <ContentSpecial>
                  <Title>《科室参与人数柱状图》</Title>
                  <ChartCon>
                    <img src={hjExamModal.deptImg} className="chart-con-img" />
                  </ChartCon>
                  <TableTitle>科室维度分析</TableTitle>
                  <table>
                    <colgroup>
                      <col width="16%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>科室</th>
                        <th>应参与人数</th>
                        <th>已参与人数</th>
                        <th>未参与人数</th>
                        <th>参与率</th>
                        <th>未参与率</th>
                        <th>科室平均正确率</th>
                        <th>科室平均分</th>
                      </tr>
                      {hjExamModal.excelTableListByDept.map(
                        (item: any, index: any) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>
                              {item.deptName}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.totalPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.finishedPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.unFinishedPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.participateRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.unParticipateRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.avgCorrectRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.avgScores}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </ContentSpecial>
              </Report>
              <Report>
                <ContentSpecial>
                  <Title>《各职称参与人数柱状图》</Title>
                  <ChartCon>
                    <img src={hjExamModal.titleImg} className="chart-con-img" />
                  </ChartCon>
                  <TableTitle>职称维度分析</TableTitle>
                  <table>
                    <colgroup>
                      <col width="16%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>职称</th>
                        <th>应参与人数</th>
                        <th>已参与人数</th>
                        <th>未参与人数</th>
                        <th>参与率</th>
                        <th>未参与率</th>
                        <th>科室平均正确率</th>
                        <th>科室平均分</th>
                      </tr>
                      {hjExamModal.excelTableListByTitle.map(
                        (item: any, index: any) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>
                              {item.empTitle}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.totalPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.finishedPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.unFinishedPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.participateRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.unParticipateRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.avgCorrectRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.avgScores}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </ContentSpecial>
              </Report>
              <Report>
                <ContentSpecial>
                  <Title>《层级参与人数柱状图》</Title>
                  <ChartCon>
                    <img
                      src={hjExamModal.hierarchyImg}
                      className="chart-con-img"
                    />
                  </ChartCon>
                  <TableTitle>层级维度分析</TableTitle>
                  <table>
                    <colgroup>
                      <col width="16%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                      <col width="12%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>层级</th>
                        <th>应参与人数</th>
                        <th>已参与人数</th>
                        <th>未参与人数</th>
                        <th>参与率</th>
                        <th>未参与率</th>
                        <th>科室平均正确率</th>
                        <th>科室平均分</th>
                      </tr>
                      {hjExamModal.excelTableListByHierarchy.map(
                        (item: any, index: any) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>
                              {item.nurseHierarchy}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.totalPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.finishedPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.unFinishedPersonCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.participateRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.unParticipateRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.avgCorrectRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.avgScores}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </ContentSpecial>
              </Report>
              <Report>
                <ContentSpecial>
                  <Title>《各分数段人数数据图》</Title>
                  <ChartCon>
                    <img
                      src={hjExamModal.scoresSectionImgYuan}
                      className="chart-con-scoresSectionImgYuan"
                    />
                    <img
                      src={hjExamModal.scoresSectionImgZhu}
                      className="chart-con-scoresSectionImgZhu"
                    />
                  </ChartCon>
                  <TableTitle>分数段维度分析</TableTitle>
                  <table>
                    <colgroup>
                      <col width="24%" />
                      <col width="19%" />
                      <col width="19%" />
                      <col width="19%" />
                      <col width="19%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>分数段</th>
                        <th>人数</th>
                        <th>人数占比</th>
                        <th>该分数段平均正确率</th>
                        <th>该分数段平均分</th>
                      </tr>
                      {hjExamModal.excelTableListByScoresSection.map(
                        (item: any, index: any) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>
                              {item.scoresSection}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.personCount}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.personRatio * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.avgCorrectRate * 100}%
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.avgScores}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </ContentSpecial>
              </Report>
            </React.Fragment>
          );
      }
    }
  };

  return (
    <Wrapper ref={props.printRef} id="wardLogPrintPage">
      {hjExamModal.keyIdx == "0" && (
        <ContentSpecial>
          <Title>考试情况统计</Title>
          <table>
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="15%" />
              <col width="12%" />
              <col width="10%" />
              <col width="12%" />
              <col width="12%" />
              <col width="19%" />
            </colgroup>
            <tbody>
              <tr>
                <th>姓名</th>
                <th>工号</th>
                <th>科室</th>
                <th>职称</th>
                <th>答题次数</th>
                <th>成绩</th>
                <th>补考成绩</th>
                <th>答题时间</th>
              </tr>
              {hjExamModal.statisticsTableList.map((item: any, index: any) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.empName}</td>
                  <td style={{ textAlign: "center" }}>{item.empNo}</td>
                  <td style={{ textAlign: "center" }}>{item.deptName}</td>
                  <td style={{ textAlign: "center" }}>{item.empTitle}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.totalHandInTimes}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.totalScoresDesc}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.resitTotalScoresDesc}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.startTime}-{item.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContentSpecial>
      )}
      {hjExamModal.keyIdx == "1" && (
        <ContentSpecial>
          <Title>考试情况分析</Title>
          <table>
            <colgroup>
              <col width="17%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="11%" />
              <col width="10%" />
              <col width="11%" />
              <col width="11%" />
              <col width="10%" />
            </colgroup>
            <tbody>
              <tr>
                <th>病区</th>
                <th>平均分</th>
                <th>最高分</th>
                <th>最低分</th>
                <th>及格人数</th>
                <th>及格率</th>
                <th>应参加人数</th>
                <th>实际参加人数</th>
                <th>参与率</th>
              </tr>
              {hjExamModal.analyseTableList.map((item: any, index: any) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.deptName}</td>
                  <td style={{ textAlign: "center" }}>{item.avgScores}</td>
                  <td style={{ textAlign: "center" }}>{item.maxScores}</td>
                  <td style={{ textAlign: "center" }}>{item.minScores}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.passPersonCount}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.passRate * 100}%
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.totalPersonCount}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.finishedPersonCount}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.participateRate * 100}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContentSpecial>
      )}
      {hjExamModal.keyIdx == "2" && appStore.HOSPITAL_ID == "hj" && (
        <ContentSpecial>
          <Report>
            <ContentSpecial>
              <Title>《科室参与人数柱状图》</Title>
              <ChartCon>
                <img src={hjExamModal.deptImg} className="chart-con-img" />
              </ChartCon>
              <TableTitle>科室维度分析</TableTitle>
              <table>
                <colgroup>
                  <col width="16%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>科室</th>
                    <th>应参与人数</th>
                    <th>已参与人数</th>
                    <th>未参与人数</th>
                    <th>参与率</th>
                    <th>未参与率</th>
                    <th>科室平均正确率</th>
                    <th>科室平均分</th>
                  </tr>
                  {hjExamModal.excelTableListByDept.map(
                    (item: any, index: any) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>{item.deptName}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.totalPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.finishedPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.unFinishedPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.participateRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.unParticipateRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.avgCorrectRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.avgScores}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </ContentSpecial>
          </Report>
          <Report>
            <ContentSpecial>
              <Title>《各职称参与人数柱状图》</Title>
              <ChartCon>
                <img src={hjExamModal.titleImg} className="chart-con-img" />
              </ChartCon>
              <TableTitle>职称维度分析</TableTitle>
              <table>
                <colgroup>
                  <col width="16%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>职称</th>
                    <th>应参与人数</th>
                    <th>已参与人数</th>
                    <th>未参与人数</th>
                    <th>参与率</th>
                    <th>未参与率</th>
                    <th>科室平均正确率</th>
                    <th>科室平均分</th>
                  </tr>
                  {hjExamModal.excelTableListByTitle.map(
                    (item: any, index: any) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>{item.empTitle}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.totalPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.finishedPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.unFinishedPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.participateRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.unParticipateRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.avgCorrectRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.avgScores}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </ContentSpecial>
          </Report>
          <Report>
            <ContentSpecial>
              <Title>《层级参与人数柱状图》</Title>
              <ChartCon>
                <img src={hjExamModal.hierarchyImg} className="chart-con-img" />
              </ChartCon>
              <TableTitle>层级维度分析</TableTitle>
              <table>
                <colgroup>
                  <col width="16%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                  <col width="12%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>层级</th>
                    <th>应参与人数</th>
                    <th>已参与人数</th>
                    <th>未参与人数</th>
                    <th>参与率</th>
                    <th>未参与率</th>
                    <th>科室平均正确率</th>
                    <th>科室平均分</th>
                  </tr>
                  {hjExamModal.excelTableListByHierarchy.map(
                    (item: any, index: any) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>
                          {item.nurseHierarchy}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.totalPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.finishedPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.unFinishedPersonCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.participateRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.unParticipateRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.avgCorrectRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.avgScores}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </ContentSpecial>
          </Report>
          <Report>
            <ContentSpecial>
              <Title>《各分数段人数数据图》</Title>
              <ChartCon>
                <img
                  src={hjExamModal.scoresSectionImgYuan}
                  className="chart-con-scoresSectionImgYuan"
                />
                <img
                  src={hjExamModal.scoresSectionImgZhu}
                  className="chart-con-scoresSectionImgZhu"
                />
              </ChartCon>
              <TableTitle>分数段维度分析</TableTitle>
              <table>
                <colgroup>
                  <col width="24%" />
                  <col width="19%" />
                  <col width="19%" />
                  <col width="19%" />
                  <col width="19%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>分数段</th>
                    <th>人数</th>
                    <th>人数占比</th>
                    <th>该分数段平均正确率</th>
                    <th>该分数段平均分</th>
                  </tr>
                  {hjExamModal.excelTableListByScoresSection.map(
                    (item: any, index: any) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>
                          {item.scoresSection}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.personCount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.personRatio * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.avgCorrectRate * 100}%
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.avgScores}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </ContentSpecial>
          </Report>
        </ContentSpecial>
      )}
      {getPage()}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: none;
  width: 760px;
  padding: 20px 20px;
  margin: 0 auto;
  box-sizing: border-box;
  img {
    width: 100%;
    /* height: 400px; */
    height: auto;
    object-fit: cover;
  }
  .chart-con-scoresSectionImgYuan {
    width: 48% !important;
    /* margin-right: 10px !important; */
  }
  .chart-con-scoresSectionImgZhu {
    width: 48% !important;
  }
`;
const Report = styled.div`
  margin-bottom: 50px;
`;
