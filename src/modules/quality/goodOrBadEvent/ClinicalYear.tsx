import React, { useEffect, useState } from 'react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import {
	ColumnProps,
} from "src/vendors/antd";
import { KeepAlive, Provider } from 'react-keep-alive'
import { appStore } from 'src/stores'
import ClinicalYearHead from './header/ClinicalYearHead';
import { clinicalDataYear } from './tsData/ClinicalDataYear';
export interface Props {
	payload: any;
}
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function ClinicalYear(props: Props) {

	// 搬运start
	const [surplusHeight, setSurplusHeight]: any = useState(220);
	// 搬运end

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
			dataIndex: "name",
			align: "center",
			width: 100,
		},
	]


	// 更新表头
	useEffect(() => {
		// console.log('更新表头了')
		monthList = [] 
		for (let mm = 1; mm < 13; mm++) {
			monthList.push({
				title: mm+"月",
				dataIndex: clinicalDataYear.yearChange?.toString()+'_'+(mm>9?mm:'0'+mm)+'_01_1',
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
		setTableLoading(false)
	}, [clinicalDataYear.yearChange])



	const dataSource = [
		{ recordDate: 0,  name: '入院患者人数',   },
		{ recordDate: 0,  name: '住院患者总数',   },
		{ recordDate: 0,  name: '留陪人数',   },
		{ recordDate: 0,  name: '给药错误发生例数',   },
		{ recordDate: 0,  name: '使用高危药物患者人数',   },
		{ recordDate: 0,  name: '高危药物外渗发生例次',   },
		{ recordDate: 0,  name: '输血患者人数',   },
		{ recordDate: 0,  name: '发生输血反应例次',   },
		{ recordDate: 0,  name: '留有胃管患者人数',   },
		{ recordDate: 0,  name: '胃管非计划性拔管例次',   },
		{ recordDate: 0,  name: '留有尿管患者人数',   },
		{ recordDate: 0,  name: '尿管非计划性拔管例次',   },
		{ recordDate: 0,  name: '尿道插管中泌尿道感染人数',   },
		{ recordDate: 0,  name: '留有中心静脉导管患者人数',   },
		{ recordDate: 0,  name: '中心静脉导管非计划性拔管例次',   },
		{ recordDate: 0,  name: '中心静脉插管中血流感染人数',   },
		{ recordDate: 0,  name: '留有引流管患者人数',   },
		{ recordDate: 0,  name: '引流管非计划性拔管例次',   },
		{ recordDate: 0,  name: '带入压疮总例数',   },
		{ recordDate: 0,  name: '新发压疮例数',   },
		{ recordDate: 0,  name: '需压疮高风险评估患者人数',   },
		{ recordDate: 0,  name: '压疮高风险评估阳性例数',   },
		{ recordDate: 0,  name: '排便失禁患者人数',   },
		{ recordDate: 0,  name: '失禁性皮炎发生例数',   },
		{ recordDate: 0,  name: '需跌倒/坠床高风险评估患者人数',   },
		{ recordDate: 0,  name: '跌倒/坠床高风险评估阳性例数',   },
		{ recordDate: 0,  name: '跌倒发生例数',   },
		{ recordDate: 0,  name: '坠床发生例数',   },
		{ recordDate: 0,  name: '患者误吸发生例数',   },
		{ recordDate: 0,  name: '患者走失发生例数',   },
		{ recordDate: 0,  name: '护士锐器损伤人数',   },
		// { recordDate: 0,  name: '',   },
	]

	

	const initTableData = (itemList: any, body: any) => {
		// console.log('itemList', itemList)
		setData2([])
		setData2([...itemList])
	}

	return (
		<Wrapper>
			<ClinicalYearHead title='科室临床护理质量指标年度汇总' tableLoading={false}
				setTableLoading={setTableLoading} initTableData={initTableData} />
			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={tableLoading}
					dataSource={data2}
					columns={tableColumn}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					title={() => {return (<span>{clinicalDataYear.deptNameYear}{clinicalDataYear.postObjYear.year}年临床护理质量指标月度汇总</span>)}}
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
	/* 头部标题 */
	.ant-table-title{
		text-align: center;
		font-size: 20px;
		color: #333;
		font-weight: bold;
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