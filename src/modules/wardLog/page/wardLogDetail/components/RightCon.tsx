import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ScrollBox } from 'src/components/common'
import { numberToArray } from 'src/utils/array/array'
import classNames from 'classnames'
export interface Props {
  pageData: any
}

export default function RightCon(props: Props) {
  const [selectedTab, setSelectedTab] = useState(1)
  const readReceiver = props.pageData.readReceiver || []
  const unreadReceiver = props.pageData.unreadReceiver || []
  let list = selectedTab == 1 ? readReceiver : unreadReceiver
  return (
    <Wrapper>
      <TabCon>
        <div
          className={classNames({
            active: selectedTab == 1,
            'tab-item': true
          })}
          onClick={() => setSelectedTab(1)}
        >
          已读（{readReceiver.length}）
        </div>
        <div
          className={classNames({
            active: selectedTab == 2,
            'tab-item': true
          })}
          onClick={() => setSelectedTab(2)}
        >
          未读（{unreadReceiver.length}）
        </div>
      </TabCon>
      <ScrollListCon>
        {list.map((item: any, index: number) => (
          <UserBox>
            <img src={item.nearImageUrl || require('src/assets/images/护士默认头像.png')} alt='' className='head-img' />
            <div className='name'>{item.empName}</div>
          </UserBox>
        ))}
      </ScrollListCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
`
const TabCon = styled.div`
  height: 36px;
  border-bottom: 1px solid #dedede;
  display: flex;
  .tab-item {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #26a680;
    }
    &.active {
      color: #26a680;
      border-bottom: 3px solid #25a680;
    }
  }
`

const ScrollListCon = styled(ScrollBox)`
  padding: 15px 0;
  height: calc(100% - 36px);
`

const UserBox = styled.div`
  width: 33%;
  float: left;
  align-items: center;
  .head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px auto;
    display: block;
  }
  .name {
    font-size: 13px;
    color: #666666;
    text-align: center;
    margin-bottom: 5px;
  }
`
