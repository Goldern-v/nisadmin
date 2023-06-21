import { Input } from "src/vendors/antd";
import { DoCon } from "src/components/BaseTable";
import React from "react";
import { appStore } from "src/stores";
import { Select } from "antd";
import { CLASSES } from "../../../../nightShiftFeeSetting/enums";

const getColumns = (cloneData: any, calBack: Function) => {
  return [
    {
      title: "序号",
      render(text: any, record: any, index: number) {
        return index + 1;
      },
      width: 50,
      align: "center"
    },
    {
      title: "工号",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.empNo}
            onChange={(e: any) => {
              record.empNo = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "姓名",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.empName}
            onChange={(e: any) => {
              record.empName = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "金额",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.total}
            onChange={(e: any) => {
              record.total = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "数量",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.num}
            onChange={(e: any) => {
              record.num = e.target.value;
              record.total = record.standard * record.num;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    ...appStore.hisMatch({
      map: {
        'zzwy,dghm': [{
          title: "班次",
          width: 100,
          render(text: any, record: any) {
            return <Select
            style={{width: '100%'}}
              value={record.nightShift}
              onChange={(e: any) => {
                record.nightShift = e
                calBack('setData', cloneData)
              }}>
              {
                CLASSES.map(v =>
                  <Select.Option value={v.value} key={v.value}>{v.label}</Select.Option>)
              }
            </Select>
          }
        }],
        other: []
      },
      vague: true
    }),
    {
      title: "标准",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.standard}
            onChange={(e: any) => {
              record.standard = e.target.value;
              record.total = record.standard * record.num;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "操作",
      key: "操作",
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span
              onClick={e => {
                cloneData.list.splice(index, 1);
                calBack('setData', cloneData)
              }}
            >
              删除
            </span>
          </DoCon>
        );
      }
    }
  ]
}

const item = {
  empNo: "",
  empName: "",
  total: "",
  num: "",
  standard: ""
}

const getTable = (list: any[]) => {
  return (
    <table>
      <colgroup>
        <col width="120" />
        <col width="120" />
      </colgroup>
      <tbody>
        <tr className="header">
          <td>工号</td>
          <td>姓名</td>
          <td>金额</td>
          <td>数量</td>
          {['zzwy', 'dghm'].includes(appStore.HOSPITAL_ID) && <td>班次</td>}
          <td>标准</td>
        </tr>
        {list.map((item, index) => (
          <tr key={index}>
            <td style={{ textAlign: "center" }}>{item.empNo}</td>
            <td style={{ textAlign: "center" }}>{item.empName}</td>
            <td style={{ textAlign: "center" }}>{item.total}</td>
            <td style={{ textAlign: "center" }}>{item.num}</td>
            {['zzwy', 'dghm'].includes(appStore.HOSPITAL_ID) && <td style={{ textAlign: "center" }}>{item.nightShift}</td>}
            <td style={{ textAlign: "center" }}>{item.standard}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default {
  getColumns,
  item,
  getTable,
}