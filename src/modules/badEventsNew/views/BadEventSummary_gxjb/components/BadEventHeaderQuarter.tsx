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
					<span className="span">汇总类型：</span>
					<Select
						showSearch
						filterOption={(input: any, option: any) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						onChange={(val: any) => {
							badEventQuarterData_gxjb.eventType = val
							// badEventQuarterData_gxjb.chageColumn(val.key)
							badEventQuarterData_gxjb.onload()
						}}
						labelInValue
						value={badEventQuarterData_gxjb.eventType}
						style={{ width: 140 }}
					>
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
`;