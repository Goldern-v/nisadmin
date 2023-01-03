import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { authStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { Button, Select, message, Table, Input } from "antd";
import moment from "moment";
import YearPicker from "src/components/YearPicker";

import { ColumnProps } from "src/vendors/antd";
import { starRatingReportService } from "../nightChargingReport/api/StarRatingReportService";
import { INightThiftItem, INightThiftMoney } from "./types"
import { fileDownload } from "src/utils/file/file";
import { useRef } from "src/types/react";
import printing from "printing";

const Option = Select.Option;

export default observer(function nightChargingTotleList() {
  const defaultQuery = {
    year: moment().format("YYYY"),
    month: moment().format("MM"),
  } as any;

  const defaultMark = {
    markUser: authStore.adminNurse as any,//制表人
    auditUser: "",//区域人
    accraditation: "",//院领导
  }

  const [query, setQuery] = useState(defaultQuery);

  const [nightThiftList, setNightThiftList] = useState<Array<INightThiftItem> | []>([]);//夜班统计list
  const [nightNum, setNightNum] = useState<INightThiftMoney | null>();
  const [nightMoney, setNightMoney] = useState<INightThiftMoney | null>();
  const [markUsrList, setMarkUsrList] = useState(defaultMark);

  const tableWrapper: any = useRef<HTMLElement>();


  const onPrint = (isPrint: boolean) => {
    //return false
    let printFun = isPrint ? printing : printing.preview;
    let title = document.title;
    document.title = "护理系统夜班绩效统计汇总表";
    printFun(tableWrapper.current, {
      injectGlobalCss: true,
      scanStyles: false,
      // max-height:500px;
      css: `
          print-page {
           box-shadow: none;
           -webkit-print-color-adjust: exact;
           margin: 0 auto;
         }
        .page-title {
           min-height: 20px;
           padding: 0px 30px 20px;
         }
         .page-title .title {
           text-align: center;
           margin-right: 0;
         }
         table, img {
          page-break-inside: avoid;
        }
        pre {
          page-break-after: avoid;
        }
        * {
           color: #000 !important;
         }
         .footer-title {
           min-height: 0;
           margin-bottom: 0;
         }
         .img-group{
           margin-top: 0 !important;
         }
         table { 
           page-break-inside:avoid 
        }
        tr{ 
          page-break-inside:avoid; page-break-after:avoid 
        }
        .newtable{
          position: relative;
          .ant-table-footer{
            padding: 0 !important;
           }
        }
         th, td{
           padding:4px !important;
         }
         .night-other{
          .night-tabel-make-user,.night-tabel-make-time, 
          .night-tabel-make-audit,.night-tabel-make-accraditation{
            font-weight: 700;
            font-style: normal;
            font-size: 18px;
            display: flex;
            input{
              width: 130px;
              border: none;
              border-bottom: 1px solid rgba(0, 0, 0, 0.65);
              border-radius: 0;
              padding: 0 auto;
            }
          }
         .night-tabel-make-user,.night-tabel-make-time{
            text-align: left;
            padding-left: 68%;
            margin-bottom: 4px;
         }
         .night-tabel-make-accraditation{
           padding: 10px 0;
         }
        }
        
       .ant-input{
          width: 130px;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.65);
          border-radius: 0;
        }
       .night-tabel-make-user,.night-tabel-make-time{
          text-align: left;
          padding-left: 67% !important;
          margin-bottom: 4px;
       }
       .ant-spin-nested-loading{
         height:auto;
       }
       
       .nightNum-td1, .nightNum-td2, .nightNum-tr{
        border-right: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
       }
      .nightNum-td1{
        width: 320px !important;
        text-align: center;
      }
      .nightNum-td2{
        width: 189px;
        text-align: center;
      }
      .ant-table-body{
        overflow-x: hidden !important;
       }
      `
    });
    setTimeout(() => {
      document.title = title;
    }, 500);
  };

  //获取月份
  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = [];
    while (currentMonth--) {
      monthArr.push(currentMonth + 1);
    }
    return monthArr;
  })();

  const columns: ColumnProps<any>[] = [
    {
      key: "index",
      title: "序号",
      width: 40,
      align: "center",
      render: (text: string, record: any, idx: number) =>
        idx + 1
    },
    {
      key: "deptName",
      dataIndex: "deptName",
      title: "科室",
      align: "left",
      width: 140,
    },
    {
      key: "hs",
      dataIndex: "hs",
      title: "护士 120元/个",
      align: "center",
      width: 100,
    },
    {
      key: "zghs",
      dataIndex: "zghs",
      title: "主管护师 130元/个",
      align: "center",
      width: 100,
    },
    {
      dataIndex: "fzrhs",
      key: "fzrhs",
      title: "副主任护师 150元/个",
      align: "center",
      width: 100
    },
    {
      dataIndex: "zwzb",
      key: "zwzb",
      title: "助班 60元/个",
      align: "center",
      width: 100
    },
    {
      dataIndex: "hggr",
      key: "hggr",
      title: "护工/工人 40元/个",
      align: "center",
      width: 100
    },
    {
      dataIndex: "money",
      key: "money",
      title: "金额（元）",
      align: "center",
      width: 100
    },
  ];

  /**
   * 获取接口数据
   */
  const getSgyGetListTwo = () => {
    starRatingReportService.sgyGetListTwol(query).then(res => {
      if (res?.data) {
        let resData = res.data;
        setNightNum(resData.rowNum);
        setNightMoney(resData.rowMoney);
        setNightThiftList(resData.dataList);
      }
    }).catch(error => {
      message.error(error)
    });
  }

  //导出
  const exportExcel = () => {
    starRatingReportService.sgyExcelTwo(query).then(res => {
      fileDownload(res);
    }).catch(error => {
      message.error(error)
    })
  }

  //初始化数据
  // const initData = () => {
  //   setNightNum({
  //     zghs: 3,
  //     money: 2086,
  //     hggr: 6,
  //     hs: 2,
  //     zwzb: 2,
  //     fzrhs: 5
  //   });
  //   setNightMoney({
  //     zghs: 8,
  //     money: 3086,
  //     hggr: 4,
  //     hs: 7,
  //     zwzb: 6,
  //     fzrhs: 9
  //   });
  //   setNightThiftList([
  //     {
  //       deptName: "急诊护理科室",
  //       zghs: 6,
  //       money: 150,
  //       hggr: 2,
  //       hs: 6,
  //       zwzb: 3,
  //       fzrhs: 4,
  //     },
  //     {
  //       deptName: "神经内科护理单元",
  //       zghs: 6,
  //       money: 150,
  //       hggr: 2,
  //       hs: 6,
  //       zwzb: 3,
  //       fzrhs: 4,
  //     },
  //     {
  //       deptName: "神经外科护理单元",
  //       zghs: 6,
  //       money: 150,
  //       hggr: 2,
  //       hs: 6,
  //       zwzb: 3,
  //       fzrhs: 4,
  //     },
  //     {
  //       deptName: "心血管内科护理单元",
  //       zghs: 6,
  //       money: 150,
  //       hggr: 2,
  //       hs: 6,
  //       zwzb: 3,
  //       fzrhs: 4,
  //     }
  //   ])
  // }

  const tableSummary = () => {
    if (!nightMoney || !nightNum) {
      return <div></div>
    }
    return (
      <table>
        <tr className="nightNum-tr">
          <td className="nightNum-td1" >合计(个)</td>
          {Object.keys(nightNum as any).map(key => {
            return <td key={key} className="nightNum-td2">{nightNum[key]}</td>
          })}
        </tr>
        <tr className="nightNum-tr">
          <td className="nightNum-td1" >金额(元)</td>
          {Object.keys(nightMoney as any).map(key => {
            return <td key={key} className="nightNum-td2">{nightMoney[key]}</td>
          })}
        </tr>
      </table>
    )
  }

  useEffect(() => {
    getSgyGetListTwo()
    //initData()
  }, [query])

  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon />
        <RightIcon>
          <span>年份:</span>
          <span className="year-select">
            <YearPicker
              allowClear={false}
              value={moment(`${query.year}-01-01`) || undefined}
              onChange={(newMoment: any) => {
                if (newMoment)
                  setQuery({ ...query, year: newMoment.format("YYYY") });
                else setQuery({ ...query, year: "" });
              }}
            />
          </span>
          <span>月份:</span>
          <Select
            value={query.month}
            className="month-select"
            onChange={(month: string) => setQuery({ ...query, month })}
          >
            {/* <Option value="">全部</Option> */}
            {monthList.map((month: number) => (
              <Option value={`${month}`} key={month}>
                {month}
              </Option>
            ))}
          </Select>
          <Button type="primary" onClick={exportExcel}>
            导出
          </Button>
          <Button type="primary" onClick={() => { onPrint(true) }}>
            打印
          </Button>
        </RightIcon>
      </HeaderCon>
      <TableBox>
        <TableWrapper ref={tableWrapper}>
          <h3 className="table-wrapper-title">护理系统夜班绩效统计汇总表</h3>
          <Table
            className="newtable"
            dataSource={nightThiftList}
            columns={columns}
            bordered rowKey='index'
            pagination={false}
            scroll={{ x: true }}
            footer={() => tableSummary()}
          />
          {/* footer={() => tableSummary()} */}
          <div className="night-other">
            <div className="night-tabel-make-user">制 表  人：<Input value={markUsrList.markUser} onChange={(e) => { const markUser = e.target.value; setMarkUsrList({ ...markUsrList, markUser }) }} /></div>
            <div className="night-tabel-make-time">制表时间：{moment().format("YYYY-MM-DD")}</div>
            <div className="night-tabel-make-audit">审核人签字：<Input value={markUsrList.auditUser} onChange={(e) => { const auditUser = e.target.value; setMarkUsrList({ ...markUsrList, auditUser }) }} /></div>
            <div className="night-tabel-make-accraditation">院领导审批：<Input value={markUsrList.accraditation} onChange={(e) => { const accraditation = e.target.value; setMarkUsrList({ ...markUsrList, accraditation }) }} /></div>
          </div>
        </TableWrapper>
      </TableBox>

    </Wrapper>
  );
});

// @ts-ignore
const Wrapper = styled.div`
 position: relative;
`;
const TableBox = styled.div`
 padding: 0 115px;
 min-height: 600px;
 background-color:#FFFFFF;
 height: 88vh;
 overflow: auto;
`

// @ts-ignore
const TableWrapper = styled.div`
/* height: 100px; */
 table {
    page-break-inside:avoid 
  }
  tr{ 
    page-break-inside:avoid; 
    page-break-after:avoid
  }
  position: relative;
  .newtable{
    position: relative;
    min-height: 200px;
    /* max-height: 200px; */
    .ant-table-footer{
      padding: 0 !important;
    }
    td {
    position: relative;
    word-break: break-all;
    padding: 5px 5px !important;
    .ellips {
      position: absolute;
      left: 0;
      top: 0;
      height: 30px;
      line-height: 30px;
      right: 0;
      padding: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  }
  
  .table-wrapper-title{
    padding-top: 50px;
    position: relative;
    text-align: center;
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
  }
  .night-other{
    .night-tabel-make-user,.night-tabel-make-time, 
    .night-tabel-make-audit,.night-tabel-make-accraditation{
      font-weight: 700;
      font-style: normal;
      font-size: 18px;
      display: flex;
      
      input{
        width: 130px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.65);
        border-radius: 0;
        padding: 0 auto;
      }
    }
   .night-tabel-make-user,.night-tabel-make-time{
      text-align: left;
      padding-left: 76%;
      margin-bottom: 4px;
   }
   .night-tabel-make-accraditation{
     padding: 10px 0;
   }
  }
  .nightNum-td1, .nightNum-td2, .nightNum-tr{
    border-right: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
  }
  .nightNum-td1{
    width: 354px;
    text-align: center;
  }
  .nightNum-td2{
    width: 189px;
    text-align: center;
  }
`;

const HeaderCon = styled.div`
  display: flex;
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .month-select {
    width: 70px;
  }
  .year-select {
    width: 100px;
    display: inline-block;
  }
  .approvalStatus-select{
    width:180px;
  }
`;
const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  /* padding: 0 0 0 15px; */
  display: flex;
  align-items: center;
`;
const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`;
const ExportCon = styled.div`
  & > div {
    margin-top: 15px;
  }
`;
