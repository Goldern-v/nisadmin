import React, { useEffect, useState, useRef, MutableRefObject } from 'react'
// import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import store, { authStore, appStore } from 'src/stores';
import qs from 'qs'

import {
	ColumnProps,
	message,
	Input,
	Select,
	DatePicker,
	Popover,
	Button,
	Modal,
	InputNumber,
	Row, Col,
} from "src/vendors/antd";
import { clinicalApi } from '../ClinicalApi';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker
export interface Props {
	payload: any;
}
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function DeptAysi(props: Props) {

	// 搬运start
	const [pageLoading, setPageLoading] = useState(false);
	const [surplusHeight, setSurplusHeight]: any = useState(220);

	const [yearPickShow, setYearPickShow] = useState(false);

	const [selectType, setSelectType] = useState('0');//选择的类型
	const [reportTypes, setReportTypes] = useState([
		{ title: "月度", type: '0' },
		{ title: "季度", type: '1' },
		{ title: "年度", type: '2' }
	]);

  // 科室
  const [deptList, setDeptList] = useState([] as any) ;
	const [modalDeptList, setModalDeptList] = useState([]);
  const [deptCode, setDeptCode] = useState('');
  const [deptName, setDeptName] = useState('');

	const [tableList, setTableList] = useState([]);
	const [selectYear, setSelectYear] = useState(moment() as undefined | moment.Moment);
	// modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalReportType, setModalReportType] = useState('0');
	const [modalDate, setModalDate] = useState(['','']);
  // modal 科室
  const [modalDeptCode, setModalDeptCode] = useState('');
  const [modalDeptName, setModalDeptName] = useState('');

	const { history } = appStore

	const reportName: MutableRefObject<any> = useRef('');
	// end

	const columns3: ColumnProps<any>[] | any = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => index + 1,
			align: "center",
			width: 30
		},
		{
			title: "名称",
			dataIndex: "title",
			align: "center",
			width: 120
		},
		{
			title: "科室",
			dataIndex: "deptName",
			align: "center",
			width: 120
		},
		{
			title: "类型",
			dataIndex: "reportType",
			render: (text: any, record: any, index: number) => {
				if (text == '0') {
					return <span>月度报告</span>
				} else if (text == '1') {
					return <span>季度报告</span>
				} else if (text == '2') {
					return <span>年度报告</span>
				}
			},
			align: "center",
			width: 70
		},
		{
			title: "统计时间",
			dataIndex: "beginDateStr",
			render: (text: any, record: any, index: number) => {
				return <span>{text}~{record['endDateStr']}</span>
			},
			align: "center",
			width: 150
		},
		{
			title: "创建时间",
			dataIndex: "createDate",
			align: "center",
			width: 100
		},
	]
	let columns: ColumnProps<any>[] | any =[]
	// if(authStore.isDepartment){
		columns = [
			...columns3,
			{
				title: "创建人",
				dataIndex: "createName",
				align: "center",
				width: 70
			},
			{
				title: "操作",
				render: (text: any, record: any, index: number) => {
					return (
						<DoCon>
							<span onClick={() => onDoubleClick(record)}>查看</span>
						</DoCon>
					)
				},
				align: "center",
				width: 60
			},
	
		]
	// }else{
	// 	columns = [
	// 		...columns3,
	// 		{
	// 			title: "操作",
	// 			render: (text: any, record: any, index: number) => {
	// 				return (
	// 					<DoCon>
	// 						<span onClick={() => onDoubleClick(record)}>查看</span>
	// 					</DoCon>
	// 				)
	// 			},
	// 			align: "center",
	// 			width: 60
	// 		},
	
	// 	]
	// }
	useEffect(() => {
		getTableList()
    getDeptList()
	}, [])

	const getTableList = (toYear?: undefined | moment.Moment, toType?: string,toDeptCode?:string) => {
		setPageLoading(true)
		clinicalApi.getTableDataWhole({
			year: toYear?.year() || selectYear?.year(),
			type: toType || selectType,
      deptCode:toDeptCode==undefined?deptCode : toDeptCode
		}).then(res => {
			setTableList(res.data || [])
			setPageLoading(false)
		}).catch(err => {
			setPageLoading(false)
		})
	}

  /**获取特殊科室 */
	const getDeptList = ()=>{
		// setPageLoading(true)
		clinicalApi.getnursingAll().then(res=>{
			// setPageLoading(false)
			if(res.code == '200'){
				
				
        // setDeptCode('')
        // setDeptName(res.data.deptName || '')
        setModalDeptList(res.data.deptList || []) //新建科室选择
        setModalDeptCode(res.data.defaultDept || '')
        setModalDeptName(res.data.deptName || '')

				// 查询数据有‘全部’科室
				setDeptList([{code:'',name:'全部'},...res.data.deptList])
				// dataWholeAysi.deptCode = ''

				// 有获取到科室再获取表格数据
				// getTableList()
			}
		}).catch(err=>{
			// setPageLoading(false)
		})
	}

  /**查询 */
  const searchData = ()=>{
    getTableList()
  }


	// 点击查看
	const onDoubleClick = (record: any) => {
		sessionStorage.setItem('myreport',qs.stringify(record))
		store.appStore.history.push(`/goodOrBadDeptPrint`)
	}

	// 点击新建
	const handelNewModal = () => {
		setModalVisible(true)
	}
	// 点击确定
	const handleOk = () => {
		if(!reportName.current.state.value || reportName.current.state.value.trim().length===0){
			message.warning('请输入报告名称')
			return false
		}
		if(modalDate[0]==''){
			message.warning('请选择报告时间')
			return false
		}
		// 判断是否在同一个月
		if(modalReportType=='0'){
			if(moment(modalDate[0]).month()!==moment(modalDate[1]).month()){
				message.warning('报告时间须在同个月度范围')
				return false
			}
		}
		if(modalReportType=='1'){
			if(moment(modalDate[0]).quarter()!==moment(modalDate[1]).quarter()){
				message.warning('报告时间须在同个季度范围')
				return false
			}
		}
		if(modalReportType=='3'){
			if(moment(modalDate[0]).year()!==moment(modalDate[1]).year()){
				message.warning('报告时间须在同个年度范围')
				return false
			}
		}
		let belongsCycle = null
		if(modalReportType=='0'){
			belongsCycle = moment(modalDate[0]).format('MM')
		}
		else if(modalReportType=='1'){
			belongsCycle = moment(modalDate[0]).quarter()
		}else if(modalReportType=='2'){
			belongsCycle = moment(modalDate[0]).format('YYYY')
		}
		let params = {
			"title": reportName.current.state.value,
			"createName": authStore.user?.empName,
			"createDate": moment().format('YYYY-MM-DD'),
			"reportType": modalReportType,
			"beginDateStr": modalDate[0],
			"endDateStr": modalDate[1],
			"belongsCycle": belongsCycle,
			"belongsYear": moment(modalDate[0]).format('YYYY'),
      "deptCode":modalDeptCode,
      "deptName":modalDeptName,
		}
		clinicalApi.createNewReport(params).then(res=>{
			// console.log(res)
			setModalVisible(false)
			sessionStorage.setItem('myreport',qs.stringify(res.data))
			history.push(`/goodOrBadDeptPrint?${qs.stringify(res.data)}`)
		}).catch(err=>{
			setModalVisible(false)
		})
		
	}
	// modal取消
	const handleCancel = () => {
		setModalVisible(false)
	}

	return (
		<Wrapper>
			{/* <ClinicalHeaderByVicky title='科室临床护理质量指标季度汇总' /> */}
			<div className='clinical-header'>
				<LeftIcon className='clinical-title'>
					<PageTitle>科室护理质量分析</PageTitle>
				</LeftIcon>
				<RightIcon className='clinical-head-right'>
					<>
						<span>年份：</span>
						<DatePicker className="mr-15"
							open={yearPickShow}
							onOpenChange={status => {

								setYearPickShow(status)
							}}
							onPanelChange={(value, mode) => {
								// console.log(value, mode)
								// clinicalData.year = value
								setSelectYear(value)
								setYearPickShow(false)
								getTableList(value, selectType)
							}}
							mode="year"
							style={{ width: 120 }}
							value={selectYear}
							allowClear={true}
							placeholder='选择年份'
							format="YYYY" 
						/>
					</>

					<>
						<span>报告类型：</span>
						<Select className="mr-15"
							style={{ width: 120 }}
							value={selectType}
							onChange={(val: any) => {
								setSelectType(val)
								getTableList(selectYear, val)
							}}
						>
							{
								reportTypes.map((v: any, i: number) => (
									<Option key={v.type} value={v.type}>{v.title}</Option>
								))
							}
						</Select>
					</>
          <span>科室：</span>
				<Select
					labelInValue
					style={{ width: 180 }}
					value={{ key: deptCode }}
					onChange={(val: any) => {
						// setSelectDeptCode(val.key)
						// dataWholeAysi.deptCode = val.key
            setDeptCode(val.key)
            setDeptName(val.label)
						// datasSumMonth.deptName = val.label
						getTableList(selectYear,selectType,val.key)
					}}
				>
					{deptList.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>


					<Button
						className="span"
            onClick={searchData}
					>
						查询
					</Button>
					{/* {authStore.isDepartment &&  */}
					<Button
						type="primary"
						className="span"
						onClick={handelNewModal}
					>
						新建
					</Button>
					 {/* } */}
				</RightIcon>
			</div>

			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={pageLoading}
					dataSource={tableList}
					columns={columns.filter((item: any) => item)}
					surplusHeight={surplusHeight}
					surplusWidth={300}
				/>
			</ScrollCon>
			<MModal>
				<Modal
					title="新建科室护理质量分析报告"
					visible={modalVisible}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<div className='modal-content'>
						<Row className="item-row">
							<Col span={4}>
								<div className="label">报告名称:</div>
							</Col>
							<Col span={16}>
								<Input ref={reportName} />
							</Col>
						</Row>
						<Row className="item-row" style={{ marginTop: '15px' }}>
							<Col span={4}>
								<div className="label">报告类型:</div>
							</Col>
							<Col span={16}>
								<Select
									style={{ width: '100%' }}
									value={modalReportType}
									onChange={(val: any) => {
										setModalReportType(val)
										// clinicalData.onload(报告类型)
									}}
								>
									{
										reportTypes.map((v: any, i: number) => (
											<Option key={v.type} value={v.type}>{v.title}</Option>
										))
									}
								</Select>
							</Col>
						</Row>
						<Row className="item-row" style={{ marginTop: '15px' }}>
							<Col span={4}>
								<div className="label">报告时间:</div>
							</Col>
							<Col span={16}>
								<RangePicker onChange={(dates: any, dateStrings: any) => {
									setModalDate(dateStrings)
								}} />
							</Col>
						</Row>
            <Row className="item-row" style={{ marginTop: '15px' }}>
							<Col span={4}>
								<div className="label">报告科室:</div>
							</Col>
							<Col span={16}>
								<Select
									labelInValue
									style={{ width: '100%' }}
									value={{ key: modalDeptCode }}
									onChange={(val: any) => {
										// modalDeptCode.deptCode = val.key
										setModalDeptCode(val.key)
                    setModalDeptName(val.label)
										// dataClinialMonth.deptName = val.label
									}}
								>
									{modalDeptList.map((item: any) => {
										return <Option value={item.code} key={item.code}>{item.name}</Option>
									})}
								</Select>
							</Col>
						</Row>
						<Row className="item-row" style={{ marginTop: '15px' }}>
							<Col span={4}>
								<div className="label">创建人:</div>
							</Col>
							<Col span={16}>
								<Input disabled value={`${authStore.user?.empName || ''} ${moment().format('YYYY-MM-DD')}`} />
							</Col>
						</Row>
					</div>
				</Modal>
			</MModal>

		</Wrapper>
	);
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .clinical-header{
	width: calc(100vw-200px);
	justify-content: space-between;
	height: 55px;
	font-size: 13px;
	color: #333;
	padding: 12px 15px 0 15px;
	.mr-15{
		margin-right: 15px;
	}
  }
  .ant-table-tbody{
        > tr:hover:not(.ant-table-expanded-row) > td,.ant-table-row-hover,.ant-table-row-hover>td{
        background:none !important;
        //这里是将鼠标移入时的背景色取消掉了
        }
    }

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
  }
  .ant-select-disabled .ant-select-selection{
      background: rgba(0,0,0,0.0)!important;
  }
  .disabled-row{
    td.input-cell{
      background: rgba(0,0,0,0.03)!important;
    }
    .ant-input[disabled]{
      color: #000!important;
        background: rgba(0,0,0,0.0)!important;
    }
  }
  
  .ant-input[disabled]{
    color: #000!important;
    background: rgba(0,0,0,0.03)!important;
  }

  .color-red,
  .color-red *,
  .disabled-row .color-red[disabled],
  .disabled-row .color-red *[disabled] {
    color: red !important;
  }

  .color-orange,
  .color-orange *,
  .disabled-row .color-orange[disabled],
  .disabled-row .color-orange *[disabled] {
    color: orange !important;
  }
  .bcy-input-number{
	width: 100%;
	border:none;
	&:hover{
		border:none
	}
	&:focus{
		border: none;
		box-shadow: none;
	}
	.ant-input-number-handler-wrap{
		display: none;

	}
	input{
		padding:0;
		text-align: center;
	}
  }
  #baseTable .ant-table-row:hover{
	background: transparent;
  }
`;

const MModal = styled.div`
	.modal-content{
		
	}
	.item-row{
    margin-bottom: 20px;
    &:last-of-type{
      margin-bottom: 0;
    }
  }
  .label{
    text-align: right;
    margin-right: 10px;
    line-height: 32px;
  }
`;
const ScrollCon = styled.div`
  flex: 1;
`;
// const Wrapper = styled.div`
//   overflow: hidden;
//   height: calc(100vh - 50px);
//   display: flex;
//   align-items: stretch;
// `;

const LeftMenuCon = styled.div`
  width: 200px;
`;
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;
const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    font-size:13px;
    margin-left: 15px;
  }
`;