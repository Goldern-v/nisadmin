import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { stepServices } from "../services/stepServices";
import { fileDownload } from "src/utils/file/file";
import { stepViewModal } from "../StepViewModal";
import { InputNumber } from "antd/es";
import { observer } from "mobx-react-lite";
import { scStepViewModal } from "./SCStepViewModal";
export interface Props {
  value?: any;
  onChange?: any;
}

export default observer(function ShowTable(props: Props) {
  let dataSource = scStepViewModal.stepData2.questionStatList;

  /** 题目条数 */
  let totalNum = dataSource.reduce((total: any, current: any) => {
    return total + current.questionCount;
  }, 0);

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
      title: "出题类型",
      width: 135,
      align: "center",
      dataIndex: "questionName",
      render(text: any, record: any, index: number) {
        return text;
      }
    },
    {
      title: "题目数",
      dataIndex: "questionCount",
      align: "center",
      render(text: any, record: any, index: number) {
        return text;
      }
    }
  ];

  return (
    <Wrapper>
      <div className="all-con">{totalNum}题（顺序出题）</div>
      <BaseTable
        dataSource={dataSource}
        columns={columns}
        type={[""]}
        wrapperStyle={{ padding: 0 }}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  .all-con {
    position: absolute;
    top: -27px;
  }
`;
