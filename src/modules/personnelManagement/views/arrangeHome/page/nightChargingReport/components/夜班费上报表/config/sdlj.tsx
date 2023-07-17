import { DatePicker, Input } from "src/vendors/antd";
import { DoCon } from "src/components/BaseTable";
import React from "react";
import { appStore } from "src/stores";
import moment from "moment";
import DateTimePicker from "src/components/DateTimePicker";

const getColumns = (cloneData: any, calBack: Function) => {
  return [
    {
      title: "工号",
      width: 60,
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
      }
    },
    {
      title: "姓名",
      width: 60,
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
      }
    },
    {
      title: "P班数量",
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.numP}
            onChange={(e: any) => {
              record.numP = e.target.value;
              record.totalP = Number(e.target.value) * 50;
              calBack('addAllMoney', record)
              calBack('setData', cloneData)
            }}
          />
        );
      }
    },
    {
      title: "N班数量",
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.numN}
            onChange={(e: any) => {
              record.numN = e.target.value;
              record.totalN = Number(e.target.value) * 100;
              calBack('addAllMoney', record)
              calBack('setData', cloneData)
            }}
          />
        );
      }
    },
    {
      title: "P班金额(元)",
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.totalP}
            onChange={(e: any) => {
              record.totalP = e.target.value;
              calBack('addAllMoney', record)
              calBack('setData', cloneData)
            }}
          />
        );
      }
    },
    {
      title: "N班金额(元)",
      width: 60,
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.totalN}
            onChange={(e: any) => {
              record.totalN = e.target.value;
              calBack('addAllMoney', record)
              calBack('setData', cloneData)
            }}
          />
        );
      }
    },
    {
      title: "总金额",
      dataIndex: "总金额",
      width: 50,
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.totalAll}
            onChange={(e: any) => {
              record.totalAll = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      }
    },
    {
      title: "操作",
      key: "操作",
      width: 40,
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
  numP: "",
  numN: "",
  totalP: "",
  totalN: "",
  totalAll: "",
}

const moneyKeyList = ["totalP","totalN"]
const getTable = (list: any[], otherObj: any, setOtherObj: Function) => {
  return (
    <table>
      <colgroup>
        <col width="80"/>
        <col width="80"/>
        <col width="80"/>
        <col width="80"/>
        <col width="80"/>
        <col width="80"/>
        <col width="80"/>
        
      </colgroup>
      <tbody>
      <tr className="header">
        <td>工号</td>
        <td>姓名</td>
        <td>P班数量</td>
        <td>N班数量</td>
        <td>P班金额(元)</td>
        <td>N班金额(元)</td>
        <td>总计(元)</td>
      </tr>
      {list.map((item, index) => (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{item.empNo}</td>
          <td style={{ textAlign: "center" }}>{item.empName}</td>
          <td style={{ textAlign: "center" }}>{item.numP}</td>
          <td style={{ textAlign: "center" }}>{item.numN}</td>
          <td style={{ textAlign: "center" }}>{item.totalP}</td>
          <td style={{ textAlign: "center" }}>{item.totalN}</td>
          <td style={{ textAlign: "center" }}>{item.totalAll}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}
// const remark = "备注：P班 50元/个，N班100元/个";
const remark = appStore.hisMatch({
  map: {
    '925,zjhj': (data: any) => "备注：P班 100元/个，N班100元/个",
    'zzwy,dghm': (data: any = []) => {
      return data.reduce((prev:any, cur:any) => {
        return prev += `${cur.timeType}${cur.standard}元/个 `
      }, '备注：')
    },
    default: (data: any) => "备注：P班 50元/个，N班100元/个"
  },
  vague: true,
})
export default {
  getColumns,
  item,
  moneyKeyList,
  getTable,
  remark
}