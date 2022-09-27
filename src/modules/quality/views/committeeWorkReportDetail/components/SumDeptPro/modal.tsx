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
export default function SumDeptProModal(props: Props) {
  let { sectionId, setData, data } = props;
  let cloneData: any = cloneJson(data || { list: [] });

  const formatStatus = (obj: Record<string, any>) => {
    let text = '不达标'
    if (!obj.qualificationRate && !obj.score) return ''
    else if (obj.qualificationRate && obj.score) {
      Number(obj.qualificationRate) >= 90 && Number(obj.score) >= 90 && (text = '达标')
      return text
    }
    return text
  }
  useEffect(() => { }, []);
  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "index",
      align: "center",
      width: 40,
      render(text: any, record: any, index: number) {
        return index + 1;
      },
    },
    {
      title: "科室",
      align: "center",
      width: 100,
      render(text: string, record: any, index: number) {
        return (
          <div className="inp_textArea">
            <Input
              type="text"
              className="cell-ipt"
              value={record.department || ""}
              onChange={(e) => {
                record.department = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "抽查数",
      align: "center",
      width: 50,
      render(text: string, record: any, index: number) {
        return (
          <div className="inp_textArea">
            <Input
              type="number"
              min={0}
              className="cell-ipt"
              value={record.sampleNumber || ""}
              onChange={(e) => {
                record.sampleNumber = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "问题汇总",
      align: "center",
      width: 200,
      render(text: string, record: any, index: number) {
        return (
          <div className="inp_textArea">
            <Input.TextArea
              autosize={true}
              className="cell-ipt"
              value={record.problemSummary || ""}
              onChange={(e) => {
                record.problemSummary = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "分子",
      align: "center",
      width: 50,
      render(text: string, record: any, index: number) {
        return (
          <div className="inp_textArea">
            <Input
              className="cell-textArea"
              type="number"
              min={0}
              value={record.numerator || ""}
              onChange={(e) => {
                record.numerator = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "分母",
      align: "center",
      width: 50,
      render(text: string, record: any, index: number) {
        return (
          <div className="inp_textArea">
            <Input
              type="number"
              min={0}
              className="cell-ipt"
              value={record.denominator || ""}
              onChange={(e) => {
                record.denominator = e.target.value;
                setData(cloneData);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "合格率",
      align: "center",
      width: 50,
      render(text: string, record: any, index: number) {
        return (
          <div className="inp_textArea">
            <Input
              type="number"
              min={0}
              className="cell-ipt"
              value={record.qualificationRate || ""}
              onChange={(e) => {
                record.qualificationRate = e.target.value;
                record.standardStatus = formatStatus(record)
                setData(cloneData);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "得分",
      align: "center",
      width: 50,
      render(text: string, record: any, index: number) {
        return (
          <div className="inp_textArea">
            <Input
              type="number"
              min={0}
              className="cell-ipt"
              value={record.score || ""}
              onChange={(e) => {
                record.score = e.target.value;
                record.standardStatus = formatStatus(record)
                setData(cloneData);
              }}
            />
          </div>
        );
      },
    },
    {
      title: "达标状态",
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
