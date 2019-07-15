import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { ScrollUl } from 'src/components/common'

//引入图标
import { ReactComponent as JXJY } from '../images/继续教育.svg'
export interface Props extends RouteComponentProps {}


export default function ContinuingEducation () {
  const [count] = useState([{
    type:'考试',
    content:'中国广东省深圳市宝山区村307号',
    time:'11:32'
  },{
    type:'考试',
    content:'中国福建省厦门市莲花坞村龙昌里344号',
    time:'11:32'
  },{
    type:'考试',
    content:'中国河南南阳市卧龙区八一路272号',
    time:'11:32'
  }]) 

  //封装函数
  const renderSubMenu = () =>{
    return count.map((item) => {
      return (
        <Li>
          <Type>{item.type}</Type>
          <Content className='content'>{item.content}</Content>
          <Time>{item.time}</Time>
        </Li>
      )
    })
  }
  
  return (
    <Wrapper>
      <Title>
        <I><JXJY /></I>
        <World>继续教育通知</World>
        <More>更多 ></More>
      </Title>
      <Ul>
        {renderSubMenu()}
      </Ul>
    </Wrapper>
  )
}
const Wrapper = styled.div` 
  width:335px;
  height:calc(50vh - 55px);
  margin-bottom:20px;
  width:335px;
  background:rgba(255,255,255,1);
  box-shadow:0px -1px 0px 0px rgba(51,122,183,1);
  border-radius:2px;
  border:1px solid rgba(221,221,221,1);
  box-sizing:border-box;
`
const Title = styled.div` 
  border-bottom:1px solid #DDD;
  width:335px;
  height:45px;
  padding:0 15px;
  box-sizing:border-box;
`
const Ul = styled(ScrollUl)` 
  height:calc(50vh - 102px);
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
  font-size:15px;
  font-weight:900;
  color:rgba(51,51,51,1);
  vertical-align:middle;
  margin-bottom:-9px;
`
const More = styled.span`
  float:right;
  height:17px;
  font-size:12px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:17px;
  margin-top:15px;
  &:hover{
    cursor: pointer;
    color:#00A65A;
  }
`
const Li = styled.li`
  padding:7px 15px 7px 15px;
  border-bottom:1px solid #DDD;
  box-sizing:border-box;
  list-style-type:none;
  &:hover{
    cursor: pointer;
  }
  &:hover .content{
    color: #00A65A;
  }
`
const Type = styled.span`
  display:inline-block;
  width:30px;
  height:19px;
  margin-right:8px;
  background:#00A65A;
  color:#fff;
  font-size:12px;
  text-align:center;
  line-height:17px;
  vertical-align:middle;
  box-sizing:border-box;
  padding:1px 2px;
`
const Content = styled.span`
  display:inline-block;
  width:220px;
  font-size:13px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:18px;
  vertical-align:middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
`
const Time = styled.span`
  float:right;
  vertical-align:middle;
  font-size:12px;
  margin-top:3px;
`