import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { DatePicker,Button,message,Input,Modal,Row,Col,InputNumber } from "src/vendors/antd";
import moment from 'moment'
import { authStore } from 'src/stores'
import { trainingSettingApi } from '../../api/TrainingSettingApi';
import TemplateSingModal from 'src/modules/continuingEdu/components/SingModal'
import createModal from "src/libs/createModal";

export interface Props {
payload: any;
}
export default observer(function specialSkill(props: Props) {
  const [tableData, setTableData] = useState([]);

  // 签名对话框
  const templateSingModal = createModal(TemplateSingModal)
  const [signValue, setSignValue] = useState() as any

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
      width: 120
    },
    {
      title: "考核要求",
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
      title: "考核时间",
      dataIndex: "examTime",
      align: "center",
      width: 100,
      render: (value: any, row: any, index: number) =>{
        return (<DatePicker key={row.id} defaultValue={value?moment(value):undefined} onChange={(date:any)=>{
          row.examTime = date.format('YYYY-MM-DD')
          row.modified = true
        }}></DatePicker>)
      }
      
    },
    {
      title: '考核结果',
      dataIndex: "score",
      align: "center",
      width: 80,
      render: (value: any, row: any, index: number) =>{
        return (<Input key={row.id} defaultValue={value} onBlur={(e: any) =>{
          row.modified = true
          row.score = e.target.value
        }
          
        }/>)
      }
    },
    {
      title: "老师签名",
      dataIndex: "signName",
      align: "center",
      width: 60,
      render: (value: any, row: any, index: number) =>{
        return (<DoCon>
          <span key={row.id} onClick={() => handleSign(row, 'signName')}>{value || '签名'}</span>
        </DoCon>)
      }
      
    },
    {
      title: '备注',
      dataIndex: "remark",
      align: "center",
      width: 80,
      render: (value: any, row: any, index: number) =>{
        return (<Input.TextArea autosize={{minRows: 1}} key={row.id} defaultValue={value} onBlur={(e: any) =>{
          row.modified = true
          row.remark = e.target.value
        }
          
        }/>)
      }
    },
  ];

  /**保存 */
  const saveTable = ()=>{
    let paramter:any = {
      templateItemListVos:[],
      masterId:handbookModel.curCatalogue?.masterId,
      templateId:handbookModel.curCatalogue?.templateId,
      catalogId:handbookModel.curCatalogue?.id,
      templateType:handbookModel.curCatalogue?.templateType,
    }
    let dataObj = {}
    let flag = false
    tableData.map((it:any)=>{
      if(it.modified){
        flag = true
        // 有改动的
        dataObj={
          signName:it.signName || undefined,
          score:it.score || undefined,
          examTime:it.examTime || undefined,
          remark:it.remark || undefined,
        }
      paramter.templateItemListVos.push({
        id:it.id,
        itemDataStr:JSON.stringify(dataObj)
      })
    }
    })
    // console.log(paramter)
    if(!flag){
      message.warning('没有改动')
      return false
    }
    // return
    handbookModel.tableLoading = true
    trainingSettingApi.saveOrUpdateItemData(paramter).then((res:any)=>{
      message.success('保存成功')
      handbookModel.tableLoading = false
    }).catch((err:any)=>{
      handbookModel.tableLoading = false

    })
  }

  const handleSign = (record: any, itemCode: string) => {
    if (!signValue) {
        templateSingModal.show({
            handleOk: (value: any) => {
              // console.log(authStore.user?.empName)
                record.modified = true
                record[itemCode] = authStore.user?.empName;
                /**需要记录起来，下次签名直接使用**/
                setSignValue(authStore.user?.empName)
                // updateDataSource()
            }
        })
    } else {
      // console.log(signValue)
        record.modified = true
        record[itemCode] = signValue;
        setTableData([...tableData])
    }

}

  return (
    <Wrapper>
       <BaseTable
       title={()=><Button onClick={saveTable}> 保存</Button>}
            loading={handbookModel?.tableLoading}
            dataSource={tableData || []}
            columns={columns}
            surplusHeight={400}
            surplusWidth={0}
        />
        <templateSingModal.Component/>
        
    </Wrapper>
  )
})
const Wrapper = styled.div`
.ant-input-number-handler-wrap{
  display: none;
}
`



