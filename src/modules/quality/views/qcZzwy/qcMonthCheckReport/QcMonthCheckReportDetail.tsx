import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Button, message, Spin,Table } from 'src/vendors/antd'
import { useRef } from 'src/types/react'
import printing from 'printing'

import styled from 'styled-components'
import { ScrollBox } from 'src/components/common'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore } from 'src/stores'


export default observer(function QcMonthCheckReportDetail() {
  const pageRef: any = useRef<HTMLElement>()
  const [isPrint, setIsPrint] = useState(false)

  const onSave = ()=>{
  
  }
  const onPrint = (isPrint: boolean) => {
    setIsPrint(isPrint)
    let printFun = isPrint ? printing : printing.preview
    setTimeout(() => {
      printFun(pageRef.current, {
        // 插入所有link和style标签到打印，默认是false
        injectGlobalCss: true,
        // 指定扫描样式，默认是true（全部）
        scanStyles: false,
        css: `
           .ant-btn {
             display: none;
           }
           .print-page {
             box-shadow: none;
             -webkit-print-color-adjust: exact;
             margin: 0 auto;
           }
           .page-title {
             min-height: 20px;
             padding: 0px 30px 20px;
           }
           .page-title .title {
             text-align: center;
             margin-right: 0;
           }
           table, img {
             page-break-inside: avoid;
           }
           pre {
            page-break-after: avoid;
           }
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
        setIsPrint(false)
      })
    }, 500)
  }

  const getTableColumns = () => {
    let columns: any = [
      { title: ' 项目 ', key: 'month',  dataIndex: 'month',align: 'center' },
      { title: '护理部目标值(%)',width:60, key: 'shouldCheckNum', dataIndex: 'shouldCheckNum', align: 'center' },
      {
        title: '科室目标值(%)',width:60, key: 'actualCheckNum', dataIndex: 'actualCheckNum', align: 'center',
        // render: (datas: any, record: any) => {
        //   return (isInput ? <Input onPressEnter={(e) => onhandleBlur(e.target, record)} onBlur={(e) => onhandleBlur(e.target, record)} className={'editIput'} defaultValue={datas} /> :
        //     <div className={'divlist'} onClick={toggleEdit}>{datas}</div>
        //   )
        // }
      },
      { title: '检查及格率(%)', key: 'checkRate', dataIndex: 'checkRate', align: 'center' },
      { title: '评估人', key: 'checkRate1', dataIndex: 'checkRate1', align: 'center' },
      { title: '需改进条目', key: 'checkRate2', dataIndex: 'checkRate2', align: 'center' },
      { 
        title: '单项及格率(%)', 
        align: 'center',
        children:[
          { title: '上个月', key: 'checkRate3', dataIndex: 'checkRate3', align: 'center' },
          { title: '当月', key: 'checkRate4', dataIndex: 'checkRate4', align: 'center' },
        ]
      },
    ];

    return columns
  }
  const getTableData = ()=>{
    return [{},{},{}]
  }
  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '月度质控检查总结报告', link: '/qcOneHj/月度质控检查总结报告?qcLevel=1' }, { name: '报告详情', link: '' }]} />
        <div className='title'>{'2023年消化内科5月护理质量检查总结'}</div>
        <div className='aside'>
          <span>
            <span>状态：待保存</span>
            <span>创建人：张三</span>
            <span>创建时间：2021-11-12 18:12:20</span>
            
          </span>
        </div>
        <div className='tool-con'>
          <Button onClick={() => onSave()} >保存</Button>
          <Button onClick={() => onPrint(true)} >导出</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        {/* <Spin spinning={spinning} > */}
          <Page ref={pageRef} className='print-page'>
            <div style={{ fontSize: '30px', fontWeight: 700, textAlign: 'center', lineHeight: '60px' }}>{'5月护理质量检查总结'}</div>
            {/* <PageContent deductionData={deductionData} quarterRate={quarterRate} isPrint={isPrint} pageData={pageData} currentPage={currentPage} text={text} setText={setText}></PageContent> */}
            <>
            <div className='first-content-box'>
          <div className='first-title'>{`一、护士长实际查房率(表格)`}</div>
            <div className='second-content-table-table' style={{ width: '700px', margin: '0 auto' }}>
              <Table className='constom-table' rowClassName={() => 'editable-row'} 
                bordered dataSource={getTableData()} 
                columns={getTableColumns()} pagination={false}  />
            </div>
            </div>
            </>
          </Page>
        {/* </Spin> */}
      </ScrollCon>
    </Wrapper>
  )
})
const Wrapper = styled.div``
const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 20px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .aside {
    font-size: 12px;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;
    button {
      margin-left: 15px;
    }
  }
`
const Page = styled.div`
  width: 780px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);

  .first-title{
    font-size:20px;
    font-weight:bold;
  }
  .first-title,
  .second-content-table-title,
  .second-content-bar-title,
  .second-content-bolatu{
    line-height:30px;
    font-family: STHeiti !important;
    text-indent:20px;
    margin-bottom:35px;
    font-size:16px;

  }
  .second-content-table-title{
    text-align:center;
    
  }
  .constom-table{
    .ant-table-thead > tr > th{
      padding: 6px;
    }
    .ant-table-tbody > tr.editable-row > td{
      padding: 16px 6px;
    }
  }
  
`