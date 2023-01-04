import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { PageTitle, Place, PageHeader } from 'src/components/common';
import { Button, Select } from 'antd';
import { badEventData_gxjb } from '../BadEvent_gxjb';

import { quarterList } from 'src/enums/date'
import {appStore} from "src/stores";
const Option = Select.Option
interface Props { }
export default observer(function BadEventHeader(props: Props) {
	return (
		<Wrapper>
			<PageHeader>
				<PageTitle className='page-title'>
					{`${moment().year()}年`}{`${quarterList[badEventData_gxjb.currentQuarter - 1]}`}
					{appStore.HOSPITAL_ID==='gxjb'?'广西壮族自治区江滨医院':'阳春中医护理医院'}
					<div>{`${badEventData_gxjb.eventType.key != '' ? badEventData_gxjb.eventType.label + '不良事件上报汇总表' : ''}`}</div>
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
							badEventData_gxjb.eventType = val
							badEventData_gxjb.chageColumn(val.key)
							// 不初始化，badEventType会继续提交上一次选中的二级类型
							badEventData_gxjb.typeListByEventTypeSelect = {key:'',label:'全部'}
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
					</Select>
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
					showSearch
					filterOption={(input: any, option: any) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					labelInValue
						style={{ width: 180 }}
						value={badEventData_gxjb.selectDept}
						onChange={(val: any) => {
							badEventData_gxjb.selectDept = val
							badEventData_gxjb.onload()
						}}
					>
						{badEventData_gxjb.deptList.map((item: any) => {
							return <Option value={item.code} key={item.code}>{item.name}</Option>
						})}
					</Select>
					{
						(badEventData_gxjb.eventType.key=='B0032' || badEventData_gxjb.eventType.key=='B0037') && (<>
							<span className="span">事件类型：</span>
							<Select
								labelInValue
								style={{ width: 130 }}
								value={badEventData_gxjb.typeListByEventTypeSelect}
								onChange={(val: any) => {
									badEventData_gxjb.typeListByEventTypeSelect = val
									badEventData_gxjb.onload()
								}}
							>
								{badEventData_gxjb.typeListByEventType.map((item: any) => {
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
  /* padding: 0 15px 0 15px; */
  padding:0;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    margin-left: 15px;
  }
`;
