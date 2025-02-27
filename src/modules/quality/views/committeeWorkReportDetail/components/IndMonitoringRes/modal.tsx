import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ColumnProps } from "antd/lib/table";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { cloneJson } from "src/utils/json/clone";
import { tableCon } from "../../style/modal";
import { Input, Select } from "src/vendors/antd";
const { Option } = Select;

export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}
export default function IndMonitoringResModal(props: Props) {
  let { sectionId, setData, data } = props;
  let cloneData: any = cloneJson(data || { list: [] });

  const formatStatus = (obj: Record<string, any>) => {
    let text = '不达标'
    if (!obj.passRate && !obj.averageScore) return ''
    else if (obj.passRate && !obj.averageScore) {
      Number(obj.passRate) >= 90 && (text = '达标')
      return text
    }
    Number(obj.passRate) >= 90 && Number(obj.averageScore) >= 90 && (text = '达标')
    return text
  }
  useEffect(() => {}, []);
  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "index",
      align: "center",
      width: 50,
      render(text: any, record: any, index: number) {
        return index + 1;
      },
    },
    {
      title: "监测指标",
      align: "center",
      width: 160,
      render(text: string, record: any, index: number) {
        return (
          <div className="inp_textArea">
            <Input
              type="text"
              className="cell-ipt"
              value={record.item || ""}
              onChange={(e) => {
                record.item = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "目标值",
      align: "center",
      children: [
        {
          title: "目标合格率",
          align: "center",
          width: 60,
          render(text: string, record: any, index: number) {
            return (
              <div className="inp_textArea">
                <Input
                  className="cell-ipt"
                  value={record.standardPassRate || ""}
                  onChange={(e) => {
                    record.standardPassRate = e.target.value;
                    setData(cloneData);
                  }}
                />
              </div>
            );
          },
        },
        {
          title: "目标合格分",
          align: "center",
          width: 60,
          render(text: string, record: any, index: number) {
            return (
              <div className="inp_textArea">
                <Input
                  type="number"
                  min={0}
                  className="cell-ipt"
                  value={record.qualityPassScore || ""}
                  onChange={(e) => {
                    record.qualityPassScore = e.target.value;
                    setData(cloneData);
                  }}
                />
              </div>
            );
          },
        },
      ],
    },
    {
      title: "公式",
      align: "center",
      children: [
        {
          title: "抽查人（项）数",
          align: "center",
          width: 90,
          render(text: string, record: any, index: number) {
            return (
              <div className="inp_textArea">
                <Input
                  className="cell-textArea"
                  type="number"
                  min={0}
                  value={record.checkCount || ""}
                  onChange={(e) => {
                    record.checkCount = e.target.value;
                    setData(cloneData);
                  }}
                />
              </div>
            );
          },
        },
        {
          title: "合格人（项）数",
          align: "center",
          width: 90,
          render(text: string, record: any, index: number) {
            return (
              <div className="inp_textArea">
                <Input
                  type="number"
                  min={0}
                  className="cell-ipt"
                  value={record.qualifiedCount || ""}
                  onChange={(e) => {
                    record.qualifiedCount = e.target.value;
                    setData(cloneData);
                  }}
                />
              </div>
            );
          },
        },
      ],
    },
    {
      title: "监测结果",
      align: "center",
      children: [
        {
          title: "本月合格率",
          align: "center",
          width: 60,
          render(text: string, record: any, index: number) {
            return (
              <div className="inp_textArea">
                <Input
                  type="number"
                  min={0}
                  className="cell-ipt"
                  value={record.passRate || ""}
                  onChange={(e) => {
                    record.passRate = e.target.value;
                    record.standardStatus = formatStatus(record)
                    setData(cloneData);
                  }}
                />
              </div>
            );
          },
        },
        {
          title: "本月平均分",
          align: "center",
          width: 60,
          render(text: string, record: any, index: number) {
            return (
              <div className="inp_textArea">
                <Input
                  type="number"
                  min={0}
                  className="cell-ipt"
                  value={record.averageScore || ""}
                  onChange={(e) => {
                    record.averageScore = e.target.value;
                    record.standardStatus = formatStatus(record)
                    setData(cloneData);
                  }}
                />
              </div>
            );
          },
        },
        {
          title: "是否达标",
          align: "center",
          width: 60,
          render(text: string, record: any, index: number) {
            return (
              <div className="inp_textArea">
                <Select
                  value={record.standardStatus}
                  className="select"
                  onChange={(value: any) => {
                    record.standardStatus = value;
                    setData(cloneData);
                  }}
                >
                  <Option value="达标">达标</Option>
                  <Option value="不达标">不达标</Option>
                </Select>
              </div>
            );
          },
        },
      ],
    },
  ];
  return (
    <Wrapper>
      <BaseTable
        columns={columns}
        dataSource={(cloneData.list && cloneData.list) || []}
      />
    </Wrapper>
  );
}
const Wrapper = styled(tableCon)`
  .inp_textArea input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
  .double input {
    width: 45%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
  .select {
    padding: 0;
    width: 100%;
    text-align: center;
  }
`;
