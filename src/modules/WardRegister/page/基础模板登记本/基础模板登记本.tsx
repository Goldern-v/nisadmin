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

import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import { PageHeader, Place } from "src/components/common"
import DeptSelect from "src/components/DeptSelect"
import createModal from "src/libs/createModal"
import SettingModal from "./components/SettingModal"
import FileUploadRender from '../../components/Render.v2/FileUploadRender'
import DatePickerRender from '../../components/Render.v2/DatePickerRender'
import DefaultRender from '../../components/Render.v2/DefaultRender'
import { codeAdapter } from "../../utils/codeAdapter"
import FilterCon from './components/FilterCon'
import SignColumn from '../../components/Render.v2/SignColumn'
import { NullBox } from "../../components/NullBox"
import { TableCon, Wrapper, LineCon, TextCon, Text, SvgCon } from "../../utils/style/style"
//import SettingModal from "./modal/SettingModal"
//import { createFilterItem } from "../../components/FilterItem"
import { baseRegisterMode } from '../../data/BaseRegisterModel'
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

  const { loading, blockList, tableData, baseQuery, totalCount, itemConfigList, rangeConfigList, filterQuery, selectedRowKeys } = baseRegisterMode
  const init = baseRegisterMode.init.bind(baseRegisterMode)
  const setLoading = baseRegisterMode.setLoading.bind(baseRegisterMode)
  const getTableData = baseRegisterMode.getTableData.bind(baseRegisterMode)
  const setQuery = baseRegisterMode.setQuery.bind(baseRegisterMode)
  const setFilter = baseRegisterMode.setFilter.bind(baseRegisterMode)
  const addBlock = baseRegisterMode.addBlock.bind(baseRegisterMode)
  const setTableDataRowItem = baseRegisterMode.setTableDataRowItem.bind(baseRegisterMode)
  const setTableDataRow = baseRegisterMode.setTableDataRow.bind(baseRegisterMode)
  const createRow = baseRegisterMode.createRow.bind(baseRegisterMode)
  const deleteRow = baseRegisterMode.deleteRow.bind(baseRegisterMode)
  const save = baseRegisterMode.save.bind(baseRegisterMode)
  const deleteBlock = baseRegisterMode.deleteBlock.bind(baseRegisterMode)
  const exportExcel = baseRegisterMode.exportExcel.bind(baseRegisterMode)
  const setSelectedRowKeys = baseRegisterMode.setSelectedRowKeys.bind(baseRegisterMode)
  const copyCreateSelectedRow = baseRegisterMode.copyCreateSelectedRow.bind(baseRegisterMode)
  const auditAll = baseRegisterMode.auditAll.bind(baseRegisterMode)
  const focusNextIpt = baseRegisterMode.focusNextIpt
  const cellDisabled = baseRegisterMode.cellDisabled

  const [columns, setColumns] = useState([] as ColumnProps<any>[])
  const [superHeight, setSuperHeight] = useState(200)
  const settingModal = createModal(SettingModal)
  const previewModal = createModal(PreviewModal)

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
    //科室自定义列前面的列配置
    let itemCfgBefore = [
      {
        title: codeAdapter({
          QCRG_01: <LineCon>
            <TextCon>
              <Text x="20%" y="75%" deg="0">
                日期
            </Text>
              <Text x="65%" y="77%" deg="22">
                班次
            </Text>
              <Text x="80%" y="62%" deg="21">
                质量
            </Text>
              <Text x="83%" y="35%" deg="12">
                基数
            </Text>
              <Text x="82%" y="8%" deg="0">
                物品
            </Text>
            </TextCon>
            <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
              <line x1="0" y1="0" x2="60%" y2="100%" />
              <line x1="0" y1="0" x2="100%" y2="100%" />
              <line x1="0" y1="0" x2="100%" y2="33%" />
              <line x1="0" y1="0" x2="100%" y2="66%" />
              <line x1="0" y1="0" x2="100%" y2="100%" />
            </SvgCon>
          </LineCon>,
          QCRG_02: <LineCon>
            <TextCon>
              <Text x="20%" y="70%" deg="0">
                日期
          </Text>
              <Text x="65%" y="70%" deg="22">
                班次
          </Text>
              <Text x="65%" y="20%" deg="0">
                交班内容
          </Text>
            </TextCon>
            <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
              <line x1="0" y1="0" x2="60%" y2="100%" />
              <line x1="0" y1="0" x2="100%" y2="80%" />
            </SvgCon>
          </LineCon>,
          other: '日期'
        }, registerCode),
        width: 108,
        className: 'input-cell',
        dataIndex: "recordDate",
        align: "center",
        colSpan: codeAdapter({
          'QCRG_02,QCRG_01': 2,
          other: 1,
        }, registerCode, true),
        render(text: string, record: any, index: number) {
          let children = <DefaultRender
            {...{
              cellDisabled,
              record,
              itemCode: 'recordDate',
              index,
              onChange: (val: any, itemCode: string, index: number) =>
                setTableDataRowItem(val, 'recordDate', index),
              focusNextIpt,
            }}
          />

          let obj = {
            children
          }
          return obj
        }
      },
      ...codeAdapter({
        'QCRG_02,QCRG_01,QCRG_04,QCRG_20_1': [{
          title: "班次",
          width: 75,
          className: 'input-cell',
          dataIndex: "range",
          align: "center",
          colSpan: codeAdapter({
            'QCRG_02,QCRG_01': 0,
            other: 1,
          }, registerCode, true),
          render(text: string, record: any, index: number) {
            let children = <DefaultRender
              {...{
                cellDisabled,
                record,
                options: rangeConfigList.map((item: any) => item.itemCode),
                itemCode: 'range',
                index,
                onChange: (val: any, itemCode: string, index: number) =>
                  setTableDataRowItem(val, 'range', index),
                focusNextIpt,
              }}
            />

            let obj = {
              children
            }
            return obj
          }
        }],
        other: []
      }, registerCode, true)
    ]

    /**整合相同的签名参数 返回签名组件 */
    const SignColumnFormat = (title?: string, aside?: string, dataIndex?: string, width?: number) => {
      return SignColumn({
        title: title || "签名",
        width: width || 70,
        dataIndex: dataIndex || 'signerName',
        aside: aside || "",
        registerCode,
        blockId: baseQuery.blockId,
        isRoleManage: !!authStore.isRoleManage,
        successCallback: (newRecord: any, index: number) =>
          setTableDataRow(newRecord, index)
      })
    }

    //科室自定义列后面的列配置
    let itemCfgAfter = [
      ...codeAdapter({
        'QCRG_01,QCRG_02,QCRG_11,QCRG_15_3,QCRG_18,QCRG_20_1,QCRG_20_2,QCRG_13': [
          {
            title: "备注",
            width: 150,
            dataIndex: "description",
            className: "input-cell input-cell-description",
            render(text: string, record: any, index: number) {
              return <DefaultRender
                {...{
                  cellDisabled,
                  record,
                  itemCode: 'description',
                  index,
                  onChange: (val: any, itemCode: string, index: number) => {
                    setTableDataRowItem(val, 'description', index)
                  },
                  focusNextIpt,
                }} />
            }
          }
        ],
        other: [],
      }, registerCode, true),
      ...codeAdapter({
        'QCRG_01,QCRG_02': [
          SignColumnFormat('交班者签名', '交班者'),
          SignColumnFormat('接班者签名', '接班者', 'auditorName'),
        ],
        QCRG_04: [
          SignColumnFormat()
        ],
        QCRG_08: [
          SignColumnFormat('登记人签名', '登记人')
        ],
        other: []
      }, registerCode, true),
      {
        title: "操作",
        width: 50,
        className: "",
        render(text: string, record: any, index: number) {
          return (
            <DoCon>
              {cellDisabled(record) ? (
                <aside style={{ color: "#aaa" }}>删除</aside>
              ) : (
                  <span
                    onClick={() => deleteRow(record, index)}>
                    删除
                  </span>
                )}
            </DoCon>
          );
        }
      }
    ]

    /**自定义项目 */
    const renderColumn = (item: any) => {
      const { itemCode, checkSize, width, options, title, itemType } = item
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
        //文件上传
        if (itemType == 'attachment') {
          children =
            <FileUploadRender
              {...{
                itemCfg: item,
                record,
                index,
                cellDisabled,
                className: childrenClassName,
                setLoading,
                handlePreview,
                onChange: (newRecord: any, index: number) => setTableDataRow(newRecord, index),
              }}
            />

          //时间选择
        } else if (itemType == 'date') {
          children =
            <DatePickerRender
              {...{
                itemCfg: item,
                record,
                index,
                cellDisabled,
                focusNextIpt,
                className: childrenClassName,
                onChange: (val: any) => {
                  let newRow = { ...record, modified: true }
                  newRow[itemCode] = val

                  if (
                    registerCode == 'QCRG_19_2' ||
                    registerCode == 'QCRG_11' ||
                    registerCode == 'QCRG_06'
                  ) {
                    let sumItemCode = '总计天数'
                    let diffUnit = 'd' as 'd' | 'h'
                    if (registerCode == 'QCRG_11') {
                      sumItemCode = '合计时间（小时）'
                      diffUnit = 'h'
                    }
                    if (registerCode == 'QCRG_06') {
                      sumItemCode = '使用时间'
                      diffUnit = 'h'
                    }
                    //时间差计算
                    let newSum = ''

                    let current = newRow['开始时间'] || ''
                    let endTime = newRow['结束时间'] || ''

                    var currentDate = moment(current)
                    var endTimeDate = moment(endTime)

                    if (
                      currentDate.isValid() &&
                      endTimeDate.isValid() &&
                      current && endTime
                    ) {
                      let m = endTimeDate.diff(currentDate, diffUnit)
                      if (m >= 0 && diffUnit == 'd') m += 1
                      newSum = m.toString()
                    }

                    if (newSum) {
                      newRow[sumItemCode] = newSum
                    }
                  }

                  setTableDataRow(newRow, index)
                }
              }}
            />
        } else {
          //带下拉选项的输入框
          children = <DefaultRender
            {...{
              record,
              index,
              itemCode,
              className: childrenClassName,
              cellDisabled,
              focusNextIpt,
              options: options ? options.split(";").filter((option: any) => option) : undefined,
              onChange: (val: any, itemCode: string, index: number) =>
                setTableDataRowItem(val, itemCode, index),
              onSelect: (value: any) => {
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
              }
            }}
          />
        }

        return {
          children: <React.Fragment>
            {children}
            <div
              className={[
                'bg',
                cellDisabled(record) ? 'disabled' : ''
              ].join(' ')}>
            </div>
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

    //合并表头固定列和科室自定义标题列
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

  const handlePreview = (file: any) => {
    if (getFileType(file.name) == 'img') {
      reactZmage.browsing({ src: file.path, backdrop: 'rgba(0,0,0, .8)' })
    } else {
      previewModal.show({
        title: file.name,
        path: file.path
      })
    }
  }

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
        <FilterCon
          filter={filterQuery}
          itemConfigList={itemConfigList}
          rangeConfigList={rangeConfigList}
          filterChange={(payload: any) => setFilter(payload, true)} />
        <Place />
        <Button onClick={() => setQuery({ ...baseQuery, pageIndex: 1 }, true)}>
          查询
        </Button>
        {baseQuery.blockId && <React.Fragment>
          <Button type="primary" onClick={() => createRow()}>新建行</Button>
          <Button type="primary" onClick={() => save()}>保存</Button>
          <Button onClick={() => exportExcel()}>导出</Button>
          {isNotANormalNurse && <React.Fragment>
            <Button
              onClick={() =>
                settingModal.show({
                  blockId: baseQuery.blockId,
                  selectedBlockObj: blockList.find(
                    (item: any) => item.id == baseQuery.blockId
                  ),
                  registerCode,
                  onOkCallBack: () => getTableData()
                })}>
              设置
            </Button>
            <Button onClick={() => deleteBlock()}>删除</Button>
          </React.Fragment>}
        </React.Fragment>}
      </PageHeader>
      <TableCon>
        {(baseQuery.blockId) ?
          <React.Fragment>
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
              rowClassName={(record: any, idx: number) => {
                if (cellDisabled(record)) return 'disabled-row'

                return ''
              }}
              rowSelection={codeAdapter({
                'QCRG_14_1,QCRG_10,QCRG_14_2': {
                  selectedRowKeys,
                  onChange: setSelectedRowKeys,
                },
                other: undefined
              }, registerCode, true)}
            />
            <div className="selected-operate-con">
              {codeAdapter({
                'QCRG_14_2':
                  <Button
                    disabled={
                      loading ||
                      selectedRowKeys.length <= 0
                    }
                    type="primary"
                    onClick={() => copyCreateSelectedRow()}>
                    复制新增
                  </Button>,
                'QCRG_14_1,QCRG_10':
                  <React.Fragment>
                    <Button
                      disabled={
                        loading ||
                        !authStore.isRoleManage ||
                        selectedRowKeys.length <= 0
                      }
                      type="primary"
                      onClick={() => auditAll('护士长')}>
                      护士长签名
                    </Button>
                    <Button
                      disabled={
                        loading ||
                        selectedRowKeys.length <= 0
                      }
                      type="primary"
                      onClick={() => copyCreateSelectedRow()}>
                      复制新增
                    </Button>
                  </React.Fragment>,
                other: <span></span>,
              }, registerCode, true)}
            </div>
          </React.Fragment> :
          <NullBox
            onClick={() => addBlock()}
            text={"创建登记本"}
            registerName={registerName}
          />
        }
      </TableCon>
    </Spin>
    <settingModal.Component />
    <previewModal.Component />
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