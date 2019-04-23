import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { observer } from 'mobx-react-lite'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'

interface Props {
  rowNum: number
}

export default observer(function PaginationCon (props: Props) {
  let { rowNum } = props
  let totalCount = nurseFilesListViewModel.totalCount
  let onChange = (pageIndex: number, pageSize: number | undefined) => {
    nurseFilesListViewModel.pageIndex = pageIndex
    nurseFilesListViewModel.pageSize = pageSize || rowNum * 2
    nurseFilesListViewModel.loadNursingList()
  }
  let pageSizeOptions = []
  for (let i = 2; i <= 5; i++) {
    pageSizeOptions.push(i * rowNum + '')
  }
  return (
    <Wrapper>
      <Pagination
        showSizeChanger
        showQuickJumper
        defaultCurrent={1}
        total={totalCount}
        pageSizeOptions={pageSizeOptions}
        onChange={onChange}
        onShowSizeChange={onChange}
        defaultPageSize={rowNum * 2}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  clear: both;
  text-align: right;
  padding-top: 10px;
`
