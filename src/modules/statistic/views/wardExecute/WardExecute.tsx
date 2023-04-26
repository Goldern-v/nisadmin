import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseTable from "src/components/BaseTable";
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { numberFormat } from 'src/utils/number/numberFormat';
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import statisticsApi from '../../api/StatisticsApi';
export interface Props {
	payload: any;
}
const Option = Select.Option;
export default observer(function WardExecute(props: Props) {
	const [tableLoading, setTableLoading] = useState(false);
	const [surplusHeight, setSurplusHeight]: any = useState(245);
	const [data2, setData2] = useState([] as any);
	const [startDate, setStartDate] = useState(moment().subtract(30, "days"));
	const [endDate, setEndDate] = useState(moment());
	const [wardCode, setWardCode]:any = useState('全院');
	const { deptList } = authStore
	/**表头变量 */
	const columns: ColumnProps<any>[] | any = [
		{
			title: '序号',
			align: "center",
			width: 30,
			render: (value: any, row: any, index: number) => {
				return <span>{index+1}</span>
			}
		},
		{
			title: '执行单类型',
			align: "center",
			width: 100,
			dataIndex:'executeType'
		},
		{
			title: '已完成',
			align: "center",
			width: 50,
			dataIndex:'execute',
			render:(value: any, row: any, index: number)=>{
				if(row.unExecute=='' && row.totalNum==''){
					return <span>0</span>
				}
				return <span>{numberFormat((Number(row.totalNum)-Number(row.unExecute)),0) || 0}</span>
			}
		},
		{
			title: '应完成',
			align: "center",
			width: 50,
			dataIndex:'totalNum',
			render:(value: any, row: any, index: number)=>{
				if(value==''){
					return <span>0</span>
				}
				return <span>{value}</span>
			}
		},
		{
			title: '完成率',
			align: "center",
			width: 50,
			dataIndex:'percent',
			render: (value: any, row: any, index: number) => {
				if(row.unExecute=='' && row.totalNum==''){
					return <span>0%</span>
				}
				return <span>{numberFormat((Number(row.totalNum)-Number(row.unExecute))/Number(row.totalNum)*100,2) || 0}%</span>
			}
		},
	]

	useEffect(()=>{
		getTableList(wardCode,startDate,endDate)
	},[])


	const getTableList = (wardCode?:string,startDate?:any,endDate?:any)=>{
		setTableLoading(true)
		statisticsApi.getWardExecuteHomeStatus({
			wardCode,
			startDate:moment(startDate).format("YYYY-MM-DD"),
			endDate:moment(endDate).format("YYYY-MM-DD")
		}).then(res=>{
			setTableLoading(false)
			let data = res.data || []
			setData2([...data])
		}).catch(err=>{
			setTableLoading(false)
		})
	}

	return (
		<Wrapper>
			<PageHeader>
				<PageTitle>{'执行单完成情况'}</PageTitle>
				<Place />
				<span>日期：</span>
				<DatePicker.RangePicker 
				style={{width:'230px'}}
				value={[moment(startDate), moment(endDate)]}
				 onChange={(date:any)=>{
					setStartDate(date[0].format("YYYY-MM-DD"))
					setEndDate(date[1].format("YYYY-MM-DD"))
					getTableList(wardCode,date[0],date[1])
				}} />
				<span style={{marginLeft:'15px'}}>科室：</span>
				<Select
					style={{ width: 180 }}
					value={wardCode}
					onChange={(val: any) => {
						setWardCode(val)
						getTableList(val,startDate,endDate)
					}}
				>
					<Option value={'全院'} key={'全院'}>全院</Option>
					{deptList.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>

				<Button
					className="span"
					type="primary"
					onClick={() => getTableList(wardCode,startDate,endDate)}
				>
					查询
				</Button>
				
				
			</PageHeader>
			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={tableLoading}
					dataSource={data2}
					columns={columns.filter((item: any) => item)}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					title={() => { return (<span>执行单完成情况</span>) }}
				/>
			</ScrollCon>
		</Wrapper>
	)
})
const Wrapper = styled.div`
	.record-page-table{
		/* 头部标题 */
		.ant-table-title{
			text-align: center;
			font-size: 21px;
			color: #333;
			font-weight: bold;
		}
	}
`
const ScrollCon = styled.div`
flex: 1;
`