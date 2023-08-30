import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Button, message, Spin,Table,InputNumber,Input,DatePicker } from 'src/vendors/antd'
import { useRef } from 'src/types/react'
import printing from 'printing'
import moment from 'moment'

import styled from 'styled-components'
import { ScrollBox } from 'src/components/common'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore } from 'src/stores'
import SelectReport from './SelectReport'
import { qcMonthCheckData } from './qcMonthCheckData'
import { qcZzwyApi } from '../qcZzwyApi'


export default observer(function QcMonthCheckReportDetail() {
  const pageRef: any = useRef<HTMLElement>()
  const [isPrint, setIsPrint] = useState(false)
  const [text1, setText1] = useState('');
  const [selectTableModal, setSelectTableModal] = useState(false);

  const onSave = ()=>{
    // console.log(qcMonthCheckData.ZZWY_YDZKJCZJ_L1_001)
    // console.log(qcMonthCheckData.ZZWY_YDZKJCZJ_L1_002)
    // console.log(qcMonthCheckData.ZZWY_YDZKJCZJ_L1_003)
    // console.log(qcMonthCheckData.ZZWY_YDZKJCZJ_L1_004)
    let qcReportItemDtoList = qcMonthCheckData.qcReportItemDtoList || []
    let qcReportItemDataList:any = []
    qcReportItemDtoList.map((it:any)=>{
      // it.qcReportItemDataList=[]
      qcReportItemDataList.push({
        itemCode:it.itemCode,
        itemValue:JSON.stringify(qcMonthCheckData[it.itemCode]),
        reportItemId:it.id,
        reportMasterId:qcMonthCheckData.reportMasterData.id

      })
    })
    let paramter = {
      ...qcMonthCheckData.reportMasterData,
      hospitalCode:'zzwy',
      templateName:'月度质控检查总结报告',
      qcReportItemDataList
    }
    // console.log(paramter)
    qcZzwyApi.saveQcReport(paramter).then(res=>{
      message.success('保存成功')
      appStore.history.goBack()
    }).catch(err=>{

    })
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

  const onhandleBlur = (val:any,record:any,key:string)=>{
    // console.log(val)
    record[key] = val
  }

  const getTableColumns = () => {
    let columns: any = [
      { title: ' 项目 ', dataIndex: 'qcName',align: 'center',width:100 },
      { title: '护理部目标值(%)',width:50, dataIndex: 'k1', align: 'center',
        render: (datas: any, record: any) => {
              return (<InputNumber className='table-input' onBlur={(e) => onhandleBlur(e.target.value, record,'k1')} defaultValue={datas} />)
            }
      },
      {
        title: '科室目标值(%)',width:50,  dataIndex: 'k2', align: 'center',
        render: (datas: any, record: any) => {
          return (<InputNumber className='table-input' onBlur={(e) => onhandleBlur(e.target.value, record,'k2')} defaultValue={datas} />)
        }
      },
      { title: '检查及格率(%)', dataIndex: 'passRate', align: 'center' },
      { title: '评估人',  dataIndex: 'k3', align: 'center', width:80,
      render: (datas: any, record: any) => {
        return (<Input className='table-input' onBlur={(e) => onhandleBlur(e.target.value, record,'k3')} defaultValue={datas} />)
      } },
      { title: '需改进条目', dataIndex: 'k4', align: 'center',
      render: (datas: any, record: any) => {
        return (<Input className='table-input' onBlur={(e) => onhandleBlur(e.target.value, record,'k4')} defaultValue={datas} />)
      } },
      { 
        title: '单项及格率(%)', 
        align: 'center',
        children:[
          { title: '上个月',  dataIndex: 'k5', align: 'center',
          render: (datas: any, record: any) => {
            return (<InputNumber className='table-input' onBlur={(e) => onhandleBlur(e.target.value, record,'k5')} defaultValue={datas} />)
          } },
          { title: '当月',  dataIndex: 'k6', align: 'center',
          render: (datas: any, record: any) => {
            return (<InputNumber className='table-input' onBlur={(e) => onhandleBlur(e.target.value, record,'k6')} defaultValue={datas} />)
          } },
        ]
      },
    ];

    return columns
  }
  const getTableData = ()=>{
    return [{},{},{}]
  }

  /**本月质量改进项目 */
  const getTableColumns2 = ()=>{
    return [
      {
        title: 'keshi', dataIndex: 'actualCheckNum2', align: 'center',width:250,
        render: (datas: any, record: any) => {
          return (<div>
          <span style={{width:'100px'}}>日期：</span>
          <DatePicker 
              // className='table-input'
              onChange={(date:any)=>{
                qcMonthCheckData.ZZWY_YDZKJCZJ_L1_003.date = date.format('YYYY-MM-DD')
              }}
          /></div>)
        }
      },
        {
          title: 'keshi2', dataIndex: 'actualCheckNum3', 
          // align: 'center',
          render: (datas: any, record: any) => {
            return (<div>
            <span style={{width:'100px'}}>改进项目:</span>
            <Button onClick={()=>{setSelectTableModal(true)}}>选择项目</Button>
              <div>
                {qcMonthCheckData.templateData.itemCodeObj.map((it:any)=>{
                  return <span style={{marginRight:'15px'}}>{it.simpleName}</span>
                })

                }
                
              </div>
            {/* <Input.TextArea 
                defaultValue={datas} 
            /> */}
            </div>)
          }
      },
    ] as any
  }
  useEffect(() => {
    qcMonthCheckData.getInspectionSummary()
    /**创建分析报告 */
    createQcReport()
  }, [])

  /**创建分析报告 */
  const createQcReport = ()=>{
    qcZzwyApi.createQcReport({"hospitalCode":"zzwy",
    "templateName":"月度质控检查总结报告","reportName":"Vicky",
    "reportLevel":"1","reportYear":2023,"reportMonth":8,
    "startDate":"2023-08-01","endDate":"2023-08-31","wardCode":"236",
    "wardName":"七病区"}).then(res=>{
      qcMonthCheckData.reportMasterData = res.data.reportMasterData || {}
      qcMonthCheckData.qcReportItemDtoList = res.data.qcReportItemDtoList || []
    }).catch(err=>{

    })
  }
  
  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '月度质控检查总结报告', link: '/qcOneHj/月度质控检查总结报告?qcLevel=1' }, { name: '报告详情', link: '' }]} />
        <div className='title'>{qcMonthCheckData.reportMasterData?.reportYear}年
        {qcMonthCheckData.reportMasterData?.wardName}{qcMonthCheckData.reportMasterData?.reportMonth}月
        {qcMonthCheckData.reportMasterData?.reportName}
    
        {/* {qcMonthCheckData.createModalData.deptCode.label}{moment(qcMonthCheckData.createModalData.month).month()+1}月{qcMonthCheckData.createModalData.name} */}
        {/* {'2023年消化内科5月护理质量检查总结'} */}
        </div>
        <div className='aside'>
          <span>
            <span>状态：待保存</span>
            <span>创建人：{qcMonthCheckData.reportMasterData?.creatorName || ''}</span>
            <span>创建时间：{qcMonthCheckData.reportMasterData?.createTime || ''}</span>
            
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
            <div style={{ fontSize: '30px', fontWeight: 700, textAlign: 'center', lineHeight: '60px' }}>
            {qcMonthCheckData.reportMasterData?.reportMonth}月{qcMonthCheckData.reportMasterData?.reportName}
            {/* {moment(qcMonthCheckData.createModalData.month).month()+1}月{qcMonthCheckData.createModalData.name} */}
              {/* {'5月护理质量检查总结'} */}
              </div>
            {/* <PageContent deductionData={deductionData} quarterRate={quarterRate} isPrint={isPrint} pageData={pageData} currentPage={currentPage} text={text} setText={setText}></PageContent> */}
            <>
            <div className='first-content-box'>
              <div className='first-title'>{`一、检查情况`}</div>
              <div className='second-content-table-table' style={{ width: '700px', margin: '0 auto' }}>
                <Table className='constom-table' rowClassName={() => 'editable-row'} 
                  bordered dataSource={qcMonthCheckData.ZZWY_YDZKJCZJ_L1_001.tableList|| []} 
                  columns={getTableColumns()} pagination={false}  />
              </div>
            </div>
            <div className='first-content-box'>
              <div className='first-title'>{`二、小结`}</div>
              <Input.TextArea className='print-page__ipt' autosize={{ minRows: 3}} 
              // value={text1} 
              // onChange={ (e: any) => setText1(e.target.value)}
              onBlur={(e)=>qcMonthCheckData.ZZWY_YDZKJCZJ_L1_002.summary = e.target.value}
               />
            </div>
            <div className='first-content-box'>
              <div className='first-title'>{`三、本月质量改进项目`}</div>
              <div className='second-content-table-table' style={{ width: '700px', margin: '0 auto' }}>
                <Table className='constom-table' rowClassName={() => 'editable-row'} 
                  bordered dataSource={[{}]}  showHeader={false}
                  columns={getTableColumns2()} pagination={false}
                  footer={() => {
                    return (<div style={{width:'100%',display:'flex'}}>
                      <span style={{display:'block',width:'90px'}}>改进目标:</span>
                      <Input.TextArea autosize={{ minRows: 1}}
                      onBlur={(e)=>qcMonthCheckData.ZZWY_YDZKJCZJ_L1_003.improveGoals = e.target.value} />

                    </div>)
                  }}
                  />
              </div>
              <div className='second-content-table-table second-box' style={{ width: '700px', margin: '20px auto' }}>
                <h4 className='second-title'>计划阶段（P）</h4>
                <p>（一）检查情况：</p>
                <Input 
                onBlur={(e)=>qcMonthCheckData.ZZWY_YDZKJCZJ_L1_003.check = e.target.value} />
                <p>（二）原因分析：</p>
                <div>
                  鱼骨图位置
                </div>
                <h4 className='second-title'>执行阶段（D）</h4>
                <p>整改措施：</p>
                <Input.TextArea autosize={{ minRows: 5}} 
                onBlur={(e)=>qcMonthCheckData.ZZWY_YDZKJCZJ_L1_003.steps = e.target.value} />
              </div>
            </div>
            <div className='first-content-box'>
              <div className='first-title'>{`四、效果评价及标准化结果`}</div>
              <div className='second-content-table-table second-box' style={{ width: '700px', margin: '20px auto' }}>
                <h4 className='second-title'>上个月专项检查不达标效果评价（C）</h4>
                <div>柱状图</div>
                {/* <h4 className='second-title'>请输入</h4> */}
                <Input.TextArea placeholder='请输入……' autosize={{ minRows: 5}}
                onBlur={(e)=>qcMonthCheckData.ZZWY_YDZKJCZJ_L1_004.textArea = e.target.value} />
                
              </div>
            </div>
            </>
          </Page>
        {/* </Spin> */}
      </ScrollCon>
      <SelectReport 
      visible={selectTableModal}
      handleOk={()=>setSelectTableModal(false)} 
      handleCancel={()=>setSelectTableModal(false)} />

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
    margin-bottom:20px;
    font-size:16px;

  }
  .second-content-table-title{
    text-align:center;
    
  }

  /* 二级题目 */
  .second-box{
    border: 1px solid;
    /* margin-top: 20px; */
    padding: 20px 14px;
    p,h4{
      line-height: 1;
      margin-bottom: 0;
    }
    p{
      margin: 12px 0;
    }
  }
  .second-title{
    font-size: 14px;
    font-weight: bold;
  }
  .constom-table{
    .ant-table-thead > tr > th{
      padding: 6px;
    }
    .ant-table-tbody > tr.editable-row > td{
      padding: 16px 6px;
    }
  }
  .print-page__ipt {
    margin: 0px 20px 15px;
    resize: none;
    width: calc(100% - 40px);
  }

  /* 输入框样式 */
  .ant-input-number-handler-wrap {
    display: none;
  }
  .table-input {
    border: 0 !important; // 去除未选中状态边框
    outline: none !important; // 去除选中状态边框
    :focus {
      border: 0 !important; // 去除未选中状态边框
      outline: none !important; // 去除选中状态边框
      background-color: rgba(0, 0, 0, 0) !important; // 透明背景
    }

  }
  
`