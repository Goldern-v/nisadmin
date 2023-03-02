import { Input,Select } from "src/vendors/antd";
import React, { useMemo } from "react";
import { starRatingReportEditModel } from "../../../model/StarRatingReportEditModel"
import {standardList} from "../../../types"

const { Option } = Select;
let standardItem=standardList[0];

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
      title: "姓名",
      render(text: any, record: any, index: number) {
        return (
          <Input readOnly
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
      title: "工号",
      render(text: any, record: any, index: number) {
        return (
          <Input readOnly
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
      title: "职称",
      render(text: any, record: any, index: number) {
        return (
          <Input readOnly
            value={record.newTitle}
            onChange={(e: any) => {
              record.newTitle = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "科室编码",
      render(text: any, record: any, index: number) {
        return (
          <Input readOnly
            value={record.deptCode}
            onChange={(e: any) => {
              record.deptCode = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "科室信息",
      render(text: any, record: any, index: number) {
        return (
          <Input readOnly
            value={record.deptName}
            onChange={(e: any) => {
              record.deptName = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "晚夜班",
      render(text: any, record: any, index: number) {
        return (
          <Input type = "number" min = {0}
            value={record.num}
            onChange={(e: any) => {
              record.num = e.target.value;
              record.totalMoney = parseInt(standardItem.name) * (parseInt(record.num) + parseInt(record.zaobaNum) * 0.5 + parseInt(record.wanbaNum) * 1.5) + parseInt(record.zbNum) * 60;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "早8-晚8",
      render(text: any, record: any, index: number) {
        return (
            <Input type = "number" min = {0}
                value={record.zaobaNum}
                onChange={(e: any) => {
                  record.zaobaNum = e.target.value;
                  record.totalMoney = parseInt(standardItem.name) * (parseInt(record.num) + parseInt(record.zaobaNum) * 0.5 + parseInt(record.wanbaNum) * 1.5) + parseInt(record.zbNum) * 60;
                  calBack('setData', cloneData)
                }}
            />
        );
      },
      width: 90
    },
    {
      title: "晚8-早8",
      render(text: any, record: any, index: number) {
        return (
            <Input type = "number" min = {0}
                value={record.wanbaNum}
                onChange={(e: any) => {
                  record.wanbaNum = e.target.value;
                  record.totalMoney = parseInt(standardItem.name) * (parseInt(record.num) + parseInt(record.zaobaNum) * 0.5 + parseInt(record.wanbaNum) * 1.5) + parseInt(record.zbNum) * 60;
                  calBack('setData', cloneData)
                }}
            />
        );
      },
      width: 90
    },
    {
      title: '助班',
      width: 90,
      render(text: any, record: any, index: number) {
        return (<Input type = "number" min = {0}
          value={record.zbNum}
          onChange={(e: any) => {
            record.zbNum = e.target.value;
            record.totalMoney = parseInt(standardItem.name) * (parseInt(record.num) + parseInt(record.zaobaNum) * 0.5 + parseInt(record.wanbaNum) * 1.5) + parseInt(record.zbNum) * 60;
            calBack('setData', cloneData)
          }}
        />)
      }
    },
    {
      title: "标准",
      render(text: any, record: any, index: number) {
        return (
          <Select value = {record.standard}
          defaultValue={standardItem.code}
          style={{ width: "100%" }}
          onChange={(value:string)=>{
            const findItem=standardList.find(item=>item.code==value);
            if(findItem){
              standardItem=findItem;
              record.totalMoney = parseInt(standardItem.name) * (parseInt(record.num) + parseInt(record.zaobaNum) * 0.5 + parseInt(record.wanbaNum) * 1.5) + parseInt(record.zbNum) * 60;
              record.standard=value;
              calBack('setData', cloneData)
            }
          }}
          >
            {
              (standardList as any).map((item:any,index:number)=>{
               return(<Option value={item.code} key={index}>{item.code}</Option>)
              })
            }
          </Select>
        );
      },
      width: 270
    },
    {
      title: "合计金额(元)",
      render(text: any, record: any, index: number) {
        return (
          <Input readOnly
            value={record.totalMoney}
            onChange={(e: any) => {
              record.totalMoney = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "认可标签",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.approvedSignature}
            onChange={(e: any) => {
              record.approvedSignature = e.target.value;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    // {
    //   title: "年",
    //   render(text: any, record: any, index: number) {
    //     return (
    //       <Input
    //         value={record.year}
    //         onChange={(e: any) => {
    //           record.year = e.target.value;
    //           // record.total = record.standard * record.num;
    //           calBack('setData', cloneData)
    //         }}
    //       />
    //     );
    //   },
    //   width: 90
    // },
    // {
    //   title: "月",
    //   render(text: any, record: any, index: number) {
    //     return (
    //       <Input
    //         value={record.month}
    //         onChange={(e: any) => {
    //           record.month = e.target.value;
    //           // record.total = record.standard * record.num;
    //           calBack('setData', cloneData)
    //         }}
    //       />
    //     );
    //   },
    //   width: 90
    // },
    // {
    //   title: "操作",
    //   key: "操作",
    //   width: 60,
    //   render(text: any, record: any, index: number) {
    //     return (
    //       <DoCon>
    //         <span
    //           onClick={e => {
    //             cloneData.list.splice(index, 1);
    //             calBack('setData', cloneData)
    //           }}
    //         >
    //           删除
    //         </span>
    //       </DoCon>
    //     );
    //   }
    // }
  ]
}

const item = () => {
  let newItem = {
    empNo: "",
    empName: "",
    newTitle: "",
    deptCode: starRatingReportEditModel?.gzsrmReport?.deptCode,//科室编码
    deptName: starRatingReportEditModel?.gzsrmReport?.deptName,//科室信息
    num: 0,
    totalMoney: 0,//合计金额
    standard: standardItem.code,//标准
    approvedSignature: "",//认可标签
    year: starRatingReportEditModel?.gzsrmReport?.year,
    month: starRatingReportEditModel?.gzsrmReport?.month,
  }
  return newItem
}

// const getTitle = (list: any) => {
//   if (!list || JSON.stringify(list) == '{}' || list.length <= 0) return 0;
//   let total = list.reduce((total: number, item: any, index: number) => {
//     return total = total + parseFloat(item.totalMoney)
//   }, 0);
//   return parseFloat(total).toFixed(2);
// }

const getTable = (list: any[],remark:any, sumTotalMoney:any, sumTotalNum:any, sumTotalWanbaNum:any, sumTotalZaobaNum:any, sumTotalZbNum:any) => {
  /**计算班次个数合计 */
  const calcCount = useMemo(() => {
    if (!(list && list.length)) return 0
    return list.reduce((total: number, item: any, index: number) => {
      return total += Number(item.num) + Number(item.zbNum)
    }, 0);
  }, [list])
  return (
    <div>
      <table>
        <colgroup>
          <col />
          <col />
          <col />
          <col width={60}/>
          <col width={60} />
          <col width={60} />
          <col width={60} />
          <col />
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr className="header">
            <td rowSpan={2}>序号</td>
            <td rowSpan={2}>姓名</td>
            <td rowSpan={2}>职称</td>
            <td rowSpan={2}>晚夜班</td>
            <td rowSpan={2}>早8-晚8</td>
            <td rowSpan={2}>晚8-早8</td>
            <td rowSpan={2}>助班</td>
            <td rowSpan={2} style={{width:180}}>夜班费标准</td>
            <td rowSpan={2}>合计金额(元)</td>
            <td rowSpan={2}>认可签名</td>
          </tr>
          <tr className="header">
          </tr>
          {list.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td style={{ textAlign: "center" }}>{item.empName}</td>
              <td style={{ textAlign: "center" }}>{item.newTitle}</td>
              <td style={{ textAlign: "center" }}>{item.num}</td>
              <td style={{ textAlign: "center" }}>{item.zaobaNum}</td>
              <td style={{ textAlign: "center" }}>{item.wanbaNum}</td>
              <td style={{ textAlign: "center" }}>{item.zbNum}</td>
              <td style={{ textAlign: "center",width:180 }}>{item.standard}</td>
              <td style={{ textAlign: "center" }}>{item.totalMoney}</td>
              <td style={{ textAlign: "center" }}>{item.approvedSignature}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>合计</td>
            <td colSpan={1}>{sumTotalNum || 0}</td>
            <td colSpan={1}>{sumTotalZaobaNum || 0}</td>
            <td colSpan={1}>{sumTotalWanbaNum || 0}</td>
            <td colSpan={1}>{sumTotalZbNum || 0}</td>
            <td>金额合计</td>
            <td colSpan={1}>{sumTotalMoney || 0}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={10} className="table-gzsrm-total">
              合计金额 = 晚夜班*1+(早8-晚8)*0.5+(晚8-早8)*1.5]*班费标准+助班（一个助班定额60元）<br/>
              说明：{remark}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default {
  getColumns,
  item,
  getTable,
}
