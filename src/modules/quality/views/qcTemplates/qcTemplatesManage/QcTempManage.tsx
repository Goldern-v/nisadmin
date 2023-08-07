import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseTable, { DoCon } from "src/components/BaseTable";
import QcTempManageHeader from './QcTempManageHeader';
import { Table, Input, Switch, message, Icon, Modal,Upload } from 'antd'
import { qcTempDatas } from './qcTempData';
import { appStore, authStore } from "src/stores/index";
import MultiFileUploader, { FileItem } from 'src/components/MultiFileUploader'
import moment from "moment";

import { qcTempApi } from './QcTempApi';
export interface Props {
payload: any;
}
const { Dragger } = Upload;
export default observer(function QcTempManage(props: Props) {
  const [accept,setAccept] =useState('.xlsx,.xls');
  const [attachmentList, setAttachmentList] = useState<FileItem[]>([])

  const turnToView = (record:any)=>{
    console.log(record)
    appStore.history.push(
      `/qualityControlRecordDetail/${record.qcCode}?qcCode=${record.qcCode}&qcDetail=manageDetail`
    );
  }
  const columns:any = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => index + 1+(qcTempDatas.pageIndex-1)*qcTempDatas.pageSize,
      align: 'center',
      width: 40
    },
    {
			title: "状态",
			dataIndex: "status",
			align: "center",
			width: 60,
      render: (text: any, record: any, index: any) =>
         
          <span>
            {/* deleteToF：true：可删除；false：不可删除 */}
            <Switch key={record.qcCode} disabled={!record.deleteToF}
              size='small'
              onChange={(check: any) => {
                qcTempDatas.changeItemStatus({
                  qcCode:record.qcCode,
                  status:check?1:0
                })
                
                
              }}
              defaultChecked={text?true:false}
             
            />
          </span>
		},
    {
      title: '表名',
      align: 'center',
      dataIndex: "qcName",
      width: 200
    },
    {
      title: '质控级别',
      align: 'center',
      dataIndex: "qcLevel",
      width: 120,
      render: (text: any, record: any, index: any)=>{
        let textArr = text?.split(',')
      let textStr = ''
      textArr.map((it:any,index:number)=>{
        if(index>0){
          textStr+=','
        }
        textStr +=qcTempDatas.levalText[it]
        
      })
        return (<>{textStr}</>)
      }
    },
    {
      title: '创建人',
      align: 'center',
      dataIndex: "creatorName",
      width: 80
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: "createTime",
      width: 160,
      render: (text: any, record: any, index: any)=>{
        return <>{text?moment(text).format('YYYY-MM-DD HH:mm:ss'):''}</>
      }
    },
    {
			title: "操作 ",
			dataIndex: "cz",
			align: "center",
			width: 100,
			render: (text: any, record: any, index: number) => {
				return (
					<DoCon>
						<span onClick={() => { turnToView(record) }}>查看</span>
						{/* <span onClick={() => { qcTempDatas.importEditor() }}>重新导入</span> */}
            <span onClick={() => { qcTempDatas.exportItem(record) }}>导出</span>
            {/* deleteToF：true：可删除；false：不可删除 */}
						<span style={record.deleteToF?{}:{color:'#999'}} onClick={() => {handleDelete(record,index)}}>删除</span>
					</DoCon>
				);
			}
		},
  ]

  const handleDelete =(record:any,index:number)=>{
    if(!record.deleteToF){
      // deleteToF：true：可删除；false：不可删除
      return false
    }
    Modal.confirm({
        title: '提示',
        content: '是否删除该数据',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
            qcTempApi.deleItem({qcCode:record.qcCode,}).then(()=>{
                message.success('删除成功')
                qcTempDatas.tableList.splice(index,1)
                
            })
        }
    })

}

  const onCancel = ()=>{
    qcTempDatas.modalVisible = false
  }
  const onOk = ()=>{
    qcTempDatas.modalVisible = false
  }

  /**上传文件 */
  const uploadFile = (file: File) => {
    if (file) {
      // console.log(file)
      qcTempApi.upLoadTempt({file:file}).then(res=>{
        message.success('导入成功')
        qcTempDatas.getList()
        // qcTempDatas.modalVisible = false
      }).catch(err=>{
      })
    }
    return false
  }
  useEffect(() => {
    qcTempDatas.getList()
  }, [])
  


  return (
    <Wrapper>
      <QcTempManageHeader title={'质控模板管理'}></QcTempManageHeader>
      <ScrollCon>
				<BaseTable
					loading={qcTempDatas.tableLoading}
					dataSource={qcTempDatas.tableList}
					columns={columns}
					surplusWidth={300}
					surplusHeight={220}
          pagination={{
            current: qcTempDatas.pageIndex,
            total: qcTempDatas.total,
            pageSize: qcTempDatas.pageSize
          }}
          onChange={pagination => {
            qcTempDatas.pageIndex = pagination.current;
            qcTempDatas.total = pagination.total;
            qcTempDatas.pageSize = pagination.pageSize;
            qcTempDatas.getList()
          }}
				/>
			</ScrollCon>
      <Modal
      title='导入'
      visible={qcTempDatas.modalVisible}
      onCancel={onCancel}
      onOk={onOk}
      okText="确认"
      
    >
      <div>
      
          <Dragger
            accept=".xlsx,.xls"
            className="ant-dragger"
            beforeUpload={uploadFile}>
            <p className="ant-upload-drag-icon">
              <Icon type="cloud-upload" />
            </p>
            <p className="ant-upload-text">点击或者拖拽上传文件</p>
            <p className="ant-upload-hint">说明：请根据导出的模板，导入表单。</p>
          </Dragger>
        
      </div>
    </Modal>
    </Wrapper>
  )
})
const Wrapper = styled.div`
.edit-row{
    .title{
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
      .size{
        font-weight: normal;
        color: #999;
      }
      .fr{
        float: right;
        button{
          margin-left: 15px;
        }
      }
    }
    .content{
      margin-bottom: 25px;
      &.reciever-content{
        margin-top: 20px;
      }
    }
    &:last-of-type{
      .content{
        margin-bottom: 10px;
      }
    }
    .buttonBox{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
    }
  }
`

const ScrollCon = styled.div`
  flex: 1;
  .cell-ipt:focus {
    background: yellow !important;
  }

`;