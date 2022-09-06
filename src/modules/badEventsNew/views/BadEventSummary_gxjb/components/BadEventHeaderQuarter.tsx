import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { PageTitle, Place, PageHeader } from 'src/components/common';
import { Button, Select } from 'antd';
import { appStore, authStore } from "src/stores";
import { badEventQuarterData_gxjb } from '../BadEventQuarter_gxjb';


import { quarterList } from 'src/enums/date'
const Option = Select.Option
interface Props { }
export default observer(function BadEventHeaderQuarter(props: Props) {


	return (
		<Wrapper>
			<PageHeader>
				<PageTitle className='page-title'>
					{`${moment().year()}年`}{`${quarterList[badEventQuarterData_gxjb.currentQuarter - 1]}`}广西壮族自治区江滨医院
					<div>护理不良事件上报汇总表</div>
				</PageTitle>
				<Place />
				<RightIcon>
					<span className="span" style={{float: 'left',lineHeight:'34px'}}>不良事件分类：</span>
					<Select
					className='espacial-select'

						showSearch
						mode="multiple"
						filterOption={(input: any, option: any) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						onChange={(val: any) => {
							if(val[0]!='全部' && val.includes('全部') && val.length>1){
								badEventQuarterData_gxjb.eventType = ['全部']
							}else if(val[0]=='全部' && val.length>1){
								badEventQuarterData_gxjb.eventType=val.filter((it:string)=>it!='全部')
							}else{
								badEventQuarterData_gxjb.eventType = val
							}
							// console.log(badEventQuarterData_gxjb.eventType)
							badEventQuarterData_gxjb.onload()
						}}
						value={badEventQuarterData_gxjb.eventType}
						style={{ width: 200,float:'left' }}
					>
						<Option value={'全部'}>全部</Option>
						{
							badEventQuarterData_gxjb.eventTypeList.map((v: any, i: number) => (
								<Option value={v.code} key={v.code}>{v.name}</Option>
							))
						}
					</Select>
					<span className="span">季度：</span>
					<Select value={badEventQuarterData_gxjb.currentQuarter}
						onChange={(val: any) => {
							badEventQuarterData_gxjb.currentQuarter = val
							badEventQuarterData_gxjb.onload()
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
					showSearch
					filterOption={(input: any, option: any) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					labelInValue
						style={{ width: 180 }}
						value={badEventQuarterData_gxjb.selectDept}
						onChange={(val: any) => {
							badEventQuarterData_gxjb.selectDept = val
							badEventQuarterData_gxjb.onload()
						}}
					>
						{badEventQuarterData_gxjb.deptList.map((item: any) => {
							return <Option value={item.code} key={item.code}>{item.name}</Option>
						})}
					</Select>
					<Button
						type="primary"
						className="span"
						onClick={() => badEventQuarterData_gxjb.onload()}
					>
						查询
					</Button>

					<Button
						className="span"
						onClick={() => badEventQuarterData_gxjb.export()}
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
	.espacial-select .ant-select-selection--multiple .ant-select-selection__rendered{
		overflow: hidden;
    height: 30px;
	}
	.espacial-select .ant-select-selection--multiple .ant-select-selection__rendered ul{
		display: flex;
	}
`;