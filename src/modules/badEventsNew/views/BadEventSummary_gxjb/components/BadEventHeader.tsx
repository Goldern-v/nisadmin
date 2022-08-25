import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { PageTitle, Place, PageHeader } from 'src/components/common';
import { Button, Select } from 'antd';
import { badEventData_gxjb } from '../BadEvent_gxjb';
import { appStore, authStore } from "src/stores";


import { quarterList } from 'src/enums/date'
const Option = Select.Option
interface Props { }
export default observer(function BadEventHeader(props: Props) {

	const defParams = () => {
		let quarter = moment().quarter()
		return {
			type: '',
			quarter: quarter,
			year: moment().year(),
			deptCode: '',
			eventType: ''
		}
	}
	const [params, setParams] = useState(defParams)
	const [loading, setLoading] = useState(false)
	const [deptCode, setDeptCode] = useState('') //选中的科室
	const [deptList, setDeptList] = useState<Array<{}>>([]) //科室列表
	const [eventList, setEventList] = useState<Array<{}>>([]); // 不良事件列表
	const [selectEvent, setSelectEvent] = useState({ key: '', label: '全部' });

	// const [pathName, setPathName] = useState('');

	const pathname = appStore.history.location.pathname



	useEffect(() => {
		// setPathName(appStore.history.location.pathname)
		console.log(pathname)
		if (pathname.indexOf('case') > -1) {
			console.log('我是不良事件例数统计表')
		} else if (pathname.indexOf('quarter') > -1) {
			console.log('我是季度上报汇总表')
		}
		setEventList([
			{ id: 1, name: '事件1' },
			{ id: 2, name: '事件222' },
			{ id: 3, name: '事件333' },
			{ id: 4, name: '事件44' },
			{ id: 5, name: '事件54' },
			{ id: 6, name: '事件76' },
			{ id: 7, name: '事件890' },
		])
	}, [])



	return (
		<Wrapper>
			<PageHeader>
				<PageTitle className='page-title'>
					{`${params.year}年`}{`${quarterList[badEventData_gxjb.currentQuarter - 1]}`}广西壮族自治区江滨医院
					<div>{`${badEventData_gxjb.eventType.key != '' ? badEventData_gxjb.eventType.label + '不良事件上报汇总表' : ''}`}</div>
				</PageTitle>
				<Place />
				<RightIcon>
					{
						pathname.indexOf('classify') > -1 ? (<>
							<span className="span">汇总类型：</span>
							<Select
								showSearch
								filterOption={(input: any, option: any) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val: any) => {
									badEventData_gxjb.eventType = val
									badEventData_gxjb.onload()
								}}
								labelInValue
								value={badEventData_gxjb.eventType}
								style={{ width: 140 }}
							>
								{
									badEventData_gxjb.eventTypeList.map((v: any, i: number) => (
										<Option value={v.code} key={v.code}>{v.name}</Option>
									))
								}
							</Select></>) : (<>
								<span className="span">事件类型：</span>
								<Select
									style={{ width: 100 }}
									value={deptCode}
								>
									{deptList.map((item: any) => {
										return <Option value={item.code} key={item.code}>{item.name}</Option>
									})}
								</Select>
							</>)
					}


					<span className="span">季度：</span>
					<Select value={badEventData_gxjb.currentQuarter}
						onChange={(val: any) => {
							badEventData_gxjb.currentQuarter = val
							badEventData_gxjb.onload()
						}}
					>
						{
							quarterList.map((v: any, i: number) => (
								<Option key={i} value={i + 1}>{v}</Option>
							))
						}
					</Select>

					<span className="span">科室：</span>
					<Select
						style={{ width: 180 }}
						value={badEventData_gxjb.selectDept}
						onChange={(val:string)=>{
							badEventData_gxjb.selectDept = val
							badEventData_gxjb.onload()
						}}
					>
						{badEventData_gxjb.deptList.map((item: any) => {
							return <Option value={item.code} key={item.code}>{item.name}</Option>
						})}
					</Select>
					{
						pathname.indexOf('classify') > -1 && (<>
							<span className="span">事件类型：</span>
							<Select
								style={{ width: 100 }}
								value={deptCode}
							>
								{deptList.map((item: any) => {
									return <Option value={item.code} key={item.code}>{item.name}</Option>
								})}
							</Select>
						</>)
					}


					<Button
						type="primary"
						className="span"
						onClick={() => badEventData_gxjb.onload()}
					>
						查询
					</Button>

					<Button
						className="span"
						onClick={() => badEventData_gxjb.export()}
					>
						导出
					</Button>
				</RightIcon>
			</PageHeader>

		</Wrapper>
	)
})

const Wrapper = styled.div`
.page-title{
	font-size: 17px !important;
}
.page-title div{
  font-size:13px;
}
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 0 15px 0 15px;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    margin-left: 15px;
  }
`;