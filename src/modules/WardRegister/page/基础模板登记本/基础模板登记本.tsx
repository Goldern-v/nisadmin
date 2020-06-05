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
import { signRowObj } from "../../utils/signRowObj"
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

  const { loading, blockList, tableData, baseQuery, totalCount, itemConfigList } = baseRegisterMode
  const init = baseRegisterMode.init.bind(baseRegisterMode)
  const setQuery = baseRegisterMode.setQuery.bind(baseRegisterMode)
  const addBlock = baseRegisterMode.addBlock.bind(baseRegisterMode)

  const columns: ColumnProps<any>[] = [

  ]

  useEffect(() => {
    init(registerCode, registerName)
  }, [authStore.selectDeptCode])

  return <Wrapper>
    <PageHeader>
      {isNotANormalNurse && <Button
        disabled={loading}
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
        disabled={loading}
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
      <DeptSelect onChange={() => { }} style={{ width: 150 }} />
    </PageHeader>
    <TableCon>
      <Spin spinning={loading}>
        {baseQuery.blockId && itemConfigList.length > 0 ?
          <BaseTable
            columns={columns}
            dataSource={tableData}
            surplusHeight={220}
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
      </Spin>
    </TableCon>
  </Wrapper>
})