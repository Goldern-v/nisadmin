import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Modal, Radio, Input, Spin, Button } from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import { observer } from "mobx-react-lite";
import AnwserSheetPage from "./AnwserSheetPage";
import 满意度问卷调查 from "./满意度问卷调查";
import AnwserResultPannel from "./AnwserResultPannel";
import { trainingResultService } from "./../../api/TrainingResultService";
import { message } from "antd/es";
import { appStore } from "src/stores"
import { useRef } from "src/types/react";
import printing from "printing";
import PrintPageNys from "./PrintPageNys";
import { fileDownload } from "src/utils/file/file";

export interface Props extends ModalComponentProps {
  onOkCallBack?: Function;
  title?: string;
  type?: "view" | "edit";
  dataType?: "考试" | "练习" | "问卷" | "在线考试"; //根据数据类型调用不同的接口
  cetpId?: string | number;
  empNo?: string | number;
  hideRightSide?: boolean; //是否隐藏右侧面板
  visible: boolean;
}

export default observer(function AnswerSheetModal(props: Props) {
  const bodyStyle = {
    padding: 0
  };
  const {
    visible,
    onOkCallBack,
    onCancel,
    type,
    title,
    cetpId,
    empNo,
    dataType,
    hideRightSide
  } = props;
  const viewType = type || "edit";
  const [baseInfo, setBaseInfo] = useState({} as any);
  const [questionList, setQuestionList] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const printRef: any = useRef(null);

  const wendaQuestionList = questionList.filter(
    (question: any) => question.questionType == 4
  );

  const handleOK = () => {
    if (loading) return;
    setLoading(true);
    let params = {
      cetpId,
      empNo,
      questionScoreList: wendaQuestionList.map((question: any) => {
        return {
          questionId: question.id,
          deduction: question.deduction
        };
      })
    } as any;

    trainingResultService.saveScores(params).then(
      res => {
        setLoading(false);
        message.success("成绩保存成功");
        onOkCallBack && onOkCallBack();
        onCancel && onCancel();
      },
      () => setLoading(false)
    );
  };

  const getAnswerInfo = () => {
    setLoading(true);

    let req: Promise<any>;

    switch (dataType) {
      case "问卷":
        req = trainingResultService.viewQuestionnaireResult(
          cetpId || "",
          empNo || ""
        );
        break;
      case "在线考试":
        req = trainingResultService.reviewMyExamPaper(cetpId || "");
        break;
      default:
        req = trainingResultService.reviewExamPaper(cetpId || "", empNo || "");
    }

    req.then(
      res => {
        if (res.data) {
          setLoading(false);
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
      () => setLoading(false)
    );
  };

  const PageContent = () => {
    switch (dataType) {
      case "问卷":
        return (
          <满意度问卷调查 type={viewType} title={title} data={questionList}/>
        );
      default:
        return (
          <AnwserSheetPage
            type={viewType}
            title={title}
            data={questionList}
            onDataChange={(newList: any[]) => setQuestionList(newList)}
          />
        );
    }
  };

  useLayoutEffect(() => {
    if (visible) {
      getAnswerInfo();
    }
  }, [visible]);

  // 南医三考试试卷打印
  const handlePrint = () => {
    printing(printRef.current, {
      scanStyles: false,
      injectGlobalCss: true,
      css: `
           @page {
            size: A4 vertical; 
            margin: 10mm;
           }
           #printPage {
             display: block !important;
             margin: 0;
             border: 0;
           }
        `
    });
  }
  // 导出试卷
  const handleExport = () => {
    const params = {
      cetpId,
      empNo
    }
    trainingResultService.handleExport(params).then(res => {
      fileDownload(res)
    })
  }

  return (
    <Modal
      width={hideRightSide ? 900 : 1200}
      confirmLoading={loading}
      footer={
        <div>
          {
            appStore.hisMatch({
              map: {
                nys: <Button onClick={handlePrint} type='primary'>打印试卷</Button>,
                hj: <React.Fragment>
                  <Button onClick={handlePrint} type='primary'>打印试卷</Button>
                  <Button onClick={handleExport} type='primary'>导出</Button>
                </React.Fragment>,
                gxjb: <React.Fragment>
                    <Button onClick={handlePrint} type='primary'>打印试卷</Button>
                    <Button onClick={handleExport} type='primary'>导出</Button>
                  </React.Fragment>,
                default: <span/>
              }
            })
          }
          <Button onClick={onCancel}>取消</Button>
          {viewType == "edit" && wendaQuestionList.length > 0 && (
            <Button loading={loading} onClick={handleOK} type="primary">
              保存成绩
            </Button>
          )}
        </div>
      }
      onCancel={onCancel}
      bodyStyle={bodyStyle}
      visible={visible}
      centered
      title="查看试卷"
    >
      <Wrapper>
        <div
          className="left"
          style={{
            overflowY: loading ? "hidden" : "auto",
            width: 900
          }}
        >
          <Spin spinning={loading}>{PageContent()}</Spin>
        </div>
        {!hideRightSide && (
          <div className="right">
            <AnwserResultPannel
              baseInfo={baseInfo}
              questionList={questionList}
            />
          </div>
        )}
        <PrintPageNys
          baseInfo={baseInfo}
          printRef={printRef}
          type={viewType}
          title={title}
          data={questionList}
          onDataChange={(newList: any[]) => setQuestionList(newList)}
        />
      </Wrapper>
    </Modal>
  );
});

const Wrapper = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  & > div {
    height: 100%;
    overflow-y: auto;
    float: left;
    &.left {
      background: #eee;
    }
    &.right {
      width: 280px;
      border-left: 1px solid #e8e8e8;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #eaeaea;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 50px;
      background-color: #c2c2c2;
    }
    ::-webkit-scrollbar-track {
      border-radius: 50px;
      background-color: #eaeaea;
    }
  }
`;
