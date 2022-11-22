import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { observer } from "mobx-react-lite";
// import React, { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker, Modal, message, Cascader } from "antd";
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { planDatas } from '../planing/planData';
const Option = Select.Option;
export interface Props {
	title: string,
	// tableLoading: Boolean,
	// setTableLoading: Function,
	// initTableData: Function,
	// saveTable: Function,
	// onPrint: Function,
}
export default observer(function PlanHeader(props: Props) {
	const [deucOption, setdeucOption] = useState([]); // 科室信息
	const [yearPickShow, setYearPickShow] = useState(false);

	// const onload = () => {

	// }
	const handlerExport = () => {

	}
	/**创建 */
	const turnToCreate = () => {
		planDatas.modalVisible = true
	}

	return (
		<Wrapper>
			<PageHeader>
				<PageTitle maxWidth={planDatas.maxWidthTitle}>{props.title}</PageTitle>
				<Place />
			
			{/* <LeftIcon>
				
			</LeftIcon> */}
			{/* <RightIcon> */}
				<>
					<span>年份：</span>
					<DatePicker className="mr-15"
						open={yearPickShow}
						onOpenChange={status => {
							setYearPickShow(status)
						}}
						onPanelChange={(value, mode) => {
							planDatas.yearYear = value
							setYearPickShow(false)
							planDatas.getList()
						}}
						mode="year"
						style={{ width: 120 }}
						value={planDatas.yearYear}
						allowClear={true}
						placeholder='选择年份'
						format="YYYY"
					/>
				</>
				{/* {planDatas.pathname.indexOf('month') > -1 &&
					<>
						<span>月份：</span>
						<Select className="mr-15"
							style={{ width: 90 }}
							value={planDatas.month}
							onChange={(val: number) => {
								planDatas.month = val
								planDatas.getList()
							}}
						>
							{
								monthList.map((v: any, i: number) => (
									<Option key={i} value={i}>{v}</Option>
								))
							}
						</Select>
					 </>
					} */}
				{/* {planDatas.pathname.indexOf('quarter') > -1 &&
					<>
						<span>季度：</span>
						<Select className="mr-15"
							style={{ width: 100 }}
							value={planDatas.quarter}
							onChange={(val: any) => {
								planDatas.quarter = val
								planDatas.getList()
							}}
						>
							{
								quarterList.map((v: any, i: number) => (
									<Option key={i} value={i + 1}>{v}</Option>
								))
							}
						</Select>
					</>
					} */}

				{/* <span>科室：</span>
				<Cascader className="mr-15" options={planDatas.deptList} expandTrigger='hover'
					value={planDatas.deptCode}
					fieldNames={{ label: 'name', value: 'code', children: 'childDepts' }}
					onChange={(val: any) => {
						planDatas.deptCode = val

					}}
					displayRender={(label: any) => {
						return label[label.length - 1]
					}}
					placeholder="请选择" style={{ width: 260 }} /> */}
				<>
					<span>审核：</span>
					<Select className="mr-15"
						style={{ width: 140 }}
						value={planDatas.processStatus}
						onChange={(val: any) => {
							planDatas.processStatus = val
							planDatas.getList()
							// console.log('quarter', val)
							// clinicalData.onload()
						}}
					>
						{
							planDatas.processList.map((v: any, i: number) => (
								<Option key={i} value={v.status}>{v.name}</Option>
							))
						}
					</Select>
				</>
				<Input
					style={{ width: 180, marginLeft: 5, marginRight: -5 }}
					placeholder="提交人姓名/标题"
					value={planDatas.keyWord}
					onChange={e => {
						planDatas.keyWord = e.target.value;
						// searchByNameInpt()
					}}
				// disabled={isAdd}
				/>
				<Button
					className="span"
					onClick={() => { planDatas.getList() }}
				>
					查询
				</Button>
				<Button type='primary'
					className="span"
					onClick={() => { planDatas.handelReset() }}
				>
					重置
				</Button>
				<Button type='primary'
					className="span"
					onClick={turnToCreate}
				>
					创建
				</Button>
				{/* <Button
					className="span"
					onClick={handlerExport}
				>
					导出
				</Button> */}
			{/* </RightIcon> */}
			</PageHeader>
		</Wrapper>
	)
})
const Wrapper = styled.div`
  /* width: calc(100vw - 200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 15px 0 15px; */
  .mr-15{
    margin-right: 15px;
  }
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