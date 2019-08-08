import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Checkbox, Button } from 'antd'
import { noticeViewModel } from '../../NoticeViewModel'
import { observer } from 'src/vendors/mobx-react-lite'
import { globalModal } from 'src/global/globalModal'
import { noticeService } from '../../serveices/NoticeService'
import { message } from 'antd/es'
import { CheckboxChangeEvent } from 'src/vendors/antd'

export interface Props extends RouteComponentProps {}

export default observer(function EditCon() {
  let ids: number[] = noticeViewModel.selectedMenuEditList.map((item) => item.id)
  const lotDelete = () => {
    globalModal
      .confirm('确认删除', `确认删除勾选的${noticeViewModel.selectedMenuEditList.length}项消息?`)
      .then((res) => {
        noticeService.removeAll(ids, noticeViewModel.selectedMenu).then((res) => {
          message.success('删除成功')
          noticeViewModel.refreshCurrentListObj()
          noticeViewModel.initMenuEditList()
        })
      })
  }
  const lotCollect = () => {
    globalModal
      .confirm('确认收藏', `确认收藏勾选的${noticeViewModel.selectedMenuEditList.length}项消息?`)
      .then((res) => {
        noticeService.collectAll(ids, false).then((res) => {
          message.success('收藏成功')
          noticeViewModel.refreshCurrentListObj()
          noticeViewModel.initMenuEditList()
        })
      })
  }
  const lotCancelCollect = () => {
    globalModal
      .confirm('确认取消收藏', `确认取消收藏勾选的${noticeViewModel.selectedMenuEditList.length}项消息?`)
      .then((res) => {
        noticeService.collectAll(ids, true).then((res) => {
          message.success('取消收藏收藏成功')
          noticeViewModel.refreshCurrentListObj()
          noticeViewModel.initMenuEditList()
        })
      })
  }
  const lotRead = () => {
    globalModal
      .confirm('确认标记已读', `确认标记勾选的${noticeViewModel.selectedMenuEditList.length}项消息为已读?`)
      .then((res) => {
        noticeService.readAll(ids).then((res) => {
          message.success('标记已读成功')
          noticeViewModel.refreshCurrentListObj()
          noticeViewModel.initMenuEditList()
        })
      })
  }

  const lotUnRead = () => {
    globalModal
      .confirm('确认标记未读', `确认标记勾选的${noticeViewModel.selectedMenuEditList.length}项消息为未读?`)
      .then((res) => {
        noticeService.unreadAll(ids).then((res) => {
          message.success('标记未读成功')
          noticeViewModel.refreshCurrentListObj()
          noticeViewModel.initMenuEditList()
        })
      })
  }
  const CheckAll: ((e: CheckboxChangeEvent) => void) | undefined = (e) => {
    if (e.target.checked) {
      noticeViewModel.selectedMenuEditList = [...noticeViewModel.currentListObj.list]
    } else {
      noticeViewModel.selectedMenuEditList = []
    }
  }

  let toolList: string[] = []
  switch (noticeViewModel.selectedMenu) {
    case '收件箱':
      {
        toolList = ['收藏', '已读', '未读', '删除']
      }
      break
    case '发件箱':
      {
        toolList = ['删除']
      }
      break
    case '草稿箱':
      {
        toolList = ['删除']
      }
      break
    case '我的收藏':
      {
        toolList = ['取消收藏']
      }
      break
  }
  return (
    <Wrapper>
      <Checkbox onChange={CheckAll}>全选</Checkbox>
      <div style={{ width: 30 }} />
      <span className='aside'>已选择{noticeViewModel.selectedMenuEditList.length}项</span>
      <div style={{ width: 40 }} />

      {toolList.includes('删除') && <Button onClick={lotDelete}>删除</Button>}
      {toolList.includes('收藏') && <Button onClick={lotCollect}>收藏</Button>}
      {toolList.includes('已读') && <Button onClick={lotRead}>已读</Button>}
      {toolList.includes('未读') && <Button onClick={lotUnRead}>未读</Button>}
      {toolList.includes('未读') && <Button onClick={lotUnRead}>未读</Button>}
      {toolList.includes('取消收藏') && <Button onClick={lotCancelCollect}>取消收藏</Button>}

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
