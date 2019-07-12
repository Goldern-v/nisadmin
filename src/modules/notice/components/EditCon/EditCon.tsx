import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Checkbox, Button } from 'antd'
import { noticeViewModel } from '../../NoticeViewModel'
import { observer } from 'src/vendors/mobx-react-lite'
import { globalModal } from 'src/global/globalModal'
export interface Props extends RouteComponentProps {}

export default observer(function EditCon() {
  const lotDelete = () => {
    globalModal
      .confirm('确认删除', `确认删除勾选的${noticeViewModel.selectedMenuEditList.length}项邮件?`)
      .then((res) => {})
  }
  return (
    <Wrapper>
      <Checkbox>全选</Checkbox>

      <div style={{ width: 30 }} />
      <span className='aside'>已选择{noticeViewModel.selectedMenuEditList.length}项</span>
      <div style={{ width: 40 }} />
      <Button onClick={lotDelete}>删除</Button>
      <Button>收藏</Button>
      <Button>已读</Button>
      <Button>未读</Button>
      <Button onClick={() => noticeViewModel.initMenuEditList()}>取消</Button>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(247, 247, 247, 1);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin-right: 8px;
  }
`
