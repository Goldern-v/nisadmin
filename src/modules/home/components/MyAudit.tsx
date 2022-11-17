import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import HomeApi from "src/modules/home/api/HomeApi";
import service from "src/services/api";
import { appStore } from "src/stores/index";
import BaseTable from "src/components/BaseTable";

export default function BedSituation() {
  const [loadingTable, setLoadingTable] = useState(false);
  const [tableData, setTableData] = useState([]); //表格数据

  const columns: any = [
    {
      title: "内容",
      dataIndex: "message",
      key: "message",
      width: 30,
      align: "left"
    },
    {
      title: "提交人",
      dataIndex: "commiterName",
      key: "commiterName",
      width: 10,
      align: "center"
    },
    {
      title: "时间",
      dataIndex: "commitTime",
      key: "commitTime",
      width: 16,
      align: "center"
    }
  ];

  const getMealList = () => {
    setLoadingTable(true);
    HomeApi
      .pendingPage(1, 100,
        appStore.hisMatch({
          map: {
            'hj,ys,dzlc,gyd': "nurseFile",
            'wh,gzsrm': "nurseFileWh",
            other: "nurseFileNys"
          },
          vague:true
        }), '')
      .then(res => {
        setLoadingTable(false);
        setTableData(res.data.list);
      }).catch(e => {
        setLoadingTable(false);
      });
  };

  useEffect(() => {
    getMealList();
  }, []);

  // 点击行打开审批页面
  const selectRow = (record: any) => {
    service.commonApiService
      .getNurseInformation(record.commiterNo)
      .then(res => {
        window.open(`/crNursing/manage/#/nurseAudit?empNo=${res.data.empNo}`);
      });
  };


  return (
    <div>
      <Head>
        <div className='headLeft'>待我审核</div>
        <div
          className='headRight'
          onClick={() => {
            appStore.history.push("/auditsManagement");
          }}
        >
          更多{'>'}
        </div>
      </Head>
      <Mid>
        <BaseTable
          scroll={{ y: 240 }}
          dataSource={tableData}
          columns={columns}
          loading={loadingTable}
          rowClassName={record => {
            return "cursorPointer";
          }}
          onRow={record => {
            return {
              onClick: (event: any) => {
                selectRow(record);
              }
            };
          }}
        />
      </Mid>
    </div>
  )
}

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
    cursor: pointer;
  }
`

const Mid = styled.div`
  height: 282px;
  #baseTable {
    padding: 0 !important;
    .ant-table-body {
      border-radius: 0 !important;
    }
    .ant-table-small {
      border-radius: 0 !important;
    }
  }
  .cursorPointer {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
`
