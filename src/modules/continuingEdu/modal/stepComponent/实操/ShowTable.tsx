import styled from "styled-components";
import React from "react";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { observer } from "mobx-react-lite";
import { scStepViewModal } from "./SCStepViewModal";
export interface Props {
  value?: any;
  onChange?: any;
}

export default observer(function ShowTable(props: Props) {
  let dataSource = scStepViewModal.stepData2.scoreItems;

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
      title: "评分项标题",
      align: "center",
      dataIndex: "itemName",
      render(text: any, record: any, index: number) {
        return text;
      }
    },
    {
      title: "分值",
      width: 100,
      dataIndex: "scores",
      align: "center",
      render(text: any, record: any, index: number) {
        return text;
      }
    }
  ];

  return (
    <Wrapper>
      <div className="all-con">{dataSource.length || "--"}项）</div>
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
