import { DatePicker, Input } from "src/vendors/antd";
import { DoCon } from "src/components/BaseTable";
import React from "react";
import moment from "moment";
import DateTimePicker from "src/components/DateTimePicker";

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
      title: "工号编号",
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
      title: () => (<span>P班<br/>金额：20、30、40</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numP",
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
          dataIndex: "totalP",
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
      title: () => (<span>N班<br/>金额：80</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numN",
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
          dataIndex: "totalN",
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
      title: () => (<span>二线<br/>金额：80</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numTwo",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numTwo}
                onChange={(e: any) => {
                  record.numTwo = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalTwo",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalTwo}
                onChange={(e: any) => {
                  record.totalTwo = e.target.value;
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
      title: () => (<span>三线<br/>金额：60</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numThree",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numThree}
                onChange={(e: any) => {
                  record.numThree = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalThree",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalThree}
                onChange={(e: any) => {
                  record.totalThree = e.target.value;
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
      title: () => (<span>PN<br/>金额：120</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numPN",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numPN}
                onChange={(e: any) => {
                  record.numPN = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalPN",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalPN}
                onChange={(e: any) => {
                  record.totalPN = e.target.value;
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
      title: () => (<span>120<br/>金额：100</span>),
      children: [
        {
          title: "数量",
          dataIndex: "numOne",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.numOne}
                onChange={(e: any) => {
                  record.numOne = e.target.value;
                  calBack('setData', cloneData)
                }}
              />
            );
          }
        },
        {
          title: "金额",
          dataIndex: "totalOne",
          width: 70,
          align: "center",
          render(text: any, record: any, index: number) {
            return (
              <Input
                value={record.totalOne}
                onChange={(e: any) => {
                  record.totalOne = e.target.value;
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
  numTwo: "",
  totalTwo: "",
  numThree: "",
  totalThree: "",
  numPN: "",
  totalPN: "",
  numOne: "",
  totalOne: "",
  totalAll: ""
}

const moneyKeyList = ['totalP', 'totalN', 'totalTwo', 'totalThree', 'totalPN', 'totalOne']

const getTable = (list: any[], otherObj: any, setOtherObj: Function) => {
  const momentDate = otherObj.ksfzrAutographDate ? moment(otherObj.ksfzrAutographDate) : undefined
  const momentDate2 = otherObj.zgbmyjAutographDate ? moment(otherObj.zgbmyjAutographDate) : undefined
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
        <col width="70"/>
        <col width="70"/>
      </colgroup>
      <tbody>
      <tr className="header">
        <td rowSpan={2}>序号</td>
        <td rowSpan={2}>工号编号</td>
        <td rowSpan={2}>姓名</td>
        <td colSpan={2}>p班<br/>金额：20、30、40</td>
        <td colSpan={2}>N班<br/>金额：80</td>
        <td colSpan={2}>二线<br/>金额：80</td>
        <td colSpan={2}>三线<br/>金额：60</td>
        <td colSpan={2}>PN<br/>金额：120</td>
        <td colSpan={2}>120<br/>金额：100</td>
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
          <td style={{ textAlign: "center" }}>{item.numTwo}</td>
          <td style={{ textAlign: "center" }}>{item.totalTwo}</td>
          <td style={{ textAlign: "center" }}>{item.numThree}</td>
          <td style={{ textAlign: "center" }}>{item.totalThree}</td>
          <td style={{ textAlign: "center" }}>{item.numPN}</td>
          <td style={{ textAlign: "center" }}>{item.totalPN}</td>
          <td style={{ textAlign: "center" }}>{item.numOne}</td>
          <td style={{ textAlign: "center" }}>{item.totalOne}</td>
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
        <td style={{ textAlign: "center" }}>{otherObj.allMoney}</td>
      </tr>
      <tr>
        <td colSpan={6} style={{ textAlign: "left" }}>
          <span>科室负责人:</span>
          <Input
            size='small'
            value={otherObj.ksfzr}
            style={{ width: 250 }}
            onChange={(e: any) => setOtherObj('ksfzr', e.target.value)}
          />
        </td>
        <td colSpan={5} style={{ textAlign: "left" }}>
          <span>签名:</span>
          <Input
            size='small'
            value={otherObj.ksfzrAutograph}
            style={{ width: 200 }}
            onChange={(e: any) => setOtherObj('ksfzrAutograph', e.target.value)}
          />
        </td>
        <td colSpan={5} style={{ textAlign: "left" }}>
          <DatePicker
            mode="date"
            allowClear={false}
            value={momentDate}
            onChange={date => setOtherObj('ksfzrAutographDate', moment(date).format('YYYY-MM-DD'))}
          />
        </td>
      </tr>
      <tr>
        <td colSpan={6} style={{ textAlign: "left" }}>
          <span>主管部门意见:</span>
          <Input
            size='small'
            value={otherObj.zgbmyj}
            style={{ width: 250 }}
            onChange={(e: any) => setOtherObj('zgbmyj', e.target.value)}
          />
        </td>
        <td colSpan={5} style={{ textAlign: "left" }}>
          <span>签名:</span>
          <Input
            size='small'
            value={otherObj.zgbmyjAutograph}
            style={{ width: 200 }}
            onChange={(e: any) => setOtherObj('zgbmyjAutograph', e.target.value)}
          />
        </td>
        <td colSpan={5} style={{ textAlign: "left" }}>
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