import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { observer } from "src/vendors/mobx-react-lite";
import { ColumnProps } from "antd/lib/table";
import BaseTable from "src/components/BaseTable";
import EditButton from "src/modules/quality/components/EditButton";
import TwoLevelTitle from "src/modules/quality/components/TwoLevelTitle";
import { useInstance } from "../../hook/useModel";
import { SectionCon } from "../../style/section";
export interface Props {
  sectionId: string;
  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
  keyName: string;
}
export default observer(function IndMonitoringResSection(props: Props) {
  let { sectionId, sectionTitle } = props;
  const { instance } = useInstance();
  let data = instance.getSectionData(sectionId);

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      align: "center",
      width: 40,
      render(text: any, record: any, index: number) {
        return index + 1;
      },
    },
    {
      title: "科室",
      dataIndex: "department",
      key: "department",
      align: "center",
      width: 100,
    },
    {
      title: "抽查数",
      dataIndex: "sampleNumber",
      key: "sampleNumber",
      align: "center",
      width: 50,
    },
    {
      title: "问题汇总",
      dataIndex: "problemSummary",
      key: "problemSummary",
      width: 250,
    },
    {
      title: "分子",
      dataIndex: "numerator",
      key: "numerator",
      align: "center",
      width: 50,
    },
    {
      title: "分母",
      dataIndex: "denominator",
      key: "denominator",
      align: "center",
      width: 50,
    },
    {
      title: "合格率",
      dataIndex: "qualificationRate",
      key: "qualificationRate",
      align: "center",
      width: 50,
      render(text: any, record: any, index: number) {
        return text && text != '0' ? Number(text).toFixed(2) + '%' : text
      }
    },
    {
      title: "得分",
      dataIndex: "score",
      key: "score",
      align: "center",
      width: 60,
      render(text: any, record: any, index: number) {
        return text && text != '0' ? Number(text).toFixed(2) : '/'
      }
    },
    {
      title: "达标状态",
      align: "center",
      dataIndex: 'standardStatus',
      key: 'standardStatus',
      width: 60,
    },
  ];
  return (
    <SectionCon>
      <TwoLevelTitle text={sectionTitle} />
      <EditButton onClick={() => instance!.openEditModal(sectionId)}>
        编辑
      </EditButton>
      <BaseTable dataSource={data.list} columns={columns} />
    </SectionCon>
  );
});

