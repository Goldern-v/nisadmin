import styled from 'styled-components'
import React, { useState, useEffect, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router'
import { Breadcrumb, Button } from 'antd'
import { Place } from 'src/components/common'
import store from 'src/stores'
// import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { observer } from 'mobx-react-lite'
export interface Props {
  children?: ReactNode
  title: string
  breadcrumbItem: string
  btnList?: BtnType[]
}

interface BtnType {
  label: string
  type?: string
  format?: string
  placeholder?: string
  style?: any
  options?: any
  defaultValue?: any
  btnType?: any
  onChange?: (e: any) => void
  onClick?: (e: any) => void
}

// const BG = require('../../../images/顶部背景.png')
// const DEFAULT_HEADIMG = require('../../../images/护士默认头像.png')
// const WARNNING_ICON = require('../../../images/注意.png')

export default function TopCon(props: Props) {
  let history = store.appStore.history

  // console.log('history', history, history.location.pathname)
  let { title, btnList } = props
  //
  let getInputElements = (item: BtnType, gindex: any) => {
    // switch (item.type) {

    if (item.type === 'button') {
      return (
        <Button
          style={item.style}
          type={item.btnType}
          className={'item-head'}
          key={'BTN' + item.label}
          onClick={item.onClick}
        >
          {item.label}
        </Button>
      )
    }
  }

  return (
    <Wrapper>
      <BreadcrumbCon>
        <Breadcrumb>
          <Breadcrumb.Item>
            <A onClick={() => history.push('/badEvents')}>不良事件</A>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{props.breadcrumbItem}</Breadcrumb.Item>
          <Breadcrumb.Item />
        </Breadcrumb>
      </BreadcrumbCon>
      <TitleCon>
        <h3>{props.title}</h3>
        <Place />
        {/* {btnList && btnList.map((item: BtnType, index: any) => getInputElements(item, index))} */}
        {btnList &&
          btnList.map((item: BtnType, index: any) =>
            item.type === 'button' ? (
              <Button
                style={item.style}
                type={item.btnType}
                className={'item-head'}
                key={'BTN' + item.label}
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            ) : (
              ''
            )
          )}
      </TitleCon>
      {props.children}

      {/* <HeadImg src={nearImageUrl || DEFAULT_HEADIMG} /> */}
      {/* <Name>{empName}</Name>
      <Info>
        {post} | {currentLevel} | {deptName}
      </Info> */}
      {/* <Tip>
        <img src={WARNNING_ICON} alt='' />
        {nurseFileDetailViewModal.badgeTotal && (
          <span>
            {' '}
            注意：刘盼盼有{nurseFileDetailViewModal.badgeTotal}条未审核信息，点击
            <ClickSpan>这里</ClickSpan>
            进行审核
          </span>
        )}
      </Tip> */}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 81px;
  width: 100%;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
  .item-head {
    margin: 0px 5px;
    display: inline-flex;
    span {
      padding: 5px 0;
    }
  }
`
const BreadcrumbCon = styled.div`
  padding: 12px 15px 6px;
`

const A = styled.span`
  color: #666666;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`

const HeadImg = styled.img`
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  left: 15px;
  bottom: 15px;
  object-fit: cover;
`

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  top: 58px;
  left: 100px;
  position: absolute;
`
const Info = styled.div`
  font-size: 13px;
  color: #666;
  top: 88px;
  left: 100px;
  position: absolute;
`

const Tip = styled.div`
  font-size: 13px;
  color: #333;
  position: absolute;
  right: 20px;
  bottom: 30px;
  img {
    width: 14px;
    margin-right: 4px;
    margin-top: -4px;
  }
`
const ClickSpan = styled.span`
  cursor: pointer;
  color: #5472c4;
  margin: 0px 4px;
  display: inline-block;
  border-bottom: 1px solid #5472c4;
`

const TitleCon = styled.div`
  font-size: 18px;
  /* font-weight: 500; */
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  padding: 0px 15px;
  width: 100%;
  display: flex;
`
