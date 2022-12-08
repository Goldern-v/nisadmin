import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { authStore, appStore } from "src/stores/index";
import moment from "moment";
moment.locale("zh-cn");
const dateFormat = "YYYY-MM-DD";
import { observer } from "mobx-react-lite";
import HomeApi from "src/modules/home/api/HomeApi.ts";
import BaseTable from "src/components/BaseTable.tsx";
export default observer(function PerformChart() {
  const [dataSource, setDataSource] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  useEffect(() => {
    let postData = {
      wardCode: authStore.selectedDeptCode, // 科室编码
      startDate: moment().format(dateFormat), // 时间默认为当天
      endDate: moment().format(dateFormat)
    };
    if(['fsxt'].includes(appStore.HOSPITAL_ID)){
      postData.startDate = authStore.selectDateTime[0].format("YYYY-MM-DD HH:mm:ss")
      postData.endDate = authStore.selectDateTime[1].format("YYYY-MM-DD HH:mm:ss")
    }
    // 获取执行单情况数据
    if (authStore.selectedDeptCode && appStore.HOSPITAL_ID !== 'whyx') {
      setTableLoading(true);
      HomeApi.getWardExecuteHomeStatus(postData)
        .then(res => {
          if (res.data) {
            setTableLoading(false);
            setDataSource(res.data);
          }
        })
        .catch(err => {
          setTableLoading(false);
          console.log(err);
        });
    }
  }, [authStore.selectedDeptCode,authStore.selectDateTime]);

  // 表格
  const columns: any = [
    {
      title: "类型",
      dataIndex: "executeType",
      align: "center"
    },
    {
      title: "已完成",
      dataIndex: "unExecute", //
      align: "center",
      width: 80,
      render(text: any, record: any) {
        return record.totalNum ? Number(record.totalNum) - Number(text) : "0";
      }
    },
    {
      title: "总计",
      dataIndex: "totalNum",
      align: "center",
      width: 80,
      render(text: any) {
        return Number(text);
      }
    },

    {
      title: "完成率",
      dataIndex: "ok",
      align: "center",
      width: 100,
      render(text: any, record: any) {
        let isOk = Number(record.totalNum) - Number(record.unExecute);
        let num: any = (isOk / Number(record.totalNum)).toFixed(2);
        return record.totalNum && record.totalNum !== "0" && isOk
          ? `${num * 100}%`
          : "0%";
      }
    }
  ];
  return (
    <div>
      <Head>
        <div className="headLeft">执行单情况</div>
        <div className="headRight">更多></div>
      </Head>
      <Mid>
        <BaseTable
          dataSource={dataSource}
          columns={columns}
          loading={tableLoading}
          scroll={{ y: 240 }}
        />
      </Mid>
    </div>
  );
});
const Head = styled.div`
  height: 37px;
  line-height: 37px;
  width: 100%;
  background-color: rgba(245, 246, 247, 1);
  .headLeft {
    padding-left: 17px;
    float: left;
    font-size: 13px;
    letter-spacing: 1px;
    color: #333333;
  }
  .headRight {
    padding-right: 14px;
    float: right;
    font-size: 13px;
    letter-spacing: 1px;
    color: #999999;
  }
`;
const Mid = styled.div`
  .ant-table {
    border: none;
  }
  .BaseTable__Wrapper-sc-18xwuv-0 {
    padding: 0 !important;
  }
  .ant-table-header {
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      /* width: 6px; 高宽分别对应横竖滚动条的尺寸 */
      /* height: 4px; */
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: rgba(0, 0, 0, 0.2);
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      /* box-shadow: inset 0 0 5px #f2f4f5; */
      background-color: #f2f4f5;
    }
  }

  .ant-table-body {
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px #ffffff;
      border-radius: 5px;
      background-color: #ffffff;
    }
  }
  .ceBJTl {
    padding: 0;
  }
  height: 282px;

  table {
    width: 100%;
    border: 1px solid #e5e5e5;
    text-align: center;
  }
  th {
    height: 36px;
    border: 1px solid #e5e5e5;
    color: #666666;
    background: rgba(247, 250, 250, 1);
  }
  td {
    height: 36px;
    border: 1px solid #e5e5e5;
  }
`;
