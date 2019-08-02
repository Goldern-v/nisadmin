import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'
import FilterCon from './components/FilterCon'
import { getPageObj } from './config/getPageObj'
import { statisticsViewModal } from './StatisticsViewModal'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import TableCon from './components/TableCon'
import { useRef } from 'src/types/react'
import { statisticsService } from './services/StatisticsService'
import { cloneJson } from 'src/utils/json/clone'
export interface Props {}

export default function Statistics() {
  let path = appStore.match.params.path
  const [pageObj, setPageObj]: any = useState(null)
  const [tableObj, setTableObj]: any = useState({})
  const filterRef = useRef({})
  const paginationRef = useRef({
    pageIndex: 1,
    pageSize: 20,
    total: 1
  })

  const onload = (type: string = pageObj.type) => {
    setTableObj({ ...cloneJson(tableObj), ...paginationRef.current })
    statisticsService.getTableData(type, { ...filterRef.current, ...paginationRef.current }).then((res) => {
      setTableObj(res.data)
    })
  }

  useEffect(() => {
    // statisticsViewModal.init().then((res) => {
    let pageObj = getPageObj(path)
    setPageObj(getPageObj(path))
    onload(pageObj.type)
    // })
  }, [path])

  return (
    <Wrapper>
      {pageObj && (
        <React.Fragment>
          <HeadCon>
            <div className='title'>{pageObj.title}</div>
            <Button>导出EXCEL</Button>
          </HeadCon>
          <FilterCon pageObj={pageObj} onload={onload} filterRef={filterRef} />
          <TableCon pageObj={pageObj} tableObj={tableObj} paginationRef={paginationRef} onload={onload} />
        </React.Fragment>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 15px 15px 0;
`

const HeadCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 20px;
    color: #333;
    font-weight: bold;
  }
`
