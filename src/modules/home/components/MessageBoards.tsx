import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input,Button,message } from 'antd'
// import { authStore } from "src/stores/index";
import { authStore } from 'src/stores';
import HomeApi from 'src/modules/home/api/HomeApi'

const { TextArea } = Input;
export default observer(function MessageBoards() {
  const [msg, setMsg] = useState('');
  const [isEdit, setIsEdit] = useState(false);//是否可编辑
  const getMsg = ()=>{
    HomeApi.getMessage().then(res=>{
      setMsg(res.data?.message || '')
      setIsEdit(res.data?.editPermissions)
    }).catch(err=>{

    })
  }
  const onSave = ()=>{
    if(!msg || !msg.trim()){
      message.warning('请输入留言')
      return false
    }
    HomeApi.saveMessage({message:msg}).then(res=>{
      message.success('保存成功')
    }).catch(err=>{

    })
  }
  useEffect(() => {
    getMsg()
  }, [])
  
  return (
  <Wrapper>
    <div>
    <Head>
        <div className='headLeft'>留言板</div>
        <Button disabled={!authStore.isDepartment} onClick={() => onSave()} className='headRight' size='small'>保存</Button>
      </Head>
    <div style={{padding:'10px'}}>

        <TextArea 
        disabled={!authStore.isDepartment}
            value={msg}
            onChange={e => {
              setMsg(e.target.value)
            }}
            placeholder="请输入留言"
            autosize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        </div>
  </Wrapper>
  )
})
const Wrapper = styled.div`
 box-sizing: border-box;
  margin: 0.8416%;
  padding: 0;
  /* width: 100%; */
  /* width: 31.65%; */
  /* height: 320px; */
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.$shadow};
  overflow: hidden;
  `
const Head = styled.div`
  height: 37px;
  line-height: 37px;
  width: 100%;
  border-bottom:1px solid #ddd;
  background-color: rgba(245, 246, 247, 1);
  .headLeft {
    padding-left: 17px;
    float: left;
    font-size: 13px;
    letter-spacing: 1px;
    color: #333333;
  }
  .headRight {
    margin-top: 6px;
    margin-right: 14px;
    /* padding-right: 14px; */
    float: right;
    font-size: 13px;
    letter-spacing: 1px;
    color: #999999;
    cursor: pointer;
  }
`