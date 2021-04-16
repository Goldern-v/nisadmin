import { ColumnProps, message } from "src/vendors/antd";
import { DoCon } from "src/components/BaseTable";
import React from "react";

const statusOption = [
  { label: '全部', value: '0' },
  { label: '怀孕护士', value: '1' },
  { label: '休产假', value: '2' },
  { label: '哺乳假期', value: '3' },
  { label: '哺乳期结束', value: '4' },
]
const typeOption = [
  { label: '顺产', value: '1' },
  { label: '剖宫产', value: '2' },
]

const creatColumns = (calBack?: Function): {}[] => {
  return [
    {
      title: "序号",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "工号",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "科室",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "预产期",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "当前孕周",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "末次月经",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "分娩方式",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "分娩日期",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "产假开始日期",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "产假结束日期",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "哺乳结束日期",
      dataIndex: "aaa",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "",
      align: "center",
      width: 150,
      render(text: any, record: any) {
        return (
          <DoCon>
            <span onClick={() => calBack && calBack('edit', record)}>编辑</span>
            <span onClick={() => calBack && calBack('delete', record)}>删除</span>
          </DoCon>
        )
      }
    }
  ]
}

export default {
  statusOption,
  typeOption,
  creatColumns,
}