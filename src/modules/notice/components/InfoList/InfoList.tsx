import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { ScrollBox } from 'src/components/common'
import InfoItem from './InfoItem'
import { noticeViewModel } from '../../NoticeViewModel'
import { observer } from 'mobx-react-lite'

export default observer(function InfoList() {
  const { list, pageIndex, totalCount } = noticeViewModel.currentListObj
  return (
    <Wrapper>
      <Head>
        <div className='title'>{noticeViewModel.selectedMenu}</div>
        <div className='btn'>编辑</div>
      </Head>
      <ListCon>
        {list.map((item, index: number) => (
          <InfoItem
            data={item}
            key={index}
            onClick={() => noticeViewModel.setDetailObj(noticeViewModel.selectedMenu, item.id)}
            active={noticeViewModel.detailObj.id === item.id}
          />
        ))}
      </ListCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  position: fixed;
  left: 200px;
  top: 50px;
  bottom: 0;
  width: 350px;
  background: #ffffff;
  border-right: 1px solid #ddd;
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 13px;
  border-bottom: 1px solid #dddddd;
  height: 34px;

  .title {
    font-size: 13px;
  }
`

const ListCon = styled(ScrollBox)`
  height: calc(100% - 35px);
`
