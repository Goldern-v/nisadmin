import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseTable from "src/components/BaseTable";
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { fileDownload } from "src/utils/file/file";
import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import { dataClinialYear } from './DataClinialYear';
import { apiSpecialNurse } from '../../api/ApiSpecialNurse';
const Option = Select.Option;
export interface Props {
	payload: any;
}
export default observer(function SpecialClinialYear(props: Props) {

	const [deucOption, setdeucOption] = useState([]); // 科室信息
	const [yearPickShow, setYearPickShow] = useState(false);

	const [surplusHeight, setSurplusHeight]: any = useState(220);

	const [tableLoading, setTableLoading] = useState(false)
	const [quarterCons, setQuarterCons] = useState(['第一季度','第二季度','第三季度','第四季度']);
	const [tableColumn, setTableColumn] = useState([] as any);
	const [data2, setData2] = useState([] as any);
	
	let monthList: ColumnProps<any>[] | any= [], columnDay = {}
	
	const columns: ColumnProps<any>[] | any = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => index + 1,
			align: "center",
			width: 50
		},
		{
			title: () => {
				return (
					<div className='table-hed-left'>
						<span className='ml'>项目</span>
						<span className='mr'>日期</span>
					</div>
				)
			},
			className: 'hua-line',
			dataIndex: "name",
			align: "center",
			width: 100,
		},
	]	
		/**初始化表头 */
		const initColumn = ()=>{
			monthList = [] 
			for (let mm = 1; mm < 13; mm++) {
				monthList.push({
					title: mm+"月",
					dataIndex: 'month'+(mm>9?mm:'0'+mm),//dataClinialYear.yearChange?.toString()+'_'+(mm>9?mm:'0'+mm)+'_01_1',
					align: "center",
					width: 40,
				})
				if(mm%3===0){
					monthList.push({
						title: quarterCons[mm/3-1],
						dataIndex: "quarter"+mm/3,
						align: "center",
						width: 60,
					},)
				}
				
			}
			monthList.push({
				title: "合计",
				dataIndex: "total",
				align: "center",
				width: 50,
			})
			setTableColumn([...columns,...monthList])
		}

		/**初始化数据 */
		useEffect(() => {
			initColumn()
			getDeptList()
			// getTableList()
		}, [])

		/**获取特殊科室 */
	const getDeptList = ()=>{
		apiSpecialNurse.getSpecialDeptList({type:'clinicalIndicators'}).then(res=>{
			if(res.code == '200'){
				setdeucOption(res.data.deptList || [])
				dataClinialYear.deptCodeYear = res.data.defaultDept || ''
				dataClinialYear.deptNameYear = res.data.deptName || ''
				// 有获取到科室再获取表格数据
				getTableList()
			}
		}).catch(err=>{
			
		})
	}

		/**获取表格数据 */
		const getTableList = ()=>{
			setTableLoading(true)
			apiSpecialNurse.getYearTable(dataClinialYear.postObjYear).then(res=>{
				// initTableData(res.data.valueList)
				setTableLoading(false)
				let valueList = res.data.valueList || []

			if (valueList.length > 0) {

				initTableData(valueList, res.data)
			}
			}).catch(err=>{
				setTableLoading(false)
			})

		}

		const initTableData = (itemList: any, body: any) => {
			// console.log('itemList', itemList)
			setData2([])
			// itemList.length = 31
			setData2([...itemList])
		}
		/**导出 */
		const handlerExport = ()=>{
			apiSpecialNurse.exportYearTable(dataClinialYear.postObjYear).then(res=>{
				fileDownload(res);
			}).catch(err=>{

			})
		}

		
	return (
		<Wrapper>
			<PageHeader>
				<PageTitle>{'科室临床护理质量指标年度汇总'}</PageTitle>
				<Place />
				<>
					<span>年份：</span>
					<DatePicker className="mr-15"
						open={yearPickShow}
						onOpenChange={status => {
							setYearPickShow(status)
						}}
						onPanelChange={(value, mode) => {
							dataClinialYear.yearYear = value
							setYearPickShow(false)
							getTableList()
						}}
						mode="year"
						style={{ width: 120 }}
						value={dataClinialYear.yearYear}
						allowClear={true}
						placeholder='选择年份'
						format="YYYY"
					/>
				</>
				<span>科室：</span>
				<Select
					style={{ width: 180 }}
					labelInValue
					value={{ key: dataClinialYear.deptCodeYear }}
					onChange={(val: any) => {
						dataClinialYear.deptCodeYear = val.key
						dataClinialYear.deptNameYear = val.label
						getTableList()
					}}
				>
					{deucOption.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>

				<Button
					className="span"
					onClick={()=>getTableList()}
				>
					查询
				</Button>

				<Button
					className="span"
					onClick={handlerExport}
				>
					导出
				</Button>
			</PageHeader>
			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={tableLoading}
					dataSource={data2}
					columns={tableColumn}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					title={() => {return (<span>{dataClinialYear.deptNameYear}{dataClinialYear.postObjYear.year}年临床护理质量指标月度汇总</span>)}}
				/>
			</ScrollCon>
		</Wrapper>
	)
})
const Wrapper = styled.div`
.record-page-table{
	
	.ant-table-thead .hua-line {
		background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+) no-repeat 100% center;   
		box-sizing: border-box;
	}
	.ml{
	float: left;
	padding-left: 10px;
	}
	.mr{
	float: right;
	padding-right: 10px;
	}
	/* 头部标题 */
	.ant-table-title{
		text-align: center;
		font-size: 20px;
		color: #333;
		font-weight: bold;
	}
  }
.mr-15{
    margin-right: 15px;
  }
`
const ScrollCon = styled.div`
  flex: 1;
`;