import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { ScrollBox, DownLoader } from 'src/components/common'
import InfoItem from './InfoItem'
import { noticeViewModel } from '../../NoticeViewModel'

import { noticeService } from '../../serveices/NoticeService'
import InfiniteScroll from 'react-infinite-scroller'

import classNames from 'classnames'
import { observer } from 'src/vendors/mobx-react-lite'
import { Spin } from 'src/vendors/antd'

export default observer(function InfoList() {
  const { list, pageIndex, totalCount } = noticeViewModel.currentListObj
  const loadFunc = (page: number) => {
    noticeViewModel.loadData()
  }
  return (
    <Wrapper>
      <Head>
        <div className='title'>{noticeViewModel.selectedMenu}</div>
        <div className='btn' onClick={() => noticeViewModel.toggleMenuEdit()}>
          {noticeViewModel.isMenuEdit ? '取消' : '编辑'}
        </div>
      </Head>
      {/* {JSON.stringify(noticeViewModel.selectedMenuEditList)} */}
      <Spin spinning={noticeViewModel.listLoading && noticeViewModel.currentListObj.pageIndex == 0}>
        <ListCon
          className={classNames({
            isEdit: noticeViewModel.isMenuEdit
          })}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={!noticeViewModel.currentListObj.lastPage}
            loader={<DownLoader key={1} />}
            useWindow={false}
          >
            {list.map((item, index: number) => (
              <InfoItem
                data={item}
                key={index}
                onClick={() => {
                  if (noticeViewModel.isMenuEdit) {
                    /** 编辑模式 */
                    noticeViewModel.toggleMenuEditList(item)
                  } else {
                    noticeViewModel.setDetailObj(noticeViewModel.selectedMenu, item.id)
                    item.showType == '收' &&
                      !item.read &&
                      noticeService.readMail(item.id).then((res) => {
                        item.read = true
                        // noticeViewModel.currentListObj = JSON.parse(JSON.stringify(noticeViewModel.currentListObj))
                        // noticeViewModel.refreshCurrentListObj()
                      })
                  }
                }}
                active={noticeViewModel.detailObj.id === item.id}
              />
            ))}
          </InfiniteScroll>
        </ListCon>
      </Spin>
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

  .btn {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`

const ListCon = styled(ScrollBox)`
  height: calc(100vh - 86px);
  &.isEdit {
    height: calc(100vh - 136px);
  }
`
