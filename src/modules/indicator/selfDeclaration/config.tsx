import React from "react";
import { DoCon } from "src/components/BaseTable";

const creatColumns = (calBack: Function): {}[] => {
  return [
    {
      title: "收集表名称",
      dataIndex: "formName",
      align: "center",
      width: 220,
    },
    {
      title: "科室名称",
      dataIndex: "deptName",
      align: "center",
    },
    {
      title: "发生时间",
      dataIndex: "happenDate",
      align: "center",
    },
    {
      title: "姓名",
      dataIndex: "patientName",
      align: "center",
      width: 120,
    },
    {
      title: "病案号",
      dataIndex: "inpNo",
      align: "center",
      width: 120,
    },
    {
      title: "床号",
      dataIndex: "bedLabel",
      align: "center",
      width: 80,
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      width: 80,
    },
    {
      title: "年龄",
      dataIndex: "age",
      align: "center",
      width: 120,
    },
    {
      title: "入院时间",
      dataIndex: "admissionDate",
      align: "center",
    },
    {
      title: "填报人",
      dataIndex: "creatorName",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "",
      align: "center",
      width: 150,
      render(text: '', record: any) {
        return (
          <DoCon>
            <span onClick={() => calBack('edit', record)}>编辑</span>
            <span onClick={() => calBack('delete', record)}>删除</span>
          </DoCon>
        )
      }
    }
  ]
}

export default {
  creatColumns,
}