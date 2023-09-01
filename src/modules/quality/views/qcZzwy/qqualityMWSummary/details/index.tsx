import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
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
import { Obj } from 'src/libs/types'
import printing from 'printing'
import { useRef } from 'src/types/react'

interface Props {

}

function QqualityMWSummaryDetail(props: Props) {
  let [loading, setLoading] = useState(false)
  const pageRef: any = useRef<HTMLElement>()

  const [detailList, setDetailList]:any = useState([])

  const [qcReportItemDtoList, setQcReportItemDtoList] = useState<any[]>([]);
  const [reportMasterData, setReportMasterData] = useState<any>(null);


  const detailsSave = async() => {
    let masterData:any = reportMasterData || {}
    let list: any = qcReportItemDtoList || []

    let qcReportItemDataLists = list.map((item: any, index: number) => {
      let reportMasterId = (item?.qcReportItemDataList && item?.qcReportItemDataList[0]?.reportMasterId) || '';
      let itemCode = item.itemCode;
      let itemName = item.itemName;
      let indexNo = index + 1;
      let id = (item?.qcReportItemDataList && item?.qcReportItemDataList[0]?.id) || '';
      let reportTemplateId = item?.reportTemplateId;
      let itemValue = ''
    
      if (index === 0) {
        itemValue = JSON.stringify({
          tableList: firstData.firstTableList_DE,
          name_deptName: firstData.name_deptName
        });
      } else if (index === 1) {
        itemValue = JSON.stringify({
          case: secondData.case,
          tableList: secondData.tableList,
          detailLists: detailList
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
      reportMasterId: (list[0]?.qcReportItemDataList && list[0].qcReportItemDataList[1]?.reportMasterId) || '',
      reportItemId: '',
      itemCode: list[0]?.itemCode,
      itemName: list[0]?.itemName,
      indexNo: 5,
      id: (list[0]?.qcReportItemDataList && list[0].qcReportItemDataList[1]?.id) || '',
      reportTemplateId: list[0]?.reportTemplateId,
      itemValue: JSON.stringify({
        tableList: firstData.firstTableList_UD,
        name_nurse: firstData.name_nurse
      })
    }

    let qcReportItemDataList = [lists, ...qcReportItemDataLists]
    
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
      localStorage.setItem('qqualityMWSummaryDetail', data.data && JSON.stringify(data.data))
    } else {
      message.error(data.desc)
    }
  }

  const getTable = (list: any) => {
    const parseData = (index: any, key: any, idx = 0) => {
      return list[index]?.qcReportItemDataList && JSON.parse(list[index]?.qcReportItemDataList[idx]?.itemValue)?.[key];
    }
    firstData.firstTableList_UD = parseData(0, 'tableList', 1) || [];
    firstData.name_nurse = parseData(0, 'name_nurse', 1) || '';
    firstData.firstTableList_DE = parseData(0, 'tableList') || [];
    firstData.name_deptName = parseData(0, 'name_deptName') || '';

    secondData.case = parseData(1, 'case') || '';
    secondData.tableList = parseData(1, 'tableList') || [];
    // secondData.detailLists = parseData(1, 'detailLists') || [];
    setDetailList(parseData(1, 'detailLists') || [])

    thirdData.evaluate = parseData(2, 'evaluate') || '';
    thirdData.tableList = parseData(2, 'tableList') || [];

    fourData.performance = parseData(3, 'performance') || '';
    fourData.tableList = parseData(3, 'tableList') || [];
    fourData.nameTS = parseData(3, 'nameTS') || '';
  } 

  const setDetailLists = (idx: number, data: Obj) => {
    setDetailList((val: any[]) => {
      return val.map((v, i) => idx === i ? { ...v, ...data } : v)
    })
  };

  // const [isPrint, setIsPrint] = useState(false)

  const onPrint = (isPrint: boolean) => {
    let printFun = isPrint ? printing : printing.preview
    setTimeout(() => {
      printFun(pageRef.current, {
        // beforePrint: formatter,
        // 插入所有link和style标签到打印，默认是false
        injectGlobalCss: true,
        // 指定扫描样式，默认是true（全部）
        scanStyles: false,
        css: `
          .ant-input{
            padding: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
            width: 100%;
            height: auto;
          }
          #baseTable .ant-input{
            border: 0px
          }
           .ant-btn {
             display: none;
           }
           .print-page {
             box-shadow: none;
             -webkit-print-color-adjust: exact;
             margin: 0 10px
             
           }
           .page-title {
             min-height: 20px;
             padding: 0px 30px 20px;
           }
           .page-title .title {
             text-align: center;
             margin-right: 0;
           }
           .title{
            text-align: center;
           }
           table, img {
             page-break-inside: avoid;
           }
          //  pre {
          //   page-break-after: avoid;
          //  }
           * {
             color: #000 !important;
           }
           .ant-spin-nested-loading{
             height:auto;
           }
           .footer-title {
             min-height: 0;
             margin-bottom: 0;
           }
           table { page-break-inside:auto }
           tr{ page-break-inside:avoid; page-break-after:auto }
          .chart-con>div{
            display: none;
          }
          .chart-con .chart-con-img{
            max-width: 100%;
            display: inline!important;
          }
        `
      }).then(() => {
        // setIsPrint(false)
      })
    }, 500)
  }

  useEffect(() => {
    
  }, [secondData.tableList]);

  const addDetailList = () => {
    setDetailList((prevDetailList: any) => {
      const filteredTableList = secondData.tableList.filter((item: any) => {
        return !prevDetailList.some((detail: any) => detail.qcCode === item.qcCode);
      });
      return prevDetailList.concat(filteredTableList);
    });
  }

  useEffect(() => {
    
    setTimeout(() => {
      let { qcReportItemDtoList, reportMasterData }: any = localStorage.getItem('qqualityMWSummaryDetail') ? JSON.parse(localStorage.getItem('qqualityMWSummaryDetail') || '') : {};
      setQcReportItemDtoList(qcReportItemDtoList || []);
      setReportMasterData(reportMasterData || {});
      getTable(qcReportItemDtoList || []);
    });
    
    return () => {
      localStorage.removeItem('qqualityMWSummaryDetail');
    };
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
            <Button onClick={() => onPrint(true)} >导出</Button>
            <Button type="primary" onClick={detailsSave}>保存</Button>
            {/* <Button type="danger">删除</Button> */}
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
            <div className={`print-page`} ref={pageRef}>
              <div className='title'>{ reportMasterData?.reportName }</div>
              <FirstTable />
              <SecondTable detailList={detailList} setDetailLists={setDetailLists} addDetailList={addDetailList} />
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
  /* .detail_check{
    pointer-events: none;
  } */
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
