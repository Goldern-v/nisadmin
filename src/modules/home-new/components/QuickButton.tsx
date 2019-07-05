import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
//引入图标
import { ReactComponent as TQBB } from '../img/病区白板.svg'
import { ReactComponent as HSDA } from '../img/护士档案.svg'
import { ReactComponent as HSPB } from '../img/护士排班.svg'
import { ReactComponent as MGZB } from '../img/敏感指标.svg'
import { ReactComponent as BLSJ } from '../img/不良事件.svg'
import { ReactComponent as XYB } from '../img/下一步.svg'

export default observer(function QuickButton () {
  const [count] = useState([{
    title:'病区白班',
    icon:<TQBB/>,
    background:'#00C0EF'
  },{
    title:'护士档案',
    icon:<HSDA/>,
    background:'#00A65A'
  },{
    title:'护士排班',
    icon:<HSPB/>,
    background:'#F39C12'
  },{
    title:'敏感指标',
    icon:<MGZB/>,
    background:'#F56954'
  },{
    title:'不良事件',
    icon:<BLSJ/>,
    background:'#337AB7'
  }]) 

  //封装函数
  const renderSubMenu = () =>{
    return count.map((item) => {
      return (
        <QuickMenu style={{background:`${item.background}`}}>
          <WorldTitle>{item.title}</WorldTitle>
          <ReactSvg>{item.icon}</ReactSvg>
          <Btn>
            <Content>
              <Span>进入查看</Span>
              <I><XYB/></I>
            </Content>
          </Btn>
        </QuickMenu>
      )
    })
  }

  return(
    <Wrapper>
      {renderSubMenu()}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height:110px;
  margin-bottom:20px;
  width:100%;
  display:flex;
  .cIekGw:nth-child(5){
    margin-right:0!important;
  }
  .cIekGw:nth-child(3) .icon{
    top:18!important;
}
`
const QuickMenu = styled.div`
  position:relative;
  flex:1;
  height:100%;
  background:yellow;
  margin-right:25px;
`
const WorldTitle = styled.div`
  position:absolute;
  top:16px;
  left:14px;
  width:84px;
  height:27px;
  font-size:21px;
  font-weight:600;
  color:rgba(249,249,249,1);
  line-height:27px;
  z-index:5;
`
const ReactSvg = styled.div`
  position:absolute;
  top:21px;
  right:18px;
`
const Btn = styled.div`
  width:100%;
  height:30px;
  background:rgba(0,0,0,0.1);
  position:absolute;
  left:0;
  bottom:0;
`
const Content = styled.div`
  width:75px;
  height:18px;
  /* background:red; */
  margin:auto;
  margin-top:4px;
`
const Span = styled.span`
  display:inline-block;
  color:rgba(255,255,255,1);
  line-height:18px;
  opacity:0.6;
  vertical-align: middle;
`
const I = styled.span`
  display:inline-block;
  opacity:0.6;
  margin-left:5px;
  vertical-align: middle;
  margin-top:3px;
`
