import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Button, Modal, Input } from "antd";
const { TextArea } = Input;

interface props {
  params: any;
  modalTitle: string;
}

export default observer(function PracticalTablefsxt(props: props) {
  const { modalTitle, params } = props;

  const handleInput = (e: any, currentObj: any, data: any) => {
    currentObj[data] = e.target.value;
    let list: any[] = [];
    params.latPraticalGradeSubjectDtoList &&
      params.latPraticalGradeSubjectDtoList.map((item: any) => {
        item.latPraticalGradeOperationDtoList.map((liItem: any) => {
          list.push(liItem);
        });
      });
    let scoreParams = list.reduce((per, curr) => {
      return parseInt(per) + parseInt(curr.score);
    }, 0);
  };

  return (
    <Wrapper>
      <table className="modal-table">
        <tbody>
          <tr>
            <td colSpan={2} className="td-center">
              {modalTitle == "预览" ? (
                params.paperName
              ) : (
                <Input
                  defaultValue={params.paperName}
                  className="td-center"
                  onChange={(e) => {
                    handleInput(e, params, "paperName");
                  }}
                />
              )}
            </td>
          </tr>
          <tr className="td-bold td-center">
            <td colSpan={2}>
              得分：
              {modalTitle == "预览" ? (
                params.totalScore
              ) : (
                <Input
                  defaultValue={params.totalScore}
                  className="td-center"
                  style={{ width: 60 }}
                  onChange={(e) => {
                    handleInput(e, params, "totalScore");
                  }}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="modal-table">
            <colgroup>
              <col width={180} />
              <col />
              <col width={100} />
              <col width={250} />
              <col width={100} />
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
              {params.latPraticalGradeSubjectDtoList &&
                params.latPraticalGradeSubjectDtoList.map(
                  (item: any, index: any) => {
                    const length = item.latPraticalGradeOperationDtoList.reduce((pre: number, cur: any) => {
                      return pre + cur.latPraticalGradeDeductPointsDtoList.length
                    }, 0)
                    return item.latPraticalGradeOperationDtoList.map(
                      (itemDto: any, indexDot: any) =>{
                        return (
                          itemDto.latPraticalGradeDeductPointsDtoList.map((itemDeuct:any,indexDeuct:any)=>
                            <tr key={indexDeuct + 'fds'}>
                            {indexDot == 0 && indexDeuct == 0 && (
                              <td
                                className="td-center"
                                rowSpan={
                                  length
                                }
                              >
                                {modalTitle == "预览" ? (
                                  item.name
                                ) : (
                                  <Input
                                    defaultValue={item.name}
                                    className="td-center border-none"
                                    onChange={(e) => {
                                      handleInput(
                                        e,
                                        params.latPraticalGradeSubjectDtoList[
                                          index
                                        ],
                                        "name"
                                      );
                                    }}
                                  />
                                )}
                              </td>
                            )}
                            {
                              indexDeuct == 0 && (
                                <td
                                  className="td-center"
                                  rowSpan={
                                    itemDto.latPraticalGradeDeductPointsDtoList &&
                                    itemDto.latPraticalGradeDeductPointsDtoList.length
                                  }
                                >
                                  <TextArea
                                  readOnly={modalTitle == "预览"}
                                  defaultValue={itemDto.content}
                                  className="td-center inp_textArea"
                                  onChange={(e) => {
                                    handleInput(
                                      e,
                                      params.latPraticalGradeSubjectDtoList[index]
                                        .latPraticalGradeOperationDtoList[
                                        indexDot
                                      ],
                                      "content"
                                    );
                                  }}
                                  maxLength={1000}
                                  autosize={{ minRows: 3 }}
                                />
                                </td>
                              )
                            }
                            {
                              indexDeuct == 0 && (
                                <td
                                  className="td-center"
                                  rowSpan={
                                    itemDto.latPraticalGradeDeductPointsDtoList &&
                                    itemDto.latPraticalGradeDeductPointsDtoList.length
                                  }
                                >
                                   {modalTitle == "预览" ? (
                                    itemDto.score
                                    ) : (
                                      <Input
                                        defaultValue={itemDto.score}
                                        className="td-center border-none"
                                        onChange={(e) => {
                                          handleInput(
                                            e,
                                            params.latPraticalGradeSubjectDtoList[index]
                                              .latPraticalGradeOperationDtoList[
                                              indexDot
                                            ],
                                            "score"
                                          );
                                        }}
                                      />
                                    )}
                                </td>
                              )
                            }
                            <td className="td-center">
                                <TextArea
                                  readOnly={modalTitle == "预览"}
                                  defaultValue={itemDeuct.deductionRules}
                                  className="td-center inp_textArea"
                                  onChange={(e) => {
                                    handleInput(
                                      e,
                                      params.latPraticalGradeSubjectDtoList[index]
                                        .latPraticalGradeOperationDtoList[indexDot].latPraticalGradeDeductPointsDtoList[indexDeuct],
                                      "deductionRules"
                                    );
                                  }}
                                  autosize={{ minRows: 3 }}
                                />
                            </td>
                            <td className="td-center">
                            {modalTitle == "预览" ? (
                              itemDto.score
                              ) : (
                                <Input
                                  defaultValue={itemDeuct.deductionScore}
                                  className="td-center border-none"
                                  onChange={(e) => {
                                    handleInput(
                                      e,
                                      params.latPraticalGradeSubjectDtoList[index]
                                      .latPraticalGradeOperationDtoList[indexDot].latPraticalGradeDeductPointsDtoList[indexDeuct],
                                      "deductionScore"
                                    );
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                          )
                        )
                      } 
                    )
                  }
                )}
            </tbody>
          </table>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  .modal-table {
    width: 100%;
    border: 1px solid #000;
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
    tbody {
      tr {
        td {
          border: 1px solid #000;
          line-height: 30px;
          font-size: 14px;
          padding: 0 5px;
        }
      }
    }
    .td-bold {
      font-weight: bold;
    }
    .td-center {
      text-align: center;
    }
    .inp_textArea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      border-radius: 0;
      resize: none;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
