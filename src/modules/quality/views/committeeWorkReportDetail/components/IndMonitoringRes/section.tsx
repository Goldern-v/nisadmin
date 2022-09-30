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
      title: "监测指标",
      dataIndex: "item",
      key: "item",
      align: "center",
      width: 100,
    },
    {
      title: "目标值",
      align: "center",
      children: [
        {
          title: "目标合格率",
          dataIndex: "standardPassRate",
          key: "standardPassRate",
          align: "center",
          width: 60,
        },
        {
          title: "目标合格分",
          dataIndex: "qualityPassScore",
          key: "qualityPassScore",
          align: "center",
          width: 60,
        },
      ],
    },
    {
      title: "公式",
      align: "center",
      children: [
        {
          title: "抽查人（项）数",
          dataIndex: "checkCount",
          key: "checkCount",
          align: "center",
          width: 60,
        },
        {
          title: "合格人（项）数",
          dataIndex: "qualifiedCount",
          key: "qualifiedCount",
          align: "center",
          width: 60,
        },
      ],
    },
    {
      title: "监测结果",
      align: "center",
      children: [
        {
          title: "本月合格率",
          dataIndex: "passRate",
          key: "passRate",
          align: "center",
          width: 60,
          render(text: any, record: any, index: number) {
            return text && text != '0' ? Number(text).toFixed(2) + '%' : text
          }
        },
        {
          title: "本月平均分",
          dataIndex: "averageScore",
          key: "averageScore",
          align: "center",
          width: 60,
          render(text: any, record: any, index: number) {
            return text && text != '0' ? Number(text).toFixed(2) : '/'
          }
        },
        {
          title: "是否达标",
          align: "center",
          dataIndex: 'standardStatus',
          key: 'standardStatus',
          width: 60,
        },
      ]
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
