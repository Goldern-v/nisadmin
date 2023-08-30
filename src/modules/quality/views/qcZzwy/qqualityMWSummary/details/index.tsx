import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Spin, Button, message } from 'antd'
import { ScrollBox } from 'src/components/common'
import { appStore } from 'src/stores'
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import FirstTable from './first'
import SecondTable from './second'
import ThirdTable from './third'
import Four from './four'
import { api } from '../api'
import { firstData } from './first/firstData'
import { secondData } from './second/secondData'
import { thirdData } from './third/data'
import { fourData } from './four/fourData'

interface Props {

}

function QqualityMWSummaryDetail(props: Props) {
  let [loading, setLoading] = useState(false)
  let { qcReportItemDtoList, reportMasterData }: any = localStorage.getItem('qqualityMWSummaryDetail') ? JSON.parse(localStorage.getItem('qqualityMWSummaryDetail') || '') : {}

  let detail_check: any = localStorage.getItem('detail_check')

  const [details, setDetails]:any = useState({})

  const detailsSave = async() => {
    let { qcReportItemDtoList: details_List, reportMasterData: details_masterData } = details
    let masterData:any = details_masterData && details_masterData.id ? details_masterData : reportMasterData
    let list: any = details_List ? details_List : qcReportItemDtoList

    let qcReportItemDataList = list.map((item: any, index: number) => {
      let reportMasterId = (item?.qcReportItemDataList && item?.qcReportItemDataList[0]?.reportMasterId) || '';
      let itemCode = item.itemCode;
      let itemName = item.itemName;
      let indexNo = index + 2;
      let id = (item?.qcReportItemDataList && item?.qcReportItemDataList[0]?.id) || '';
      let reportTemplateId = item?.reportTemplateId;
      let itemValue = ''
    
      if (index === 0) {
        itemValue = JSON.stringify({
          tableList: firstData.firstTableList_DE,
          name_nurse: firstData.name_nurse
        });
      } else if (index === 1) {
        itemValue = JSON.stringify({
          case: secondData.case,
          tableList: secondData.tableList,
          detailLists: secondData.detailLists
        });
      } else if (index === 2) {
        itemValue = JSON.stringify({
          evaluate: thirdData.evaluate,
          tableList: thirdData.tableList
        });
      } else if (index === 3) {
        itemValue = JSON.stringify({
          performance: fourData.performance,
          tableList: fourData.tableList,
          nameTS: fourData.nameTS
        });
      }
    
      return {
        reportMasterId,
        reportItemId: '',
        itemCode,
        itemName,
        indexNo,
        id,
        reportTemplateId,
        itemValue
      };
    });

    let lists = {
      reportMasterId: (list[0]?.qcReportItemDataList && list[0].qcReportItemDataList[0]?.reportMasterId) || '',
      reportItemId: '',
      itemCode: list[0]?.itemCode,
      itemName: list[0]?.itemName,
      indexNo: 1,
      id: (list[0]?.qcReportItemDataList && list[0].qcReportItemDataList[1]?.id) || '',
      reportTemplateId: list[0]?.reportTemplateId,
      itemValue: JSON.stringify({
        tableList: firstData.firstTableList_UD,
        name_deptName: firstData.name_deptName
      })
    }
    qcReportItemDataList.push(lists)
    
    let params = {
      hospitalCode: 'zzwy',
      templateName: '季度质量管理工作总结',
      reportLevel: '1',
      id: masterData.id || '',
      // ...masterData,
      reportYear: masterData.reportYear,
      reportMonth: masterData.reportMonth,
      reportQuarter: masterData.reportQuarter,
      startDate: masterData.startDate,
      endDate: masterData.endDate,
      wardCode: masterData.wardCode,
      wardName: masterData.wardName,
      reportName: masterData.reportName,
      qcReportItemDataList
    };
    
    let  data = await api.saveQcReport(params)
    if (data.code === '200') {
      message.success('保存成功')
      appStore.history.push('/qcOneHj/季度质量管理工作总结')
      // setDetails(data.data || {})
      // let { qcReportItemDtoList: List } = data.data
      // getTable(List)

      

    } else {
      message.error(data.desc)
    }
  }

  const getTable = (list: any) => {
    const parseData = (index: any, key: any, idx = 0) => {
      return list[index]?.qcReportItemDataList && JSON.parse(list[index]?.qcReportItemDataList[idx]?.itemValue)?.[key];
    }
    firstData.firstTableList_UD = parseData(0, 'tableList') || [];
    firstData.name_nurse = parseData(0, 'name_nurse') || '';
    firstData.firstTableList_DE = parseData(0, 'tableList', 1) || [];
    firstData.name_deptName = parseData(0, 'name_deptName', 1) || '';

    secondData.case = parseData(1, 'case') || '';
    secondData.tableList = parseData(1, 'tableList') || [];
    secondData.detailLists = parseData(1, 'detailLists') || [];

    thirdData.evaluate = parseData(2, 'evaluate') || '';
    thirdData.tableList = parseData(2, 'tableList') || [];

    fourData.performance = parseData(3, 'performance') || '';
    fourData.tableList = parseData(3, 'tableList') || [];
    fourData.nameTS = parseData(3, 'nameTS') || '';
  } 

  useEffect(() => {
    getTable(qcReportItemDtoList)
  }, [])

  return (
    <Con>
      <HeaderCon>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2,
          }}
          data={[
            {
              // name: navTitle('季度质量管理工作总结'),
              name: '季度质量管理工作总结',
              link: '/qcOneHj/季度质量管理工作总结' },
            {
              name: "记录详情",
            },
          ]}
        />
        <div className="button">
          <div>{ reportMasterData?.reportName }</div>
          <div>
            <Button onClick={() => appStore.history.push('/qcOneHj/季度质量管理工作总结') }>返回</Button>
            {/* <Button>导出</Button> */}
            <Button type="primary" onClick={detailsSave}>保存</Button>
            <Button type="danger">删除</Button>
          </div>
        </div>
        <div className='item'>
          <span>状态: { reportMasterData?.status === '-1' ? '未保存' : '已保存'}</span>
          <span>创建人：{ reportMasterData?.creatorName }</span>
          <span>创建时间：{ reportMasterData?.createTime }</span>
        </div>
      </HeaderCon>
      <MidCon>
        <MidConScrollCon>
          <SpinCon>
            {loading ? (
              <div className='LoadingCon'>
                <Spin spinning={loading} className='SpinLoadingClass' />
              </div>
            ) : (
              ''
            )}
          </SpinCon>
          <TableCon>
            <div className={detail_check === '0' ? 'detail_check': ''}>
              <div className='title'>{ reportMasterData?.reportName }</div>
              <FirstTable />
              <SecondTable />
              <ThirdTable />
              <Four />
            </div>
          </TableCon>
        </MidConScrollCon>
      </MidCon>
    </Con>
  )
}

export default function Layout() {
  return (
    <QqualityMWSummaryDetail />
    )
}


const Con = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`
const HeaderCon = styled.div`
  height: 95px;
  background-color: #fff;
  padding: 0 10px;
  border-bottom: 1px solid #ddd;
  .button{
    display: flex;
    justify-content: space-between;
  }
  .item{
    span{
      margin-right: 20px;
    }
  }
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15); */
  /* border-bottom: 1px solid gray; */
`
const MidCon = styled.div`
  flex: 1;
  height: calc(100vh - 145px);
  background: #efefef;
  .detail_check{
    pointer-events: none;
  }
`
const MidConScrollCon = styled.div`
  height: 100%;
  /* width: 100%; */
  display: flex;
  align-items: stretch;
  overflow: hidden;
  position: relative;
  width: 740px;
  margin: 0 auto;
  background: #fff;

  /* background-color: #fff;
  /* height: 150%; */
  /* flex-basis: auto; */
`

// @ts-ignore
const TableCon = styled(ScrollBox)`
  box-sizing: border-box;
  /* padding: 20px 153px; */
  padding: 20px 20px;
  flex: 1;
  width: 0;
  height: 100%;

  /* height: auto; */
  /* border-right: 1px solid gray; */
  /* background-color: #eeeeee; */
  align-items: stretch;
  .title{
    text-align: center;
    font-size: 20px;
    font-weight: 800;
  }
  
`
const SpinCon = styled.div`
  .LoadingCon {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
