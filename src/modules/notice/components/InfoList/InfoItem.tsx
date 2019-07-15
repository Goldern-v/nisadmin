import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd'
import { InfoListItem } from '../../type'
import { noticeViewModel } from '../../NoticeViewModel'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
export interface Props {
  data: InfoListItem
  onClick: () => any
  active: boolean
}

export default observer(function InfoItem(props: Props) {
  let { data, onClick, active } = props
  return (
    <Con
      className={classNames({
        active,
        inEdit: noticeViewModel.inMenuEdit(data)
      })}
      onClick={onClick}
    >
      {noticeViewModel.isMenuEdit && <Checkbox style={{ marginLeft: 12 }} checked={noticeViewModel.inMenuEdit(data)} />}
      <Wrapper>
        <img src={data.nearImageUrl || require('src/assets/images/护士默认头像.png')} className='head-img' alt='' />
        <TextCon>
          <div className='title'>{data.title || <span style={{ color: '#bfbfbf' }}>(暂无主题)</span>}</div>
          <div className='aside'>{data.content || <span style={{ color: '#bfbfbf' }}>(暂无内容)</span>}</div>
        </TextCon>
        {data.showType == '收' && !data.read && <div className='red-point' />}
        {data.hadAttachment && <img src={require('../../images/附件.png')} alt='' className='hasFile-icon' />}
      </Wrapper>
    </Con>
  )
})
const Con = styled.div`
  display: flex;
  align-items: center;
  &.active,
  &:hover {
    background: #eeeeee;
  }
  &.inEdit {
    background: #e9f7f2;
  }
`

const Wrapper = styled.div`
  flex: 1;
  width: 0;
  height: 42px;
  padding: 12px;
  box-sizing: content-box;
  cursor: pointer;
  position: relative;
  .head-img {
    float: left;
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .red-point {
    position: absolute;
    width: 11px;
    height: 11px;
    background: #ff3b30;
    border: 1px solid #fff;
    border-radius: 50%;
    top: 10px;
    left: 43px;
  }
  .hasFile-icon {
    position: absolute;
    width: 15px;
    top: 15px;
    right: 15px;
  }
`
const TextCon = styled.div`
  margin-left: 52px;
  .title,
  .aside {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title {
    margin-right: 30px;
    font-size: 15px;
    color: #333333;
    margin-bottom: 3px;
    font-weight: bold;
  }
  .aside {
    font-size: 13px;
    color: #666666;
  }
`
