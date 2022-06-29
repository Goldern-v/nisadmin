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
      title: () => (<span>3-6备总消<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num36Bzx",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num36Bzx}
                onChange={(e: any) => {
                  record.num36Bzx = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total36Bzx",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total36Bzx}
                onChange={(e: any) => {
                  record.total36Bzx = e.target.value;
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
      title: () => (<span>8-12备/休<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num812Bx",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num812Bx}
                onChange={(e: any) => {
                  record.num812Bx = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total812Bx",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total812Bx}
                onChange={(e: any) => {
                  record.total812Bx = e.target.value;
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
      title: () => (<span>8-4/下夜<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num84Xy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num84Xy}
                onChange={(e: any) => {
                  record.num84Xy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total84Xy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total84Xy}
                onChange={(e: any) => {
                  record.total84Xy = e.target.value;
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
      title: () => (<span>8-4/下待<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num84Xd",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num84Xd}
                onChange={(e: any) => {
                  record.num84Xd = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total84Xd",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total84Xd}
                onChange={(e: any) => {
                  record.total84Xd = e.target.value;
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
      title: () => (<span>休/下待<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numXxd",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numXxd}
                onChange={(e: any) => {
                  record.numXxd = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalXxd",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalXxd}
                onChange={(e: any) => {
                  record.totalXxd = e.target.value;
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
      title: () => (<span>休/助夜<br/>金额：150</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numXzy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numXzy}
                onChange={(e: any) => {
                  record.numXzy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalXzy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalXzy}
                onChange={(e: any) => {
                  record.totalXzy = e.target.value;
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
      title: () => (<span>助夜<br/>金额：150</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numZy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numZy}
                onChange={(e: any) => {
                  record.numZy = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalZy",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalZy}
                onChange={(e: any) => {
                  record.totalZy = e.target.value;
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
      title: () => (<span>84产下<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num84Cx",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num84Cx}
                onChange={(e: any) => {
                  record.num84Cx = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total84Cx",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total84Cx}
                onChange={(e: any) => {
                  record.total84Cx = e.target.value;
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
      title: () => (<span>3-6值<br/>金额：150</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num36Z",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num36Z}
                onChange={(e: any) => {
                  record.num36Z = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total36Z",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total36Z}
                onChange={(e: any) => {
                  record.total36Z = e.target.value;
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
      title: () => (<span>2-5值<br/>金额：150</span>),
      children: [
        {
          title: "数量",
          dataIndex: "num25Z",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.num25Z}
                onChange={(e: any) => {
                  record.num25Z = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "total25Z",
          width: 50,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.total25Z}
                onChange={(e: any) => {
                  record.total25Z = e.target.value;
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
  num36Bzx: "",
  total36Bzx: "",
  num812Bx:"",
  total812Bx: "",
  num84Xy: "",
  total84Xy: "",
  num84Xd: "",
  total84Xd: "",
  numXxd: "",
  totalXxd: "",
  numXzy: "",
  totalXzy: "",
  numZy: "",
  totalZy: "",
  num84Cx: "",
  total84Cx: "",
  num36Z: "",
  total36Z: "",
  num25Z: "",
  total25Z: "",
  totalAll: "",
}

const moneyKeyList = ["totalSy", "totalXy", "totalZ", "totalD", "total120", "total84Bz", "total812Xxy", "totalXxy",
  "totalXsy", "total812Xsy", "totalB", "total36Bzx", "total812Bx", "total84Xy", "total84Xy",
  "total84Xd","totalXxd","totalXzy","totalZy","totalZy","total84Cx","total36Z","total25Z"
]
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
        <td colSpan={2}>3-6备总消<br/>金额：100</td>
        <td colSpan={2}>8-12备/休<br/>金额：100</td>
        <td colSpan={2}>8-4/下夜<br/>金额：100</td>
        <td colSpan={2}>8-4/下待<br/>金额：100</td>
        <td colSpan={2}>休/下待<br/>金额：100</td>
        <td colSpan={2}>休/助夜<br/>金额：150</td>
        <td colSpan={2}>助夜<br/>金额：150</td>
        <td colSpan={2}>84产下<br/>金额：100</td>
        <td colSpan={2}>3-6值<br/>金额：150</td>
        <td colSpan={2}>2-5值<br/>金额：150</td>
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
          <td style={{ textAlign: "center" }}>{item.num36Bzx}</td>
          <td style={{ textAlign: "center" }}>{item.total36Bzx}</td>
          <td style={{ textAlign: "center" }}>{item.num812Bx}</td>
          <td style={{ textAlign: "center" }}>{item.total812Bx}</td>
          <td style={{ textAlign: "center" }}>{item.num84Xy}</td>
          <td style={{ textAlign: "center" }}>{item.total84Xy}</td>
          <td style={{ textAlign: "center" }}>{item.num84Xd}</td>
          <td style={{ textAlign: "center" }}>{item.total84Xd}</td>
          <td style={{ textAlign: "center" }}>{item.numXxd}</td>
          <td style={{ textAlign: "center" }}>{item.totalXxd}</td>
          <td style={{ textAlign: "center" }}>{item.numXzy}</td>
          <td style={{ textAlign: "center" }}>{item.totalXzy}</td>
          <td style={{ textAlign: "center" }}>{item.numZy}</td>
          <td style={{ textAlign: "center" }}>{item.totalZy}</td>
          <td style={{ textAlign: "center" }}>{item.num84Cx}</td>
          <td style={{ textAlign: "center" }}>{item.total84Cx}</td>
          <td style={{ textAlign: "center" }}>{item.num36Z}</td>
          <td style={{ textAlign: "center" }}>{item.total36Z}</td>
          <td style={{ textAlign: "center" }}>{item.num25Z}</td>
          <td style={{ textAlign: "center" }}>{item.total25Z}</td>
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
        <td style={{ textAlign: "center" }} />
          
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
      {/* <tr>
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
      </tr> */}
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