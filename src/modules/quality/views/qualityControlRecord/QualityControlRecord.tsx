import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import QualityControlRecordHeader from './components/QualityControlRecordHeader'
import QualityControlRecordTable from './components/QualityControlRecordTable'
import PaginationCon from './components/PaginationCon'
import { Pagination, Spin, message } from 'antd'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordApi } from 'src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi'
import { qualityControlRecordVM } from 'src/modules/quality/views/qualityControlRecord/QualityControlRecordVM.ts'
import { useKeepAliveEffect } from 'react-keep-alive'
import { Modal } from 'antd/es'
import { fileDownload } from 'src/utils/file/file'

export interface Props extends RouteComponentProps { }
/** 一行的列数 */

export default observer(function QualityControlRecord() {
  let [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
  useEffect(() => {
    let level =
      appStore.history.location.pathname.indexOf('qcThree') >= 0
        ? 3
        : appStore.history.location.pathname.indexOf('qcTwo') >= 0
          ? 2
          : appStore.history.location.pathname.indexOf('qcOneHj') >= 0
            ? 1
            : 3

    setLoading(true)
    qualityControlRecordVM
      .init(level).then((res) => {
        getTableData()
      }, err => setLoading(false))

    // ;(async () => {
    //   if (
    //     appStore.queryObj.noRefresh &&
    //     qualityControlRecordVM.allData &&
    //     qualityControlRecordVM.allData.list &&
    //     qualityControlRecordVM.allData.list.length > 0
    //   ) {
    //     getTableData()
    //   } else {
    //     let level =
    //       appStore.history.location.pathname.indexOf('qcThree') >= 0
    //         ? 3
    //         : appStore.history.location.pathname.indexOf('qcTwo') >= 0
    //         ? 2
    //         : 3
    //     await qualityControlRecordVM.init(level)
    //     getTableData()
    //   }
    //   // appStore.history.replace(appStore.history.location.pathname)
    // })()
  }, [])

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === 'POP') {
      getTableData()
    }
    return () => { }
  })

  const getTableData = (obj?: any) => {
    setSelectedRowKeys([])
    setLoading(true)
    let sendData = {
      pageIndex: obj ? obj.current : qualityControlRecordVM.allData.pageIndex || 1,
      pageSize: obj ? obj.pageSize : qualityControlRecordVM.allData.pageSize || 20,
      wardCode: qualityControlRecordVM.filterDeptCode,
      qcGroupRole: qualityControlRecordVM.filterForm,
      type: qualityControlRecordVM.readWay,
      nodeCode: qualityControlRecordVM.filterState,
      level: qualityControlRecordVM.level,
      beginDate: qualityControlRecordVM.filterDate[0].format('YYYY-MM-DD'),
      endDate: qualityControlRecordVM.filterDate[1].format('YYYY-MM-DD')
    }
    qualityControlRecordApi
      .instanceGetPageByCondition(sendData)
      .then((res: any) => {
        qualityControlRecordVM.allData = res.data
        // if (res.data.list.length < 20) {
        //   let len = 20 - res.data.list.length
        //   for (let i = 0; i < len; i++) {
        //     res.data.list.push([])
        //   }
        // }
        // setTableData(res.data.list)
        setLoading(false)
      })
      .catch((err: any) => {
        setLoading(false)
      })
  }

  const exportSelected = () => {
    if (selectedRowKeys.length <= 0) {
      message.warn('未勾选条目')
      return
    }

    let selectedRecordIds = (qualityControlRecordVM.allData.list || [])
      .filter((item: any) => selectedRowKeys.indexOf(item.key) >= 0)
      .map((item: any) => item.id)

    Modal.confirm({
      title: '导出',
      content: '是否导出选中条目？',
      onOk: () => {
        setLoading(true)
        qualityControlRecordApi
          .exportList(selectedRecordIds)
          .then(res => {
            setLoading(false)
            fileDownload(res)
            setSelectedRowKeys([])
          }, () => setLoading(false))
      }
    })
  }

  return (
    <Wrapper>
      <HeaderCon>
        <QualityControlRecordHeader refreshData={getTableData} refExport={exportSelected} />
        {/* <button onClick={getTableData}>fffff</button> */}
      </HeaderCon>
      <MidCon>
        {/* <SpinCon>
          {loading ? (
            <div className='LoadingCon'>
              <Spin size='large' spinning={loading} className='SpinLoadingClass' />
            </div>
          ) : (
            ''
          )}
        </SpinCon> */}
        <QualityControlRecordTable
          tableData={qualityControlRecordVM.allData.list || []}
          allData={qualityControlRecordVM.allData}
          loadingGet={loading}
          showSelection={appStore.HOSPITAL_ID == 'hj'}
          selectionChange={(payload: any) => setSelectedRowKeys(payload)}
          selectedRowKeys={selectedRowKeys}
          getTableData={getTableData}
        />
      </MidCon>
      {/* <PaginationContent>
        <PaginationCon rowNum={rowNum} />
      </PaginationContent> */}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
`
const HeaderCon = styled.div`
  /* height: 66px; */
`

const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  height: 0;
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  /* padding: 20px; */
  /* padding-top: 10px; */
`
// const PaginationContent = styled.div`
//   /* margin-top: 30px; */
//   /* height: 280px; */
//   padding: 15px 30px;
//
const SpinCon = styled.div`
  .LoadingCon {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.1);
    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
