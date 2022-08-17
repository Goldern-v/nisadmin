import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Select, Input, Button, DatePicker, Modal, message } from "antd";
import { PageTitle } from "src/components/common";
import { appStore, authStore } from 'src/stores'
import moment, { duration } from 'moment'
import { clinicalApi } from "../ClinicalApi";
import { clinicalData } from "../ClinicalData";
import { values } from "mobx";
import { quarterList } from 'src/enums/date'
import { fileDownload } from "src/utils/file/file";
const Option = Select.Option;

interface Props {
	title: string,
	tableLoading:Boolean,
	setTableLoading:Function,
	initTableData:Function,
	saveTableData:Function,
}
interface IDeucOption {
	value: string;
	item: string;
}
export default observer(function ClinicalQuarterHead(props: Props) {
	const [deucOption, setdeucOption] = useState([]); // 科室信息
	const [yearPickShow, setYearPickShow] = useState(false);

	const pathname = appStore.location?.pathname
	const {tableLoading,setTableLoading,initTableData,saveTableData} = props


	// console.log(appStore.location.pathname)
	const getMonths = () => {
		let options = []
		for (let i = 1; i <= 12; i++) {
			options.push(<Option value={i.toString()} key={i.toString()}>{i.toString()}月</Option>)

		}
		return options
	}

	useEffect(() => {
		setTableLoading(true)
		// 获取科室
		clinicalApi.getnursingAll().then((res) => {
			let deptListall = [];
			deptListall = res.data.deptList
			clinicalData.deptCode = res.data.defaultDept
			clinicalData.deptName = res.data.deptName
			setdeucOption(deptListall)
			// clinicalData.init()
			// 查询数据
			onload()
		}).catch((err) => {
			console.log(err);
		})

	}, [])

	/** 获取表格数据 */
	const onload=()=> {
		if(clinicalData.postObj.deptCode=='') return
		clinicalApi.getMonthTable(clinicalData.postObj).then(res => {
			let valueList = res.data.valueList || []
			
			if(valueList.length>0){
				
				initTableData(valueList,res.data)
			}
		  // console.log(res.data)
		  setTableLoading(false)

		});
	  }

	  useEffect(() => {
		// console.log('数据变化了')
		setTableLoading(true)
		onload()
	  }, [clinicalData.postObj])
	  

	// 查询
	const handelInquire = () => {
		setTableLoading(true)
		onload()
	}

	// 保存
	const handlerSave=()=>{
		saveTableData()
	}

	// 导出
	const handlerExport = ()=>{
		clinicalApi.exportMonthTable(clinicalData.postObj).then(res => {
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
							// console.log(value, mode)
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
					<span>月份：</span>
					<Select className="mr-15"
						style={{ width: 120 }}
						value={clinicalData.month}
						onChange={(val: number) => {
							clinicalData.month = val
							// console.log('yuefen', val)
							// clinicalData.onload()
						}}
					>
						{getMonths()}
					</Select>
				</>
				{pathname.indexOf('quarter')>-1 && 
					<>
						<span>季度：</span>
						<Select className="mr-15"
							style={{ width: 120 }}
							value={clinicalData.quarter}
							onChange={(val: any) => {
								clinicalData.quarter = val
								// console.log('quarter', val)
								// clinicalData.onload()
							}}
						>
							{
								quarterList.map((v:any, i:number) => (
									<Option key={i} value={i + 1}>{v}</Option>
								))
							}
						</Select>
					</>
				}
				<span>科室：</span>
				<Select className="mr-15"
					style={{ width: 180 }}
					labelInValue
					value={{key:clinicalData.deptCode}}
					onChange={(val: any) => {
						// console.log(val)
						clinicalData.deptCode = val.key
						clinicalData.deptName = val.label
						// clinicalData.onload()
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
					type="primary"
					className="span"
					onClick={handlerSave}
				>
					保存
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

