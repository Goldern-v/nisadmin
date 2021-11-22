import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
// import { Button } from "antd";
import { createContextMenu } from "../../../components/arrangeSheet/ContextMenu";
import Cell from "../../../components/arrangeSheet/Cell";
import { sheetViewModal } from "../../../viewModal/SheetViewModal";
import moment from "moment";
import { getWeekString, getWeekString2 } from "src/utils/date/week";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import createModal from "src/libs/createModal";
import EditVacationCountModal from "../../../modal/EditVacationCountModal";
import EditVacationCountModal_wh from "../../../modal/EditEffectiveTimeModal_wh";
import AddAccumulativeLeaveModal from "../../../modal/AddAccumulativeLeaveModal";
import AddRemakeModal from "../../../modal/AddRemakeModal";
import TotalCell from "./TotalCell";
import { appStore, authStore } from "src/stores";
import { notSelectViewModal } from './SelectViewModal'
import { Table } from "src/vendors/antd";

export interface Props {
  /** 编辑模式 */
  isEdit: boolean;
  surplusHeight: number;
  isEditable: boolean;
}

export default observer(function ArrangeSheet(props: Props) {
  let { isEdit, surplusHeight, isEditable } = props;
  let contextMenu = createContextMenu();
  let [isFixed, setIsFixed] = useState(false)
  /** 修改工时 or 加减班 */

  let editEffectiveTimeModal = createModal(
    appStore.hisAdapter({
      lcey: () => EditVacationCountModal_wh,
    })
  );
  const addAccumulativeLeaveModal = createModal(AddAccumulativeLeaveModal)
  const addRemakeModal = createModal(AddRemakeModal)
  let editVacationCountModal = createModal(EditVacationCountModal);

  /**
   * 工时小计显示
   */
  //
  const manHourTitle = (): string => {
    let title = "工时小计"
    switch (appStore.HOSPITAL_ID) {
      case "dghl":
        title = "本周上班时数";
        break;
      default:
        title = "工时小计";
        break;
    }
    return title
  }
  let columns: any = [
    {
      title: "序号",
      render: (text: string, row: any, index: number) => index + 1,
      fixed: "left",
      width: 60,
      align: "center"
    },
    {
      title: "工号",
      dataIndex: "empNo",
      width: 80,
      fixed: "left",
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "empName",
      width: 100,
      fixed: "left",
      align: "center"
    },
    {
      title: "所属科室",
      dataIndex: "deptName",
      width: 180,
      fixed: "left",
      align: "center"
    },
    {
      title: '层级',
      dataIndex: "nurseHierarchy",
      width: 74,
      fixed: "left",
      align: "center"
    },
    {
      title: "职称",
      dataIndex: "newTitle",
      width: 120,
      fixed: "left",
      align: "center"
    },
    ...sheetViewModal.dateList.map((date, index) => {
      return {
        title: <Th date={date} />,
        width: 72,
        align: "center",
        render(text: any, record: any) {
          return (
            <Cell
              contextMenu={contextMenu}
              editEffectiveTimeModal={editEffectiveTimeModal}
              addAccumulativeLeaveModal={addAccumulativeLeaveModal}
              addRemakeModal={addRemakeModal}
              editVacationCountModal={editVacationCountModal}
              dataSource={record}
              index={index}
              isEdit={isEdit}
            />
          );
        }
      };
    }),
    {
      title: (
        <div>
          <div>{manHourTitle()}</div>
          <div>（小时）</div>
        </div>
      ),
      width: 72,
      align: "center",
      render(text: string, record: any) {
        return <TotalCell id={record.id} />;
      }
    }
  ];

  const deptName = () => {
    let newArr = authStore.deptList?.find(item => item.code === notSelectViewModal.params.deptCode)
    return newArr
  }

  useLayoutEffect(() => {
    if (sheetViewModal && sheetViewModal.dateList.length <= 7) {
      let fixWidth = 614;
      (document as any).querySelector(
        "#arrangeSheet #baseTable"
      ).style.width = fixWidth + sheetViewModal.dateList.length * 72 + 72 + 50 + 'px'
      setIsFixed(false)
    } else {
      (document as any).querySelector("#arrangeSheet #baseTable") &&
        ((document as any).querySelector(
          "#arrangeSheet #baseTable"
        ).style.width = "auto");
      setIsFixed(true)
    }
  }, [sheetViewModal.notSheetTableData]);


  return (
    <Wrapper className={classNames({ isEdit })} id="arrangeSheet">
      <div className='module'>
        <div className='tebleHeader'>
          <div className='title'>{deptName() ? deptName()?.name : '全院'}未发布护士排班表</div>
          <div>日期：<span>{notSelectViewModal.params.startTime}</span> 至 <span>{notSelectViewModal.params.endTime}</span></div>
        </div>

        <div id='baseTable' className='notTabel'>
          <Table
            loading={sheetViewModal.tableLoading}
            className='tableList'
            size="small"
            pagination={false}
            bordered
            columns={columns}
            dataSource={sheetViewModal.notSheetTableData}
            scroll={!isFixed ? { y: 'calc(100vh - 280px)' } : { x: 1100, y: 'calc(100vh - 280px)' }} />
        </div>
      </div>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  .module{
    height: calc(100vh - 100px);
    background: #fff;
    .tebleHeader{
      text-align: center;
      padding: 30px 0 10px 0;
      .title{
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
    .notTabel{
      margin: 0 auto;
      .ant-table-body{
        overflow: auto !important;
      }
      .tableList{
        margin: 20px
      }
      .ant-table-thead{
        background: rgba(242,244,245,1);
      }
      *::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #eaeaea;
      }
      *::-webkit-scrollbar-x {
        width: 8px;
        height: 8px;
        background-color: #fff;
      }
      *::-webkit-scrollbar-track {
        /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
        border-radius: 50px;
        background-color: #eaeaea;
      }
      *::-webkit-scrollbar-thumb {
        border-radius: 50px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
        background-color: #c2c2c2;
      }
  
      .ant-table-fixed-header .ant-table-scroll .ant-table-header {
        padding-bottom: 4px;
        margin-bottom: -8px !important;
      }
      .ant-table-fixed-left .ant-table-body-outer{
        margin-bottom: -8px !important;
      }
    }
  }
  .ant-table-column-title {
    font-size: 13px !important;
    line-height: 1.3;
  }
`;

function Th(props: { date: string }) {
  let date = props.date;
  const Con = styled.div`
    text-align: center;
    padding: 0px 0;
    font-size: 12px;
    line-height: 1.3;
    &.red-text {
      color: red;
    }
  `;
  return (
    <Con
      className={
        getWeekString2(date).indexOf("六") > -1 ||
          getWeekString(date).indexOf("日") > -1
          ? "red-text"
          : undefined
      }
    >
      <div>{moment(date).format("MM-DD")}</div>
      <div>{getWeekString2(date)}</div>
    </Con>
  );
}
