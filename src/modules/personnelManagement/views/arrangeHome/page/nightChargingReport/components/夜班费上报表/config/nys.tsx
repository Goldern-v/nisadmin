import { Input } from "src/vendors/antd";
import { DoCon } from "src/components/BaseTable";
import React from "react";

const getColumns = (cloneData: any, calBack: Function) => {
  return [
    {
      title: "序号",
      width: 50,
      align: "center",
      render(text: any, record: any, index: number) {
        return index + 1;
      }
    },
    {
      title: "工号",
      width: 80,
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
      width: 80,
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
      title: "P班",
      children: [
        {
          title: "数量",
          dataIndex: "数量P",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numP}
                onChange={(e: any) => {
                  record.numP = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "金额P",
          width: 70,
          align: "center",
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
        }
      ]
    },
    {
      title: "N班",
      children: [
        {
          title: "数量",
          dataIndex: "数量N",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numN}
                onChange={(e: any) => {
                  record.numN = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "金额N",
          width: 70,
          align: "center",
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
        }
      ]
    },
    {
      title: "夜班",
      children: [
        {
          title: "数量",
          dataIndex: "数量夜",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numNight}
                onChange={(e: any) => {
                  record.numNight = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "金额夜",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalNight}
                onChange={(e: any) => {
                  record.totalNight = e.target.value;
                  calBack('addAllMoney', record)
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        }
      ]
    },
    {
      title: "晚班",
      children: [
        {
          title: "数量",
          dataIndex: "数量晚",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numWan}
                onChange={(e: any) => {
                  record.numWan = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "金额晚",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalWan}
                onChange={(e: any) => {
                  record.totalWan = e.target.value;
                  calBack('addAllMoney', record)
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        }
      ]
    },
    {
      title: "二线",
      children: [
        {
          title: "数量",
          dataIndex: "数量二",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numSecondLine}
                onChange={(e: any) => {
                  record.numSecondLine = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "金额二",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalSecondLine}
                onChange={(e: any) => {
                  record.totalSecondLine = e.target.value;
                  calBack('addAllMoney', record)
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        }
      ]
    },
    {
      title: "总金额",
      dataIndex: "总金额",
      width: 70,
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
  numP: "",
  totalP: "",
  numN: "",
  totalN: "",
  numNight: "",
  totalNight: "",
  numWan: "",
  totalWan: "",
  numSecondLine: "",
  totalSecondLine: "",
  numAll: "",
  totalAll: ""
}

const moneyKeyList = ['totalP', 'totalN', 'totalNight', 'totalWan', 'totalSecondLine']

const getTable = (list: any[], other: any) => {
  return (
    <table>
      <colgroup>
        <col width="80"/>
        <col width="80"/>
        <col width="80"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
      </colgroup>
      <tbody>
      <tr className="header">
        <td rowSpan={2}>序号</td>
        <td rowSpan={2}>工号</td>
        <td rowSpan={2}>姓名</td>
        <td colSpan={2}>P班</td>
        <td colSpan={2}>N班</td>
        <td colSpan={2}>夜班</td>
        <td colSpan={2}>晚班</td>
        <td colSpan={2}>二线</td>
        <td rowSpan={2}>总金额</td>
      </tr>
      <tr className="header">
        <td>数量</td>
        <td>金额</td>
        <td>数量</td>
        <td>金额</td>
        <td>数量</td>
        <td>金额</td>
        <td>数量</td>
        <td>金额</td>
        <td>数量</td>
        <td>金额</td>
      </tr>
      {list.map((item, index) => (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{index + 1}</td>
          <td style={{ textAlign: "center" }}>{item.empNo}</td>
          <td style={{ textAlign: "center" }}>{item.empName}</td>
          <td style={{ textAlign: "center" }}>{item.numP}</td>
          <td style={{ textAlign: "center" }}>{item.totalP}</td>
          <td style={{ textAlign: "center" }}>{item.numN}</td>
          <td style={{ textAlign: "center" }}>{item.totalN}</td>
          <td style={{ textAlign: "center" }}>{item.numNight}</td>
          <td style={{ textAlign: "center" }}>{item.totalNight}</td>
          <td style={{ textAlign: "center" }}>{item.numWan}</td>
          <td style={{ textAlign: "center" }}>{item.totalWan}</td>
          <td style={{ textAlign: "center" }}>{item.numSecondLine}</td>
          <td style={{ textAlign: "center" }}>{item.totalSecondLine}</td>
          <td style={{ textAlign: "center" }}>{item.totalAll}</td>
        </tr>
      ))}
      <tr>
        <td style={{ textAlign: "center" }}>总计金额</td>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}/>
        <td style={{ textAlign: "center" }}>{other.allMoney}</td>
      </tr>
      </tbody>
    </table>
  )
}

export default {
  getColumns,
  item,
  moneyKeyList,
  getTable,
}