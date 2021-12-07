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
import { appStore, authStore } from "src/stores";
import { resetArrangeCount } from "../../page/EditArrangePage/components/FlightMenu";
import moment from "moment";

export interface Props {
  contextMenu: ContextMenu;
  // editEffectiveTimeModal: any;
  // addAccumulativeLeaveModal: any; // 添加积假
  // addRemakeModal: any; // 添加备注
  // editVacationCountModal: any;
  dataSource: any;
  // index: number;
  isEdit: boolean;
}

export default observer(function Cell(props: Props) {
  let {
    contextMenu,
    dataSource,
    // editEffectiveTimeModal,
    // addAccumulativeLeaveModal, // 添加积假
    // addRemakeModal, // 添加备注
    // editVacationCountModal,
    isEdit
  } = props;
  const [hoverShow, setHoverShow] = useState(false);
  const [icon, setIcon] = useState(JSON.parse(JSON.stringify({ ...dataSource })));

  // console.log(dataSource.settingDtos, dataSource.settingDtos[index], 111)
  let cellObj = dataSource.settingDtos[0]
  // let cellConfig = sheetViewModal.analyseCell(cellObj);

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let target;
    if (!isEdit) return;
    event.preventDefault();
    // if (cellConfig.isTwoDaysAgo) return;
    if ((event as any).target.tagName !== "DIV") {
      target = (event as any).target.parentNode;
    } else {
      target = (event as any).target;
    }
    // sheetViewModal.selectedCell = cellObj;
    let hasArrange = !!(
      sheetViewModal.selectedCell && sheetViewModal.selectedCell.rangeName
    );

    let { left: x, top: y, width, height } = target.getBoundingClientRect();
    // console.log(event.target, x, y, width, height, 'width, height ')
    /** 公休节休不可编辑 */

    // let disableByName =
    //   sheetViewModal.selectedCell.rangeName == "公休" ||
    //   sheetViewModal.selectedCell.rangeName == "节休";
    contextMenu.show(
      [
        ...sheetViewModal.schSymbolList.map(item => ({
          type: "text",
          dataSource: item,
          label: (
            <div className="symbol-con">
              <div className="symbol-icon" style={{ color: item.symbolColor || '' }}>{item.symbol}</div>
              <div className="symbol-aside">{item.detail}</div>
            </div>
          ),
          onClick: (item: any) => {

            dataSource.empName = dataSource.empName + item.dataSource.symbol
            // setIcon({ ...dataSource, empName: item.dataSource.symbol + dataSource.empName })
            // shi = {...icon}
            // setIcon(item.dataSource.symbol)
            // sheetViewModal.selectedCell.addSymbols = [
            //   {
            //     symbol: item.dataSource.symbol,
            //     detail: item.dataSource.detail,
            //     symbolColor: item.dataSource.symbolColor
            //   }
            // ];
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
            // sheetViewModal.selectedCell.addSymbols = null;
            dataSource.empName = icon.empName
          }
        }
        // {
        //   type: "line"
        // }
      ],
      {
        x: x + width,
        y: y + height / 2
      }
    );
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isEdit) return;
    // if (cellConfig.isTwoDaysAgo) return;
    /** 判断是否按下 ctrl */
    if (e.ctrlKey) {
      if (
        sheetViewModal.selectedCell.rangeName &&
        !sheetViewModal.copyCellList.includes(sheetViewModal.selectedCell)
      ) {
        sheetViewModal.copyCellList.push(sheetViewModal.selectedCell);
      }
      // if (cellObj.rangeName && !sheetViewModal.copyCellList.includes(cellObj)) {
      //   sheetViewModal.copyCellList.push(cellObj);
      // }
    } else {
      sheetViewModal.copyCellList = [];
    }



  };
  const onVisibleChange = (visible: boolean) => {
    // if (cellConfig.isAddWordTime || cellConfig.isReduceWordTime || cellConfig.isJiJiaTime) {
    //   return setHoverShow(visible);
    // } else {
    //   return setHoverShow(false);
    // }
  };
  const content = (
    <div>
      <div>
        备注:
        {/* {cellObj.detail && <span>{cellObj.detail || ""}</span>}
        {!cellObj.detail && <span style={{ color: "#999" }}>无</span>} */}
      </div>
    </div>
  );



  return (
    <Popover
      content={content}
      trigger="hover"
      placement="rightTop"
      visible={hoverShow}
      onVisibleChange={onVisibleChange}
    >
      <Wrapper
        onContextMenu={onContextMenu}
        onClick={onClick}
      >
        {/* <div>{sheetViewModal.selectedCell?.addSymbols?.symbol}</div> */}
        {/* {formatCell(cellObj, isEdit)} */}
        <div>{dataSource.empName}</div>
        {/* <div>
          {
            sheetViewModal.selectedCell.addSymbols.symbol = [
              {
                symbol: item.dataSource.symbol,
                detail: item.dataSource.detail,
                symbolColor: item.dataSource.symbolColor
              }
            ];
          }
        </div> */}
        {/* <div>{sheetViewModal.selectedCell.addSymbols}</div> */}
      </Wrapper>
    </Popover>
  );
});

function formatCell(cellObj: ArrangeItem, isEdit = true) {
  // console.log(cellObj.addSymbols, isEdit, 76)
  const Con = appStore.hisMatch({
    map: {
      // 谢岗： 除了黑色和灰色 其它字体都加粗
      'dgxg': styled.span<{ color: string | undefined }>`
        color: ${p => p.color};
        font-weight: ${p => ['#333333', '#999999'].includes(p.color || '') ? 'unset' : 'bold'}; 
      `,
      default: styled.span<{ color: string | undefined }>`
        color: ${p => p.color}; 
      `
    }
  })
  const isHidden = appStore.hisMatch({
    map: {
      // 江门妇幼 普通用户 && cellObj.status === "" 或 "0"
      'jmfy': ['', '0'].includes(cellObj.status) && !authStore.isNotANormalNurse,
    }
  })
  if (isHidden && !isEdit) {
    return (
      <Con color={cellObj.nameColor} />
    )
  }
  const symbol: any = (cellObj.addSymbols && cellObj.addSymbols[0]) || {}
  if (cellObj) {
    return (
      <React.Fragment>
        <Con color={cellObj.nameColor}>
          <span style={{ color: symbol.symbolColor || "#333" }}>
            {symbol.symbol || ""}
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
        {/* 聊城二院 备注功能 */}
        {(cellObj.schRemarks && cellObj.schRemarks.length) ? (
          <span>({cellObj.schRemarks[0].remark})</span>
        ) : ''}
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
    &.jijia {
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
