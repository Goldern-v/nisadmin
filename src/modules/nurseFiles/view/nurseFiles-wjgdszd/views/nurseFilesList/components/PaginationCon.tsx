import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { observer } from 'mobx-react-lite'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'

interface Props {
  rowNum: number
}

export default observer(function PaginationCon(props: Props) {
  let { rowNum } = props
  let totalCount = nurseFilesListViewModel.totalCount
  let onChange = (pageIndex: number, pageSize: number | undefined) => {
    nurseFilesListViewModel.pageIndex = pageIndex
    nurseFilesListViewModel.pageSize = pageSize || rowNum * 2
    nurseFilesListViewModel.loadNursingList()
  }
  let pageSizeOptions = ['10', '20', '30']
  return (
    <Wrapper>
      <Pagination
        showSizeChanger
        showQuickJumper
        showTotal={(total) => <span style={{ marginRight: 10 }}>搜索结果：共{total}人</span>}
        current={nurseFilesListViewModel.pageIndex}
        total={totalCount}
        pageSizeOptions={pageSizeOptions}
        onChange={onChange}
        onShowSizeChange={onChange}
        pageSize={nurseFilesListViewModel.pageSize}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  clear: both;
  text-align: right;
  padding-top: 10px;
`
