import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { PageTitle, Place, PageHeader } from 'src/components/common';
import { Button, Select } from 'antd';
import { badEventCaseData_gxjb } from '../BadEventCase_gxjb';
import { badEventData_gxjb } from '../BadEvent_gxjb';
import { appStore, authStore } from "src/stores";


import { quarterAndYear } from 'src/enums/date'
const Option = Select.Option
interface Props { }
export default observer(function BadEventHeaderCase(props: Props) {

	return (
		<Wrapper>
			<PageHeader>
				<PageTitle className='page-title'>
					{`${moment().year()}年`}{`${quarterAndYear[badEventCaseData_gxjb.currentQuarter - 1]}`}
					{appStore.HOSPITAL_ID==='gxjb'?'广西壮族自治区江滨医院':'阳春中医护理医院'}
					<div>护理不良事件统计表</div>
				</PageTitle>
				<Place />
				<RightIcon>
					<span className="span">季度：</span>
					<Select value={badEventCaseData_gxjb.currentQuarter}
                    style={{ width: 100 }}
						onChange={(val: any) => {
							badEventCaseData_gxjb.currentQuarter = val
                            if(val>4){
                                // 选择了全年
                                badEventCaseData_gxjb.queryType='2'
                            }else{
                                badEventCaseData_gxjb.queryType='1'
                            }
                            // console.log(val)
							badEventCaseData_gxjb.onload()
						}}
					>
						{
							quarterAndYear.map((v: any, i: number) => (
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
						value={badEventCaseData_gxjb.selectDept}
						onChange={(val: any) => {
							badEventCaseData_gxjb.selectDept = val
							badEventCaseData_gxjb.onload()
						}}
					>
						{badEventCaseData_gxjb.deptList.map((item: any) => {
							return <Option value={item.code} key={item.code}>{item.name}</Option>
						})}
					</Select>



					<Button
						type="primary"
						className="span"
						onClick={() => badEventCaseData_gxjb.onload()}
					>
						查询
					</Button>

					<Button
						className="span"
						onClick={() => badEventCaseData_gxjb.export()}
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
