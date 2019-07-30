import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { ScrollUl } from 'src/components/common'
import { appStore } from 'src/stores/index'
import { Button } from 'antd'

//引入图标
import { ReactComponent as HLZD } from '../images/护理制度.svg'
// import { ReactComponent as EXCL } from '../images/excl.svg'
// import { ReactComponent as PDF } from '../images/pdf.png'
// import { ReactComponent as WORLD } from '../images/word.svg'
// import { ReactComponent as OTHER } from '../images/其他.svg'
// import { ReactComponent as PICTURE } from '../images/图片.svg'

export interface Props extends RouteComponentProps {}

export default function NursingSystem() {
  const [count] = useState([
    {
      icon: '../images/excl.png',
      content: '培训护理培训护理制度.excl',
      time: '11:32'
    },
    {
      icon: '../images/word.png',
      content: '跌倒时间.word',
      time: '11:32'
    },
    {
      icon: '../images/other.png',
      content: '培训护理制度',
      time: '11:32'
    },
    {
      icon: '../images/picture.png',
      content: '培训护理制度.png',
      time: '11:32'
    }
  ])

  //封装函数
  const renderSubMenu = () => {
    return ([] || count).map((item: any) => {
      return (
        <Li>
          <Icon src={item.icon} />
          <Content className='content'>{item.content}</Content>
          <Time>{item.time}</Time>
        </Li>
      )
    })
  }

  return (
    <Wrapper>
      <Title>
        <I>
          <HLZD />
        </I>
        <World>护理制度</World>
        <More>更多 ></More>
      </Title>
      <Ul>{renderSubMenu()}</Ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: red;
  width: 335px;
  height: calc(50vh - 55px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -1px 0px 0px rgba(243, 156, 18, 1);
  border-radius: 2px;
  border: 1px solid rgba(221, 221, 221, 1);
  box-sizing: border-box;
`
const Title = styled.div`
  border-bottom: 1px solid #ddd;
  width: 335px;
  height: 45px;
  padding: 0 15px;
  box-sizing: border-box;
`
const Ul = styled(ScrollUl)`
  height: calc(50vh - 102px);
  width: 335px;
  overflow: auto;
  padding-inline-start: 0 !important;
`
const I = styled.span`
  display: inline-block;
  margin-top: 15px;
  vertical-align: middle;
`
const World = styled.span`
  display: inline-block;
  margin-left: 10px;
  /* width:96px; */
  font-size: 15px;
  font-weight: 900;
  color: rgba(51, 51, 51, 1);
  vertical-align: middle;
  margin-bottom: -9px;
`
const More = styled.span`
  float: right;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 17px;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
    color: #00a65a;
  }
`
const Li = styled.li`
  padding: 7px 15px 7px 15px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  list-style-type: none;
  &:hover {
    cursor: pointer;
  }
  &:hover .content {
    color: #00a65a;
  }
`
const Icon = styled.img`
  /* display:inline-block;*/
  width: 24px;
  height: 24px;
  /* background:rgba(249,102,72,1); */
  border-radius: 1px 0px 0px 1px;
  margin-right: 8px;
  vertical-align: middle;
`
const Content = styled.span`
  display: inline-block;
  width: 182px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  vertical-align: middle;
`
const Time = styled.span`
  float: right;
  vertical-align: middle;
  font-size: 12px;
  margin-top: 3px;
`
