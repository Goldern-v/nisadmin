import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message, Input } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { stepServices } from "../services/stepServices";
import { fileDownload } from "src/utils/file/file";
import { stepViewModal } from "../StepViewModal";
import { InputNumber } from "antd/es";
import { observer } from "mobx-react-lite";
import { scStepViewModal } from "./SCStepViewModal";
import { authStore, appStore } from "src/stores";

export interface Props {
  value?: any;
  onChange?: any;
  type?: any;
}

export default observer(function UpdateTable(props: Props) {
  const { value, onChange } = props;
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [dataSource, setDataSource]: any = useState([]);

  /** 题目条数 */
  let totalNum = dataSource.reduce((total: any, current: any) => {
    return total + current.questionCount;
  }, 0);

  /** 总分 */
  let totalScore = dataSource.reduce((total: any, current: any) => {
    return total + current.scores;
  }, 0);
  // let _totalScore = scStepViewModal.stepData2.totalScores;
  scStepViewModal.stepData2.totalScores = totalScore;

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      align: "center",
      width: 50,
      dataIndex: "sort",
      render(text: any, record: any, index: number) {
        if (index == 0) return "";
        return index;
      }
    },
    {
      title: "标题",
      width: 135,
      align: "center",
      dataIndex: "itemName",
      className: "input-cell",
      render(text: any, record: any, index: number) {
        if (index == 0)
          return (
            <Button
              type="primary"
              icon="plus"
              onClick={addList}
              style={{ margin: "10px auto" }}
            >
              添加评分项
            </Button>
          );
        return (
          <Input
            style={{ border: 0, textAlign: "center" }}
            value={text}
            onChange={val => {
              record.itemName = val.target.value;
              onChange([...dataSource]);
            }}
          />
        );
      }
    },
    {
      title: "总分",
      align: "center",
      className: "input-cell",
      width: 100,
      dataIndex: "scores",
      render(text: any, record: any, index: number) {
        if (index == 0) return totalScore || "--";
        return (
          <InputNumber
            min={0}
            style={{ border: 0, textAlign: "center" }}
            value={text}
            onChange={val => {
              record.scores = val;

              onChange([...dataSource]);
            }}
          />
        );
      }
    },
    {
      title: "操作",
      width: 100,
      align: "center",
      dataIndex: "totalScores",
      render(text: any, record: any, index: number) {
        if (index == 0) return;
        return (
          <DoCon>
            <span onClick={() => delList(index - 1)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  const addList = () => {
    // 实操习题上传最多不可以超过4条
    if (appStore.HOSPITAL_ID !== "wh") {
      if (props.type && props.type === "sc") {
        if (value && value.length > 3) {
          message.warning("评分项最多只可添加4项");
          return;
        }
      }
    }
    onChange([
      ...dataSource,
      {
        itemName: "",
        scores: 0
      }
    ]);
  };

  const delList = (index: any) => {
    dataSource.splice(index, 1);

    onChange([...dataSource]);
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
