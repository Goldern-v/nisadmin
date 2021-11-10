import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { ColumnProps, Input, Modal, message } from "src/vendors/antd";
import { createContextMenu } from "../../../components/arrangeSheet/ContextMenu";
import Cell from "../../../components/arrangeSheet/Cell";
import { sheetViewModal } from "../../../viewModal/SheetViewModal";
import moment from "moment";
import { getWeekString, getWeekString2 } from "src/utils/date/week";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import createModal from "src/libs/createModal";
import EditEffectiveTimeModal from "../../../modal/EditEffectiveTimeModal";
import EditVacationCountModal from "../../../modal/EditVacationCountModal";
import EditVacationCountModal_wh from "../../../modal/EditEffectiveTimeModal_wh";
import AddAccumulativeLeaveModal from "../../../modal/AddAccumulativeLeaveModal";
import AddRemakeModal from "../../../modal/AddRemakeModal";
import TotalCell from "../../../components/arrangeSheet/TotalCell";
import NightHourCell from "../../../components/arrangeSheet/NightHourCell";
import TotalHoliday from "../../../components/arrangeSheet/TotalHoliday";
import { appStore } from "src/stores";
import update from "immutability-helper";
import BalanceHour from "../../../components/arrangeSheet/BalanceHour";
import WeekBalanceHour from "../../../components/arrangeSheet/WeekBalanceHour";//本周结余时数
import PublicHour from "../../../components/arrangeSheet/PublicHour";
import HolidayHour from "../../../components/arrangeSheet/HolidayHour";
import service from "src/services/api";
import { cloneJson } from "src/utils/json/clone";

import { arrangeService } from '../../../services/ArrangeService'

export interface Props {
  /** 编辑模式 */
  isEdit: boolean;
  surplusHeight: number;
  isEditable: boolean;
}

export default observer(function ArrangeSheet(props: Props) {
  let { isEdit, surplusHeight, isEditable } = props;
  const [surplusWidth, setSurplusWidth]: any = useState(false);
  let contextMenu = createContextMenu();
  /** 修改工时 or 加减班 */

  let editEffectiveTimeModal = createModal(
    appStore.hisAdapter({
      hj: () => EditEffectiveTimeModal,
      wh: () => EditVacationCountModal_wh,
      gxjb: () => EditVacationCountModal_wh,
      lcey: () => EditVacationCountModal_wh,
      dghl: () => EditVacationCountModal_wh,
      fqfybjy: () => EditVacationCountModal_wh,
      jmfy: () => EditVacationCountModal_wh,
      nys: () => EditVacationCountModal_wh,
      gzsrm: () => EditVacationCountModal_wh,
      fssdy: () => EditVacationCountModal_wh,
      fsxt: () => EditVacationCountModal_wh
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
      width: 40,
      align: "center"
    },
    {
      title: "工号",
      dataIndex: "empNo",
      width: 50,
      fixed: "left",
      align: "center"
    },

    {
      title: "姓名",
      dataIndex: "empName",
      width: 50,
      fixed: "left",
      align: "center"
    },
    {
      title: "所属科室",
      dataIndex: "deptName",
      width: 70,
      fixed: "left",
      align: "center"
    },
    {
      title: '层级',
      dataIndex: "nurseHierarchy",
      width: 40,
      fixed: "left",
      align: "center"
    },
    {
      title: "职称",
      dataIndex: "newTitle",
      width: 70,
      fixed: "left",
      align: "center"
    },
    ...sheetViewModal.dateList.map((date, index) => {
      // console.log(date, 999)
      return {
        title: <Th date={date} />,
        width: 70,
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
      width: 70,
      align: "center",
      render(text: string, record: any) {
        return <TotalCell id={record.id} />;
      }
    }
  ];

  useLayoutEffect(() => {

    try {
      (document as any)
        .getElementById("baseTable")!
        .querySelector(
          ".ant-table-fixed-left .ant-table-body-inner table.ant-table-fixed"
        )!.style.marginBottom =
        (document as any)
          .getElementById("baseTable")!
          .querySelector(".ant-table-footer")!.offsetHeight + "px";
    } catch (error) {
      console.log("同步备注滚动报错");
    }
    // try {
    //   (document as any)
    //     .querySelector(".ant-table-body")!
    //     .addEventListener("scroll", (e: any) => {
    //       (document as any).querySelector(
    //         ".remark-con.real"
    //       )!.style.marginLeft = e.target.scrollLeft + "px";
    //     });
    // } catch (error) {
    // }
    try {
      setTimeout(() => {
        if (
          (document as any).querySelector("#arrangeSheet .ant-table-body") &&
          (document as any).querySelector("#arrangeSheet .ant-table-body")
            .scrollWidth ==
          (document as any).querySelector("#arrangeSheet .ant-table-body")
            .clientWidth
        ) {

          (document as any).querySelector(
            "#arrangeSheet #baseTable"
          ).style.margin = 'auto'
          let widthNys = appStore.HOSPITAL_ID == 'nys' ? 210 : 250;
          /** noscorll */
          (document as any).querySelector(
            "#arrangeSheet #baseTable"
          ).style.width =
            (sheetViewModal.dateList.length +
              appStore.hisAdapter({
                yczyy: () => 2,
                nys: () => isEdit ? 6 : 5,
                hj: () => 3,
                wh: () => 6,
                gxjb: () => 6,
                jmfy: () => 6,
                dghl: () => 6,
                fqfybjy: () => 5,
                gzsrm: () => 6,
                lcey: () => 2,
                dgxg: () => 2,
              })) *
            70 +
            widthNys +
            10 +
            "px";
          setSurplusWidth(false);
        } else {
          (document as any).querySelector("#arrangeSheet #baseTable") &&
            ((document as any).querySelector(
              "#arrangeSheet #baseTable"
            ).style.width = "auto");
          setSurplusWidth(isEdit ? 300 : 240);
        }
      }, 10);
    } catch (error) {
    }
    try {
      let remark = sheetViewModal.remark;
      (document as any).querySelector(
        ".remark-con.real textarea"
      ).value = remark;
    } catch (error) {
    }
  }, [sheetViewModal.notSheetTableData, surplusWidth, sheetViewModal.remark]);


  return (
    <Wrapper className={classNames({ isEdit })} id="arrangeSheet">
      <div className='module'>
        <div className='tebleHeader'>
          <div className='title'>全院未发布护士排班表</div>
          <div>日期：<span>2021-11-08</span> 至 <span>2021-11-14</span></div>
        </div>
        {sheetViewModal.notSheetTableData.length > 0 && (
          <BaseTable
            loading={sheetViewModal.tableLoading}
            surplusHeight={surplusHeight}
            surplusWidth={surplusWidth}
            columns={columns}
            // fixedFooter={true}
            dataSource={sheetViewModal.notSheetTableData}

            type={isEdit && !sheetViewModal.isPush ? ["diagRow"] : []}
          />
        )}
        {sheetViewModal.sheetTableData.length <= 0 && (
          <BaseTable
            loading={sheetViewModal.tableLoading}
            surplusHeight={surplusHeight}
            surplusWidth={surplusWidth}
            columns={columns}
            // fixedFooter={true}
            dataSource={sheetViewModal.sheetTableData}
            type={isEdit && !sheetViewModal.isPush ? ["diagRow"] : []}
          />
        )}
        <contextMenu.Component />
        <editEffectiveTimeModal.Component />
        <editVacationCountModal.Component />
        <addAccumulativeLeaveModal.Component />
        <addRemakeModal.Component />
      </div>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  .module{
    // margin: 10px;
    height: 100%;
    // background: #fff;
    .tebleHeader{
      text-align: center;
      padding: 30px 0 10px 0;
      .title{
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
  }
  background: #fff;
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .ant-input {
    border: 0;
    border-radius: 0;
    text-align: center;
    outline: 0;
    box-shadow: none !important;
    padding: 4px;
    height: 27px;
  }
  #baseTable {
    /* margin: 10px;
    border-radius: 5px; */
    .ant-table-body td,
    .ant-table-tbody td {
      padding: 0 2px !important;
      font-size: 12px !important;
      height: 25px !important;
    }
    td {
      word-break: break-all;
    }
    /* tr {
      cursor: auto !important;
    } */
    .ant-table-column-title {
      font-size: 12px !important;
    }
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
    .ant-table-row-hover > td {
      background: none;
    }
  }
  .ant-table-column-title {
    font-size: 13px !important;
    line-height: 1.3;
  }
  .ant-table-fixed-left {
    box-shadow: none;
    z-index: 0 !important;
  }
  /** fix table scroll bug */
  div.ant-table-body {
    background: #fafafa !important;
  }
  tbody.ant-table-tbody {
    background: #fff;
  }
  .ant-table-footer {
    border: 0 !important;
    background: #fafafa !important;
    z-index: 10;
    position: absolute;
    left: 0;
    right: 0;
  }
  .ant-table-body-outer::after {
    background: #fafafa !important;
  }
  &.isEdit {
    .ant-table-fixed-left {
      td {
        background: #f8f8f8 !important;
      }
    }
  }
  .remark-con {
    margin-top: -10px;
    width: 100%;
    textarea {
      resize: none;
    }
    .remark-title {
      margin-bottom: 5px;
      font-size: 12px;
    }
    &.space {
      position: relative;
      z-index: 2;
      opacity: 0;
      pointer-events: none;
      padding: 0 0 10px;
    }
    &.real {
      position: absolute;
      left: 0;
      z-index: 10;
      padding: 10px;
    }
  }
  &.isEdit {
    .ant-table-body {
      tr {
        cursor: auto !important;
        /* pointer-events: none; */
      }
    }
  }
  .nysCss {
    text-align: left !important;
    padding: 0 20px;
    box-sizing: border-box;
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
