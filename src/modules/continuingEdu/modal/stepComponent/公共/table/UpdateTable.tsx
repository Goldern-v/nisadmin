import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message, Input } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { stepServices } from "../../services/stepServices";
import { stepViewModal } from "../../StepViewModal";
import { observer } from "mobx-react-lite";

export interface Props {
  value?: any;
  onChange?: any;
  type?: any;
}

export default observer(function UpdateTable(props: Props) {
  const { value, onChange } = props;
  // const fileInputRef = React.createRef<HTMLInputElement>();
  const [dataSource, setDataSource]: any = useState([]);

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      align: "center",
      width: 30,
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
      dataIndex: "linkTitle",
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
              添加外网资料
            </Button>
          );
        return (
          <Input
            style={{ border: 0, textAlign: "center" }}
            value={text}
            onChange={val => {
              record.linkTitle = val.target.value;
              onChange([...dataSource]);
            }}
          />
        );
      }
    },
    {
      title: "外网链接",
      align: "center",
      className: "input-cell",
      width: 150,
      dataIndex: "linkAddress",
      render(text: any, record: any, index: number) {
        if (index == 0) return "--";
        return (
          <Input
            style={{ border: 0, textAlign: "center" }}
            value={text}
            onChange={val => {
              record.linkAddress = val.target.value;
              onChange([...dataSource]);
            }}
          />
        );
      }
    },
    {
      title: "操作",
      width: 70,
      align: "center",
      dataIndex: "totalScores",
      render(text: any, record: any, index: number) {
        if (index == 0) return;
        return (
          <DoCon>
            <span
              onClick={() => {
                window.open(`${record.linkAddress}`);
              }}
            >
              预览
            </span>
            <span onClick={() => delList(index - 1)}>删除</span>
          </DoCon>
        );
      }
    }
  ];

  const addList = () => {
    onChange([
      ...dataSource,
      {
        linkTitle: "",
        linkAddress: ""
      }
    ]);
  };

  const delList = (index: any) => {
    dataSource.splice(index, 1);
    onChange([...dataSource]);
  };

  // const onFileChange = (e: any) => {
  //   e.persist();
  //   let files = e.target.files || [];
  //   let postData = new FormData();
  //   postData.append("file", files[0]);

  //   postData.append("taskCode", stepViewModal.taskCode);
  //   let hideLoading = message.loading("正在上传，请稍等", 0);
  //   stepServices
  //     .upLoadQuestionsExam(postData)
  //     .then(res => {
  //       hideLoading();
  //       onChange(res.data);
  //     })
  //     .catch(e => {
  //       hideLoading();
  //     });
  // };

  useEffect(() => {
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
      {/* <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onFileChange}
      /> */}
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
