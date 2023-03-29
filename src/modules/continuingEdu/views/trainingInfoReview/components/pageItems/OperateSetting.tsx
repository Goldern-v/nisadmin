import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { appStore } from "src/stores";

export interface Props {
  info?: any;
}

//参与人员
export default function OperateSetting(props: Props) {
  const { info } = props;
  if (
    info.latPraticalGradePaperDto &&
    info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList
  ) {
    info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList = info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList.sort(
      (a: any, b: any) => a.sort - b.sort
    );
  }
  return appStore.hisMatch({
    map: {
      'whyx,whhk': [
        <Wrapper>
          <div className="content-item-title">实操设置</div>
          <div className="row">
            <span className="label w-98">总成绩:</span>
            <span className="content">{info.totalScores}</span>
          </div>
          <div className="row">
            <span className="label w-98">及格分数线:</span>
            <span className="content">{info.passScores}</span>
          </div>
          <div className="table-title">实操评分管理表</div>
          <table className="modal-table">
            {info.latPraticalGradePaperDto && (
              <tbody>
                <tr>
                  <td
                    colSpan={2}
                    className="td-center"
                    style={{ fontSize: 14 }}
                  >
                    {info.latPraticalGradePaperDto.paperName}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="td-bold td-center">
                    {info.latPraticalGradePaperDto.chapter}
                  </td>
                </tr>
                <tr className="td-bold">
                  <td>{info.latPraticalGradePaperDto.technology}</td>
                  <td>操作规范</td>
                </tr>
              </tbody>
            )}
          </table>
          {info.latPraticalGradePaperDto &&
            info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList && (
              <table className="modal-table">
                <colgroup>
                  <col width={180} />
                  <col />
                  <col width={100} />
                  <col width={180} />
                </colgroup>
                <thead>
                  <tr className="td-center">
                    <td>项目</td>
                    <td>操作内容</td>
                    <td>评分标准</td>
                    <td>重要与说明</td>
                  </tr>
                </thead>
                <tbody>
                  {info.latPraticalGradePaperDto &&
                    info.latPraticalGradePaperDto
                      .latPraticalGradeSubjectDtoList &&
                    info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList.map(
                      (item: any, index: any) =>
                        item.latPraticalGradeOperationDtoList.map(
                          (itemDto: any, indexDot: any) => (
                            <tr key={indexDot + "fds"}>
                              {indexDot == 0 && (
                                <td
                                  className="td-center"
                                  rowSpan={
                                    item.latPraticalGradeOperationDtoList &&
                                    item.latPraticalGradeOperationDtoList.length
                                  }
                                >
                                  {item.name}
                                </td>
                              )}
                              <td className="td-center">{itemDto.content}</td>
                              <td className="td-center">{itemDto.score}</td>
                              <td className="td-center">
                                {itemDto.description}
                              </td>
                            </tr>
                          )
                        )
                    )}
                </tbody>
              </table>
            )}
        </Wrapper>,
      ],
      'fsxt,925': [
        <Wrapper>
          <div className="content-item-title">实操设置</div>
          <div className="row">
            <span className="label w-98">总成绩:</span>
            <span className="content">{info.totalScores}</span>
          </div>
          <div className="row">
            <span className="label w-98">及格分数线:</span>
            <span className="content">{info.passScores}</span>
          </div>
          <div className="table-title">实操评分管理表</div>
          <table className="modal-table">
            {info.latPraticalGradePaperDto && (
              <tbody>
                <tr>
                  <td
                    colSpan={2}
                    className="td-center"
                    style={{ fontSize: 14 }}
                  >
                    {info.latPraticalGradePaperDto.paperName}
                  </td>
                </tr>
                <tr className="td-bold td-center">
                  <td colSpan={2}>
                    得分：{info.latPraticalGradePaperDto.totalScore}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          {info.latPraticalGradePaperDto &&
            info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList && (
              <table className="modal-table">
                <colgroup>
                  <col width={140} />
                  <col />
                  <col width={60} />
                  <col width={220} />
                  <col width={60} />
                </colgroup>
                <thead>
                  <tr className="td-center">
                    <td>考核阶段</td>
                    <td>项目</td>
                    <td>项目得分</td>
                    <td>扣分细则</td>
                    <td>应扣分</td>
                  </tr>
                </thead>
                <tbody>
                  {info.latPraticalGradePaperDto &&
                    info.latPraticalGradePaperDto
                      .latPraticalGradeSubjectDtoList &&
                    info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList.map(
                      (item: any, index: any) => {
                        console.log(item);
                        const length = item.latPraticalGradeOperationDtoList.reduce(
                          (pre: number, cur: any) => {
                            return (
                              pre +
                              cur.latPraticalGradeDeductPointsDtoList.length
                            );
                          },
                          0
                        );
                        console.log('length',length);
                        return item.latPraticalGradeOperationDtoList.map(
                          (itemDto: any, indexDot: any) => itemDto.latPraticalGradeDeductPointsDtoList.map(
                              (itemDeuct: any, indexDeuct: any) => {
                                return (
                                  <tr key={indexDeuct + "fds"}>
                                    {indexDot == 0 && indexDeuct == 0 && (
                                      <td
                                        className="td-center"
                                        rowSpan={length}
                                      >
                                        {item.name}
                                      </td>
                                    )}
                                    {indexDeuct == 0 && (
                                      <td
                                        className="td-center"
                                        rowSpan={
                                          itemDto.latPraticalGradeDeductPointsDtoList &&
                                          itemDto
                                            .latPraticalGradeDeductPointsDtoList
                                            .length
                                        }
                                      >
                                        {itemDto.content}
                                      </td>
                                    )}
                                    {indexDeuct == 0 && (
                                      <td
                                        className="td-center"
                                        rowSpan={
                                          itemDto.latPraticalGradeDeductPointsDtoList &&
                                          itemDto
                                            .latPraticalGradeDeductPointsDtoList
                                            .length
                                        }
                                      >
                                        {itemDto.score}
                                      </td>
                                    )}

                                    <td className="td-center">
                                      {itemDeuct.deductionRules}
                                    </td>
                                    <td className="td-center">
                                      {itemDeuct.deductionScore}
                                    </td>
                                  </tr>
                                );
                              }
                            )
                        );
                      }
                    )}
                </tbody>
              </table>
            )}
        </Wrapper>,
      ],
      'fssdy':[
        <Wrapper>
          <div className="content-item-title">上传设置</div>
          <div className="row">
            <span className="label w-98">总成绩:</span>
            <span className="content">{info.totalScores}</span>
          </div>
          <div className="row">
            <span className="label w-98">及格分数线:</span>
            <span className="content">{info.passScores}</span>
          </div>
          {/*    */}
          <div className="row">
            <span className="label w-98">实操考核评分项:</span>
            <span className="content">{info.scoreItemList.length || 0}项</span>
          </div>
          <div className="table-title">实操评分管理表</div>
          <table className="modal-table">
            {info.latPraticalGradePaperDto && (
                <tbody>
                <tr>
                  <td
                      colSpan={2}
                      className="td-center"
                      style={{ fontSize: 14 }}
                  >
                    {info.latPraticalGradePaperDto.paperName}
                  </td>
                </tr>
                <tr className="td-bold td-center">
                  <td colSpan={2}>
                    得分：{info.latPraticalGradePaperDto.totalScore}
                  </td>
                </tr>
                </tbody>
            )}
          </table>
          {info.latPraticalGradePaperDto &&
              info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList && (
                  <table className="modal-table">
                    <colgroup>
                      <col width={140} />
                      <col />
                      <col width={60} />
                      <col width={220} />
                      <col width={60} />
                    </colgroup>
                    <thead>
                    <tr className="td-center">
                      <td>考核阶段</td>
                      <td>项目</td>
                      <td>项目得分</td>
                      <td>扣分细则</td>
                      <td>应扣分</td>
                    </tr>
                    </thead>
                    <tbody>
                    {info.latPraticalGradePaperDto &&
                        info.latPraticalGradePaperDto
                            .latPraticalGradeSubjectDtoList &&
                        info.latPraticalGradePaperDto.latPraticalGradeSubjectDtoList.map(
                            (item: any, index: any) => {
                              console.log(item);
                              const length = item.latPraticalGradeOperationDtoList.reduce(
                                  (pre: number, cur: any) => {
                                    return (
                                        pre +
                                        cur.latPraticalGradeDeductPointsDtoList.length
                                    );
                                  },
                                  0
                              );
                              console.log('length',length);
                              return item.latPraticalGradeOperationDtoList.map(
                                  (itemDto: any, indexDot: any) => itemDto.latPraticalGradeDeductPointsDtoList.map(
                                      (itemDeuct: any, indexDeuct: any) => {
                                        return (
                                            <tr key={indexDeuct + "fds"}>
                                              {indexDot == 0 && indexDeuct == 0 && (
                                                  <td
                                                      className="td-center"
                                                      rowSpan={length}
                                                  >
                                                    {item.name}
                                                  </td>
                                              )}
                                              {indexDeuct == 0 && (
                                                  <td
                                                      className="td-center"
                                                      rowSpan={
                                                          itemDto.latPraticalGradeDeductPointsDtoList &&
                                                          itemDto
                                                              .latPraticalGradeDeductPointsDtoList
                                                              .length
                                                      }
                                                  >
                                                    {itemDto.content}
                                                  </td>
                                              )}
                                              {indexDeuct == 0 && (
                                                  <td
                                                      className="td-center"
                                                      rowSpan={
                                                          itemDto.latPraticalGradeDeductPointsDtoList &&
                                                          itemDto
                                                              .latPraticalGradeDeductPointsDtoList
                                                              .length
                                                      }
                                                  >
                                                    {itemDto.score}
                                                  </td>
                                              )}

                                              <td className="td-center">
                                                {itemDeuct.deductionRules}
                                              </td>
                                              <td className="td-center">
                                                {itemDeuct.deductionScore}
                                              </td>
                                            </tr>
                                        );
                                      }
                                  )
                              );
                            }
                        )}
                    </tbody>
                  </table>
              )}
        </Wrapper>,
      ],
      other: [
        <Wrapper>
          <div className="content-item-title">上传设置</div>
          <div className="row">
            <span className="label w-98">总成绩:</span>
            <span className="content">{info.totalScores}</span>
          </div>
          <div className="row">
            <span className="label w-98">及格分数线:</span>
            <span className="content">{info.passScores}</span>
          </div>
          <div className="row">
            <span className="label w-98">实操考核评分项:</span>
            <span className="content">{info.scoreItemList.length || 0}项</span>
          </div>
          <div className="pd">
            <table>
              <colgroup>
                <col width="50px" />
              </colgroup>
              <tbody>
                <tr className="header">
                  <td>序号</td>
                  <td>评分项标题</td>
                  <td>分值</td>
                </tr>
                {/* <tr>
              <td>1</td>
              <td>走位考核标准</td>
              <td>40</td>
            </tr> */}
                {info.scoreItemList.length > 0 &&
                  info.scoreItemList.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.itemName}</td>
                      <td>{item.scores}</td>
                    </tr>
                  ))}
                {info.scoreItemList.length <= 0 && (
                  <tr>
                    <td colSpan={3} style={{ color: "#666" }}>
                      暂无评分项目
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Wrapper>,
      ],
    },
	vague:true,
  });
}
const Wrapper = styled.div`
  font-size: 13px;
  .pd {
    margin-bottom: 10px;
    padding: 0 15px;
  }
  .row {
    margin-bottom: 5px;
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    .label {
      float: left;
      text-align: right;
      &.w-98 {
        width: 98px;
      }
    }
    .content {
      overflow: hidden;
    }
  }
  .table-title {
    font-size: 14px;
    padding-top: 10px;
  }
  table {
    border-collapse: collapse;
    border-color: #cccccc;
    width: 100%;
    tr {
      width: 100%;
    }
    .header,
    .footer {
      td {
        background: #f0f0f0;
      }
    }
    thead {
      tr {
        td {
          border: 1px solid #000;
          line-height: 30px;
          background-color: #a8a8a8;
          font-weight: bold;
        }
      }
    }
    td {
      height: 30px;
      text-align: center;
      align-items: center;
      font-size: 13px;
      color: #000;
      border: 1px #cccccc solid;
    }
    .td-bold {
      font-weight: bold;
    }
    .td-center {
      text-align: center;
    }
  }
`;
