import React from "react";
import { DoCon } from "src/components/BaseTable";

const creatColumns = (calBack: Function): {}[] => {
  return [
    {
      title: "科室名称",
      dataIndex: "deptName",
      align: "left",
      width: 220,
    },
    {
      title: "收集表名称",
      dataIndex: "formName",
      align: "left",
      width: 220,
    },
    {
      title: "发生时间",
      dataIndex: "happenDate",
      align: "center",
      width: 90,
    },
    {
      title: "姓名",
      dataIndex: "patientName",
      align: "center",
      width: 70,
    },
    {
      title: "病案号",
      dataIndex: "inpNo",
      align: "center",
      width: 60,
    },
    {
      title: "床号",
      dataIndex: "bedLabel",
      align: "center",
      width: 60,
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      width: 50,
    },
    {
      title: "年龄",
      dataIndex: "age",
      align: "center",
      width: 80,
    },
    {
      title: "入院时间",
      dataIndex: "admissionDate",
      align: "center",
      width: 90,
    },
    {
      title: "填报人",
      dataIndex: "creatorName",
      align: "center",
      width: 60,
    },
    {
      title: "状态",
      dataIndex: "status",
      align: "center",
      width: 60,
      render(status: string) {
        return (
          <span>{status === '0' ? '保存' : '已提交'}</span>
        )
      }
    },
    {
      title: "操作",
      dataIndex: "",
      align: "center",
      width: 100,
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

const tableList = [
  { code: 'R0001', name: '跌倒（坠床）相关信息收集表' },
  { code: 'R0002', name: '压力性损伤相关信息收集表' },
  { code: 'R0003', name: 'CVC非计划拔管相关信息收集表' },
  { code: 'R0004', name: 'PICC非计划拔管相关信息收集表' },
  { code: 'R0005', name: '导尿管非计划拔管相关信息收集表' },
  { code: 'R0006', name: '胃肠管（经口鼻）非计划拔管相关信息收集表' },
  { code: 'R0007', name: '气管导管非计划拔管相关信息收集表' },
  { code: 'R0008', name: 'CVC相关血流感染相关信息收集表' },
  { code: 'R0009', name: 'PICC相关血流感染相关信息收集表' },
  { code: 'R0010', name: '呼吸机相关肺炎（VAP）相关信息收集表' },
  { code: 'R0011', name: '导尿管相关尿路感染（CAUTI）相关信息收集表' },
]

export default {
  creatColumns,
  tableList
}