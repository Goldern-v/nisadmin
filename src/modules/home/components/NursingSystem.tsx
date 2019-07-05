import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { ScrollUl } from 'src/components/common'
import { appStore } from 'src/stores/index'
import { Button } from 'antd'

//引入图标
import { ReactComponent as HLZD } from '../img/护理制度.svg'
import { ReactComponent as EXCL } from '../img/excl.svg'
import { ReactComponent as PDF } from '../img/pdf.svg'
import { ReactComponent as WORLD } from '../img/word.svg'
import { ReactComponent as OTHER } from '../img/其他.svg'
import { ReactComponent as PICTURE } from '../img/图片.svg'

export interface Props extends RouteComponentProps {}


export default function NursingSystem () {
  const [count] = useState([{
    icon:<EXCL/>,
    content:'啦啦啦啦啦啦啦啦',
    time:'11:32'
  },{
    icon:<PDF/>,
    content:'啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
    time:'11:32'
  },{
    icon:<WORLD/>,
    content:'啦啦啦啦啦啦啦啦',
    time:'11:32'
  },{
    icon:<OTHER/>,
    content:'啦啦啦啦啦啦啦啦',
    time:'11:32'
  },{
    icon:<PICTURE/>,
    content:'啦啦啦啦啦啦啦啦',
    time:'11:32'
  }]) 

    //封装函数
    const renderSubMenu = () =>{
      return count.map((item) => {
        return (
          <Li>
            <Icon>{item.icon}</Icon>
            <Content>{item.content}</Content>
            <Time>{item.time}</Time>
          </Li>
        )
      })
    }
  
  return (
    <Wrapper>
      <Title>
        <I><HLZD /></I>
        <World>护理制度</World>
        <More>更多 ></More>
      </Title>
      <Ul>
        {renderSubMenu()}
      </Ul>
    </Wrapper>
  )
}

const Wrapper = styled.div` 
  background:red;
  width:335px;
  height:calc(50vh - 60px);
  background:rgba(255,255,255,1);
  box-shadow:0px -1px 0px 0px rgba(243,156,18,1);
  border-radius:2px;
  border:1px solid rgba(221,221,221,1);
  box-sizing:border-box;
`
const Title = styled.div` 
  border-bottom:1px solid #DDD;
  width:335px;
  height:45px;
  padding:0 14px;
  box-sizing:border-box;
`
const Ul = styled(ScrollUl)` 
  height:calc(50vh - 105px);
  width:335px;
  overflow:auto;
  padding-inline-start: 0!important;
`
const I = styled.span`
  display:inline-block;
  margin-top:15px;
  vertical-align:middle;
`
const World = styled.span`
  display:inline-block;
  margin-left:10px;
  width:96px;
  font-size:16px;
  font-weight:400;
  color:rgba(51,51,51,1);
  vertical-align:middle;
  margin-bottom:-7px;
`
const More = styled.span`
  float:right;
  height:17px;
  font-size:12px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:17px;
  margin-top:15px;
`
const Li = styled.li`
  padding:7px 11px 7px 18px;
  border-bottom:1px solid #DDD;
  box-sizing:border-box;
  list-style-type:none;
`
const Icon = styled.span`
  display:inline-block;
  width:24px;
  height:24px;
  background:rgba(249,102,72,1);
  border-radius:1px 0px 0px 1px;
  margin-right:14px;
  vertical-align:middle;
`
const Content = styled.span`
  display:inline-block;
  width:182px;
  font-size:13px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:18px;
  vertical-align:middle;
`
const Time = styled.span`
  float:right;
  vertical-align:middle;
`