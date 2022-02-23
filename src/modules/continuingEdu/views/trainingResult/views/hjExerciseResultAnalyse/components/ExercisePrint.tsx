import styled from "styled-components";
import React from "react";
import {
  ContentSpecial,
  Title,
  TableTitle,
  ChartCon,
} from "./components/styleCss";
import { observer } from "mobx-react-lite";
import { hjExerciseModal } from "../HjExerciseModal";
import { appStore } from "src/stores";
export interface Props {
  printRef?: any;
}

export default observer(function ExamPrint(props: Props) {
  // 南医三根据当前页面tab值动态打印页面
  const getPage = () => {
    if (appStore.HOSPITAL_ID == "nys" && hjExerciseModal.keyIdx == "2") {
      switch (hjExerciseModal.exportType) {
        case "byDept":
          return (
            <Report>
              <ContentSpecial>
                <Title>《科室参与人数柱状图》</Title>
                <ChartCon>
                  <img
                    src={hjExerciseModal.deptImgZhu}
                    className="chart-con-scoresSectionImgYuan"
                  />
                  <img
                    src={hjExerciseModal.deptImgYuan}
                    className="chart-con-scoresSectionImgZhu"
                  />
                </ChartCon>
                <TableTitle>科室维度分析</TableTitle>
                <table>
                  <colgroup>
                    <col width="12%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
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
                      <th>科室平均进度</th>
                      <th>科室平均分</th>
                    </tr>
                    {hjExerciseModal.excelTableListByDept.map(
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
                          </td>{" "}
                          <td style={{ textAlign: "center" }}>
                            {item.avgProgressRate * 100}%
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
                  <img
                    src={hjExerciseModal.titleImgZhu}
                    className="chart-con-scoresSectionImgYuan"
                  />
                  <img
                    src={hjExerciseModal.titleImgYuan}
                    className="chart-con-scoresSectionImgZhu"
                  />
                </ChartCon>
                <TableTitle>职称维度分析</TableTitle>
                <table>
                  <colgroup>
                    <col width="12%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>职称</th>
                      <th>应参与人数</th>
                      <th>已参与人数</th>
                      <th>未参与人数</th>
                      <th>参与率</th>
                      <th>未参与率</th>
                      <th>职称平均正确率</th>
                      <th>职称平均进度</th>
                      <th>职称平均分</th>
                    </tr>
                    {hjExerciseModal.excelTableListByTitle.map(
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
                            {item.avgProgressRate * 100}%
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
                    src={hjExerciseModal.hierarchyImgZhu}
                    className="chart-con-scoresSectionImgYuan"
                  />
                  <img
                    src={hjExerciseModal.hierarchyImgYuan}
                    className="chart-con-scoresSectionImgZhu"
                  />
                </ChartCon>
                <TableTitle>层级维度分析</TableTitle>
                <table>
                  <colgroup>
                    <col width="12%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                    <col width="11%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>层级</th>
                      <th>应参与人数</th>
                      <th>已参与人数</th>
                      <th>未参与人数</th>
                      <th>参与率</th>
                      <th>未参与率</th>
                      <th>层级平均正确率</th>
                      <th>层级平均进度</th>
                      <th>层级平均分</th>
                    </tr>
                    {hjExerciseModal.excelTableListByHierarchy.map(
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
                            {item.avgProgressRate * 100}%
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
                    src={hjExerciseModal.scoresSectionImgYuan}
                    className="chart-con-scoresSectionImgYuan"
                  />
                  <img
                    src={hjExerciseModal.scoresSectionImgZhu}
                    className="chart-con-scoresSectionImgZhu"
                  />
                </ChartCon>
                <TableTitle>分数段维度分析</TableTitle>
                <table>
                  <colgroup>
                    <col width="20%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                    <col width="16%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>分数段</th>
                      <th>人数</th>
                      <th>人数占比</th>
                      <th>该分数段平均正确率</th>
                      <th>该分数段平均进度</th>
                      <th>该分数段平均分</th>
                    </tr>
                    {hjExerciseModal.excelTableListByScoresSection.map(
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
                            {item.avgProgressRate * 100}%
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
                    <img
                      src={hjExerciseModal.deptImgZhu}
                      className="chart-con-scoresSectionImgYuan"
                    />
                    <img
                      src={hjExerciseModal.deptImgYuan}
                      className="chart-con-scoresSectionImgZhu"
                    />
                  </ChartCon>
                  <TableTitle>科室维度分析</TableTitle>
                  <table>
                    <colgroup>
                      <col width="12%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
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
                        <th>科室平均进度</th>
                        <th>科室平均分</th>
                      </tr>
                      {hjExerciseModal.excelTableListByDept.map(
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
                            </td>{" "}
                            <td style={{ textAlign: "center" }}>
                              {item.avgProgressRate * 100}%
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
                    <img
                      src={hjExerciseModal.titleImgZhu}
                      className="chart-con-scoresSectionImgYuan"
                    />
                    <img
                      src={hjExerciseModal.titleImgYuan}
                      className="chart-con-scoresSectionImgZhu"
                    />
                  </ChartCon>
                  <TableTitle>职称维度分析</TableTitle>
                  <table>
                    <colgroup>
                      <col width="12%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>职称</th>
                        <th>应参与人数</th>
                        <th>已参与人数</th>
                        <th>未参与人数</th>
                        <th>参与率</th>
                        <th>未参与率</th>
                        <th>职称平均正确率</th>
                        <th>职称平均进度</th>
                        <th>职称平均分</th>
                      </tr>
                      {hjExerciseModal.excelTableListByTitle.map(
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
                              {item.avgProgressRate * 100}%
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
                      src={hjExerciseModal.hierarchyImgZhu}
                      className="chart-con-scoresSectionImgYuan"
                    />
                    <img
                      src={hjExerciseModal.hierarchyImgYuan}
                      className="chart-con-scoresSectionImgZhu"
                    />
                  </ChartCon>
                  <TableTitle>层级维度分析</TableTitle>
                  <table>
                    <colgroup>
                      <col width="12%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                      <col width="11%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>层级</th>
                        <th>应参与人数</th>
                        <th>已参与人数</th>
                        <th>未参与人数</th>
                        <th>参与率</th>
                        <th>未参与率</th>
                        <th>层级平均正确率</th>
                        <th>层级平均进度</th>
                        <th>层级平均分</th>
                      </tr>
                      {hjExerciseModal.excelTableListByHierarchy.map(
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
                              {item.avgProgressRate * 100}%
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
                      src={hjExerciseModal.scoresSectionImgYuan}
                      className="chart-con-scoresSectionImgYuan"
                    />
                    <img
                      src={hjExerciseModal.scoresSectionImgZhu}
                      className="chart-con-scoresSectionImgZhu"
                    />
                  </ChartCon>
                  <TableTitle>分数段维度分析</TableTitle>
                  <table>
                    <colgroup>
                      <col width="20%" />
                      <col width="16%" />
                      <col width="16%" />
                      <col width="16%" />
                      <col width="16%" />
                      <col width="16%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>分数段</th>
                        <th>人数</th>
                        <th>人数占比</th>
                        <th>该分数段平均正确率</th>
                        <th>该分数段平均进度</th>
                        <th>该分数段平均分</th>
                      </tr>
                      {hjExerciseModal.excelTableListByScoresSection.map(
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
                              {item.avgProgressRate * 100}%
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
      {hjExerciseModal.keyIdx == "0" && (
        <ContentSpecial>
          <Title>考试情况统计</Title>
          <table>
            <colgroup>
              <col width="9%" />
              <col width="9%" />
              <col width="16%" />
              <col width="11%" />
              <col width="10%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
            </colgroup>
            <tbody>
              <tr>
                <th>姓名</th>
                <th>工号</th>
                <th>所在护理单元</th>
                <th>职称</th>
                <th>护士层级</th>
                <th>最高分</th>
                <th>最低分</th>
                <th>练习时长</th>
                <th>练习次数</th>
              </tr>
              {hjExerciseModal.statisticsTableList.map(
                (item: any, index: any) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{item.empName}</td>
                    <td style={{ textAlign: "center" }}>{item.empNo}</td>
                    <td style={{ textAlign: "center" }}>{item.deptName}</td>
                    <td style={{ textAlign: "center" }}>{item.empTitle}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.nurseHierarchy}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.maxTotalScores}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.minTotalScores}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.cumulativeTimeDesc}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.totalAnswerTimes}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </ContentSpecial>
      )}
      {hjExerciseModal.keyIdx == "1" && (
        <ContentSpecial>
          <Title>考试情况分析</Title>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="12%" />
              <col width="11%" />
              <col width="12%" />
              <col width="12%" />
            </colgroup>
            <tbody>
              <tr>
                <th>病区</th>
                <th>平均分</th>
                <th>最高分</th>
                <th>最低分</th>
                <th>正确率</th>
                <th>应参加人数</th>
                <th>实际参加人数</th>
                <th>参与率</th>
              </tr>
              {hjExerciseModal.analyseTableList.map((item: any, index: any) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{item.deptName}</td>
                  <td style={{ textAlign: "center" }}>{item.avgScores}</td>
                  <td style={{ textAlign: "center" }}>{item.maxScores}</td>
                  <td style={{ textAlign: "center" }}>{item.minScores}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.correctRate * 100}%
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
      {appStore.HOSPITAL_ID == "hj" && hjExerciseModal.keyIdx == "2" && (
        <ContentSpecial>
          <Report>
            <ContentSpecial>
              <Title>《科室参与人数柱状图》</Title>
              <ChartCon>
                <img
                  src={hjExerciseModal.deptImgZhu}
                  className="chart-con-scoresSectionImgYuan"
                />
                <img
                  src={hjExerciseModal.deptImgYuan}
                  className="chart-con-scoresSectionImgZhu"
                />
              </ChartCon>
              <TableTitle>科室维度分析</TableTitle>
              <table>
                <colgroup>
                  <col width="12%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
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
                    <th>科室平均进度</th>
                    <th>科室平均分</th>
                  </tr>
                  {hjExerciseModal.excelTableListByDept.map(
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
                        </td>{" "}
                        <td style={{ textAlign: "center" }}>
                          {item.avgProgressRate * 100}%
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
                <img
                  src={hjExerciseModal.titleImgZhu}
                  className="chart-con-scoresSectionImgYuan"
                />
                <img
                  src={hjExerciseModal.titleImgYuan}
                  className="chart-con-scoresSectionImgZhu"
                />
              </ChartCon>
              <TableTitle>职称维度分析</TableTitle>
              <table>
                <colgroup>
                  <col width="12%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>职称</th>
                    <th>应参与人数</th>
                    <th>已参与人数</th>
                    <th>未参与人数</th>
                    <th>参与率</th>
                    <th>未参与率</th>
                    <th>职称平均正确率</th>
                    <th>职称平均进度</th>
                    <th>职称平均分</th>
                  </tr>
                  {hjExerciseModal.excelTableListByTitle.map(
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
                          {item.avgProgressRate * 100}%
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
                  src={hjExerciseModal.hierarchyImgZhu}
                  className="chart-con-scoresSectionImgYuan"
                />
                <img
                  src={hjExerciseModal.hierarchyImgYuan}
                  className="chart-con-scoresSectionImgZhu"
                />
              </ChartCon>
              <TableTitle>层级维度分析</TableTitle>
              <table>
                <colgroup>
                  <col width="12%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>层级</th>
                    <th>应参与人数</th>
                    <th>已参与人数</th>
                    <th>未参与人数</th>
                    <th>参与率</th>
                    <th>未参与率</th>
                    <th>层级平均正确率</th>
                    <th>层级平均进度</th>
                    <th>层级平均分</th>
                  </tr>
                  {hjExerciseModal.excelTableListByHierarchy.map(
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
                          {item.avgProgressRate * 100}%
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
                  src={hjExerciseModal.scoresSectionImgYuan}
                  className="chart-con-scoresSectionImgYuan"
                />
                <img
                  src={hjExerciseModal.scoresSectionImgZhu}
                  className="chart-con-scoresSectionImgZhu"
                />
              </ChartCon>
              <TableTitle>分数段维度分析</TableTitle>
              <table>
                <colgroup>
                  <col width="20%" />
                  <col width="16%" />
                  <col width="16%" />
                  <col width="16%" />
                  <col width="16%" />
                  <col width="16%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>分数段</th>
                    <th>人数</th>
                    <th>人数占比</th>
                    <th>该分数段平均正确率</th>
                    <th>该分数段平均进度</th>
                    <th>该分数段平均分</th>
                  </tr>
                  {hjExerciseModal.excelTableListByScoresSection.map(
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
                          {item.avgProgressRate * 100}%
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
    height: 400px;
    height: auto;
    object-fit: cover;
  }
  .chart-con-scoresSectionImgZhu {
    width: 48% !important;
    /* margin-right: 10px !important; */
  }
  .chart-con-scoresSectionImgYuan {
    width: 48% !important;
  }
`;
const Report = styled.div`
  margin-bottom: 50px;
`;
