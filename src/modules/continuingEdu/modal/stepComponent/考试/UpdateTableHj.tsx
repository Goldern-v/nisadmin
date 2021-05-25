import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Modal, message as Message, Radio, message } from "antd";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { stepServices } from "../services/stepServices";
import { stepViewModal } from "../StepViewModal";
import { InputNumber } from "antd/es";
import { observer } from "mobx-react-lite";
import { ksStepViewModal } from "./KSStepViewModal";
import QuesBankModal from "./modal/QuesBankModal";
import { quesBankView } from "./modal/QuesBankView";
import { stepViewModal as allStepViewModal } from "../StepViewModal";
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";
import createModal from "src/libs/createModal";
import { appStore } from "src/stores";

export interface Props {
  data?: any;
  value?: any;
  onChange?: any;
}

export default observer(function UpdateTableHj(props: Props) {
  const { value, data, onChange } = props;
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [dataSource, setDataSource]: any = useState([]);
  const [visible, setVisible] = useState(false);
  const [showType, setShowType] = useState(1); // 题库上传类型 （1--题库 2--本地）
  const [quesVisible, setQuesVisible] = useState(false);
  const testPage = createModal(TestPageModal); // 习题预览弹窗

  /** 题目条数 */
  let totalNum = dataSource.reduce((total: any, current: any) => {
    return total + current.questionCount;
  }, 0);
  /** 总分 */
  let totalScore = dataSource.reduce((total: any, current: any) => {
    return total + current.totalScores;
  }, 0);

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      align: "center",
      width: 50,
      dataIndex: "sort",
      render(text: any, record: any, index: number) {
        if (index == 0) return "";
        return index + 1;
      }
    },
    {
      title: "出题类型",
      width: 135,
      align: "center",
      dataIndex: "questionName",
      render(text: any, record: any, index: number) {
        if (index == 0)
          return (
            <Button
              type="primary"
              icon="plus"
              onClick={() => setVisible(true)}
              style={{ margin: "10px auto" }}
            >
              题库上传
            </Button>
          );
        return text;
      }
    },
    {
      title: "题目数",
      dataIndex: "questionCount",
      align: "center",
      render(text: any, record: any, index: number) {
        if (index == 0) return `卷面总题数：${totalNum} 题`;
        return text;
      }
    },
    {
      title: "分值",
      align: "center",
      className: "input-cell",
      width: 100,
      dataIndex: "scoresPerQuestion",
      render(text: any, record: any, index: number) {
        if (index == 0) return "--";
        return (
          <InputNumber
            min={0}
            style={{ border: 0, textAlign: "center" }}
            value={text}
            onChange={val => {
              record.scoresPerQuestion = val;
              if (record.scoresPerQuestion && record.questionCount) {
                record.totalScores =
                  record.scoresPerQuestion * record.questionCount;
              }

            }}
            onBlur={(e: any) => {
              let obj: any = {
                pertId: data.pertId,
                sort: data.sort,
                questionScoresSettings: dataSource
              }
              onChange(obj);
            }}
          />
        );
      }
    },
    {
      title: "总分",
      width: 100,
      align: "center",
      dataIndex: "totalScores",
      render(text: any, record: any, index: number) {
        if (index == 0) return <span>{totalScore}</span>;
        return text;
      }
    }
  ];

  const handleOk = () => {
    if (showType) {
      setQuesVisible(true);
      // 再次打开题库上传 初始化数据
      quesBankView.clearData();
      quesBankView.init();
    } else {
      fileInputRef.current && fileInputRef.current.click();
    }
    onCancel();
  };
  const onCancel = () => {
    setVisible(false);
  };

  const onQuesCancel = () => {
    setQuesVisible(false);
  };
  const handleQuesOk = () => {
    onQuesCancel();
    onChange(quesBankView.saveData);
  };

  const onFileChange = (e: any) => {
    e.persist();
    let files = e.target.files || [];
    let postData = new FormData();
    postData.append("file", files[0]);
    postData.append("taskCode", stepViewModal.taskCode);
    postData.append("pertId", data.pertId);
    let hideLoading = message.loading("正在上传，请稍等", 0);
    stepServices
      .upLoadQuestionsExam(postData)
      .then(res => {
        hideLoading();
        onChange(res.data);
      })
      .catch(e => {
        hideLoading();
      });
  };

  useEffect(() => {
    value && value.questionScoresSettings && setDataSource(value.questionScoresSettings);
  }, [value]);

  // 习题预览弹窗
  const handlePagePreview = () => {
    let getObj: any = {
      taskCode: allStepViewModal.taskCode,
      teachingMethod: allStepViewModal.stepData1.teachingMethod
    };
    if (allStepViewModal.stepData1.ceptId) {
      getObj.cetpId = allStepViewModal.stepData1.ceptId;
    }
    testPage.show({
      pertId: data.pertId,
      teachingMethodName: "",
      title: "",
      startTime: "",
      endTime: "",
      examDuration: "",
      passScores: ""
    });
  };

  // 删除试卷
  const handleDelete = () => {
    let content = (
      <div>
        <div>您确定要删除选中的试卷吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        stepServices.deleteExamPaper(allStepViewModal.taskCode, data.pertId)
          .then(res => {
            if (res.code == 200) {
              Message.success("试卷删除成功");
              allStepViewModal.initAllExamPapers(allStepViewModal.taskCode, allStepViewModal.stepData1.cetpId);
            } else {
              Message.error("试卷删除失败");
            }
          })
          .catch(e => {
          });
      }
    });
  }

  return (
    <Wrapper>
      <div className={appStore.HOSPITAL_ID == 'hj' ? 'hjAllBtns' : "allBtns"}>
        <Button
          size="small"
          onClick={() => {
            handlePagePreview();
          }}
          style={{ marginRight: "10px" }}
        >
          试卷预览
        </Button>
        {appStore.HOSPITAL_ID == 'hj' && <Button size="small" onClick={() => handleDelete()}>删除</Button>}
      </div>
      <BaseTable
        dataSource={[{}, ...dataSource]}
        columns={columns}
        type={[""]}
        wrapperStyle={{ padding: 0 }}
      />
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <Modal
        visible={visible}
        title={
          <div>
            <span>题库上传</span>
            <span style={{ color: "red", fontSize: "13px" }}>
              （*每次题库上传都会将上一次选择的{totalNum}题库覆盖清空）
            </span>
          </div>
        }
        width="460px"
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Radio.Group
          value={showType}
          onChange={(e: any) => setShowType(e.target.value)}
        >
          <Radio value={1} style={{ margin: " 20px 80px 20px 70px" }}>
            题库选择
          </Radio>
          <Radio value={0}>本地上传</Radio>
        </Radio.Group>
      </Modal>
      <QuesBankModal
        visible={quesVisible}
        onCancel={onQuesCancel}
        onOk={handleQuesOk}
        pertId={data.pertId}
      />
      <testPage.Component/>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .allBtns {
    margin: -20px 0 5px 0;
  }
  .hjAllBtns {
    margin: 0 0 5px 0;
  }

  .input-cell {
    padding: 0 !important;
    .ant-input, .ant-select, .ant-select-selection, .ant-input-number {
      position: relative;
      z-index: 1000;
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      text-align: center;
      /* &:focus {
        background: ${p => p.theme.$mlc};
      } */
      input {
        text-align: center;
      }
    }
  }
`;
