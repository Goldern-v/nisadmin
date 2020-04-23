import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { stepServices } from "../../services/stepServices";
import { fileDownload } from "src/utils/file/file";
import { stepViewModal } from "../../StepViewModal";
import { observer } from "mobx-react-lite";
import TestPageModal from "src/modules/continuingEdu/views/trainingInfoReview/components/TestPageModal/TestPageModal";
import createModal from "src/libs/createModal";

export interface Props {
  value?: any;
  onChange?: any;
}

export default observer(function PXUpdateTable(props: Props) {
  const testPage = createModal(TestPageModal); // 习题预览弹窗
  const { value, onChange } = props;
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [dataSource, setDataSource]: any = useState([]);

  // 预览弹窗
  const handlePagePreview = () => {
    let getObj: any = {
      taskCode: stepViewModal.taskCode,
      teachingMethod: stepViewModal.stepData1.teachingMethod
    };
    if (stepViewModal.stepData1.ceptId) {
      getObj.cetpId = stepViewModal.stepData1.ceptId;
    }
    testPage.show({
      obj: getObj,
      teachingMethodName: "",
      title: "",
      startTime: "",
      endTime: "",
      examDuration: "",
      passScores: ""
    });
  };

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      align: "center",
      width: 50,
      dataIndex: "sort",
      render(text: any, record: any, index: number) {
        return index + 1;
      }
    },
    {
      title: "标题",
      align: "center",
      dataIndex: "questionnaireTitle"
    },
    {
      title: "题数",
      dataIndex: "questionCount",
      width: 80,
      align: "center"
    },
    {
      title: "操作",
      width: 150,
      align: "center",
      dataIndex: "cz",
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span
              onClick={() => {
                handlePagePreview();
              }}
            >
              问卷预览
            </span>
            <span
              onClick={() => {
                uploadFile();
              }}
            >
              重新上传
            </span>
          </DoCon>
        );
      }
    }
  ];
  const downFileWith = () => {
    stepServices.downLoadQueUploadTemplatePX().then(res => {
      fileDownload(res);
    });
  };

  const uploadFile = () => {
    fileInputRef.current && fileInputRef.current.click();
  };
  const onFileChange = (e: any) => {
    e.persist();
    let files = e.target.files || [];
    let postData = new FormData();
    postData.append("file", files[0]);
    postData.append("taskCode", stepViewModal.taskCode);
    let hideLoading = message.loading("正在上传，请稍等", 0);
    stepServices
      .upLoadQuestionsPX(postData)
      .then(res => {
        hideLoading();
        setDataSource([res.data]);
        onChange([res.data]);
      })
      .catch(e => {
        hideLoading();
      });
  };

  const getData = () => {
    let postData = new FormData();
    postData.append("taskCode", stepViewModal.taskCode);
    stepServices
      .upLoadQuestionsPX(postData)
      .then(res => {
        setDataSource([res.data]);
      })
      .catch(e => {});
  };

  useEffect(() => {
    value && setDataSource(value);
  }, [value]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <div className="down-file-con">
        选择上传文件：
        <span onClick={downFileWith}>下载满意度调查问卷模板</span>
      </div>
      <BaseTable
        dataSource={dataSource}
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
      <testPage.Component />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .down-file-con {
    margin-top: 7px;
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
