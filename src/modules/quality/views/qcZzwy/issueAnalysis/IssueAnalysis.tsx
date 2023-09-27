import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import {
	Input,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import moment from 'moment';
import BaseTable from "src/components/BaseTable";
import { quarterList,quarterTimes } from 'src/enums/date';
import YearMonthRangePicker from 'src/components/YearMonthRangePicker';
import { issueAnalysisData } from './issueAnalysisData';
import {cloneJson} from 'src/utils/json/clone';
import { appStore } from 'src/stores';
import {RectificationData} from "src/modules/quality/views/qcZzwy/qcRectificationSummary/Data";
const Option = Select.Option;

export default observer(function IssueAnalysis() {
	const [yearPickShow, setYearPickShow] = useState(false);
  	// 动态合并单元格
	const mergeCells = (text: string, data: any, key: string, index: number) => {
    if(data.length<1){
      return 1
    }
		if (text == '') {
			// 没有code值的时候
			return 1
		}
		if (index !== 0 && text === data[index - 1][key]) {
			return 0
		}
		let rowSpan = 1

		for (let i = index + 1; i < data.length; i++) {
			if (text !== data[i][key]) {
				break;
			}
			rowSpan++
		}
		return rowSpan
	}
  /**备注输入 */
  const handleInput = (e: any, code: string, record: any) => {
    record.modified = true
    record[code] = e.target.value
    let cloneData = cloneJson(issueAnalysisData.tableList);
    issueAnalysisData.tableList = cloneData
    // setTableData(cloneData)
}
  const columns: any = [
		{
			title: "项目",
			dataIndex: "masterQcName",
			align: "center",
			width: 160,
			render: (value: any, row: any, index: number) => {
        const obj = {
          children: <span>{value}</span>,
          props: {rowSpan: 0},
      } as any;
      if (index === 0) {
          obj.props.rowSpan = issueAnalysisData.tableList.length
      }
      return obj
				
			}
		},
		{
			title: "一级指标",
			dataIndex: "firstLevelItemName",
			align: "center",
			width: 100,
      render: (value: any, row: any, index: number) => {
        const obj = {
					children: value,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.firstLevelItemCode, issueAnalysisData.tableList || [], 'firstLevelItemCode', index)
				return obj
      }
		},
		{
			title: "一级指标合格率",
			dataIndex: "firstLevelEvalRate",
			align: "center",
			width: 80,
      render: (value: any, row: any, index: number) => {
        const obj = {
					children: <span>{value}{value?'%':''}</span>,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.firstLevelItemCode, issueAnalysisData.tableList || [], 'firstLevelItemCode', index)
				return obj
      }
		},
    {
      title: '二级指标',
        children: [
          {
            title: '二级指标项目',
            dataIndex: 'secondLevelItemName',
            align: "center",
            width: 220,
            render: (value: any, row: any, index: number) => {
              const obj = {
                children: value,
                props: {},
              } as any;
              obj.props.rowSpan = mergeCells(row.secondLevelItemCode, issueAnalysisData.tableList || [], 'secondLevelItemCode', index)
              return obj
            }
          },
          {
            title: '质控病区',
            dataIndex: 'wardName',
            align: "center",
            width: 180,
          },
          {
            title: '备注',
            dataIndex: 'remark',
            align: "center",
            width: 160,
          //   render: (text: string, record: any, index: number) => {
              
          //     return <Input
          //         key={`remark-${index}`}
          //         className='table-input'
          //         value={text} onChange={(e: any) => handleInput(e, 'remark', record)}/>
          // }
          },
        ]
    },
		{
			title: "二级指标合格率",
			dataIndex: "secondLevelEvalRate",
			align: "center",
			width: 80,
      render: (value: any, row: any, index: number) => {
        const obj = {
          children: <span>{value}{value?'%':''}</span>,
          props: {},
        } as any;
        obj.props.rowSpan = mergeCells(row.secondLevelItemCode, issueAnalysisData.tableList || [], 'secondLevelItemCode', index)
        return obj
      }
		},
		{
			title: "二级指标不合格率",
			dataIndex: "realGetScore3",
			align: "center",
			width: 80,
      render: (value: any, row: any, index: number) => {
        const obj = {
          children: <span>{100-Number(row.secondLevelEvalRate)>0?100-Number(row.secondLevelEvalRate)+'%':'0'}</span>,
          props: {},
        } as any;
        obj.props.rowSpan = mergeCells(row.secondLevelItemCode, issueAnalysisData.tableList || [], 'secondLevelItemCode', index)
        return obj
        
      }
		},
		
	]
  useEffect(() => {
    // issueAnalysisData.getTableList()
    issueAnalysisData.getTemplateList()
		issueAnalysisData.getNursingAll()
	}, [])
  return (
    <Wrapper>
      <PageHeader>
				<PageTitle>{'质控表项目问题分析汇总'}</PageTitle>
				<Place />
        <span>科室：</span>
				<Select className="mr-15"
					labelInValue
					style={{ width: 180 }}
					value={{ key: issueAnalysisData.deptCode }}
					onChange={(val: any) => {
						issueAnalysisData.deptCode = val.key
						issueAnalysisData.deptName = val.label
						issueAnalysisData.getTableList()
					}}
				>
					<Option value='全院'>全院</Option>
					{issueAnalysisData.deptList.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>
        <span>类型：</span>
				<Select className="mr-15"
					style={{ width: 100 }}
					value={issueAnalysisData.selectType}
					onChange={(val: any) => {
						issueAnalysisData.selectType = val
						issueAnalysisData.getTableList()
					}}
				>
					{issueAnalysisData.typeList.map((item: any) => {
						return <Option value={item.type} key={item.type}>{item.title}</Option>
					})}
				</Select>
        
        {issueAnalysisData.selectType=='4'&&<><span>日期：</span>
        <DatePicker.RangePicker
        allowClear={false}
				format={'YYYY-MM-DD'}
				value={issueAnalysisData.filterDate}
        onChange={(value) => {
					issueAnalysisData.filterDate = value 
					issueAnalysisData.getTableList()
        }}
        style={{ width: 220 }}
      /></>}
      {issueAnalysisData.selectType=='1' && <>
        <span>月份：</span>
        <YearMonthRangePicker className='mr-15' widthPx={180} value={issueAnalysisData.monthRange} onChange={(val:any)=>{
					issueAnalysisData.monthRange = val
					issueAnalysisData.getTableList()
        }} />
      </>}
				{(issueAnalysisData.selectType=='3'||issueAnalysisData.selectType=='2')&&<>
					<span>年份：</span>
					<DatePicker className="mr-15"
						open={yearPickShow}
						onOpenChange={status => {
							setYearPickShow(status)
						}}
						onPanelChange={(value, mode) => {
							issueAnalysisData.year = value
							setYearPickShow(false)
							issueAnalysisData.getTableList()
						}}
						mode="year"
						style={{ width: 120 }}
						value={issueAnalysisData.year}
						allowClear={true}
						placeholder='选择年份'
						format="YYYY"
					/>
				</>}
        {issueAnalysisData.selectType=='2' && <>
					<span>季度：</span>
					<Select className="mr-15"
					style={{ width: 100 }}
          defaultValue={moment().quarter()}
					onChange={(val: any) => {
						issueAnalysisData.selectQuarter = val
						issueAnalysisData.getTableList()
            	}}
				>
					{
          
          quarterList.map((v: any, i: number) => (
            <Option key={i} value={i + 1}>{v}</Option>
          ))
          }
				</Select>
				</>}

        <span>质控表：</span>
				<Select
					// labelInValue
          showSearch
					style={{ width: 180 }}
					value={issueAnalysisData.qcCode}
          filterOption={(input:any, option:any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
					onChange={(val: any) => {
						issueAnalysisData.qcCode = val
						issueAnalysisData.getTableList()
					}}
				>
					{/* <Option value=''>全部</Option> */}
					{issueAnalysisData.templeteList.map((item: any) => {
						return <Option value={item.qcCode} key={item.qcCode}>{item.qcName}</Option>
					})}
				</Select>

				<Button
					className="span" type='primary'
					onClick={() => issueAnalysisData.getTableList()}
				>
					查询
				</Button>
		  <Button
			  className="span"
			  type='primary'
			  onClick={() => issueAnalysisData.importXls()}>
			  导出
		  </Button>
			</PageHeader>
      <ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={issueAnalysisData.tableLoading}
					dataSource={issueAnalysisData.tableList}
					columns={columns.filter((item: any) => item)}
					surplusWidth={300}
					surplusHeight={200}
				// 	pagination={{
				//     current: issueAnalysisData.pageIndex,
				//     total: issueAnalysisData.total,
				//     pageSize: issueAnalysisData.pageSize,
				// }}
				// onChange={(pagination:any) => {
				// 	issueAnalysisData.pageIndex = pagination.current;
				// 	issueAnalysisData.total = pagination.total;
				// 	issueAnalysisData.pageSize = pagination.pageSize;
				// }}
				/>
			</ScrollCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
.mr-15{
  margin-right: 15px;
}
.record-page-table td,.record-page-table th {
    border: 1px solid #e8e8e8; /* 添加边框 */
  }
  .table-input {
    border: 0 !important; // 去除未选中状态边框
    outline: none !important; // 去除选中状态边框
    :focus {
      border: 0 !important; // 去除未选中状态边框
      outline: none !important; // 去除选中状态边框
      background-color: rgba(0, 0, 0, 0) !important; // 透明背景
    }
  }
`
const ScrollCon = styled.div`
  flex: 1;
`;