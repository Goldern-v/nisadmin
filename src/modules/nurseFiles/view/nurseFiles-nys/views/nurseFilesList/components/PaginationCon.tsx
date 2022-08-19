import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
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
    nurseFilesListViewModel.pageSize = pageSize != undefined && isNaN(pageSize) ? 10000 : (Number(pageSize) || rowNum * 2)
    nurseFilesListViewModel.loadNursingList()
  }
  let pageSizeOptions = ['10', '20', '30','100', '全部']
  return (
    <Wrapper>
      <Pagination
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `共 ${total} 条`}
        defaultCurrent={1}
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
