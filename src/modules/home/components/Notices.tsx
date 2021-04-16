import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from "src/stores/index";
import BaseTable from "src/components/BaseTable";
import HomeApi from "src/modules/home/api/HomeApi";
import { ReactComponent as READ } from "../images/YD.svg";
import { ReactComponent as NOREAD } from "../images/WD.svg";

export default function BedSituation() {
  const [loadingTable, setLoadingTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  const setIcon = (read: any) => {
    return read === true ? <READ /> : <NOREAD />;
  };

  const columns: any = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: 30,
      align: "left",
      render: (text: any, record: any) => (
        <span>
          <i className="messageStatus">{setIcon(record.read)}</i>
          <i className="messageTitle">{record.title}</i>
        </span>
      )
    },
    {
      title: "提交人",
      dataIndex: "senderName",
      key: "senderName",
      width: 10,
      align: "left"
    },
    {
      title: "时间",
      dataIndex: "sendTime",
      key: "sendTime",
      width: 16,
      align: "left"
    }
  ];

  const getMealList = () => {
    setLoadingTable(true);
    HomeApi.getReceiveList(1, 50, '').then(res => {
      setLoadingTable(false);
      setTableData(res.data.list);
    }).catch(e => {
      console.log(e, "ee");
    });
  };

  useEffect(() => {
    getMealList();
  }, []);

  const selectRow = (record: any) => {
    appStore.history.push(`/notice?selectedMenu=收件箱&id=${record.id}`);
  };
  return (
    <div>
      <Head>
        <div className='headLeft'>通知公告</div>
        <div
          className='headRight'
          onClick={() => {
            appStore.history.push("/notice");
          }}
        >
          更多{'>'}
        </div>
      </Head>
      <Mid>
        <BaseTable
          rowKey={record => {
            return record.id;
          }}
          dataSource={tableData}
          columns={columns}
          scroll={{ y: 240 }}
          loading={loadingTable}
          onRow={record => {
            return {
              onClick: (event: any) => {
                selectRow(record);
              }
            };
          }}
          rowClassName={record => {
            return "cursorPointer";
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
  .messageStatus {
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: 5px;
  }
  .messageTitle {
    vertical-align: middle;
    font-style: normal;
  }
  .cursorPointer {
    cursor: pointer;
  }
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
`
