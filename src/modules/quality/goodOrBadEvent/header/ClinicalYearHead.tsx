import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker, Modal, message } from "antd";
import { PageTitle } from "src/components/common";
import { clinicalApi } from "../ClinicalApi";
import { clinicalDataYear } from "../tsData/ClinicalDataYear";
import { fileDownload } from "src/utils/file/file";
const Option = Select.Option;

interface Props {
	title: string,
	tableLoading: Boolean,
	setTableLoading: Function,
	initTableData: Function,
}
interface IDeucOption {
	value: string;
	item: string;
}
export default observer(function ClinicalYearHead(props: Props) {
	const [deucOption, setdeucOption] = useState([]); // 科室信息
	const [yearPickShow, setYearPickShow] = useState(false);

	// const pathname = appStore.location?.pathname
	const { tableLoading, setTableLoading, initTableData } = props

	useEffect(() => {
		setTableLoading(true)
		// console.log('获取科室')
		// 获取科室
		clinicalApi.getnursingAll().then((res) => {
			let deptListall = [];
			deptListall = res.data.deptList
			clinicalDataYear.deptCodeYear = res.data.defaultDept
			clinicalDataYear.deptNameYear = res.data.deptName
			setdeucOption(deptListall)
			// 查询数据
			onload()
		}).catch((err) => {
			console.log(err);
		})

	}, [])

	/** 获取表格数据 */
	const onload = () => {
		setTableLoading(true)
		clinicalApi.getYearTable(clinicalDataYear.postObjYear).then(res => {
			let valueList = res.data.valueList || []

			if (valueList.length > 0) {

				initTableData(valueList, res.data)
			}
			setTableLoading(false)

		}).catch(err => {
			setTableLoading(false)
		});
	}

	// 查询
	const handelInquire = () => {
		onload()
	}

	// 导出
	const handlerExport = () => {
		clinicalApi.exportYearTable(clinicalDataYear.postObjYear).then(res => {
			fileDownload(res);
		});
	}

	return (
		<Wrapper>
			<LeftIcon>
				<PageTitle>{props.title}</PageTitle>
			</LeftIcon>
			<RightIcon>
				<>
					<span>年份：</span>
					<DatePicker className="mr-15"
						open={yearPickShow}
						onOpenChange={status => {
							setYearPickShow(status)
						}}
						onPanelChange={(value, mode) => {
							clinicalDataYear.yearYear = value
							setYearPickShow(false)
							onload()
						}}
						mode="year"
						style={{ width: 120 }}
						value={clinicalDataYear.yearYear}
						allowClear={true}
						placeholder='选择年份'
						format="YYYY"
					/>
				</>
				<span>科室：</span>
				<Select className="mr-15"
					style={{ width: 180 }}
					labelInValue
					value={{key:clinicalDataYear.deptCodeYear}}
					onChange={(val: any) => {
						clinicalDataYear.deptCodeYear = val.key
						clinicalDataYear.deptNameYear = val.label
						onload()
					}}
				>
					{deucOption.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>

				<Button
					className="span"
					onClick={handelInquire}
				>
					查询
				</Button>

				<Button
					className="span"
					onClick={handlerExport}
				>
					导出
				</Button>
			</RightIcon>
		</Wrapper>
	);
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 15px 0 15px;
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
const FileBox = styled.div`
  .file-box__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top:30px;
    .type-img {
      width: 30px;
    }
    .name {
      flex: 1;
      padding: 0 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .delete {
      width: 20px;
      height: 20px;
      font-size: 18px;
      background: #ccc;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 20px;
      margin: 0 4px;
      cursor: pointer;
    }
    .ant-btn + .ant-btn {
      margin-left: 40px;
    }
    .butName{
      width:100%;
      display: flex;
      justify-content: center;
    }
  }
  .tip {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
  }
`;

