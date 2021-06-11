import React from "react";
import { DoCon } from "src/components/BaseTable";
import { iModalForm } from "./modal";

const statusOption = [
  { label: '全部', value: '' },
  { label: '怀孕护士', value: '怀孕护士' },
  { label: '休产假', value: '休产假' },
  { label: '哺乳假期', value: '哺乳假期' },
  { label: '哺乳期结束', value: '哺乳期结束' },
  { label: '孕周大于28+', value: '孕周大于28+' },
]
const typeOption = [
  { label: '顺产', value: '顺产' },
  { label: '剖宫产', value: '剖宫产' },
]

const creatColumns = (calBack?: Function): {}[] => {
  return [
    {
      title: "序号",
      align: "center",
    },
    {
      title: "姓名",
      dataIndex: "empName",
      align: "center",
    },
    {
      title: "科室",
      dataIndex: "deptName",
      align: "center",
    },
    {
      title: "预产期",
      dataIndex: "expectedDate",
      align: "center",
    },
    {
      title: "当前孕周",
      dataIndex: "gestationalAge",
      align: "center",
    },
    {
      title: "末次月经",
      dataIndex: "lastMenstrualPeriod",
      align: "center",
    },
    {
      title: "分娩方式",
      dataIndex: "deliveryMode",
      align: "center",
    },
    {
      title: "分娩日期",
      dataIndex: "deliveryDate",
      align: "center",
    },
    {
      title: "产假开始日期",
      dataIndex: "babyBreakStartDate",
      align: "center",
    },
    {
      title: "产假结束日期",
      dataIndex: "babyBreakEndDate",
      align: "center",
    },
    {
      title: "哺乳结束日期",
      dataIndex: "lactationEndDate",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "",
      align: "center",
      width: 150,
      render(text: '', record: iModalForm) {
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