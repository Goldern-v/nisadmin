import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommonLayout, { ChartCon } from '../../common/CommonLayout'
import { Table, Button, DatePicker, Radio, Spin,message } from 'antd'
import moment from 'src/vendors/moment'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { telFollowUpApi } from './api'
import { numberFormat } from 'src/utils/number/numberFormat';
import { fileDownload } from "src/utils/file/file";
export interface Props {}
const RangePicker = DatePicker.RangePicker
export default observer(function TelFollowUp(props: Props) {

  interface IQuery {
    startDate: string|any;
    endDate: string|any;
  }
  const [query, setQuery] = useState<IQuery>({
    startDate: moment().subtract(30, "days").format("YYYY-MM-DD HH:mm"),
    endDate: moment().format('YYYY-MM-DD HH:mm'),
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
      dataIndex: 'deptName',
      align: 'center',
    },
    {
      title: '出院人数',
      width: 90,
      dataIndex: 'outCount',
      align: 'center',
    },
    {
      title: '回访人次',
      width: 90,
      dataIndex: 'callBack',
      align: 'center',
    },
   
    {
      title: '回访率（%）',
      width: 90,
      dataIndex: 'callBackRate',
      align: 'center',
      render: (text: any, record: any, index: number) =>{
        let percent = numberFormat(text*100,2)
        return <span>{Number(percent)>0?percent+'%':'0'}</span>
      }
    },
  ]

  /**
   * 查询
   */
  const handleSearch = ()=>{
    getList()
  }

  /**
   * 导出excel
   */
  const exportTable = ()=>{
    let params = {
      startDateStr:query.startDate,
      endDateStr:query.endDate,
    }
    telFollowUpApi.exportData(params).then((res:any) => {
      fileDownload(res);
    });
  }

  /**
   * 获取表格数据
   * @param startDateStr 开始时间
   * @param endDateStr 结束时间
   */
  const getList = (startDateStr?:string,endDateStr?:string)=>{
    let params = {
      startDateStr:startDateStr || query.startDate,
      endDateStr:endDateStr || query.endDate,
    }
    setLoading(true)
    telFollowUpApi.getTelList(params).then((res:any)=>{
			
			if(res.code=='200'){

        setData(res.data || [])
			}
      setLoading(false)
		}).catch((err:any)=>{
			setLoading(false)
		})
  }

  useEffect(() => {
    getList()
  }, [])
  
return (
<Wrapper>
<CommonLayout
    header={<div>
      <span>时间段：</span>
      <RangePicker showTime={{format:"YYYY-MM-DD HH:mm"}}
        className="content-item"
        style={{ width: 350 }}
        value={[moment(query.startDate), moment(query.endDate)]}
        format="YYYY-MM-DD HH:mm"
        // onChange
        onOk = {(payload: any)=>{
          getList(payload[0].format('YYYY-MM-DD HH:mm'),payload[1].format('YYYY-MM-DD HH:mm'))

        }}
        onChange={(payload: any) => {
          setQuery({
            ...query,
            startDate: payload[0].format('YYYY-MM-DD HH:mm'),
            endDate: payload[1].format('YYYY-MM-DD HH:mm'),
          })
        }}
        allowClear={false} />
     
      <Button type="primary" onClick={handleSearch}>查询</Button>
      <Button style={{marginLeft:'15px'}} onClick={exportTable}>导出</Button>
      
    </div>}
    body={
    <Spin spinning={loading}>
      <div className="main-title">电话回访率统计</div>
      {<BaseTable
        rowClassName={(record, index) => {
          if(Object.values(record).indexOf('汇总')>-1){
            return 'fixedTr'
          }else{
            if (index % 2 == 0) return 'singleRow'
            else return 'evenRow'
          }
          
        }}
        bordered={false}
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
        surplusWidth={500}
        surplusHeight={270}
        columns={columns}
        dataSource={data}
        />}
    </Spin>} />
</Wrapper>
)
})
const Wrapper = styled.div`
.fixedTr{
  position: sticky;
  background-color: #ccc;
  font-size: 15px;
  z-index: 100000;
}
.singleRow, .evenRow {
    cursor: pointer;
  }
  .evenRow {
    background-color: rgba(247, 247, 247, 1);
  }
`