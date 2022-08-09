import React, { useEffect, useState,useRef,MutableRefObject } from 'react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { clinicalData } from "./ClinicalData";
import { PageTitle } from "src/components/common";
import { authStore, appStore } from 'src/stores';
import qs from 'qs'
// import { quarterList } from 'src/enums/date'

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
import { KeepAlive, Provider } from 'react-keep-alive'
import ClinicalHeaderByVicky from './ClinicalHeaderByVicky';
// import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";
// pimport { type } from 'os';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker
// const { MonthPicker, RangePicker } = DatePicker;
export interface Props {
	payload: any;
}
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function WholeAysi(props: Props) {

	// 搬运start
	const [pageLoading, setPageLoading] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
	const [surplusHeight, setSurplusHeight]: any = useState(220);
	const [pageOptions, setPageOptions]: any = useState({
		pageIndex: 1,
		pageSize: 20,
		total: 0
	});
	const [total, setTotal] = useState(0);
	// 搬运end

	const [deptList, setDeptList] = useState(['神经内科1', '神经内科2', '神经内科3', '神经内科4']);
	const [yearPickShow, setYearPickShow] = useState(false);
	const [selectType, setSelectType] = useState(0);
	const [quartMms, setQuartMms] = useState([] as any);
	const [reportTypes, setReportTypes] = useState(["月度", "季度", "年度"]);
	// modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalReportType, setModalReportType] = useState('');
	const { history } = appStore
	const [params, setParams] = useState({
		deptCode: '佛山',
		templateId: 'xiantan'
	  } as any)


	const reportName:MutableRefObject<any> = useRef('');

	const getPage = () => {
		console.log('firstgetPage')
		return 2
	}
	// end



	const dataSource = [
		{ recordDate: 0, classfiy: '入院患者人数', },
		{ recordDate: 0, classfiy: '住院患者总数', },
		{ recordDate: 0, classfiy: '留陪人数', },
		{ recordDate: 0, classfiy: '给药错误发生例数', },
		{ recordDate: 0, classfiy: '使用高危药物患者人数', },
		{ recordDate: 0, classfiy: '高危药物外渗发生例次', },
		{ recordDate: 0, classfiy: '输血患者人数', },
		{ recordDate: 0, classfiy: '发生输血反应例次', },
		{ recordDate: 0, classfiy: '留有胃管患者人数', },
		{ recordDate: 0, classfiy: '胃管非计划性拔管例次', },
		{ recordDate: 0, classfiy: '留有尿管患者人数', },
		{ recordDate: 0, classfiy: '尿管非计划性拔管例次', },
		{ recordDate: 0, classfiy: '尿道插管中泌尿道感染人数', },
		{ recordDate: 0, classfiy: '留有中心静脉导管患者人数', },
		{ recordDate: 0, classfiy: '中心静脉导管非计划性拔管例次', },
		{ recordDate: 0, classfiy: '中心静脉插管中血流感染人数', },
		{ recordDate: 0, classfiy: '留有引流管患者人数', },
		{ recordDate: 0, classfiy: '引流管非计划性拔管例次', },
		{ recordDate: 0, classfiy: '带入压疮总例数', },
		{ recordDate: 0, classfiy: '新发压疮例数', },
		{ recordDate: 0, classfiy: '需压疮高风险评估患者人数', },
		{ recordDate: 0, classfiy: '压疮高风险评估阳性例数', },
		{ recordDate: 0, classfiy: '排便失禁患者人数', },
		{ recordDate: 0, classfiy: '失禁性皮炎发生例数', },
		{ recordDate: 0, classfiy: '需跌倒/坠床高风险评估患者人数', },
		{ recordDate: 0, classfiy: '跌倒/坠床高风险评估阳性例数', },
		{ recordDate: 0, classfiy: '跌倒发生例数', },
		{ recordDate: 0, classfiy: '坠床发生例数', },
		{ recordDate: 0, classfiy: '患者误吸发生例数', },
		{ recordDate: 0, classfiy: '患者走失发生例数', },
		{ recordDate: 0, classfiy: '护士锐器损伤人数', },
		// { recordDate: 0, classfiy: '',   },
	]
	// console.log(dataSource)
	const columns: ColumnProps<any>[] | any = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => index + 1,
			align: "center",
			width: 50
		},
		{
			title: "名称",
			dataIndex: "classfiy",
			align: "center",
			width: 120
		},
		{
			title: "类型",
			// dataIndex: "classfiy",
			render: (text: any, record: any, index: number) => "月度报告",
			align: "center",
			width: 80
		},
		{
			title: "统计时间",
			// dataIndex: "classfiy",
			render: (text: any, record: any, index: number) => "2022-01-01～2022-01-31",
			align: "center",
			width: 120
		},
		{
			title: "创建时间",
			// dataIndex: "classfiy",
			render: (text: any, record: any, index: number) => "2022-01-01～2022-01-31",
			align: "center",
			width: 120
		},
		{
			title: "创建人",
			// dataIndex: "classfiy",
			render: (text: any, record: any, index: number) => "张家辉",
			align: "center",
			width: 120
		},
		{
			title: "操作",
			// dataIndex: "classfiy",
			render: (text: any, record: any, index: number) => {
				return <Button>查看</Button>
			},
			align: "center",
			width: 120
		},

	]
	// 搬运start
	const handleSelectedChange = (payload: any[]) => {
		setSelectedRowKeys(payload)
		// console.log(payload)
	}
	// 搬运end
	// console.log(clinicalData.quarter)

	// 点击新建
	const handelNewModal = () => {
		setModalVisible(true)
	}
	// modalOk 
	const handleOk = () => {
		setModalVisible(false)
		console.log(reportName.current.state.value)
		history.push(`/goodOrBadWholePrint?${qs.stringify(params)}`)
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
					<PageTitle>全院护理质量分析</PageTitle>
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
								console.log(value, mode)
								clinicalData.year = value
								setYearPickShow(false)
							}}
							mode="year"
							style={{ width: 120 }}
							value={clinicalData.year}
							allowClear={true}
							placeholder='选择年份'
							format="YYYY"
						// onChange={date => {
						// 	clinicalData.year = date

						// }} 
						/>
					</>

					<>
						<span>报告类型：</span>
						<Select className="mr-15"
							style={{ width: 120 }}
							value={selectType}
							onChange={(val: any) => {
								setSelectType(val)
								console.log('quarter', val)
								// clinicalData.onload()
							}}
						>
							{
								reportTypes.map((v: any, i: number) => (
									<Option key={i} value={i + 1}>{v}</Option>
								))
							}
						</Select>
					</>


					<Button
						type="primary"
						className="span"
					// onClick={handelInquire}
					>
						查询
					</Button>
					<Button
						type="primary"
						className="span"
						onClick={handelNewModal}
					>
						新建
					</Button>
				</RightIcon>
			</div>

			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={pageLoading}
					dataSource={dataSource}
					// rowSelection={{
					//   selectedRowKeys,
					//   onChange: handleSelectedChange,
					// }}
					columns={columns.filter((item: any) => item)}
					surplusHeight={surplusHeight}
					surplusWidth={300}
				// useOuterPagination
				// pagination={{
				//   onChange: (pageIndex: number) => {
				// 	setPageOptions({ ...pageOptions, pageIndex })
				//   },
				//   onShowSizeChange: (pageIndex: number, pageSize: number) => {
				// 	setPageOptions({ ...pageOptions, pageSize, pageIndex: 1 })
				//   },
				//   pageSizeOptions: ['20', '30', '40', '50', '100'],
				//   current: pageOptions.pageIndex,
				//   pageSize: pageOptions.pageSize,
				//   total: total
				// }}
				// rowClassName={(record: any, idx: number) => {
				//   if (cellDisabled(record)) return 'disabled-row'

				//   return ''
				// }}

				/>
			</ScrollCon>
			<MModal>
				<Modal
					title="新建全院质量分析报告"
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
						<Row className="item-row" style={{marginTop:'15px'}}>
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
										<Option key={i} value={i + 1}>{v}</Option>
									))
								}
							</Select>
							</Col>
						</Row>
						<Row className="item-row" style={{marginTop:'15px'}}>
							<Col span={4}>
								<div className="label">报告时间:</div>
							</Col>
							<Col span={16}>
								<RangePicker />
							</Col>
						</Row>
						<Row className="item-row" style={{marginTop:'15px'}}>
							<Col span={4}>
								<div className="label">创建人:</div>
							</Col>
							<Col span={16}>
								<Input value={`${authStore.user?.empName || ''} ${moment().format('YYYY-MM-DD')}`} />
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

const MModal=styled.div`
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
    font-size:16px;
    margin-left: 15px;
  }
`;