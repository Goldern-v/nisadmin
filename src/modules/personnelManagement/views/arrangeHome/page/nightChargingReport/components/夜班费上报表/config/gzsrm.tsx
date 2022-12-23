import { Input,Select } from "src/vendors/antd";
import { DoCon } from "src/components/BaseTable";
import React, { useEffect } from "react";
import { starRatingReportEditModel } from "../../../model/StarRatingReportEditModel"
import {standardList} from "../../../types"

const { Option } = Select;
let standardItem=standardList[0];

const getColumns = (cloneData: any, calBack: Function) => {
  //let newStandardList= starRatingReportEditModel.getApiGzsrmStandardList()
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
      title: "职称",
      render(text: any, record: any, index: number) {
        return (
          <Input
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
          <Input
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
          <Input
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
      title: "数量(个)",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.num}
            onChange={(e: any) => {
              record.num = e.target.value;
              //record.totalMoney = record.standard * record.num;
              record.totalMoney = parseInt(standardItem.name) * record.num;
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "标准",
      render(text: any, record: any, index: number) {
        return (
          // <Input
          //   value={record.standard}
          //   onChange={(e: any) => {
          //     record.standard = e.target.value;
          //     record.totalMoney = record.standard * record.num;
          //     calBack('setData', cloneData)
          //   }}
          // />
          <Select
          defaultValue={standardItem.code}
          style={{ width: "100%" }}
          onChange={(value:string)=>{
            const findItem=standardList.find(item=>item.code==value);
            if(findItem){
              standardItem=findItem;
              record.totalMoney = parseInt(findItem.name) * record.num;
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
          <Input
            value={record.totalMoney}
            onChange={(e: any) => {
              record.totalMoney = e.target.value;
              // record.totalMoney = record.num * 130
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
              // record.total = record.standard * record.num;
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

const getTotle = (list: any) => {
  if (!list || list == {} || list.length <= 0) return 0;
  let total = list.reduce((total: number, item: any, index: number) => {
    return total = total + parseFloat(item.totalMoney)
  }, 0);
  return parseFloat(total).toFixed(2);

}

const getTable = (list: any[],remark:any) => {
  return (
    <div>
      <table>
        <colgroup>
          <col width="120" />
          <col width="120" />
        </colgroup>
        <tbody>
          <tr className="header">
            <td>序号</td>
            <td>姓名</td>
            <td>职称</td>
            <td>数量（个）</td>
            <td style={{width:180}}>标准</td>
            <td>合计金额(元)</td>
            <td>认可签名</td>
          </tr>
          {list.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td style={{ textAlign: "center" }}>{item.empName}</td>
              <td style={{ textAlign: "center" }}>{item.newTitle}</td>
              <td style={{ textAlign: "center" }}>{item.num}</td>
              <td style={{ textAlign: "center",width:180 }}>{item.standard}</td>
              <td style={{ textAlign: "center" }}>{item.totalMoney}</td>
              <td style={{ textAlign: "center" }}>{item.approvedSignature}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={1}>合计</td>
            <td className="table-gzsrm-total" colSpan={6}>{getTotle(list)}</td>
          </tr>
          <tr>
            <td colSpan={7} className="table-gzsrm-total">备注：{remark || '护理信息系统无护工/工人信息，请手填输入姓名及个数。'}</td>
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
