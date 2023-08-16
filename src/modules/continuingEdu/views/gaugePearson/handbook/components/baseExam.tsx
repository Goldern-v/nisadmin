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
export default observer(function baseExam(props: Props) {
  const [tableData, setTableData] = useState([]);

  // 签名对话框
  const templateSingModal = createModal(TemplateSingModal)
  const [signValue, setSignValue] = useState() as any

  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState(authStore.user?.empNo);
  const [pwd, setPwd] = useState('');

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
      width: 120
    },
    {
      title: "考核要求",
      dataIndex: "catagory",
      align: "center",
      width: 80,
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
      title: () => {
				return (
						<span>成绩<br></br>{'≥85分及格'}</span>
				)
			},
      dataIndex: "score",
      align: "center",
      width: 40,
      render: (value: any, row: any, index: number) =>{
        return (<InputNumber precision={2} min={0} max={100} key={row.id} defaultValue={value} onBlur={(e: any) =>{
          row.modified = true
          row.score = e.target.value
        }
          
        }/>)
      }
    },
    {
      title: "考核人签名",
      dataIndex: "signName",
      align: "center",
      width: 60,
      render: (value: any, row: any, index: number) =>{
        return (<DoCon>
          <span key={row.id} onClick={() => handleSign(row, 'signName')}>{value || '签名'}</span>
        </DoCon>)
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
          examTime:it.examTime || undefined
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

  const updateDataSource = (isAll?: boolean) => {
    // if (isAll) {
    //     setDataSource([]);
    //     setDataSource([...dataSource]);
    // } else {
    //     throttler2(() => {
    //         setDataSource([...dataSource]);
    //     });
    // }
};
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

  /**关闭对话框 */
  const handleOk = ()=>{
    setShowModal(false)
  }

  const handleCancel = ()=>{
    setShowModal(false)
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
        <MModal>
				<Modal width={400}
					title="签名验证"
					visible={showModal}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<div className='modal-content'>
						
						<Row className="item-row">
							<Col >
								<div className="label">输入用户名或工号:</div>
							</Col>
						</Row>
						<Row style={{ marginTop: '5px' }}>
							<Col>
								<Input defaultValue={userName} placeholder="输入用户名或工号" />
							</Col>
						</Row>
						<Row className="item-row" style={{ marginTop: '15px' }}>
							<Col>
								<div className="label">输入登录密码:</div>
							</Col>
						</Row>
						<Row style={{ marginTop: '5px' }}>
							<Col>
								<Input placeholder="输入登录密码" value={pwd} onChange={(val:any)=>setPwd(val)} type='password' />
							</Col>
						</Row>
					</div>
				</Modal>
			</MModal>
    </Wrapper>
  )
})
const Wrapper = styled.div`
.ant-input-number-handler-wrap{
  display: none;
}
`
const MModal = styled.div`
/* .item-row{ */
	.label{
		font-size: 14px;
	}
/* } */
`


