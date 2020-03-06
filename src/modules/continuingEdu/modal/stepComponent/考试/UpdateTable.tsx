import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { stepServices } from "../services/stepServices";
import { fileDownload } from "src/utils/file/file";
import { stepViewModal } from "../StepViewModal";
export interface Props {
  value?: any;
  onChange?: any;
}

export default function UpdateTable(props: Props) {
  const { value, onChange } = props;
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [dataSource, setDataSource]: any = useState([]);

  /** 题目条数 */
  let totalNum = dataSource.reduce((total: any, current: any) => {
    return total + current.questionCount;
  }, 0);
  /** 题目条数 */
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
              onClick={uploadFile}
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
      width: 100,
      dataIndex: "scoresPerQuestion",
      render(text: any, record: any, index: number) {
        if (index == 0) return "--";
        return text;
      }
    },
    {
      title: "总分",
      width: 100,
      align: "center",
      dataIndex: "totalScores",
      render(text: any, record: any, index: number) {
        if (index == 0) return totalScore;
        return text;
      }
    }
  ];
  const downFile = () => {
    stepServices.downLoadQueUploadTemplat().then(res => {
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
    console.log(value, "aaaa");
    value && setDataSource(value);
  }, [value]);

  return (
    <Wrapper>
      <div className="down-file-con">
        选择上传文件，
        <span onClick={downFile}>下载题库模板</span>
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
    </Wrapper>
  );
}
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
`;
