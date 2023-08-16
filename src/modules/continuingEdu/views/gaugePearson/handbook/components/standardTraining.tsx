import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { DatePicker,Button,message } from "src/vendors/antd";
import moment from 'moment'
import { trainingSettingApi } from '../../api/TrainingSettingApi';
export interface Props {
payload: any;
}
export default observer(function StandardTraining(props: Props) {
  const [tableData, setTableData] = useState([]);
useEffect(() => {
  let templateItemListVos = handbookModel?.detail.templateItemListVos || []
  let tableDateNew:any = []
  templateItemListVos.map((it:any)=>{
    if(it.itemDataStr!=''){
      // console.log(JSON.parse(it.itemDataStr))
      // 就是有值
      tableDateNew.push({...it,...(JSON.parse(it.itemDataStr))})
    }else{
      tableDateNew.push(it)
    }
  })
  // console.log(tableDateNew)
  setTableData(tableDateNew)

}, [handbookModel?.detail])

  	// 动态合并单元格
	const mergeCells = (text: string, data: any, key: string, index: number) => {
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
  const columns: any = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 40,
      render:(text:any,record:any,index:number)=>index + 1
    },
    {
      title: "内容",
      dataIndex: "content",
      align: "center",
      width: 180
    },
    {
      title: "学时",
      dataIndex: "standartrd",
      align: "center",
      width: 100
    },
    {
      title: "培训时间",
      dataIndex: "catagory",
      align: "center",
      width: 100,
      render: (value: any, row: any, index: number) => {
				const obj = {
					children: <>{value.indexOf('\n')>-1?value.split('\n').map((it:string)=><>{it}<br></br></>):value}</>,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.catagory, handbookModel?.detail.templateItemListVos || [], 'catagory', index)
				return obj
			}
    },
    {
      title: "完成培训时间",
      dataIndex: "finishTime",
      align: "center",
      width: 120,
      render: (value: any, row: any, index: number) =>{
        // const obj = {
				// 	children: <DatePicker key={row.id} defaultPickerValue={moment(value || undefined)} onChange={(date:any)=>{
        //     row.finishTime = date.format('YYYY-MM-DD')
        //   }}></DatePicker>,
				// 	props: {},
				// } as any;
				// obj.props.rowSpan = mergeCells(row.catagory, handbookModel?.detail.templateItemListVos || [], 'catagory', index)
				// return obj
        return (<DatePicker key={row.id} defaultValue={moment(value || undefined)} onChange={(date:any)=>{
          row.finishTime = date.format('YYYY-MM-DD')
        }}></DatePicker>)
      }
    },
  ];

  const saveTable = ()=>{
    let paramter:any = {
      templateItemListVos:[],
      masterId:handbookModel.curCatalogue?.masterId,
      templateId:handbookModel.curCatalogue?.templateId,
      catalogId:handbookModel.curCatalogue?.id,
      templateType:handbookModel.curCatalogue?.templateType,
    }
    let dataObj = {}
    tableData.map((it:any)=>{
      dataObj = {
        finishTime:it.finishTime
      }
      paramter.templateItemListVos.push({
        id:it.id,
        itemDataStr:JSON.stringify(dataObj)
      })
    })
    handbookModel.tableLoading = true
    trainingSettingApi.saveOrUpdateItemData(paramter).then((res:any)=>{
      message.success('保存成功')
      handbookModel.tableLoading = false
    }).catch((err:any)=>{
      handbookModel.tableLoading = false

    })
  }
  return (
    <Wrapper>
       <BaseTable
       title={()=><Button onClick={saveTable}> 保存</Button>}
            loading={handbookModel?.tableLoading}
            dataSource={tableData || []}
            columns={columns}
            surplusHeight={400}
        />
    </Wrapper>
  )
})
const Wrapper = styled.div``


