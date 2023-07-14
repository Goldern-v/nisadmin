import { Input } from "src/vendors/antd";
import { DoCon } from "src/components/BaseTable";
import React from "react";
import { InputNumber, Select } from "antd";
// import { CLASSES } from "../../../../nightShiftFeeSetting/enums";
import { starRatingReportEditModel } from "src/modules/personnelManagement/views/arrangeHome/page/nightChargingReport/model/StarRatingReportEditModel";
interface ExtraItemIn {
  item: any,
  index: number
}
const getColumns = (cloneData: any, calBack: Function) => {
  // 不同班次字段
  /**班次金额，数量修改了total后，外层的total也需要改变 */
  const extraList: any =
    starRatingReportEditModel.settingList.reduce((prev, cur) => {
      prev.push({
        title: cur.timeType + '数量',
        width: 70,
        render(text: any, record: any) {
          const index = record.schNightTotalContentList.findIndex((v: any) => cur.timeType === v.nightShift)
          return (
            <InputNumber
              min={0}
              value={record?.schNightTotalContentList[index].num}
              onChange={(e: any) => {
                const data = record.schNightTotalContentList[index]
                record.schNightTotalContentList[index].num = e;
                record.schNightTotalContentList[index].total = data.standard * e;
                record.total = record.schNightTotalContentList.reduce((prev1: any, cur1: any) => {
                  prev1 += cur1.total
                  return prev1
                }, 0)
                calBack('setData', cloneData)
              }}
            />
          );
        }
      })
      prev.push({
        title: cur.timeType + '金额',
        width: 70,
        render(text: any, record: any) {
          const index = record.schNightTotalContentList.findIndex((v: any) => cur.timeType === v.nightShift)
          return (
            <InputNumber
              min={0}
              value={record?.schNightTotalContentList[index].standard}
              onChange={(e: any) => {
                const data = record.schNightTotalContentList[index]
                record.schNightTotalContentList[index].standard = e;
                record.schNightTotalContentList[index].total = data.num * e;
                record.total = record.schNightTotalContentList.reduce((prev1: any, cur1: any) => {
                  prev1 += cur1.total
                  return prev1
                }, 0)
                calBack('setData', cloneData)
              }}
            />
          );
        }
      })
      return prev
    }, [])
  /**外层的工号，姓名改变了班次的工号，姓名需要同步 */
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
              record.schNightTotalContentList.forEach((v: any) => {
                v.empNo = record.empNo
              })
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
              record.schNightTotalContentList.forEach((v: any) => {
                v.empName = record.empName
              })
              calBack('setData', cloneData)
            }}
          />
        );
      },
      width: 90
    },
    ...extraList,
    {
      title: "合计",
      dataIndex: 'total',
      align: 'center',
      // render(text: any, record: any, index: number) {
      //   return (
      //     <InputNumber
      //       value={record.total}
      //       onChange={(e: any) => {
      //         record.total = e;
      //         calBack('setData', cloneData)
      //       }}
      //     />
      //   );
      // },
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
/**新增数据 */
const item = () => {
  return {
    empNo: "",
    empName: "",
    total: 0,
    schNightTotalContentList: starRatingReportEditModel.settingList.map(v => ({
      empName: '',
      empNo: '',
      nightShift: v.timeType,
      num: 0,
      standard: 0,
      total: 0,
    }))
  }
}
/**额外表头 */
const ExtraHeader = () => {
  return <>{starRatingReportEditModel.settingList.map((v: any) =>
  (
    <>
      <td key={v.timeType + 1}>{v.timeType + '数量'}</td>
      <td key={v.timeType + 2}>{v.timeType + '金额'}</td>
    </>
  ))}</>
}
/**额外数据 */
const ExtraItem = ({ item, index }: ExtraItemIn) => {
  return <>{starRatingReportEditModel.settingList.map((v: any) => {
    const idx = item.schNightTotalContentList.findIndex((v1: any) => v.timeType === v1.nightShift)
    return (
      <>
        <td key={`${v.timeType}${index}1`}>{item.schNightTotalContentList[idx].num}</td>
        <td key={`${v.timeType}${index}2`}>{item.schNightTotalContentList[idx].standard}</td>
      </>
    )
  })}</>
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
          <ExtraHeader />
          <td>合计</td>
        </tr>
        {list.map((item, index) => (
          <tr key={index}>
            <td style={{ textAlign: "center" }}>{item.empNo}</td>
            <td style={{ textAlign: "center" }}>{item.empName}</td>
            <ExtraItem item={item} index={index} />
            <td style={{ textAlign: "center" }}>{item.total}</td>
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