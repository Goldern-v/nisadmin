import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordVM } from '../QualityControlRecordVM'

interface Props {
  rowNum: number
}

export default observer(function PaginationCon(props: Props) {
  let { rowNum } = props
  // let totalCount = qualityControlRecordVM.totalCount
  let onChange = (pageIndex: number, pageSize: number | undefined) => {
    // qualityControlRecordVM.pageIndex = pageIndex
    // qualityControlRecordVM.pageSize = pageSize || rowNum * 2
    // qualityControlRecordVM.loadNursingList()
  }
  let pageSizeOptions = ['10', '20', '30']
  return (
    <Wrapper>
      {/* 接口 */}
      {/* <Pagination
        showSizeChanger
        showQuickJumper
        defaultCurrent={1}
        total={totalCount}
        pageSizeOptions={pageSizeOptions}
        onChange={onChange}
        onShowSizeChange={onChange}
        pageSize={qualityControlRecordVM.pageSize}
      /> */}
      <Pagination
        showSizeChanger
        showQuickJumper
        // defaultCurrent={1}
        total={50}
        // pageSizeOptions={pageSizeOptions}
        // onChange={onChange}
        // onShowSizeChange={onChange}
        // pageSize={qualityControlRecordVM.pageSize}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  clear: both;
  text-align: right;
  padding-top: 10px;
`
