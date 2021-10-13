import windowHeight from "src/hooks/windowHeight";
import windowWidth from "src/hooks/windowWidth";
import styled from "styled-components";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Table, Pagination } from "antd";
import { TableProps } from "antd/lib/table";
import { DragDropContext } from "react-dnd";

import { components } from "./diagTableUtils";
import $ from "jquery";
import HTML5Backend from "react-dnd-html5-backend";
import { observer } from "src/vendors/mobx-react-lite";
export interface Props extends TableProps<any> {
  // style?: any
  wrapperStyle?: any;
  tableStyle?: any;
  type?: any;
  /** 空行数量，默认10 */
  spaceRowNumber?: any;
  /**多余的高度 */
  surplusHeight?: number;
  /** 多余的宽度 */
  surplusWidth?: number;
  tip?: string;
  moveRow?: (dragIndex: number, hoverIndex: number) => void;
  /** 底部是否固定 */
  fixedFooter?: boolean;
  /** 不水平滚动 */
  nohorizontalScroll?: boolean;
  /** 是否使用外置分页器 */
  useOuterPagination?: boolean;
}

export interface PageOptions {
  pageIndex: number;
  pageSize?: number;
}

let scrollTop = 0;
export default observer(function BaseTable(props: Props) {
  let wih = windowHeight();
  let wiw = windowWidth();
  let tableRef: any = React.createRef();
  let option: any = Object.assign(
    {
      bordered: true,
      pagination: false,
      size: "small"
    },
    props
  );
  // console.log("props-----"+props);
  // console.log("option-----"+option);
  // console.log("option.column-----"+option.columns);
  option.columns =
    option.columns &&
    option.columns.map((item: any, index: number) => {
      return Object.assign(item, {
        key: index,
        dataIndex: item.dataIndex || "dataIndex" + index
      });
    });
  option.dataSource =
    option.dataSource &&
    option.dataSource.map((item: any, index: number) => {
      return Object.assign(item, { key: "key" + index });
    });

  if (option.surplusHeight) {
    option.scroll = { y: wih - option.surplusHeight };
  }
  if (props.pagination) {
    let _total = 0;
    try {
      if ((props.dataSource as any).length) {
        _total = (props.pagination as any).total;
      }
    } catch (error) {
    }
    const showTotal = props.pagination.showTotal || (() => `共 ${_total} 条`)
    let pagination = {
      showTotal: showTotal,
      showSizeChanger: true,
      showSizeshowQuickJumperChanger: true,
      pageSizeOptions: ["10", "20", "30", "40", "50"]
    };
    Object.assign(pagination, props.pagination);
    Object.assign(props.pagination, pagination);
    if (props.pagination.total == 0) {
      props.pagination.total = 1;
    }
  }
  if (props.surplusWidth && !props.nohorizontalScroll) {
    option.scroll = option.scroll
      ? { ...option.scroll, ...{ x: wiw - props.surplusWidth } }
      : { x: wiw - props.surplusWidth };
  }
  try {
    if (option.type && option.type.includes("spaceRow")) {
      /** 根据表格高度计算空白行 */
      let defaultSpaceRow = 10;
      if (option.surplusHeight) {
        defaultSpaceRow = (wih - option.surplusHeight) / 30 - 1;
      }

      /** 设置空行 */
      let spaceRowNumber = props.spaceRowNumber || defaultSpaceRow;
      if (option.dataSource.length < spaceRowNumber) {
        while (option.dataSource.length < spaceRowNumber) {
          option.dataSource.push({
            [option.rowKey || "key"]: option.dataSource.length
          });
        }
      }
    }
    if (option.type && option.type.includes("diagRow")) {
      /** 拖拽 */
      option.components = components;
      option.onRow = (record: any, index: any) => ({
        index,
        moveRow: option.moveRow
      });
    }
    if (option.type && option.type.includes("index")) {
      /** 自动序号 */
      let current = (option.pagination && option.pagination.current) || 0;
      let pageSize = (option.pagination && option.pagination.pageSize) || 0;
      let render = ((current: any, pageSize: any) => {
        return (text: any, record: any, index: number) => {
          if (current && pageSize) {
            return (current - 1) * pageSize + index + 1;
          } else {
            return index + 1;
          }
        };
      })(current, pageSize);

      if (option.columns && option.columns[0]) {
        if (option.columns[0].title == "序号") {
          option.columns[0] = {
            title: "序号",
            dataIndex: "0",
            key: "0",
            render: render,
            align: "center",
            width: 50
          };
        } else if (option.columns[0].title != "序号") {
          option.columns.unshift({
            title: "序号",
            dataIndex: "0",
            key: "0",
            render: render,
            align: "center",
            width: 50
          });
        }
        option.type.includes("fixedIndex") &&
          !props.nohorizontalScroll &&
          (option.columns[0].fixed = "left");
      }
    }

    // if (option.type.includes('fixedWidth')) {
    //   /** 设置宽度 */
    //   let totalWidth = option.columns.reduce((total: number, item: any) => total + (Number(item.width) || 0), 0)
    //   if (!option.style) option.style = {}
    //   option.style.width = totalWidth
    // }
  } catch (error) {
    console.log(error, "表格异常");
  }

  let doCols: any = option.columns.filter(
    (item: any) => item.title == "操作" || item.title == "附件"
  );

  if (!!doCols.length) {
    doCols.forEach((doCol: any) => {
      let callback = doCol.render;
      doCol.render = (text: any, row: any, index: any) => {
        if (Object.keys(row).length <= 1) return <span />;
        return callback && callback(text, row, index);
      };
    });
  }

  useLayoutEffect(() => {
    try {
      setTimeout(() => {
        if (option.tip !== undefined && tableRef.current) {
          let tip = tableRef!.current!.querySelector("#tip");
          if (tip) {
            tip.innerHTML = option.tip;
          } else {
            tip = document.createElement("div");
            tip.id = "tip";
            tip.innerHTML = option.tip;
            try {
              $(tableRef!.current!.querySelector(".ant-table-body")).append(
                $(tip)
              );
            } catch (error) {
            }
          }
        }
      }, 0);
      setTimeout(() => {
        if (option.tip !== undefined && tableRef.current) {
          let tip = tableRef!.current!.querySelector("#tip");
          if (tip) {
            tip.innerHTML = option.tip;
          } else {
            tip = document.createElement("div");
            tip.id = "tip";
            tip.innerHTML = option.tip;
            try {
              $(tableRef!.current!.querySelector(".ant-table-body")).append(
                $(tip)
              );
            } catch (error) {
            }
          }
        }
      }, 100);
    } catch (error) {
    }
    try {
      setTimeout(() => {
        if (tableRef.current && !option.fixedFooter) {
          let footer = tableRef!.current!.querySelector(".ant-table-footer");
          if (footer) {
            $(tableRef!.current!.querySelector(".ant-table-body")).append(
              $(footer)
            );
          }
        }
      }, 0);
      setTimeout(() => {
        if (tableRef.current && !option.fixedFooter) {
          let footer = tableRef!.current!.querySelector(".ant-table-footer");
          if (footer) {
            $(tableRef!.current!.querySelector(".ant-table-body")).append(
              $(footer)
            );
          }
        }
      }, 100);
    } catch (error) {
    }
    try {
      setTimeout(() => {
        if (tableRef.current && option.surplusHeight) {
          let contentHeight = wih - option.surplusHeight + "px";
          let placeholder = tableRef!.current!.querySelector(
            ".ant-table-placeholder"
          );
          let body = tableRef!.current!.querySelector(".ant-table-body");
          if (placeholder) {
            placeholder.style.height = contentHeight;
            if (body) {
              body.style.height = 0;
            }
          } else {
            if (body) {
              body.style.height = contentHeight;
            }
          }
        }
      }, 0);
      setTimeout(() => {
        if (tableRef.current && option.surplusHeight) {
          let contentHeight = wih - option.surplusHeight + "px";
          let placeholder = tableRef!.current!.querySelector(
            ".ant-table-placeholder"
          );
          let body = tableRef!.current!.querySelector(".ant-table-body");
          if (placeholder) {
            placeholder.style.height = contentHeight;
            if (body) {
              body.style.height = 0;
            }
          } else {
            if (body) {
              body.style.height = contentHeight;
            }
          }
        }
      }, 100);
    } catch (error) {
    }
    setTimeout(() => {
      try {
        tableRef!.current!.querySelector(".ant-table-body").onscroll = (
          e: any
        ) => {
          scrollTop = e.target.scrollTop;
        };
        // scrollTop !== 0 && (tableRef!.current!.querySelector('.ant-table-body')!.scrollTop = scrollTop)
      } catch (error) {
      }
    }, 0);
    try {
      tableRef!.current!.querySelector(
        ".ant-table-body"
      )!.scrollTop = scrollTop;
    } catch (error) {
    }
  });

  useEffect(() => {
    scrollTop = 0;
  }, [option.pagination && option.pagination.current]);


  //分离分页组件 去除table条目限制
  let pageOptions = option.pagination ?
    { ...option.pagination, size: 'small' } : null
  let tableOptions = { ...option }
  tableOptions.pagination = false

  let TableComponent =
    option.type && option.type.includes("diagRow")
      ? DragDropContext(HTML5Backend)(Table)
      : Table;

  return (
    <Wrapper style={option.wrapperStyle || {}} ref={tableRef} id="baseTable">
      {props.useOuterPagination && <React.Fragment>
        <TableComponent {...tableOptions} />
        {pageOptions && <Pagination
          {...pageOptions}
          style={{
            float: 'right',
            marginTop: '15px'
          }} />}
      </React.Fragment>}
      {!props.useOuterPagination && <TableComponent {...option} />}
    </Wrapper>
  );
});
const Wrapper = styled.div`
  &#baseTable {
    background: rgba(255, 255, 255, 1);
    /* border: 1px solid rgba(219, 224, 228, 1); */
    /* padding: 20px 30px; */
    padding: 15px 15px;
    box-sizing: content-box;
    &::after{
      content:".";
      display:block;
      height:0;
      clear:both;
      visibility:hidden;
    }
    table {
      table-layout: fixed;
      width: 100%;
    }
    .ant-table-header-column {
      width: 100%;
      text-align: center;
    }
    .ant-table-wrapper {
      th {
        box-sizing: border-box;
        height: 36px !important;
        font-size: 13px !important;
        font-weight: bold;
        padding: 0 !important;
      }
      td {
        box-sizing: border-box;
        padding: 0 8px;
        font-size: 13px !important;
        /* padding: 0 !important; */
        /* font-weight: 600; */
        height: ${p => p.theme.$tableRowHeight} !important;
      }
      /* 补充th下降的高度 */
      .ant-table-align-center {
        /* padding: 8px 8px 14px 8px !important; */
      }

      /* 操作字体大小设置 */
      /* .kicUge span{
        font-size: 13px !important;
      }
      .nbXOP {
        font-size: 13px !important;
      } */
    }

    .ant-table-small > .ant-table-content > .ant-table-body {
      margin: 0 !important;
    }
    .ant-table-body {
      /* overflow: auto !important; */
      overflow-y: scroll !important;
      overflow-x: auto !important;
      /* border-bottom: 1px solid #e8e8e8; */
      border-radius: 2px;
      & tr :last-child {
        /* border-bottom: 0 !important; */
      }
      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
      ::-webkit-scrollbar{
        width: 0px;
        height: 7px;
        background-color: #F5F5F5;
      }
    }
    .ant-table-footer {
      border-bottom: 0 !important;
    }
    .ant-table-thead {
      background: rgba(242, 244, 245, 1);
    }
    /* tbody tr:nth-of-type(2n) {
    background: rgba(242, 244, 245, 1);
  } */

    .ant-table-placeholder {
      height: ${(p: any) => `calc(100vh - ${p.surplusHeight - 0}px)`};
      display: flex;
      justify-content: center;
      align-items: center;
    }

    *::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #eaeaea;
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
    }

    /* .container::-webkit-scrollbar {
      display: none;
  } */

    .ant-table-header {
      margin-bottom: -8px !important;
      *::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: rgb(242, 244, 245);
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(242, 244, 245);
        border-radius: 0;
        background-color: rgb(242, 244, 245);
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 0px;
        -webkit-box-shadow: inset 0 0 6px rgb(242, 244, 245);
        background-color: rgb(242, 244, 245);
      }
    }
    #tip {
      font-size: 12px;
      margin: 5px;
    }
    .ant-table-row {
      border-bottom: 1px solid #e8e8e8;
    }
    .ant-table-footer {
      padding: 10px;
    }

    /** 拖拽 */
    tr.drop-over-downward td {
      border-bottom: 2px dashed ${(p: any) => p.theme.$mtc};
    }

    tr.drop-over-upward td {
      border-top: 2px dashed ${(p: any) => p.theme.$mtc};
    }
    .ant-table-pagination.ant-pagination {
      margin: 11px 0 5px;
    }
    /* .ant-table-footer {
      display: none;
    }
    .ant-table-body .ant-table-footer {
      display: block;
    } */

    .ant-table-fixed-left,
    .ant-table-fixed-right {
      bottom: 8px;
      z-index: 10;
      .ant-table-header {
        /* margin-bottom: 0 !important; */
        margin-bottom: 9px !important;
      }
      table {
        width: auto;
        table-layout: auto;
      }
      .ant-table-body-outer {
        margin-top: -9px !important;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 8px;
          background: #fff;
          bottom: 0;
        }
      }
    }
  }
`;

const Tip = styled.div`
  font-size: 12px;
  margin: 5px 0 -5px;
`;

export const DoCon = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: ${p => p.theme.$mtc};
  span {
    cursor: pointer;
    font-size: 12px;
    &:hover {
      font-weight: bold;
    }
  }
`;
export const TableHeadCon = styled.div`
  height: 50px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: 1;
`;
export const TabledCon = styled.div`
  margin: 0px 15px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15); */
  background-color: #fff;
  /* border-radius: 5px; */
`;
