import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "antd";
import BaseTable from "src/components/BaseTable";
import { ColumnProps, Input } from "src/vendors/antd";
import { createContextMenu } from "./ContextMenu";
import Cell from "./Cell";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import moment from "moment";
import { getWeekString, getWeekString2 } from "src/utils/date/week";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import createModal from "src/libs/createModal";
import EditEffectiveTimeModal from "../../modal/EditEffectiveTimeModal";
import EditVacationCountModal from "../../modal/EditVacationCountModal";
import EditVacationCountModal_wh from "../../modal/EditEffectiveTimeModal_wh";
import { ArrangeItem } from "../../types/Sheet";
import TotalCell from "./TotalCell";
import NightHourCell from "./NightHourCell";
import { appStore } from "src/stores";
import update from "immutability-helper";
import AddUpHourCell from "./AddUpHourCell";
import BalanceHour from "./BalanceHour";
import PublicHour from "./PublicHour";
import HolidayHour from "./HolidayHour";
import $ from "jquery";
import { cloneJson } from "src/utils/json/clone";
export interface Props {
  /** 编辑模式 */
  isEdit: boolean;
  surplusHeight: number;
}

export default observer(function ArrangeSheet(props: Props) {
  let { isEdit, surplusHeight } = props;
  const [surplusWidth, setSurplusWidth]: any = useState(false);
  let contextMenu = createContextMenu();
  /** 修改工时 or 加减班 */

  let editEffectiveTimeModal = createModal(
    appStore.HOSPITAL_ID == "wh"
      ? EditVacationCountModal_wh
      : EditEffectiveTimeModal
  );
  let editVacationCountModal = createModal(EditVacationCountModal);

  const nysGroupName = [
    appStore.HOSPITAL_ID == "nys"
      ? {
          title: "类别标题",
          dataIndex: "groupName",
          width: 70,
          fixed: "left",
          align: "center"
        }
      : {}
  ];

  let columns: any = [
    {
      title: "序号",
      render: (text: string, row: any, index: number) => index + 1,
      fixed: "left",
      width: 40,
      align: "center"
    },
    ...nysGroupName,
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
      title: appStore.hisAdapter({
        hj: () => "层级",
        nys: () => "类型"
      }),
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
    {
      title: "年限",
      dataIndex: "year",
      width: 70,
      fixed: "left",
      align: "center"
    },
    ...sheetViewModal.dateList.map((date, index) => {
      return {
        title: <Th date={date} />,
        width: 70,
        render(text: any, record: any) {
          return (
            <Cell
              contextMenu={contextMenu}
              editEffectiveTimeModal={editEffectiveTimeModal}
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
          <div>工时小计</div>
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

  /** 厚街特殊字段 */
  if (appStore.HOSPITAL_ID == "hj") {
    columns.push({
      title: (
        <div>
          <div>夜小时数</div>
          <div>（小时）</div>
        </div>
      ),
      width: 70,
      align: "center",
      render(text: string, record: any) {
        return <NightHourCell id={record.id} />;
      }
    });
  }

  /** 南医三特殊字段 */
  if (appStore.HOSPITAL_ID == "nys") {
    columns.push(
      {
        title: (
          <div>
            <div>本周</div>
            <div>积假</div>
          </div>
        ),
        width: 70,
        align: "center",
        dataIndex: "thisWeekHoliday",
        render: (text: string, record: any) => {
          return (
            <Input
              style={{ background: "#fff" }}
              disabled={!isEdit}
              defaultValue={text}
              onChange={(e: any) => {
                record.thisWeekHoliday = e.target.value;
              }}
            />
          );
        }
      },
      {
        title: (
          <div>
            <div>累积</div>
            <div>积假</div>
          </div>
        ),
        width: 70,
        align: "center",
        dataIndex: "totalHoliday",
        render: (text: string, record: any) => {
          return (
            <Input
              style={{ background: "#fff", color: "#000" }}
              disabled={!isEdit}
              defaultValue={text}
              onChange={(e: any) => {
                record.totalHoliday = e.target.value;
              }}
            />
          );
        }
      }
    );
  }

  /** 武汉特殊字段*/
  if (appStore.HOSPITAL_ID == "wh") {
    columns.push(
      {
        title: (
          <div>
            <div>夜小时数</div>
            <div>（小时）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <NightHourCell id={record.id} />;
        }
      },
      {
        title: (
          <div>
            <div>累计结余</div>
            <div>（小时）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <BalanceHour id={record.id} />;
        }
      },
      {
        title: (
          <div>
            <div>公休结余</div>
            <div>（天）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <PublicHour id={record.id} />;
        }
      },
      {
        title: (
          <div>
            <div>节休结余</div>
            <div>（天）</div>
          </div>
        ),
        width: 70,
        align: "center",
        render(text: string, record: any) {
          return <HolidayHour id={record.id} />;
        }
      }
    );
  }

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
    try {
      (document as any)
        .querySelector(".ant-table-body")!
        .addEventListener("scroll", (e: any) => {
          (document as any).querySelector(
            ".remark-con.real"
          )!.style.marginLeft = e.target.scrollLeft + "px";
        });
    } catch (error) {}
    try {
      setTimeout(() => {
        if (
          (document as any).querySelector("#arrangeSheet .ant-table-body") &&
          (document as any).querySelector("#arrangeSheet .ant-table-body")
            .scrollWidth ==
            (document as any).querySelector("#arrangeSheet .ant-table-body")
              .clientWidth
        ) {
          /** noscorll */
          (document as any).querySelector(
            "#arrangeSheet #baseTable"
          ).style.width =
            (sheetViewModal.dateList.length +
              appStore.hisAdapter({ nys: () => 5, hj: () => 3, wh: () => 6 })) *
              70 +
            250 +
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
    } catch (error) {}
    try {
      let remark = sheetViewModal.remark;
      (document as any).querySelector(
        ".remark-con.real textarea"
      ).value = remark;
    } catch (error) {}
  }, [sheetViewModal.sheetTableData, surplusWidth, sheetViewModal.remark]);

  return (
    <Wrapper className={classNames({ isEdit })} id="arrangeSheet">
      {sheetViewModal.sheetTableData.length > 0 && (
        <BaseTable
          loading={sheetViewModal.tableLoading}
          surplusHeight={surplusHeight}
          surplusWidth={surplusWidth}
          columns={columns}
          // fixedFooter={true}
          dataSource={sheetViewModal.sheetTableData}
          footer={() => {
            return (
              <React.Fragment>
                <div className={"remark-con real"}>
                  <div className="remark-title">
                    {appStore.HOSPITAL_ID == "nys" ? "备注：" : "排班备注："}
                  </div>
                  <Input.TextArea
                    readOnly={!isEdit}
                    defaultValue={sheetViewModal.remark}
                    autosize={!isEdit}
                    onBlur={e => {
                      sheetViewModal.remark = e.target.value;
                    }}
                    style={{ minHeight: 100 }}
                  />
                </div>
                <div className={"remark-con space"}>
                  <div className="remark-title">
                    {appStore.HOSPITAL_ID == "nys" ? "备注：" : "排班备注："}
                  </div>
                  <Input.TextArea
                    value={sheetViewModal.remark}
                    autosize={!isEdit}
                    style={{ minHeight: 100 }}
                  />
                </div>
              </React.Fragment>
            );
          }}
          type={isEdit && !sheetViewModal.isPush ? ["diagRow"] : []}
          moveRow={(dragIndex: number, hoverIndex: number) => {
            try {
              let pc = (document as any).querySelector(
                ".drop-over-downward,  .drop-over-upward"
              ).offsetParent.offsetParent.className;

              let sheetTableData = cloneJson(sheetViewModal.sheetTableData);
              let rightList = sheetTableData.map((item: any) => {
                return item.settingDtos;
              });
              let leftList = sheetTableData.map((item: any) => {
                delete item.settingDtos;
                return item;
              });

              if (pc == "ant-table-body") {
                /** min */
                rightList = update(rightList, {
                  $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, rightList[dragIndex]]
                  ]
                });
              } else if (pc == "ant-table-body-outer") {
                /** left */
                leftList = update(leftList, {
                  $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, leftList[dragIndex]]
                  ]
                });
              }

              let list = leftList.map((item: any, index: number) => {
                item.settingDtos = rightList[index].map((r: any) => ({
                  ...r,
                  userId: item.id
                }));
                return item;
              });
              sheetViewModal.sheetTableData = list;
              sheetViewModal.allCell = sheetViewModal.getAllCell(true);
            } catch (error) {}
          }}
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
          moveRow={(dragIndex: number, hoverIndex: number) => {
            try {
              let pc = (document as any).querySelector(
                ".drop-over-downward,  .drop-over-upward"
              ).offsetParent.offsetParent.className;

              let sheetTableData = cloneJson(sheetViewModal.sheetTableData);
              let rightList = sheetTableData.map((item: any) => {
                return item.settingDtos;
              });
              let leftList = sheetTableData.map((item: any) => {
                delete item.settingDtos;
                return item;
              });

              if (pc == "ant-table-body") {
                /** min */
                rightList = update(rightList, {
                  $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, rightList[dragIndex]]
                  ]
                });
              } else if (pc == "ant-table-body-outer") {
                /** left */
                leftList = update(leftList, {
                  $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, leftList[dragIndex]]
                  ]
                });
              }

              let list = leftList.map((item: any, index: number) => {
                item.settingDtos = rightList[index].map((r: any) => ({
                  ...r,
                  userId: item.id
                }));
                return item;
              });
              sheetViewModal.sheetTableData = list;
              sheetViewModal.allCell = sheetViewModal.getAllCell(true);
            } catch (error) {}
          }}
        />
      )}
      <contextMenu.Component />
      <editEffectiveTimeModal.Component />
      <editVacationCountModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
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
