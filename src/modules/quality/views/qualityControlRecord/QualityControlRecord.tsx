import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import QualityControlRecordHeader from './components/QualityControlRecordHeader'
import QualityControlRecordTable from './components/QualityControlRecordTable'
import PaginationCon from './components/PaginationCon'
import { Pagination, Spin } from 'antd'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordApi } from 'src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi'
import { qualityControlRecordVM } from 'src/modules/quality/views/qualityControlRecord/QualityControlRecordVM.ts'
qualityControlRecordVM
export interface Props extends RouteComponentProps {}
/** 一行的列数 */
let rowNum: number = 5
export default observer(function QualityControlRecord() {
  let [allData,setAllData]:any = useState({})
  let [tableData, setTableData]: any = useState([])
  let [loading, setLoading] = useState(false)
  useEffect(()=>{
    testClick()
  },[])
  const testClick = () => {
    setLoading(true)
    let sendData = {
      pageIndex: 1,
      pageSize: 10,
      // wardCode: authStore.selectedDeptCode,
      // 暂时让其为空
      wardCode: '',
      qcCode: qualityControlRecordVM.formSelectCode,
      nodeCode: qualityControlRecordVM.stateSelectCode,
      beginDate: '',
      endDate: ''
    }
    qualityControlRecordApi.instanceGetPageByCondition(sendData).then((res: any) => {
      setAllData(res.data)
      setTableData(res.data.list)
      setLoading(false)
    })
    console.log('5555555')
  }
  return (
    <Wrapper>
      <HeaderCon>
        <QualityControlRecordHeader refreshData={testClick} />
        {/* <button onClick={testClick}>fffff</button> */}
      </HeaderCon>
      <MidCon>
        <SpinCon>
          {loading ? (
            <div className='LoadingCon'>
              <Spin size='large' spinning={loading} className='SpinLoadingClass' />
            </div>
          ) : (
            ''
          )}
        </SpinCon>
        <QualityControlRecordTable tableData={tableData} allData={allData}/>
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
    background-color: rgba(0, 0, 0, 0.2);
    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
