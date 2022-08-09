import React, { useEffect, useState } from 'react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import SignColumnRender from "./SignModal";
import {
	ColumnProps,
	message,
	Input,
	Select,
	DatePicker,
	Popover,
	Button,
	InputNumber
} from "src/vendors/antd";
import { KeepAlive, Provider } from 'react-keep-alive'
import { appStore } from 'src/stores'
import ClinicalHeaderByVicky from './ClinicalHeaderByVicky';
// import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";
// pimport { type } from 'os';
export interface Props {
	payload: any;
}
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function ClinicalYear(props: Props) {

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

	const [tableLoading, setTableLoading] = useState(false);
	let dayList = [], columnDay = {}

	const lastMonthDays = moment().subtract(1, 'month').daysInMonth()//上个月的总天数
	// 时间从上个月的26号开始到这个月的25号
	dayList = [...(Array.from({ length: (lastMonthDays - 26 + 1) }, (_, index) => index + 26 - 1 + 1)), ...(Array.from({ length: 25 }, (_, index) => index + 1))]
	console.log(dayList)
	dayList.map(it => {
		columnDay['ss_' + it] = 0
	})

	// 签名
	const updateDataSource = () => {
		console.log('firstgetPage123456')
		// if (isAll) {
		//   setDataSource([]);
		//   setDataSource([...dataSource]);
		// } else {
		//   throttler2(() => {
		//     setDataSource([...dataSource]);
		//   });
		// }
	};
	const getPage = () => {
		console.log('firstgetPage')
		return 2
	}
	// end
	let columnDayObj: ColumnProps<any>[] | any = []
	dayList.map(it => {
		columnDayObj.push({
			title: it,
			dataIndex: 'ss_' + it.toString(),
			align: "center",
			className: "input-cell",
			width: 50,
			render(text: any, record: any, index: number) {
				if (index < 31) {
					return (
						<InputNumber
							className='bcy-input-number'
							min={0} max={100000}
							size="small"
							onChange={value => {
								record.modified = true
								record['ss_' + it.toString()] = value
								let total = 0
								for (let k in record) {
									if (k.indexOf('ss_') > -1) {
										total+=record[k]
									}
								}
								record.rowTotal = total
							}}
						/>
					);
				}
				return (<SignColumnRender {
					...{
						cellDisabled: () => false,
						record,
						index,
						itemCfg: {},
						updateDataSource,
						registerCode: '5678',
						selectedBlockId: null,
						getPage,
					}
				} />)

			}
		})
	})

	const dataSource = [
		{ recordDate: 0, classfiy: '入院患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '住院患者总数', ...columnDay },
		{ recordDate: 0, classfiy: '留陪人数', ...columnDay },
		{ recordDate: 0, classfiy: '给药错误发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '使用高危药物患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '高危药物外渗发生例次', ...columnDay },
		{ recordDate: 0, classfiy: '输血患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '发生输血反应例次', ...columnDay },
		{ recordDate: 0, classfiy: '留有胃管患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '胃管非计划性拔管例次', ...columnDay },
		{ recordDate: 0, classfiy: '留有尿管患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '尿管非计划性拔管例次', ...columnDay },
		{ recordDate: 0, classfiy: '尿道插管中泌尿道感染人数', ...columnDay },
		{ recordDate: 0, classfiy: '留有中心静脉导管患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '中心静脉导管非计划性拔管例次', ...columnDay },
		{ recordDate: 0, classfiy: '中心静脉插管中血流感染人数', ...columnDay },
		{ recordDate: 0, classfiy: '留有引流管患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '引流管非计划性拔管例次', ...columnDay },
		{ recordDate: 0, classfiy: '带入压疮总例数', ...columnDay },
		{ recordDate: 0, classfiy: '新发压疮例数', ...columnDay },
		{ recordDate: 0, classfiy: '需压疮高风险评估患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '压疮高风险评估阳性例数', ...columnDay },
		{ recordDate: 0, classfiy: '排便失禁患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '失禁性皮炎发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '需跌倒/坠床高风险评估患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '跌倒/坠床高风险评估阳性例数', ...columnDay },
		{ recordDate: 0, classfiy: '跌倒发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '坠床发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '患者误吸发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '患者走失发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '护士锐器损伤人数', ...columnDay },
		// { recordDate: 0, classfiy: '', ...columnDay },
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
			title: () => {
				return (
					<div className='table-hed-left'>
						<span className='ml'>项目</span>
						<span className='mr'>日期</span>
					</div>
				)
			},
			render: (text: any, record: any, index: number) => {
				if (index < 31) {
					return <span>{text}</span>
				}
				return {
					props: {
						colSpan: 0,
					},
				};

			},
			className: 'hua-line',
			dataIndex: "classfiy",
			align: "center",
			width: 100,
		},
		// ...columnDayObj,
    {
			title: "1月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "2月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "3月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "第一季度",
			dataIndex: "",
			align: "center",
			width: 60,
		},
		{
			title: "4月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "5月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "6月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "第二季度",
			dataIndex: "",
			align: "center",
			width: 60,
		},
		{
			title: "7月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "8月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "9月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "第三季度",
			dataIndex: "",
			align: "center",
			width: 60,
		},
		{
			title: "10月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "11月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "12月",
			dataIndex: "",
			align: "center",
			width: 40,
		},
		{
			title: "第四季度",
			dataIndex: "",
			align: "center",
			width: 60,
		},
		{
			title: "合计",
			dataIndex: "rowTotal",
			align: "center",
			width: 50,
		},
	]
	// 搬运start
	const handleSelectedChange = (payload: any[]) => {
		setSelectedRowKeys(payload)
		// console.log(payload)
	}
	// 搬运end

	const initTableData=(itemList:any)=>{
		
	}

	return (
		<Wrapper>
			<ClinicalHeaderByVicky title='科室临床护理质量指标年度汇总' tableLoading={false} 
			setTableLoading={setTableLoading} initTableData={initTableData} />
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

		</Wrapper>
	);
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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