import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommonLayout, { ChartCon } from './../../common/CommonLayout'
import { Table, Button, DatePicker, Radio, Spin,message } from 'antd'
import moment from 'src/vendors/moment'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { fileDownload } from "src/utils/file/file";
import { pdaUsageApi } from './api'
import { numberFormat } from 'src/utils/number/numberFormat';
export interface Props {
payload: any;
}
const RangePicker = DatePicker.RangePicker
export default observer(function PdaUsage(props: Props) {

  interface IQuery {
    startDate: string|any;
    endDate: string|any;
  }
  const [query, setQuery] = useState<IQuery>({
    // deptCode: '',
    startDate: moment().subtract(30, "days").format("YYYY-MM-DD"),
    endDate: moment().format('YYYY-MM-DD'),
  })

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([] as any[])
  interface IHeaderType {
    title: string;
    width: number;
    align: string;
    render?: (val: any, record: any, idx: number) => number;
    dataIndex: string;
  }
  const columns: ColumnProps<IHeaderType>[] = [
    {
      title: '序号',
      dataIndex: "",
					render: (text: any, record: any, index: number) => index + 1,
					align: "center",
					width: 50
    },
    {
      title: '科室名称',
      width: 150,
      dataIndex: 'wardName',
      align: 'center',
    },
    {
      title: '登记总次数',
      width: 90,
      dataIndex: 'totalcount',
      align: 'center',
      // render: (text: any, record: any, index: number) =>{
      //   return <span>{Number(record.goodcount)+Number(record.badcount)>0?Number(record.goodcount)+Number(record.badcount):''}</span>
      // }
    },
    {
      title: '好（次数）',
      width: 90,
      dataIndex: 'goodcount',
      align: 'center',
    },
    {
      title: '不好（次数）',
      width: 90,
      dataIndex: 'badcount',
      align: 'center',
    },
    {
      title: '运行好率（%）',
      width: 90,
      dataIndex: 'goodrate',
      align: 'center',
      render: (text: any, record: any, index: number) =>{
        // let percent = numberFormat((Number(record.goodcount)/(Number(record.goodcount)+Number(record.badcount)))*100,2)
        let percent = numberFormat(text*100,2)
        return <span>{Number(percent)>0?percent+'%':'0'}</span>
      }
    },
  ]

  const handleSearch = ()=>{
    getList()
  }
  const getList = (startDateStr?:string,endDateStr?:string)=>{
    let params = {
      startDateStr:startDateStr || query.startDate,
      endDateStr:endDateStr || query.endDate,
    }
    setLoading(true)
    pdaUsageApi.getPdaUsage(params).then(res=>{
			setLoading(false)
			if(res.code=='200'){
        setData(res.data || [])
			}
		}).catch(err=>{
			setLoading(false)
		})
  }
  /**
   * 导出excel
   */
  const exportTable = ()=>{
    let params = {
      startDateStr:query.startDate,
      endDateStr:query.endDate,
    }
    pdaUsageApi.exportData(params).then((res:any) => {
      fileDownload(res);
    });
  }
  useEffect(() => {
    getList()
  }, [])
  
return (
<Wrapper>
<CommonLayout
    header={<div>
      <span>时间段：</span>
      {<RangePicker
        className="content-item"
        style={{ width: 220 }}
        value={[moment(query.startDate), moment(query.endDate)]}
        
        onChange={(payload: any) => {
          setQuery({
            ...query,
            startDate: payload[0].format('YYYY-MM-DD'),
            endDate: payload[1].format('YYYY-MM-DD'),
          })
          getList(payload[0].format('YYYY-MM-DD'),payload[1].format('YYYY-MM-DD'))
        }}
        allowClear={false} />}
     
      <Button type="primary" onClick={handleSearch}>查询</Button>
      <Button style={{marginLeft:'15px'}} onClick={exportTable}>导出</Button>
      
    </div>}
    body={
    <Spin spinning={loading}>
      <div className="main-title">PDA使用情况统计</div>
      {<BaseTable
        bordered={false}
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
        surplusWidth={500}
        surplusHeight={270}
        columns={columns}
        dataSource={data} />}
     
    </Spin>} />
</Wrapper>
)
})
const Wrapper = styled.div``