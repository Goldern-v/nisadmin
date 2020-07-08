import styled from "styled-components";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Checkbox,
  message,
  TimePicker,
  Spin
} from "antd";
import moment from "moment";
import { stepViewModal } from "../../../StepViewModal";
import { videoInsertionApi } from "../api/VideoInsertionApi";
const TextArea = Input.TextArea;

export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function QuestionContentModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false); //弹窗loading
  const [broadCastPoint, setBroadCastPoint] = useState(
    moment("00:00:00", "HH:mm:ss")
  ); // 插入时间
  const [editModel, setEditModel]: any = useState({
    id: "",
    questionContent: "", //题目内容
    choiceQuestionAnswerList: [] as any //答案序列
  }); // 选择参数
  const [shortQuestion, setShortQuestion]: any = useState({
    id: "",
    questionContent: "", //题目内容
    answerContent: "" //答案
  }); // 简答参数
  const [fillingQuestion, setFillingQuestion]: any = useState({
    id: "",
    questionContent: "", //题目内容
    answerContent: "" //答案
  }); // 填空参数
  //用于保存答案输入框选中内容的起始下标和选中长度
  const [splitAddPosition, setSplitAddPosition] = useState({
    startIndex: 0,
    length: 0
  });

  //初始化
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        if (params.id) {
        } else {
          // 清空数据
          setBroadCastPoint(moment("00:00:00", "HH:mm:ss"));
          setEditModel({
            id: "",
            questionContent: "",
            choiceQuestionAnswerList: [] as any
          });
          setShortQuestion({});
          setFillingQuestion({});
        }
      }, 100);
    }
  }, [visible]);

  // 保存
  const checkForm = async () => {
    let obj: any = {
      id: params.id ? params.id : "",
      taskCode: stepViewModal.taskCode,
      attachmentId: params.attachmentId,
      broadcastPointName: moment(broadCastPoint).format("HH:mm:ss"),
      broadcastPoint: "00",
      questionCategory: params.createType
    };
    switch (params.createType) {
      case "choiceQuestion":
        obj = {
          ...obj,
          ...editModel
        };
        break;
      case "fillingQuestion":
        obj = {
          ...obj,
          ...fillingQuestion
        };
        break;
      default:
        obj = {
          ...obj,
          ...shortQuestion
        };
        break;
    }
    if (!params.id) delete obj.id;
    setEditLoading(true);
    await videoInsertionApi.saveOrUpdateQuestion(obj).then(
      (res: any) => {
        if (res.code == "200") message.success("保存成功！");
        setEditLoading(false);
        onOk();
      },
      err => {
        setEditLoading(false);
      }
    );
  };

  // 取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  //选择题
  const handleAnswerContentChange = (e: any, item: any, idx: number) => {
    let optionContent = e.target.value;
    let newNodel = { ...editModel };
    newNodel.choiceQuestionAnswerList.splice(idx, 1, {
      ...item,
      optionContent,
      optionLabel: String.fromCharCode(65 + idx),
      sort: idx + 1
    });
    setEditModel(newNodel);
  };
  const handleToogleRight = (item: any, idx: number) => {
    let newNodel = { ...editModel };
    newNodel.choiceQuestionAnswerList.splice(idx, 1, {
      ...item,
      isRight: !item.isRight ? 1 : 0,
      optionLabel: String.fromCharCode(65 + idx),
      sort: idx + 1
    });
    setEditModel(newNodel);
  };
  const handleChoiceMove = (idx: number, up: boolean) => {
    let newNodel = { ...editModel };
    let { choiceQuestionAnswerList } = newNodel;
    let switchIdx = idx - 1;
    if (up) switchIdx = idx + 1;
    let item = { ...choiceQuestionAnswerList[idx] };
    let swithItem = { ...choiceQuestionAnswerList[switchIdx] };
    choiceQuestionAnswerList[idx] = swithItem;
    choiceQuestionAnswerList[switchIdx] = item;
    setEditModel(newNodel);
  };
  const handleChoiceDelete = (idx: number) => {
    let newNodel = { ...editModel };
    newNodel.choiceQuestionAnswerList.splice(idx, 1);
    setEditModel(newNodel);
  };
  const addChoice = () => {
    let newNodel = { ...editModel };
    newNodel.choiceQuestionAnswerList.push({
      optionContent: "",
      isRight: 0,
      optionLabel: "",
      sort: 1
    });
    setEditModel(newNodel);
  };

  //填空答案添加分隔符
  const handleAddSplit = () => {
    const { length, startIndex } = splitAddPosition;
    let newContent = fillingQuestion.answerContent;
    newContent =
      newContent.substr(0, startIndex) +
      "|" +
      newContent.substr(startIndex + length, newContent.length);
    setFillingQuestion({ ...fillingQuestion, answerContent: newContent });
    //重新聚焦和定位答案输入框
    setTimeout(() => {
      let target = document.getElementById(
        "answerContent"
      ) as HTMLTextAreaElement;
      if (target) {
        target.focus();
        target.selectionStart = startIndex + 1;
      }
    });
  };

  return (
    <Question>
      <Modal
        width={900}
        visible={visible}
        onCancel={handleCancel}
        confirmLoading={editLoading}
        title={params.id ? "修改题目" : "添加题目"}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" onClick={checkForm} loading={editLoading}>
              保存
            </Button>
          </div>
        }
      >
        <Wrapper>
          {params.createType == "choiceQuestion" && (
            <ChoiceQuestion
              className="main-contain"
              style={{ overflow: editLoading ? "hidden" : "auto" }}
            >
              {/* 标题 */}
              <div className="contain-item">
                <div className="item-box">
                  <div className="label">标题:</div>
                  <div className="content">
                    <TextArea
                      style={{ width: 700 }}
                      autosize={{ minRows: 2 }}
                      value={editModel.questionContent}
                      onChange={e =>
                        setEditModel({
                          ...editModel,
                          questionContent: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {/* 选项 */}
              <div className="contain-item">
                <div className="item-box">
                  <div className="label">选项:</div>
                  <div className="content">
                    {editModel.choiceQuestionAnswerList.map(
                      (item: any, idx: any) => {
                        return (
                          <div className="choiceItem" key={idx}>
                            <span className="idx">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            <TextArea
                              style={{ width: 400, overflow: "hidden" }}
                              autosize={{ minRows: 1 }}
                              value={item.optionContent}
                              className="answerContent"
                              onChange={e =>
                                handleAnswerContentChange(e, item, idx)
                              }
                            />
                            <Checkbox
                              checked={item.isRight}
                              onClick={() => handleToogleRight(item, idx)}
                            />
                            <Button
                              size="small"
                              disabled={idx <= 0}
                              onClick={() => handleChoiceMove(idx, false)}
                            >
                              上移
                            </Button>
                            <Button
                              size="small"
                              disabled={
                                idx >=
                                editModel.choiceQuestionAnswerList.length - 1
                              }
                              onClick={() => handleChoiceMove(idx, true)}
                            >
                              下移
                            </Button>
                            <Button
                              size="small"
                              disabled={
                                editModel.choiceQuestionAnswerList.length <= 1
                              }
                              onClick={() => handleChoiceDelete(idx)}
                            >
                              删除
                            </Button>
                          </div>
                        );
                      }
                    )}
                    <div className="choiceItem">
                      <span className="idx"> </span>
                      <Button
                        type="dashed"
                        style={{ width: "400px" }}
                        onClick={addChoice}
                      >
                        新增
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 载入遮罩层 */}
              <div
                className="loading-mask"
                style={{ display: editLoading ? "block" : "none" }}
              >
                <Spin />
              </div>
            </ChoiceQuestion>
          )}
          {params.createType == "fillingQuestion" && (
            <ChoiceQuestion
              className="main-contain"
              style={{ overflow: editLoading ? "hidden" : "auto" }}
            >
              {/* 标题 */}
              <div className="contain-item">
                <div className="item-box">
                  <div className="label">标题:</div>
                  <div className="content">
                    <TextArea
                      style={{ width: "700px" }}
                      autosize={{ minRows: 2 }}
                      value={fillingQuestion.questionContent}
                      onChange={e =>
                        setFillingQuestion({
                          ...fillingQuestion,
                          questionContent: e.target.value
                        })
                      }
                    />
                    <div className="sub-text">
                      <div>
                        请在填空处用双井号##标记，例：间羟胺为##类药，又名是##，每支注射液规格##。
                      </div>
                      <div>
                        则显示为：间羟胺为______类药，又名是______，每支注射液规格______。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 答案 */}
              <div className="contain-item">
                <div className="item-box">
                  <div className="label">答案:</div>
                  <div className="content">
                    <TextArea
                      style={{ width: "600px" }}
                      id="answerContent"
                      autosize={{ minRows: 2 }}
                      value={fillingQuestion.answerContent}
                      onBlur={e => {
                        //保存答案选中文本下标和长度
                        setSplitAddPosition({
                          startIndex: e.target.selectionStart,
                          length:
                            e.target.selectionEnd - e.target.selectionStart
                        });
                      }}
                      onChange={e =>
                        setFillingQuestion({
                          ...fillingQuestion,
                          answerContent: e.target.value
                        })
                      }
                    />
                    <Button
                      style={{ verticalAlign: "top", marginLeft: "5px" }}
                      onClick={handleAddSplit}
                    >
                      添加分隔符
                    </Button>
                    <div className="sub-text">
                      <div>
                        2个或3个填空答案用空格断开，例如（答案1 答案2 答案3）
                      </div>
                      <div>
                        某个空有多个标准答案的用符号｜隔开，例如（答案1.0｜答案1.1
                        答案2 答案3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 载入遮罩层 */}
              <div
                className="loading-mask"
                style={{ display: editLoading ? "block" : "none" }}
              >
                <Spin />
              </div>
            </ChoiceQuestion>
          )}
          {params.createType == "shortQuestion" && (
            <ChoiceQuestion
              className="main-contain"
              style={{ overflow: editLoading ? "hidden" : "auto" }}
            >
              {/* 标题 */}
              <div className="contain-item">
                <div className="item-box">
                  <div className="label">标题:</div>
                  <div className="content">
                    <TextArea
                      style={{ width: "700px" }}
                      autosize={{ minRows: 2 }}
                      value={shortQuestion.questionContent}
                      onChange={e =>
                        setShortQuestion({
                          ...shortQuestion,
                          questionContent: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {/* 答案 */}
              <div className="contain-item">
                <div className="item-box">
                  <div className="label">答案:</div>
                  <div className="content">
                    <TextArea
                      style={{ width: "700px" }}
                      autosize={{ minRows: 2 }}
                      value={shortQuestion.answerContent}
                      onChange={e =>
                        setShortQuestion({
                          ...shortQuestion,
                          answerContent: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {/* 载入遮罩层 */}
              <div
                className="loading-mask"
                style={{ display: editLoading ? "block" : "none" }}
              >
                <Spin />
              </div>
            </ChoiceQuestion>
          )}
          <div className="timePicker">
            <div className="item-box">
              <div className="label">插入时间:</div>
              <div className="content">
                <TimePicker
                  value={broadCastPoint}
                  allowClear={false}
                  format="HH:mm:ss"
                  onChange={(time: any) =>
                    setBroadCastPoint(moment(time, "HH:mm:ss"))
                  }
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </Modal>
    </Question>
  );
}
const Question = styled.div`
  /deep/ .ant-modal-body {
    min-height: 420px !important;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .timePicker {
    .item-box {
      display: flex;
      background: #fff;
      min-height: 50px;
      border-radius: 5px;
      padding: 10px;
      min-width: 800px;
      .label {
        width: 70px;
        line-height: 30px;
      }
      .content {
        flex: 1;
      }
      .choiceItem {
        margin-bottom: 5px;
        .idx {
          min-width: 14px;
          display: inline-block;
        }
        & > * {
          vertical-align: top;
          margin-right: 10px;
        }
        & > span {
          line-height: 30px;
        }
        & > .ant-checkbox-wrapper,
        & > .ant-btn-sm {
          margin-top: 5px;
        }
      }
      .label-list {
        min-height: 50px;
        .ant-tag {
          margin-top: 10px;
        }
      }
    }
  }
`;
const ChoiceQuestion = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .contain-item {
    padding: 5px 15px;
    margin-bottom: 10px;
    .item-box {
      display: flex;
      background: #fff;
      min-height: 50px;
      border-radius: 5px;
      padding: 10px;
      min-width: 800px;
      .label {
        width: 40px;
        line-height: 30px;
      }
      .content {
        flex: 1;
      }
      .choiceItem {
        margin-bottom: 5px;
        .idx {
          min-width: 14px;
          display: inline-block;
        }
        & > * {
          vertical-align: top;
          margin-right: 10px;
        }
        & > span {
          line-height: 30px;
        }
        & > .ant-checkbox-wrapper,
        & > .ant-btn-sm {
          margin-top: 5px;
        }
      }
      .label-list {
        min-height: 50px;
        .ant-tag {
          margin-top: 10px;
        }
      }
    }
  }
  .loading-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.6);
    .ant-spin {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
