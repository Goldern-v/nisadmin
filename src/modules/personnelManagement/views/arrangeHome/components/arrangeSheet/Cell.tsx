import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { ContextMenu } from "../../types/contextMenu";
import { observer, toJS } from "src/vendors/mobx-react-lite";
import { sheetViewModal } from "../../viewModal/SheetViewModal";
import { dateDiff } from "src/utils/date/dateDiff";
import monnet from "src/vendors/moment";
import classNames from "classnames";
import { type } from "os";
import { SymbolItem, ArrangeItem } from "../../types/Sheet";
import {
  getAddArrangeMenuList,
  copyRowClick,
  cleanCell,
  cleanCellList,
  copyCellClick
} from "./cellClickEvent";
import { message, Popover } from "src/vendors/antd";
import { cloneJson } from "src/utils/json/clone";
import { appStore } from "src/stores";
import { resetArrangeCount } from "../../page/EditArrangePage/components/FlightMenu";
import moment from "moment";
export interface Props {
  contextMenu: ContextMenu;
  editEffectiveTimeModal: any;
  editVacationCountModal: any;
  dataSource: any;
  index: number;
  isEdit: boolean;
}

export default observer(function Cell(props: Props) {
  let {
    contextMenu,
    dataSource,
    index,
    editEffectiveTimeModal,
    editVacationCountModal,
    isEdit
  } = props;

  const [hoverShow, setHoverShow] = useState(false);

  let cellObj =
    index < dataSource.settingDtos.length ? dataSource.settingDtos[index] : {};
  let cellConfig = sheetViewModal.analyseCell(cellObj);

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let target;
    if (!isEdit) return;
    event.preventDefault();
    if (cellConfig.isTwoDaysAgo) return;
    if ((event as any).target.tagName !== "DIV") {
      target = (event as any).target.parentNode;
    } else {
      target = (event as any).target;
    }
    sheetViewModal.selectedCell = cellObj;
    let hasArrange = !!(
      sheetViewModal.selectedCell && sheetViewModal.selectedCell.rangeName
    );

    let { left: x, top: y, width, height } = target.getBoundingClientRect();
    // console.log(event.target, x, y, width, height, 'width, height ')
    /** 公休节休不可编辑 */

    let disableByName =
      sheetViewModal.selectedCell.rangeName == "公休" ||
      sheetViewModal.selectedCell.rangeName == "节休";

    contextMenu.show(
      [
        {
          icon: require("../../images/追加排班.png"),
          disabled:
            (sheetViewModal.selectedCell.rangeName &&
              sheetViewModal.selectedCell.settings &&
              sheetViewModal.selectedCell.settings.length) ||
            disableByName,
          label: "追加排班",
          type: "text",
          children: getAddArrangeMenuList(
            sheetViewModal.arrangeMenu,
            sheetViewModal.selectedCell
          )
        },
        {
          type: "line"
        },
        appStore.HOSPITAL_ID == "wh"
          ? {
              icon: require("../../images/修改工时.png"),
              label: "加/减班",
              type: "text",
              disabled: disableByName,
              onClick: () => {
                editEffectiveTimeModal.show({
                  data: sheetViewModal.selectedCell,
                  onOkCallBack(data: any) {
                    console.log(data, "datadata");
                    sheetViewModal.selectedCell.detail = data.detail;

                    if (data.statusType == "1") {
                      /** 加班 */
                      sheetViewModal.selectedCell.effectiveTime = Number(
                        Number(data.effectiveTime) +
                          Number(sheetViewModal.selectedCell.effectiveTimeOld)
                      );
                    } else if (data.statusType == "2") {
                      /** 减班 */
                      sheetViewModal.selectedCell.effectiveTime =
                        Number(sheetViewModal.selectedCell.effectiveTimeOld) -
                        Number(data.effectiveTime);
                    }
                    sheetViewModal.selectedCell.schAddOrSubs = [
                      {
                        startDate: data.startDate,
                        endDate: data.endDate,
                        statusType: data.statusType,
                        hour: Number(data.effectiveTime),
                        settingNightHour: data.settingNightHour,
                        settingMorningHour: data.settingMorningHour
                      }
                    ];
                  }
                });
              }
            }
          : {
              icon: require("../../images/修改工时.png"),
              label: "修改工时",
              type: "text",
              disabled: disableByName,
              onClick: () => {
                editEffectiveTimeModal.show({
                  data: sheetViewModal.selectedCell,
                  onOkCallBack(value: any) {
                    sheetViewModal.selectedCell.effectiveTime =
                      value.effectiveTime;
                    sheetViewModal.selectedCell.detail = value.detail;
                    // setCellConfig(sheetViewModal.analyseCell(cellObj))
                  }
                });
              }
            },
        {
          icon: require("../../images/休假计数.png"),
          disabled: !sheetViewModal.countArrangeNameList.includes(
            sheetViewModal.selectedCell.rangeName
          ),
          label: "休假计数",
          type: "text",
          onClick: () => {
            if (!sheetViewModal.selectedCell.rangeName) return;
            if (!sheetViewModal.selectedCell.userId) return;
            let [user, list] = sheetViewModal.getUser(
              sheetViewModal.selectedCell.userId
            );
            editVacationCountModal.show({
              baseNum:
                user.countArrangeBaseIndexObj[
                  sheetViewModal.selectedCell!.rangeName
                ],
              data: sheetViewModal.selectedCell,
              onOkCallBack(num: any) {
                if (!sheetViewModal.selectedCell.userId) return;
                if (user && sheetViewModal.selectedCell.rangeName) {
                  user.countArrangeBaseIndexObj[
                    sheetViewModal.selectedCell!.rangeName
                  ] = num - 1;
                  resetArrangeCount(
                    sheetViewModal.selectedCell.userId,
                    sheetViewModal.selectedCell!.rangeName
                  );
                }
              }
            });
          }
        },
        {
          type: "line"
        },
        {
          icon: require("../../images/符号.png"),
          label: "符号",
          type: "text",
          disabled: !hasArrange,
          children: [
            ...sheetViewModal.schSymbolList.map(item => ({
              type: "text",
              dataSource: item,
              label: (
                <div className="symbol-con">
                  <div className="symbol-icon">{item.symbol}</div>
                  <div className="symbol-aside">{item.detail}</div>
                </div>
              ),
              onClick: (item: any) => {
                sheetViewModal.selectedCell.addSymbols = [
                  {
                    symbol: item.dataSource.symbol,
                    detail: item.dataSource.detail
                  }
                ];
              }
            })),
            {
              type: "line"
            },
            {
              icon: require("../../images/删除.png"),
              type: "text",
              label: "清除符号",
              onClick: (item: any) => {
                sheetViewModal.selectedCell.addSymbols = null;
              }
            }
          ]
        },
        {
          type: "line"
        },
        {
          icon: require("../../images/复制行.png"),
          label: "复制格",
          type: "text",
          onClick() {
            if (sheetViewModal.copyCellList.length) {
              /** 多格子 */
              sheetViewModal._copyCellList = [...sheetViewModal.copyCellList];
            } else {
              sheetViewModal.copyCell = sheetViewModal.selectedCell;
              sheetViewModal._copyCellList = [];
            }
            message.success("复制格成功");
          }
        },
        {
          icon: require("../../images/粘贴行.png"),
          label: "粘贴格",
          type: "text",
          onClick() {
            /** 存在多个格子选中的情况下，优先复制多个格子 */
            if (
              sheetViewModal._copyCellList.length &&
              sheetViewModal.selectedCell.userId
            ) {
              const [user, list] = sheetViewModal.getUser(
                sheetViewModal.selectedCell.userId
              );
              if (user) {
                let index = list.findIndex(
                  (item: any) => item == sheetViewModal.selectedCell
                );
                /** 剩余的格子 */
                let restList = list.slice(index);

                let length = Math.min(
                  restList.length,
                  sheetViewModal._copyCellList.length
                );

                for (let i = 0; i < length; i++) {
                  copyCellClick(restList[i], sheetViewModal._copyCellList[i]);
                }
                sheetViewModal.selectedCell = {};
              }
            } else {
              copyCellClick(
                sheetViewModal.selectedCell,
                sheetViewModal.copyCell
              );
            }
          }
        },

        {
          icon: require("../../images/复制行.png"),
          label: "复制行",
          type: "text",
          onClick() {
            sheetViewModal.copyRow = sheetViewModal.getSelectCellList(true);
            message.success("复制行成功");
          }
        },
        {
          icon: require("../../images/粘贴行.png"),
          label: "粘贴行",
          type: "text",
          onClick() {
            let list = sheetViewModal.getSelectCellList(true);
            let copyRow = sheetViewModal.copyRow;
            copyRowClick(list, copyRow, false);
          }
        },
        {
          icon: require("../../images/剪切行.png"),
          label: "剪切行",
          type: "text",
          onClick() {
            let list = sheetViewModal.getSelectCellList(true);
            let copyRow = sheetViewModal.copyRow;
            copyRowClick(list, copyRow, true);
          }
        },
        {
          icon: require("../../images/复制行.png"),
          label: "复制整周",
          type: "text",
          onClick() {
            // sheetViewModal.copyWeekRow = sheetViewModal.getSelectWeekList(true);
            let copyWeekNum = moment(
              sheetViewModal.selectedCell.workDate
            ).week();

            let copyWeekData = sheetViewModal
              .getAllCell(true)
              .filter(item => moment(item.workDate).week() == copyWeekNum);

            sheetViewModal.copyWeekData = cloneJson(copyWeekData);

            message.success("复制周成功");
          }
        },
        {
          icon: require("../../images/粘贴行.png"),
          label: "粘贴整周",
          type: "text",
          onClick() {
            // let list = sheetViewModal.getSelectWeekList(true);
            // let copyWeekRow = sheetViewModal.copyWeekRow;
            // copyRowClick(list, copyWeekRow, false);
            let currentWeekNum = moment(
              sheetViewModal.selectedCell.workDate
            ).week();

            sheetViewModal.copyWeek(currentWeekNum);
          }
        },
        {
          type: "line"
        },
        {
          icon: require("../../images/删除.png"),
          label: "清除格子",
          type: "text",
          onClick() {
            cleanCell(sheetViewModal.selectedCell);
          }
        },
        {
          icon: require("../../images/删除.png"),
          label: "清除行",
          type: "text",
          onClick() {
            let list = sheetViewModal.getSelectCellList(true);
            cleanCellList(list);
          }
        }
      ],
      {
        x: x + width,
        y: y + height / 2
      }
    );
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isEdit) return;
    if (cellConfig.isTwoDaysAgo) return;
    /** 判断是否按下 ctrl */
    if (e.ctrlKey) {
      if (
        sheetViewModal.selectedCell.rangeName &&
        !sheetViewModal.copyCellList.includes(sheetViewModal.selectedCell)
      ) {
        sheetViewModal.copyCellList.push(sheetViewModal.selectedCell);
      }
      if (cellObj.rangeName && !sheetViewModal.copyCellList.includes(cellObj)) {
        sheetViewModal.copyCellList.push(cellObj);
      }
    } else {
      sheetViewModal.copyCellList = [];
    }
    sheetViewModal.selectedCell = cellObj;
  };
  const onVisibleChange = (visible: boolean) => {
    if (cellConfig.isAddWordTime || cellConfig.isReduceWordTime) {
      return setHoverShow(visible);
    } else {
      return setHoverShow(false);
    }
  };
  const content = (
    <div>
      <div>
        备注:
        {cellObj.detail && <span>{cellObj.detail || ""}</span>}
        {!cellObj.detail && <span style={{ color: "#999" }}>无</span>}
      </div>
    </div>
  );

  const title = appStore.hisAdapter({
    hj: () => {
      return (
        (cellObj.effectiveTimeOld > cellObj.effectiveTime ? "减少" : "增加") +
        "了" +
        Math.abs(cellObj.effectiveTime - cellObj.effectiveTimeOld) +
        "工时"
      );
    },
    wh: () => {
      return (
        (cellObj.schAddOrSubs &&
        cellObj.schAddOrSubs.length &&
        cellObj.schAddOrSubs[0].statusType == "1"
          ? "加班"
          : "减班") +
        ":" +
        (cellObj.schAddOrSubs && cellObj.schAddOrSubs.length
          ? cellObj.schAddOrSubs[0].hour
          : 0) +
        "h" +
        "，" +
        `现:${cellObj.effectiveTime || 0}h，` +
        `原:${cellObj.effectiveTimeOld || 0}h，` +
        `白:${(cellObj.schAddOrSubs &&
          cellObj.schAddOrSubs.length &&
          cellObj.schAddOrSubs[0].settingMorningHour) ||
          0}h，` +
        `夜:${(cellObj.schAddOrSubs &&
          cellObj.schAddOrSubs.length &&
          cellObj.schAddOrSubs[0].settingNightHour) ||
          0}h`
      );
    }
  });

  return (
    <Popover
      content={content}
      title={title}
      trigger="hover"
      placement="rightTop"
      visible={hoverShow}
      onVisibleChange={onVisibleChange}
    >
      <Wrapper
        onContextMenu={onContextMenu}
        onClick={onClick}
        className={classNames(cellConfig)}
      >
        {appStore.isDev && (
          <span style={{ display: "none" }}>{JSON.stringify(cellConfig)}</span>
        )}
        {cellConfig.isAddWordTime ? <div className="sj add" /> : ""}
        {cellConfig.isReduceWordTime ? <div className="sj reduce" /> : ""}
        {cellConfig.isExpectedScheduling ? (
          <img
            className="expect"
            src={require("../../images/期望排班.png")}
            alt=""
          />
        ) : (
          ""
        )}
        {formatCell(cellObj)}
        <span style={{ display: "none" }}>{JSON.stringify(cellObj)}</span>
      </Wrapper>
    </Popover>
  );
});
function formatCell(cellObj: ArrangeItem) {
  const Con = styled.span<{ color: string | undefined }>`
    color: ${p => p.color};
  `;
  if (cellObj) {
    return (
      <React.Fragment>
        <Con color={cellObj.nameColor}>
          <span style={{ color: "#333" }}>
            {(cellObj.addSymbols &&
              cellObj.addSymbols.length &&
              cellObj.addSymbols[0]!.symbol) ||
              ""}
          </span>
          {sheetViewModal.countArrangeNameList.includes(cellObj.rangeName)
            ? (cellObj.rangeName || "") + (cellObj.rangeNameCode || "")
            : cellObj.rangeName}
        </Con>
        {(cellObj.settings && cellObj.settings.length && (
          <React.Fragment>
            <span>/</span>
            <Con
              color={cellObj.settings.length && cellObj.settings[0].nameColor}
            >
              {/* {cellObj.settings[0].addSymbols} */}
              {cellObj.settings.length && cellObj.settings[0].rangeName}
            </Con>
          </React.Fragment>
        )) ||
          ""}
      </React.Fragment>
    );
  }
  return "";
}

const Wrapper = styled.div`
  height: calc(100% + 2px);
  width: calc(100% + 6px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -1px -3px;
  position: relative;
  word-break: break-all;
  &.isSelected {
    background: #ffe36c;
    cursor: pointer;
  }
  &.isReduceWordTime {
    cursor: pointer;
  }
  &.isAddWordTime {
    cursor: pointer;
  }
  &.isTwoDaysAgo {
    background: #f8f8f8;
    height: 100%;
    width: auto;
    margin: 0 -2px;
  }
  .sj {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-width: 10px 10px 0 0;
    border-style: solid;
    border-color: transparent transparent;
    &.add {
      border-color: #e55b00 transparent !important;
    }
    &.reduce {
      border-color: #53c5ac transparent !important;
    }
  }
  .expect {
    position: absolute;
    top: 1px;
    left: 1px;
    height: 10px;
    width: 10px;
  }
`;
