import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import windowHeight from 'src/hooks/windowHeight'
export interface Props extends TableProps<any> {
  style?: any
  type?: any
  /**多余的高度 */
  surplusHeight?: number
}

export default function BaseTable (props: Props) {
  let wih = windowHeight()
  let option: any = Object.assign(
    {
      bordered: true,
      pagination: false,
      size: 'small'
    },
    props
  )
  if (props.surplusHeight) {
    option.scroll = { y: wih - props.surplusHeight }
  }
  try {
    if (option.type.includes('spaceRow')) {
      /** 设置空行 */
      if (option.dataSource.length < 10) {
        while (option.dataSource.length < 10) {
          option.dataSource.push({})
        }
      }
    }
    // if (option.type.includes('fixedWidth')) {
    //   /** 设置宽度 */
    //   let totalWidth = option.columns.reduce((total: number, item: any) => total + (Number(item.width) || 0), 0)
    //   if (!option.style) option.style = {}
    //   option.style.width = totalWidth
    // }
  } catch (error) {}

  let doCols: any = option.columns.filter((item: any) => item.title == '操作' || item.title == '附件')

  if (!!doCols.length) {
    doCols.forEach((doCol: any) => {
      let callback = doCol.render
      doCol.render = (text: any, row: any, index: any) => {
        if (Object.keys(row).length == 0) return <span />
        return callback && callback(text, row, index)
      }
    })
  }
  return (
    <Wrapper {...option}>
      <Table {...option} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  /* border: 1px solid rgba(219, 224, 228, 1); */
  /* padding: 20px 30px; */
  padding: 15px 15px;
  box-sizing: content-box;

  .ant-table-wrapper {
    td {
      padding: 0 !important;
      box-sizing: border-box;
      height: ${(p) => p.theme.$tableRowHeight} !important;
    }
    /* 补充th下降的高度 */
    .ant-table-align-center {
      padding: 8px 8px 14px 8px !important;
    }
  }

  .ant-table-small > .ant-table-content > .ant-table-body {
    margin: 0 !important;
  }
  .ant-table-thead {
    background: rgba(242, 244, 245, 1);
  }
  tbody tr:nth-of-type(2n) {
    background: rgba(242, 244, 245, 1);
  }

  .ant-table-placeholder {
    height: ${(p: any) => `calc(100vh - ${p.surplusHeight - 20}px)`};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  *::-webkit-scrollbar {
    width: 7px;
    /* height: 7px; */
    background-color: #eaeaea;
  }
  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
    background-color: #eaeaea;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 50px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #c2c2c2;
  }

  .ant-table-fixed-header .ant-table-scroll .ant-table-header {
    padding-bottom: 4px;
  }

  /* .container::-webkit-scrollbar {
      display: none;
  } */

  .ant-table-header {
    *::-webkit-scrollbar {
      width: 7px;
      /* height: 7px; */
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
`
