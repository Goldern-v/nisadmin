import styled from "styled-components";
import React from "react";
import BaseTable from "src/components/BaseTable";
import { ColumnProps } from "antd/lib/table";
import { observer } from "mobx-react-lite";
import { stepViewModal } from "../../StepViewModal";
export interface Props {
  value?: any;
  onChange?: any;
}

export default observer(function ShowTable(props: Props) {
  let dataSource = stepViewModal.stepData4XX.studyLinkList;
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
      width: 200,
      dataIndex: "linkTitle",
      render(text: any, record: any, index: number) {
        return text;
      }
    },
    {
      title: "外网链接",
      dataIndex: "linkAddress",
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
