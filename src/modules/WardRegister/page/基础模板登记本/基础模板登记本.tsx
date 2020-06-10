import styled from 'styled-components'
import React, { useState, useEffect, useMemo, useLayoutEffect } from "react"

import BaseTable, { DoCon } from "src/components/BaseTable"
import {
  Button,
  ColumnProps,
  PaginationConfig,
  AutoComplete,
  message,
  Input,
  Select,
  DatePicker,
  Popover,
  Spin
} from "src/vendors/antd"

import { authStore, appStore } from "src/stores"
import { observer } from "mobx-react-lite"
import moment from "moment"

import { PageHeader, Place } from "src/components/common"
import DeptSelect from "src/components/DeptSelect"
import createModal from "src/libs/createModal"
import { codeAdapter } from "../../utils/codeAdapter"
import SignColumn from './components/SignColumn'
import { NullBox } from "../../components/NullBox"
import { TableCon, Wrapper } from "../../utils/style/style"
//import SettingModal from "./modal/SettingModal"
//import { createFilterItem } from "../../components/FilterItem"
import { baseRegisterMode } from './BaseRegisterModel'
import classNames from "classnames"
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'

const TextArea = Input.TextArea

export interface Props {
  payload: any
}

export default observer(function 基础模板登记本(props: Props) {
  const registerCode = props.payload && props.payload.registerCode
  const registerName = props.payload && props.payload.registerName
  const { isNotANormalNurse } = authStore

  const { loading, blockList, tableData, baseQuery, totalCount, itemConfigList, rangeConfigList } = baseRegisterMode
  const init = baseRegisterMode.init.bind(baseRegisterMode)
  const setQuery = baseRegisterMode.setQuery.bind(baseRegisterMode)
  const addBlock = baseRegisterMode.addBlock.bind(baseRegisterMode)
  const setTableDataRowItem = baseRegisterMode.setTableDataRowItem.bind(baseRegisterMode)
  const setTableDataRow = baseRegisterMode.setTableDataRow.bind(baseRegisterMode)
  const focusNextIpt = baseRegisterMode.focusNextIpt
  const cellDisabled = baseRegisterMode.cellDisabled

  const [columns, setColumns] = useState([] as ColumnProps<any>[])
  const [superHeight, setSuperHeight] = useState(200)

  // console.log(columns)

  /** 判断是否快过期 */
  const isEndTime = (record: any) => {
    let current = ''
    let endTime = ''
    let itemCode = '有效期'

    if (registerCode == "QCRG_14_1") {
      itemCode = '失效日期'
    } else if (registerCode == 'QCRG_14_2') {
      itemCode = '生产日期'
    }

    endTime = record[itemCode] || ''
    current = moment().format('YYYY-MM-DD')

    var currentDate = moment(current)
    var endTimeDate = moment(endTime)
    if (
      currentDate.isValid() &&
      endTimeDate.isValid() &&
      current && endTime
    ) {
      let m = endTimeDate.diff(currentDate, "d")
      if (m <= 90) return "color-red"
      // if (m < 3) return "color-orange"
    }
    return ""
  }

  useEffect(() => {
    //重新渲染表头colunms
    /**固定项目 */
    let itemCfgBefore = [
      ...codeAdapter({
        'QCRG_04,QCRG_20_1': [{
          title: "班次",
          width: 75,
          dataIndex: "range",
          align: "center",
          render(text: string, record: any, index: number) {
            let children = <AutoComplete
              disabled={cellDisabled(record)}
              dataSource={rangeConfigList.map((item: any) => item.itemCode)}
              value={text}
              onChange={value => setTableDataRowItem(value, 'range', index)}>
              <TextArea
                autosize
                data-key={'range'}
                onKeyUp={focusNextIpt}
                style={{
                  lineHeight: 1.2,
                  padding: "9px 2px",
                  textAlign: "center"
                }}
              />
            </AutoComplete>
            let obj = {
              children
            }
            return obj
          }
        }],
        other: []
      }, registerCode, true)
    ]

    let itemCfgAfter = codeAdapter({
      QCRG_04: [
        SignColumn({
          title: "签名",
          width: 70,
          dataIndex: 'signerName',
          aside: "",
          registerCode,
          blockId: baseQuery.blockId,
          isRoleManage: !!authStore.isRoleManage,
          successCallback: (newRecord: any, index: number) =>
            setTableDataRow(newRecord, index)
        })
      ],
      other: []
    }, registerCode)

    /**自定义项目 */
    const renderColumn = (item: any) => {
      const { itemCode, checkSize, width, options, title } = item
      let columnItem = {} as ColumnProps<any>

      let columnWidth = (15 * width || 50) + 8

      let render = (text: string, record: any, index: number) => {
        let children: JSX.Element
        let childrenClassName = classNames({
          "warning-value": text == "未完成",
          [isEndTime(record)]: isEndTime(record),
          "checkSize-warning":
            checkSize && (text != checkSize && text != "√")
        })

        children = <AutoComplete
          className={childrenClassName}
          disabled={cellDisabled(record)}
          dataSource={
            options
              ? options.split(";").filter((option: any) => option)
              : undefined
          }
          value={text}
          onChange={(val: any) => {
            val = val.replace(/\n/g, '')
            setTableDataRowItem(val, itemCode, index)
          }}
          onSelect={value => {
            if (
              registerCode == "QCRG_04" &&
              item.itemCode == "组号及床号"
            ) {
              let prevValue = record[item.itemCode] || ''
              setTimeout(() => {
                prevValue = prevValue + (prevValue ? ";" : "") + value
                setTableDataRowItem(prevValue, itemCode, index)
              }, 0)
            }
          }}>
          <TextArea autosize data-key={itemCode} onKeyDown={focusNextIpt} />
        </AutoComplete>

        return {
          children: <React.Fragment>
            {children}
            <div className="bg"></div>
          </React.Fragment>
        }
      }

      columnItem = {
        title: <FullTheader>
          <div className="title">
            <span>{title || itemCode}</span>
          </div>
          {checkSize && <div className="subtitle">{checkSize}</div>}
        </FullTheader>,
        align: 'left',
        className: "input-cell",
        width: columnWidth,
        dataIndex: itemCode,
        render,
      }

      return columnItem
    }

    let newColumns =
      itemConfigList.map((item: any) => {
        let newItem = {} as ColumnProps<any>

        if (item.children) {
          newItem.title = item.title || item.itemCode
          newItem.children = item.children.map((children: any) => renderColumn(children))
        } else {
          newItem = renderColumn(item)
        }

        return newItem
      })

    setColumns([
      ...itemCfgBefore,
      ...newColumns,
      ...itemCfgAfter,
    ])

    //表头变化时动态计算表格superHeight
    if (itemConfigList.length > 0) {
      setTimeout(() => {
        let target = document.querySelector('#baseTable .ant-table-header') as any
        if (target) {
          setSuperHeight(target.offsetHeight ? target.offsetHeight + (200 - 25) : 200)
        }
      }, 100)
    }
  }, [itemConfigList])

  return <Wrapper>
    <Spin spinning={loading}>
      <PageHeader>
        {isNotANormalNurse && <Button
          style={{ marginLeft: 0 }}
          onClick={() => addBlock()}>
          修订
      </Button>}
        <span className="label">记录</span>
        <Select
          value={baseQuery.blockId}
          onChange={(blockId: string) =>
            setQuery({ ...baseQuery, blockId, pageIndex: 1 }, true)}>
          {blockList.map((item: any) => (
            <Select.Option value={item.id} key={item.id}>
              {item.registerName +
                " " +
                moment(item.createTime).format("MM-DD")}
            </Select.Option>
          ))}
        </Select>
        <span className="label">日期</span>
        <DatePicker.RangePicker
          value={[
            baseQuery.startDate ? moment(baseQuery.startDate) : undefined,
            baseQuery.endDate ? moment(baseQuery.endDate) : undefined,
          ] as any[]}
          onChange={(moments: any[]) => {
            let startDate = moments[0] ? moments[0].format('YYYY-MM-DD') : ''
            let endDate = moments[1] ? moments[1].format('YYYY-MM-DD') : ''
            setQuery({
              ...baseQuery,
              startDate,
              endDate,
              pageIndex: 1
            }, true)
          }}
          allowClear={true}
          style={{ width: 220 }}
        />
        <span className="label">科室</span>
        <DeptSelect
          onChange={() => init(registerCode, registerName)}
          style={{ width: 150 }} />
      </PageHeader>
      <TableCon>
        {baseQuery.blockId && itemConfigList.length > 0 ?
          <BaseTable
            columns={columns}
            dataSource={tableData}
            surplusHeight={superHeight}
            useOuterPagination
            surplusWidth={300}
            pagination={{
              current: baseQuery.pageIndex,
              pageSize: baseQuery.pageSize,
              total: totalCount,
              onChange: (pageIndex: number) => setQuery({ ...baseQuery, pageIndex }, true),
              onShowSizeChange: (pageIndex: number, pageSize: number) => setQuery({ ...baseQuery, pageIndex: 1, pageSize }, true)
            }}
          /> :
          <NullBox
            onClick={() => addBlock()}
            text={"创建登记本"}
            registerName={registerName}
          />
        }
      </TableCon>
    </Spin>
  </Wrapper>
})

const FullTheader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title{
    flex: 1 1 0%;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .subtitle{
    border-top: 1px solid rgb(232, 232, 232);
    width: 100%;
    height: 20px;
    font-weight: normal;
    line-height: 20px;
  }
`