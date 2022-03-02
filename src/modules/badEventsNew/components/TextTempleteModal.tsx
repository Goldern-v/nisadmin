import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button,message as Message,Input, Row, Col ,Empty,Icon,Modal} from 'antd'
import { badEventsNewService } from '../api/badEventsNewService'
const TextArea = Input.TextArea

export interface Props {
  onItemClick?: any,
  showTextTemplete:Boolean,
  setShowTextTemplete:Function,
  textArr:Array<any>,
  showTextTempleteFn:Function,
}

export default function UserCheckModal(props: Props) {
  let initTextTemplete = {
    id:"-1",
    content:''
  }
  const {setShowTextTemplete,onItemClick,showTextTempleteFn} = props
  const [searchKey,setSearchKey] = useState('')
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [submitItem,setSubmitItem] = useState(initTextTemplete)
  const [currentItem,setCurrentItem] = useState(initTextTemplete)
  const [type,setType] = useState('')
  
  const showModal = (type:any) => {
    setType(type);
    (type == '编辑模版' || type == '删除模板') && (setSubmitItem({...currentItem}))
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    type != '删除模板' && await badEventsNewService.saveOrUpdateApi(submitItem)
    type == '删除模板' && await badEventsNewService.deleteById(submitItem.id)
    setIsModalVisible(false);
    showTextTempleteFn()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const textCallBack =  (e:any) =>{
    switch(type){
      case '新增模板':
        setSubmitItem({ id:'', content: e.target.value });
        break;
      case '编辑模板':
        setSubmitItem({...submitItem,content: e.target.value });
        break;
      default:
        break;
    }
  }

  useEffect(() => {

  }, [])
  const renderContent = (textArrParams:Array<any>)=>{
    return textArrParams.length?(
      <div>
        <div className='ant-modal-header' style={{display:'flex',justifyContent:'space-between'}}>
          <div className='ant-modal-title'>模板列表</div>
          <div 
            style={{width:'22px',height:'22px',fontSize:'20px',lineHeight:1,cursor:'pointer'}}
            onClick={(e)=>{setShowTextTemplete(false)}}
          >
            <Icon type="close" />
          </div>
        </div>
        <div style={{textAlign:'center'}}>
          关键字：
          <Input style={{ width: 220 }} value={searchKey} onInput={(e)=>{setSearchKey(e.currentTarget.value)}}></Input>
        </div>
        <div className='text-templete-list'>
          {
            textArrParams.filter(filterItem=>filterItem.content && filterItem.content.includes(searchKey)).map((textItem:any,textItemIndex:any)=>{
              return (
                <div style={{display:'flex'}} className={(currentItem.id && currentItem.id==textItem.id)?"item-box active-item":'item-box'}>
                  <div className='index-box'>模块{textItemIndex + 1}</div>
                  <div onClick={(e:any)=>{currentItem.id==textItem.id?setCurrentItem(initTextTemplete):setCurrentItem(textItem)}} className='text-templete-item'>{textItem.content}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
    :
    (
      <Empty></Empty>
    )
  }
  return <Wrapper>
    {props.showTextTemplete && <div className='ant-modal-content'>
      {
        renderContent(props.textArr)
      }
      <div className='btns'>
        <Button type="primary" size='default' onClick={()=>showModal('新增模板')}>
          新增
        </Button>
        <Button type="primary" size='default' onClick={()=>showModal('编辑模板')} disabled={currentItem.id=='-1'}>
          编辑
        </Button>
        <Button type="primary" size='default' onClick={()=>showModal('删除模板')} disabled={currentItem.id=='-1'}>
          删除
        </Button>
      </div>
      <Modal title={type} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {type!='删除模板' && (<TextArea
          autosize={{ minRows: 2 }}
          value={submitItem.content}
          onChange={textCallBack} />)}
          {type}
      </Modal>
    </div>}
    </Wrapper>
}

const Wrapper = styled.div`
.ant-modal-content{
  position:absolute;
  width:20vw;
  height:80vh;
  top:-50px;
  right:-25vw;
  overflow:hidden;
}
.text-templete-list{
  height:calc( 80vh - 127px);
  overflow-y:auto;
}
.text-templete-item{
  flex:1;
  padding:10px;
  font-size:14px;
  border-bottom:1px solid #ccc;
}
.ant-empty{
  height:100%;
  padding-top:70%;
  box-sizing:border-box;
}
.btns{
  display:flex;
  justify-content:space-between;
  padding: 4px 50px;
  box-sizing:border-box;
  height:40px;
  line-height:40px;
  position:absolute;
  bottom:0;
  left:0;
  right:0;
}
.index-box{
  width:50px;
  text-align:center;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-pack: center;
  -moz-box-align: center;
  
  display: -o-box;
  -o-box-orient: horizontal;
  -o-box-pack: center;
  -o-box-align: center;
  
  display: -ms-box;
  -ms-box-orient: horizontal;
  -ms-box-pack: center;
  -ms-box-align: center;
  
  display: box;
  box-orient: horizontal;
  box-pack: center;
  box-align: center;
}
.item-box{
    &:hover , &.active-item{
    background:rgba(0, 166, 128,.3);
  }
}
`