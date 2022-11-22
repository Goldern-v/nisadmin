import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon,Modal,Radio,Input,message } from 'antd'
export interface Props {
  getTitle?: any;
  manage?:Boolean
 }

// import { trainingInfoReviewModel } from './../model/TrainingInfoReviewModel'
import { observer } from 'mobx-react-lite'
import { nursingHandlerApi } from '../../api/NursingHandlerApi';
import { authStore, appStore } from 'src/stores'
import { manageDatas } from './ManageDatas';
const { TextArea } = Input;
function NodeList(props: Props) {
  const { history, location } = appStore;
  const [modalTitle, setModalTitle] = useState('护理部审核');//审核弹框标题
  const {taskTypeName,auditInfo} = manageDatas
  const [modalVisibleAudit, setModalVisibleAudit] = useState(false);
    const [radioVal, setRadioVal] = useState(true);//通过、不通过
    const [iptVal, setIptVal] = useState('');//意见或原因
    const [curAduitItem, setCurAduitItem] = useState({} as any);//点击的是哪条流程，添加审核

  const handleOk = ()=>{
    
    let paramter = {
        id:manageDatas.contentDetail.id,
        nodeCode:curAduitItem.nodeCode,
        handleContent:iptVal,
        isPass:radioVal
    }
    nursingHandlerApi.recordHandNode(paramter).then(res=>{
      if(res.code == '200'){
		setModalVisibleAudit(false)
        message.success('审核成功')
		// 处理数据
        manageDatas.auditInfo = res.data.nodeList || []//审核流程
		// 更新manageDatas.itemList
		for (let index = 0; index < manageDatas.itemList.length; index++) {
			// const element = array[index];
			if(manageDatas.itemList[index].id === manageDatas.contentDetail.id){
				manageDatas.itemList[index] = res.data
				break;
			}
			
		}
		
      }
    }).catch(err=>{

    })

  }
  
  const handleCancel = ()=>{
    setModalVisibleAudit(false)
  }
  /**
   * 点击添加审核，编辑审核
   * @param item 
   */
  const clickAudit = (item:any)=>{
    setModalVisibleAudit(true);
    setCurAduitItem(item)
    setIptVal(item.content || '')
    setRadioVal(item.pass)
    setModalTitle(item.nodeName)
  }
  return <Wrapper>
    <div className="audit-title">审核信息</div>
    <div className="audit-list">
      {auditInfo.map((item: any, idx: number) =>
        <div className="audit-item" key={idx}>
          <div className="emp-img">
            <img src={item.imageUrl} alt="" />
            {item.state=='1' && (!item.pass? <Icon type="close-circle" theme="filled" className="step-status error" /> : <Icon type="check-circle" theme="filled" className="step-status success" />)}
          </div>
          <div className="info">
            <div className="step-title">
              <span>{item.nodeName}</span>
              {/* {<span> ({taskTypeName(item.taskType)})</span>} */}
            </div>
            <div className="emp-name">{item.empName}</div>
            {(item.canHandle && manageDatas.pathname.indexOf('manage')>-1) && <div className='add-audit-btn' onClick={()=>clickAudit(item)}>添加审核</div>}
            {<div className="emp-name">{item.handleTime}</div>}
            {item.nodeCode!='commit' && (item.state=='1'&&(item.pass?<div className="emp-name" style={{color:'#00A680'}}>审核通过</div>:<div className="emp-name" style={{color:'#f00'}}>审核不通过</div>))}
            {item.content && <div className="desc">{item.content}</div>}
          </div>
        </div>)}
    </div>
    <MModal>
        <Modal
            title={modalTitle}
            visible={modalVisibleAudit}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className='modal-content'>
            <p style={{marginBottom:'.3em',fontWeight: 'bold'}}>审核结果</p>
            <Radio.Group onChange={(e)=>{setRadioVal(e.target.value)}} value={radioVal}>
                <Radio value={true}>通过</Radio>
                <Radio value={false}>不通过</Radio>
            </Radio.Group>
            <p style={{marginTop:'1em',marginBottom:'.3em',fontWeight: 'bold'}}>意见或原因</p>
            <Input placeholder="请输入意见或驳回原因，最多20个字" value={iptVal}  maxLength={20} allowClear onChange={(e)=>{setIptVal(e.target.value)}} />
            {/* <TextArea rows={4} placeholder="请输入意见或驳回原因，最多20个字" maxLength={20} /> */}
            </div>
        </Modal>
    </MModal>
  </Wrapper>
}

export default observer(NodeList)

const Wrapper = styled.div`
  background: #fff;
  border-left: 1px solid #ddd;
  padding: 10px 15px;
  width: 270px;
  height: 100%;
  float: right;
  overflow-y: auto;
  /* 添加审核 */
  .add-audit-btn{
    color: #00A680;
    :hover{
        font-weight: bold;
        cursor:pointer;
    }
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
  ::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  .audit-title{
    font-size: 14px;
    margin: 10px 0;
    ::before{
      content:'';
      display: inline-block;
      height: 18px;
      width: 5px;
      background: rgba(112, 182, 3, 1);
      vertical-align: sub;
      margin-right: 10px;
    }
  }
  .audit-item{
    color: #666;
    padding-top: 10px;
    position: relative;
    overflow: hidden;
    &::before{
      position: absolute;
      content: '';
      width:1px;
      height: 100%;
      background: #ddd;
      top: 0;
      left: 20px;
    }
    &:first-of-type{
      padding-top:0;
    }
    &:last-of-type{
      &::before{
        height:40px;
      }
    }
    .emp-img{
      width: 40px;
      position: relative;
      float: left;
      img{
        height: 40px;
        width: 40px;
        background: #ddd;
        border-radius: 50%;
        object-fit: cover;
        display:inline-block;
        background: url('${require('src/assets/护士默认头像.png')}');
        background-size: 100%;
      }
      .step-status{
        position:absolute;
        right: 0;
        bottom: 0;
        background: #fff;
        border-radius: 50%;
        &.error{
          color: red;
        }
        &.success{
          color: rgb(2, 159, 123);
        }
      }
    }
    .info{
      font-size: 13px;
      padding-left: 45px;
      .desc{
        padding: 5px;
        border-radius: 3px;
        background: #eee;
      }
    }
  }
`

const MModal= styled.div`

`