import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, Modal, message as Message, Radio, message } from "antd";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { stepServices } from "../services/stepServices";
import { fileDownload } from "src/utils/file/file";
import { stepViewModal } from "../StepViewModal";
import { InputNumber } from "antd/es";
import { observer } from "mobx-react-lite";
import QuesBankModal from "./modal/QuesBankModal";
import { quesBankView } from "./modal/QuesBankView";

export interface Props {
  value?: any;
  onChange?: any;
}

export default observer(function UpdateTable(props: Props) {
  const { value, onChange } = props;
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [dataSource, setDataSource]: any = useState([]);
  const [visible, setVisible] = useState(false);
  const [showType, setShowType] = useState(1); // 题库上传类型 （1--题库 2--本地）
  const [quesVisible, setQuesVisible] = useState(false);

  /** 题目条数 */
  let totalNum = dataSource.reduce((total: any, current: any) => {
    return total + current.questionCount;
  }, 0);

  /** 总分 */
  let totalScore = dataSource.reduce((total: any, current: any) => {
    return (total + current.totalScores);
  }, 0).toFixed(2);

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
              setDataSource([...dataSource])
            }}
            onBlur={(e: any) => onChange([...dataSource])}
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
        return text.toFixed(2);
      }
    }
  ];

  const downFileWith = () => {
    stepServices.downLoadQueUploadTemplateWithShortQues().then(res => {
      fileDownload(res);
    });
  };

  const downFileWithout = () => {
    stepServices.downLoadQueUploadTemplateWithoutShortQues().then(res => {
      fileDownload(res);
    });
  };

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
    let hideLoading = message.loading("正在上传，请稍等", 0);
    stepServices
      .upLoadQuestionsExam(postData)
      .then(res => {
        hideLoading();
        // setDataSource(res.data);
        onChange(res.data);
      })
      .catch(e => {
        hideLoading();
      });
  };

  useEffect(() => {
    value && setDataSource(value);
  }, [value]);

  return (
    <Wrapper>
      <div className="down-file-con">
        选择上传文件：
        <span onClick={downFileWith}>下载题库模板(含问答题)</span>
        &nbsp;
        <span onClick={downFileWithout}>下载题库模板(不含问答题)</span>
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
              （*每次题库上传都会将上一次选择的题库覆盖清空）
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
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .down-file-con {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
    span {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
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
