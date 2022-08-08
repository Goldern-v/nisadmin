import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { practicalOperationScore } from "../PracticalOperationScoreModal";
import { Button, Modal, Input, } from "antd";
import Form from "src/components/Form";
import autoUpdate from "src/utils/autoUpdate";
const { TextArea } = Input;
interface props {
  modalVisible: boolean | undefined;
  params: any;
  modalTitle: string;
  onCancel: Function;
  onOk: Function;
}
export default observer(function PracticalImportModal(props: props) {
  const { modalVisible, modalTitle, params, onCancel, onOk } = props;
  let refForm = React.createRef<Input>();
  useEffect(()=>{
    if(params.latPraticalGradeSubjectDtoList){
      params.latPraticalGradeSubjectDtoList = params.latPraticalGradeSubjectDtoList.sort((a:any,b:any)=> a.sort - b.sort)
    }

    console.log(refForm.current);
    
  },[params])

  
  const handleOk = () => {
    onOk && onOk(params);
    params.value=null;
  };

  const handleCancel = () => {
    onCancel && onCancel();
    params.value=null;
  };
  const handleInput = (e: any, currentObj: any, data: any) => {
    currentObj[data] = e.target.value;
    let list:any[] = [];
    params.latPraticalGradeSubjectDtoList && 
    params.latPraticalGradeSubjectDtoList.map((item:any)=>{
      item.latPraticalGradeOperationDtoList.map((liItem:any)=>{
        list.push(liItem)
      })
    })
    let scoreParams = list.reduce((per,curr)=>{
      return parseFloat(per) + parseFloat(curr.score)
    },0)
    if(refForm.current && refForm.current.input && refForm.current.input.value){
      refForm.current.input.value = scoreParams;
      params.totalScore = scoreParams;
    }
  };
 

  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={800}
      bodyStyle={{height:'600px',overflow:'auto'}}
      footer={[
        <Footer key={15}>
          {modalTitle != "预览" ? (
            <div>
             <Button type="primary" onClick={handleOk}>
              确认
             </Button>
             <Button onClick={handleCancel}>取消</Button>
            </div>
          ): <Button type="primary" onClick={handleCancel}>关闭</Button>
        }
        </Footer>,
      ]}
    >
      {params && (
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
                      className="td-center border-none"
                      onChange={(e) => {
                        handleInput(e, params, "paperName");
                      }}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="td-bold td-center">
                  {modalTitle == "预览" ? (
                    params.chapter
                  ) : (
                    <Input
                      defaultValue={params.chapter}
                      className="td-center border-none"
                      onChange={(e) => {
                        handleInput(e, params, "chapter");
                      }}
                    />
                  )}
                </td>
              </tr>
              <tr className="td-bold">
                <td>
                  {modalTitle == "预览" ? (
                    params.technology
                  ) : (
                    <Input
                      defaultValue={params.technology}
                      className="td-center border-none"
                      onChange={(e) => {
                        handleInput(e, params, "technology");
                      }}
                    />
                  )}
                </td>
                <td>
                  操作规范（共
                  {modalTitle == "预览" ? (
                    params.totalScore
                  ) : (
                    // <Form
                    // ref={refForm}
                    // >
                    // <Form.Field name="totalScore">
                        <Input
                          ref={refForm}
                          className="td-center border-none"
                          style={{ width: 60 }}
                          value={params.totalScore}
                        />
                      //   </Form.Field>
                      // </Form>
                  )}分）
                </td>
              </tr>
            </tbody>
          </table>
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
              {params.latPraticalGradeSubjectDtoList &&
                params.latPraticalGradeSubjectDtoList.map(
                  (item: any, index: any) =>
                    item.latPraticalGradeOperationDtoList.map(
                      (itemDto: any, indexDot: any) => (
                        <tr key={indexDot + 'fds'}>
                          {indexDot == 0 && (
                            <td
                              className="td-center"
                              rowSpan={
                                item.latPraticalGradeOperationDtoList &&
                                item.latPraticalGradeOperationDtoList.length
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
                          <td className="td-center">
                            {/* {modalTitle == "预览" ? (
                              itemDto.content
                            ) : ( */}
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
                            {/* )} */}
                          </td>
                          <td className="td-center">
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
                          <td className="td-center">
                              <TextArea
                                readOnly={modalTitle == "预览"}
                                defaultValue={itemDto.description}
                                className="td-center inp_textArea"
                                onChange={(e) => {
                                  handleInput(
                                    e,
                                    params.latPraticalGradeSubjectDtoList[index]
                                      .latPraticalGradeOperationDtoList[
                                      indexDot
                                    ],
                                    "description"
                                  );
                                }}
                                autosize={{ minRows: 3 }}
                              />
                          </td>
                        </tr>
                      )
                    )
                )}
            </tbody>
          </table>
        </Wrapper>
      )}
    </Modal>
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
    .border-none{
      border: none;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
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
const Footer = styled.div`
  text-align: center;
`;
