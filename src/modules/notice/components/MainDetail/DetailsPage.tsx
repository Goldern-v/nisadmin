import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Tooltip, message } from 'antd'
import { DetailObj } from '../../type'
import { authStore, appStore } from 'src/stores'
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import service from 'src/services/api'
import { FileItem } from '../../page/SentNoticeView'
import { noticeService } from '../../serveices/NoticeService'
import { noticeViewModel } from '../../NoticeViewModel'
import { globalModal } from 'src/global/globalModal'
import Zimage from 'src/components/Zimage'
import moment from 'moment'
export interface Props {
  data: DetailObj
}

export default function DetailsPage(props: Props) {
  let { data } = props
  const [collected, setCollected] = useState(data.collected)

  /** 是否5分钟之内 */
  let isFiveMin = false
  if (moment().valueOf() - moment(data.sendTime).valueOf() < 1000 * 60 * 5) {
    isFiveMin = true
  }

  const downFile = (path: string, name: string) => {
    service.commonApiService.getFileAndDown(path, name)
  }
  const lotDown = (files: FileItem[]) => {
    files.forEach((file) => {
      service.commonApiService.getFileAndDown(file.path, file.name)
    })
  }
  const removeMail = () => {
    globalModal.confirm('确认删除', '确认删除该邮箱?').then((res) => {
      if (!data.id) return
      noticeService.removeMail(data.id, data.showType).then((res) => {
        message.success('删除消息成功')
        noticeViewModel.detailObj = {}
        noticeViewModel.refreshCurrentListObj()
      })
    })
  }
  const revokeMail = () => {
    globalModal.confirm('确认撤回', '确认撤回该邮箱?').then((res) => {
      if (!data.id) return
      noticeService.revokeMail(data.id).then((res) => {
        message.success('撤回消息成功')
        noticeViewModel.detailObj = {}
        noticeViewModel.refreshCurrentListObj()
      })
    })
  }
  const collectMail = () => {
    if (!data.id) return
    collected
      ? noticeService.revokeCollect(data.id).then((res) => {
          message.success('取消收藏消息成功')
          setCollected(!collected)
          noticeViewModel.refreshCurrentListObj()
        })
      : noticeService.collectMail(data.id).then((res) => {
          message.success('收藏消息成功')
          setCollected(!collected)
          noticeViewModel.refreshCurrentListObj()
        })
  }

  const editMail = (templateType: string) => {
    appStore.history.push(`/sentNotice?templateId=${data.id}&templateType=${templateType}`)
  }
  return (
    <Wrapper>
      <ToolCon>
        {data.showType == '草' && (
          <Tooltip placement='bottom' title='编辑'>
            <div className='item-box' onClick={() => editMail('草')}>
              <img src={require('./images/编辑.png')} alt='' />
            </div>
          </Tooltip>
        )}
        {data.showType == '发' && (
          <Tooltip placement='bottom' title='再次编辑'>
            <div className='item-box' onClick={() => editMail('发')}>
              <img src={require('./images/编辑.png')} alt='' />
            </div>
          </Tooltip>
        )}
        {data.showType == '发' && (
          <Tooltip placement='bottom' title='撤销'>
            <div className='item-box' onClick={revokeMail}>
              <img src={require('./images/撤销.png')} alt='' />
            </div>
          </Tooltip>
        )}

        {data.showType != '草' &&
          data.showType != '发' &&
          (collected ? (
            <Tooltip placement='bottom' title='取消收藏'>
              <div className='item-box' onClick={collectMail}>
                <img src={require('./images/已收藏.png')} alt='' />
              </div>
            </Tooltip>
          ) : (
            <Tooltip placement='bottom' title='收藏'>
              <div className='item-box' onClick={collectMail}>
                <img src={require('./images/收藏.png')} alt='' />
              </div>
            </Tooltip>
          ))}
        {data.showType != '藏' && (
          <Tooltip placement='bottom' title='删除'>
            <div className='item-box' onClick={removeMail}>
              <img src={require('./images/删除.png')} alt='' />
            </div>
          </Tooltip>
        )}
      </ToolCon>
      <HeadCon>{data.title || <span style={{ color: '#bfbfbf' }}>(暂无主题)</span>}</HeadCon>
      <PageCon>
        <InfoCon>
          <img
            src={
              data.showType == '收'
                ? data.nearImageUrl
                  ? data.nearImageUrl
                  : require('src/assets/images/护士默认头像.png')
                : authStore.user && authStore.user.nearImageUrl
                ? authStore.user.nearImageUrl
                : require('src/assets/images/护士默认头像.png')
            }
            className='head-img'
            alt=''
          />
          <div className='text-con'>
            <div className='name'>{data.senderName}</div>
            <div className='aside'>{data.sendTime}</div>
          </div>
        </InfoCon>

        {(data.showType == '发' || data.showType == '草') && (
          <Tooltip
            overlayClassName={'largeTip'}
            placement='bottom'
            title={(data!.receiverList || []).map((item) => item.empName).join(',')}
          >
            <Aside style={{ cursor: 'pointer' }}>
              发送给
              {(data!.receiverList || []).slice(0, 12).map((item, index, arr) => {
                return arr.length !== index + 1 ? (
                  <span key={index}>{item.empName}，</span>
                ) : (
                  <span key={index}>{item.empName}</span>
                )
              })}
              {(data!.receiverList || []).length > 12 && <span>...等{(data!.receiverList || []).length}人</span>}
            </Aside>
          </Tooltip>
        )}
        {data.showType == '发' && (
          <Aside>
            {data.readReceiverSize}人已读，{data.unreadReceiverSize}人未读
          </Aside>
        )}

        <Line />
        <TextCon>{data.content || <span style={{ color: '#bfbfbf' }}>(暂无内容)</span>}</TextCon>
        {data.attachmentList && data.attachmentList.length > 0 && (
          <FooterCon>
            <Line />
            <div className='title'>
              <img className='icon' src={require('./images/附件.png')} alt='' />
              <span>附件({data.attachmentList.length})：</span>
              <span className='down-all-text' onClick={() => data.attachmentList && lotDown(data.attachmentList)}>
                批量下载
              </span>
            </div>
            <FileCon>
              {data.attachmentList.map((item: any, index: number) => (
                <div className='file-box' key={index}>
                  <div className='file-inner' onClick={() => downFile(item.path, item.name)}>
                    {getFileType(item.path) == 'img' ? (
                      <Zimage src={item.path} className='type-img' alt='' />
                    ) : (
                      <img src={getFilePrevImg(item.path)} className='type-img' alt='' />
                    )}
                    <div className='file-name'>{item.name}</div>
                    <div className='file-size'>{getFileSize(item.size)}</div>
                  </div>
                </div>
              ))}
            </FileCon>
          </FooterCon>
        )}
      </PageCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 850px;
  position: relative;
  margin: 0 auto;
`

const HeadCon = styled.div`
  min-height: 30px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #333;
  margin-right: 100px;
  margin-bottom: 14px;
  margin-top: 18px;
  font-weight: bold;
`

const ToolCon = styled.div`
  position: absolute;
  right: 0;
  top: 0px;
  .item-box {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 13px;
    cursor: pointer;
    &:hover {
      background: #e8e8e8;
    }
    img {
      width: 15px;
      height: 15px;
    }
  }
`

const PageCon = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(204, 204, 204, 1);
  display: flex;
  flex-direction: column;
  padding: 5px 30px;
  min-height: calc(100vh - 130px);
`

const InfoCon = styled.div`
  height: 42px;
  padding: 12px 0;
  box-sizing: content-box;
  .head-img {
    float: left;
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .text-con {
    margin-left: 52px;
    .name,
    .aside {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      margin-right: 30px;
      font-size: 15px;
      color: #333333;
      font-weight: bold;
    }
    .aside {
      font-size: 13px;
      color: #999;
    }
  }
`

const Aside = styled.div`
  font-size: 12px;
  color: #999;
  margin: 6px 0 8px;
`
const Line = styled.div`
  border-top: 1px dotted #dddddd;
`

const TextCon = styled.pre`
  font-size: 13px;
  color: #333333;
  padding: 12px 0;
  flex: 1;
  white-space: pre-wrap;
`

const FooterCon = styled.div`
  padding-bottom: 20px;
  .title {
    margin: 9px 0 14px;
    span {
      font-size: 13px;
      color: #333;
    }
    .down-all-text {
      cursor: pointer;
      color: ${(p) => p.theme.$mtc};
      &:hover {
        font-weight: bold;
      }
    }
  }
  .icon {
    width: 15px;
    margin-right: 4px;
    position: relative;
    top: -2px;
  }
`

const FileCon = styled.div`
  margin: 0 -5px;
  overflow: hidden;
  .file-box {
    width: 25%;
    float: left;
    padding-left: 8px;
    padding-bottom: 8px;

    .file-inner {
      height: 125px;
      background: rgba(246, 246, 246, 1);
      border-radius: 2px;
      border: 1px dotted rgba(0, 166, 128, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 5px 10px;
      cursor: pointer;
      .type-img {
        height: 44px;
        min-height: 44px;
        width: 44px;
      }
      .file-name {
        font-size: 13px;
        color: #333333;
        margin: 5px 0 3px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .file-size {
        font-size: 13px;
        color: #999;
      }
    }
  }
`
