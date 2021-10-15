import { DatePicker, Input } from "src/vendors/antd";
import { DoCon } from "src/components/BaseTable";
import React from "react";
import moment from "moment";
import DateTimePicker from "src/components/DateTimePicker";

const getColumns = (cloneData: any, calBack: Function) => {
  return [
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
      title: () => (<span>上夜<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numSy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numSy}
                onChange={(e: any) => {
                  record.numSy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalSy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalSy}
                onChange={(e: any) => {
                  record.totalSy = e.target.value;
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
      title: () => (<span>下夜<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numXy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numXy}
                onChange={(e: any) => {
                  record.numXy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalXy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalXy}
                onChange={(e: any) => {
                  record.totalXy = e.target.value;
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
      title: () => (<span>值<br/>金额：150</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numZ",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numZ}
                onChange={(e: any) => {
                  record.numZ = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalZ",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalZ}
                onChange={(e: any) => {
                  record.totalZ = e.target.value;
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
      title: () => (<span>导<br/>金额：150</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numD",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numD}
                onChange={(e: any) => {
                  record.numD = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalD",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalD}
                onChange={(e: any) => {
                  record.totalD = e.target.value;
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
      title: () => (<span>120<br/>金额：150</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num120",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num120}
                onChange={(e: any) => {
                  record.num120 = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total120",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total120}
                onChange={(e: any) => {
                  record.total120 = e.target.value;
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
      title: () => (<span>84备助<br/>金额：150</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num84Bz",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num84Bz}
                onChange={(e: any) => {
                  record.num84Bz = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total84Bz",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total84Bz}
                onChange={(e: any) => {
                  record.total84Bz = e.target.value;
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
      title: () => (<span>812休下夜<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num812Xxy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num812Xxy}
                onChange={(e: any) => {
                  record.num812Xxy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total812Xxy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total812Xxy}
                onChange={(e: any) => {
                  record.total812Xxy = e.target.value;
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
      title: () => (<span>休下夜<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numXxy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numXxy}
                onChange={(e: any) => {
                  record.numXxy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalXxy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalXxy}
                onChange={(e: any) => {
                  record.totalXxy = e.target.value;
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
      title: () => (<span>休上夜<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numXsy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numXsy}
                onChange={(e: any) => {
                  record.numXsy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalXsy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalXsy}
                onChange={(e: any) => {
                  record.totalXsy = e.target.value;
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
      title: () => (<span>812休上夜<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num812Xsy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num812Xsy}
                onChange={(e: any) => {
                  record.num812Xsy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total812Xsy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total812Xsy}
                onChange={(e: any) => {
                  record.total812Xsy = e.target.value;
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
      title: () => (<span>(转院)备<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numB",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numB}
                onChange={(e: any) => {
                  record.numB = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalB",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalB}
                onChange={(e: any) => {
                  record.totalB = e.target.value;
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
  empName: "",
  numSy: "",
  totalSy: "",
  numXy: "",
  totalXy: "",
  numZ: "",
  totalZ: "",
  numD: "",
  totalD: "",
  num120: "",
  total120: "",
  num84Bz: "",
  total84Bz: "",
  num812Xxy: "",
  total812Xxy: "",
  numXxy: "",
  totalXxy: "",
  numXsy: "",
  totalXsy: "",
  num812Xsy: "",
  total812Xsy: "",
  numB: "",
  totalB: "",
  totalAll: "",
}

const moneyKeyList = ["totalSy","totalXy","totalZ","totalD","total120","total84Bz","total812Xxy","totalXxy","totalXsy","total812Xsy","totalB"]

const getTable = (list: any[], otherObj: any, setOtherObj: Function) => {
  const momentDate = otherObj.ksfzrAutographDate ? moment(otherObj.ksfzrAutographDate) : undefined
  const momentDate2 = otherObj.zgbmyjAutographDate ? moment(otherObj.zgbmyjAutographDate) : undefined
  return (
    <table>
      <colgroup>
        <col width="80"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
      </colgroup>
      <tbody>
      <tr className="header">
        <td rowSpan={2}>姓名</td>
        <td colSpan={2}>上夜<br/>金额：100</td>
        <td colSpan={2}>下夜<br/>金额：100</td>
        <td colSpan={2}>值<br/>金额：150</td>
        <td colSpan={2}>导<br/>金额：150</td>
        <td colSpan={2}>120<br/>金额：150</td>
        <td colSpan={2}>84备助<br/>金额：150</td>
        <td colSpan={2}>812休下夜<br/>金额：100</td>
        <td colSpan={2}>休下夜<br/>金额：100</td>
        <td colSpan={2}>休上夜<br/>金额：100</td>
        <td colSpan={2}>812休上夜<br/>金额：100</td>
        <td colSpan={2}>(转院)备<br/>金额：100</td>
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
        <td>数量</td>
        <td>金额</td>
      </tr>
      {list.map((item, index) => (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{item.empName}</td>
          <td style={{ textAlign: "center" }}>{item.numSy}</td>
          <td style={{ textAlign: "center" }}>{item.totalSy}</td>
          <td style={{ textAlign: "center" }}>{item.numXy}</td>
          <td style={{ textAlign: "center" }}>{item.totalXy}</td>
          <td style={{ textAlign: "center" }}>{item.numZ}</td>
          <td style={{ textAlign: "center" }}>{item.totalZ}</td>
          <td style={{ textAlign: "center" }}>{item.numD}</td>
          <td style={{ textAlign: "center" }}>{item.totalD}</td>
          <td style={{ textAlign: "center" }}>{item.num120}</td>
          <td style={{ textAlign: "center" }}>{item.total120}</td>
          <td style={{ textAlign: "center" }}>{item.num84Bz}</td>
          <td style={{ textAlign: "center" }}>{item.total84Bz}</td>
          <td style={{ textAlign: "center" }}>{item.num812Xxy}</td>
          <td style={{ textAlign: "center" }}>{item.total812Xxy}</td>
          <td style={{ textAlign: "center" }}>{item.numXxy}</td>
          <td style={{ textAlign: "center" }}>{item.totalXxy}</td>
          <td style={{ textAlign: "center" }}>{item.numXsy}</td>
          <td style={{ textAlign: "center" }}>{item.totalXsy}</td>
          <td style={{ textAlign: "center" }}>{item.num812Xsy}</td>
          <td style={{ textAlign: "center" }}>{item.total812Xsy}</td>
          <td style={{ textAlign: "center" }}>{item.numB}</td>
          <td style={{ textAlign: "center" }}>{item.totalB}</td>
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
        <td style={{ textAlign: "center" }}>{otherObj.allMoney}</td>
      </tr>
      <tr>
        <td colSpan={8} style={{ textAlign: "left" }}>
          <span>科室负责人:</span>
          <Input
            size='small'
            value={otherObj.ksfzr}
            style={{ width: 250 }}
            onChange={(e: any) => setOtherObj('ksfzr', e.target.value)}
          />
        </td>
        <td colSpan={8} style={{ textAlign: "left" }}>
          <span>签名:</span>
          <Input
            size='small'
            value={otherObj.ksfzrAutograph}
            style={{ width: 200 }}
            onChange={(e: any) => setOtherObj('ksfzrAutograph', e.target.value)}
          />
        </td>
        <td colSpan={8} style={{ textAlign: "left" }}>
          <DatePicker
            mode="date"
            allowClear={false}
            value={momentDate}
            onChange={date => setOtherObj('ksfzrAutographDate', moment(date).format('YYYY-MM-DD'))}
          />
        </td>
      </tr>
      <tr>
        <td colSpan={8} style={{ textAlign: "left" }}>
          <span>主管部门意见:</span>
          <Input
            size='small'
            value={otherObj.zgbmyj}
            style={{ width: 250 }}
            onChange={(e: any) => setOtherObj('zgbmyj', e.target.value)}
          />
        </td>
        <td colSpan={8} style={{ textAlign: "left" }}>
          <span>签名:</span>
          <Input
            size='small'
            value={otherObj.zgbmyjAutograph}
            style={{ width: 200 }}
            onChange={(e: any) => setOtherObj('zgbmyjAutograph', e.target.value)}
          />
        </td>
        <td colSpan={8} style={{ textAlign: "left" }}>
          <DatePicker
            mode="date"
            allowClear={false}
            value={momentDate2}
            onChange={date => setOtherObj('zgbmyjAutographDate', moment(date).format('YYYY-MM-DD'))}
          />
        </td>
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