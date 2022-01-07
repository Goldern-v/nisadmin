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
import { fileDownload } from 'src/utils/file/file'
import { message } from 'src/vendors/antd'
export interface Props { }

export default function Statistics() {
  let path = appStore.match.params.path
  const [pageObj, setPageObj]: any = useState(null)
  const [tableObj, setTableObj]: any = useState({})
  const [tableLoading, setTableLoading]: any = useState(false)
  const filterRef = useRef({})

  const paginationRef = useRef({
    pageIndex: 1,
    pageSize: 20,
    total: 1
  })

  const onload = (type: string = pageObj.type) => {
    // console.log(type, 111)
    setTableObj({ ...cloneJson(tableObj), ...paginationRef.current })
    setTableLoading(true)
    statisticsService.getTableData(type, { ...filterRef.current, ...paginationRef.current }).then((res) => {
      setTableLoading(false)
      setTableObj(res.data)
    })
  }
  const exportExcel = (type: string = pageObj.type) => {
    if (appStore.fullLoadingBarObj) {
      return message.warning('只能同时下载一个文件')
    }
    appStore.openFullLoadingBar({
      aside: '正在打包数据，请稍候',
      progress: '0%'
    })
    statisticsService
      .exportExcel(type, { ...filterRef.current, ...paginationRef.current }, (progressEvent: any) => {
        // console.log(progressEvent, 'progressEvent')
        appStore.openFullLoadingBar({
          aside: '正在下载数据，请稍候',
          progress: `${Number(Math.min(progressEvent.loaded / (progressEvent.total * 10000 || 1), 1) * 100).toFixed(
            0
          )}%`
        })
      })
      .then((res) => {
        appStore.closeFullLoadingBar('下载完成')
        fileDownload(res)
      })
      .catch(() => {
        appStore.closeFullLoadingBarInFail('下载失败')
      })
  }

  useEffect(() => {
    if (statisticsViewModal.dict)
      statisticsViewModal.init().then((res) => {
        // let pageObj = getPageObj(path)
        filterRef.current = {}
        paginationRef.current = {
          pageIndex: 1,
          pageSize: 20,
          total: 1
        }
        // console.log(getPageObj(path),path, 9998)
        setPageObj(getPageObj(path))
        // onload(pageObj.type)
      })
  }, [path])

  return (
    <Wrapper>
      {pageObj && (
        <React.Fragment>
          <HeadCon>
            <div className='title'>{pageObj.title}</div>
            <Button onClick={() => exportExcel()}>导出</Button>
          </HeadCon>
          <FilterCon pageObj={pageObj} onload={onload} filterRef={filterRef} />
          <TableCon
            pageObj={pageObj}
            tableObj={tableObj}
            paginationRef={paginationRef}
            onload={onload}
            tableLoading={tableLoading}
          />
        </React.Fragment>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 15px 15px 0;
  /** fix table bug*/
  .ant-table-body-outer {
    margin-top: -9px !important;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 8px;
      background: #fff;
      bottom: 0;
    }
  }
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
