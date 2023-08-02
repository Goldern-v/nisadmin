
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { observer } from "mobx-react-lite";
// import React, { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker } from "antd";
import moment from "moment";
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { qcTempDatas } from './qcTempData';
const Option = Select.Option;
export interface Props {
	title: string,
}
export default observer(function QcTempManageHeader(props: Props) {
  // console.log(props.title)
	/**创建 */
	const turnToCreate = () => {
		qcTempDatas.modalVisible = true
	}

	return (
		<Wrapper>
			<PageHeader>
				<PageTitle maxWidth={1200}>{props.title}</PageTitle>
				<Place />
				<>
					<span>创建时间：</span>
          <DatePicker.RangePicker
          className="mr-15"
          allowClear={true}
					// value={[moment(qcTempDatas.startDate), moment(qcTempDatas.endDate)]}
						format="YYYY-MM-DD"
              style={{ width: 220 }}
							onChange={([m0, m1]: any[]) => {
								
								qcTempDatas.startDate= m0.format("YYYY-MM-DD")
								qcTempDatas.endDate= m1.format("YYYY-MM-DD")
								qcTempDatas.getList()
								
							}}
            />
				</>
				<>
					<span>质控级别：</span>
					<Select className="mr-15"
						style={{ width: 140 }}
						value={qcTempDatas.selectLevel}
						onChange={(val: any) => {
							qcTempDatas.selectLevel = val
							qcTempDatas.getList()
						}}
					>
						{
							qcTempDatas.levalList.map((v: any, i: number) => (
								<Option key={i} value={v.status}>{v.name}</Option>
							))
						}
					</Select>
				</>
				<Input
					style={{ width: 180, marginLeft: 5, marginRight: -5 }}
					placeholder="请输入创建人"
					value={qcTempDatas.keyWord}
					onChange={e => {
						qcTempDatas.keyWord = e.target.value;
					}}
				/>
				<Button
					className="span"
          type='primary'
					onClick={() => { qcTempDatas.getDownloadTemplate() }}
				>
					导出模板
				</Button>
				<Button type='primary'
					className="span"
					onClick={() => { qcTempDatas.downloadAllTemplate() }}
				>
					导出所有表单
				</Button>
				<Button
					className="span"
					onClick={turnToCreate}
				>
					导入
				</Button>
				
			</PageHeader>
		</Wrapper>
	)
})
const Wrapper = styled.div`
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