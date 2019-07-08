import styled from 'styled-components'
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { Select, Button, message } from 'antd'
import { RouteComponentProps } from 'react-router'
import createModal from 'src/libs/createModal'
import SelectPeopleModal from './modal/SelectPeopleModal'
import { ChangeEvent } from 'react'
import service from 'src/services/api'
import { getFileSize } from 'src/utils/file/file'
import { noticeService } from '../serveices/NoticeService'
import { appStore } from 'src/stores'
export interface Props extends RouteComponentProps {}

export interface CheckUserItem {
  key: string
  userList: any[]
}
interface FileItem {
  name: string
  size: string
  type: string
  id: string
}
export default function SentNoticeView() {
  const [title, setTitle]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const [content, setContent]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const [fileList, setFileList]: [FileItem[], Dispatch<SetStateAction<FileItem[]>>] = useState([] as FileItem[])
  const [checkedUserList, setCheckedUserList]: any = useState([])
  const selectPeopleModal = createModal(SelectPeopleModal)
  const fileInputRef = React.createRef<HTMLInputElement>()
  const openSelectPeopleModal = () => {
    selectPeopleModal.show({
      checkedUserList: checkedUserList
    })
  }
  const onOkCallBack = (checkedUserList: CheckUserItem[]) => {
    setCheckedUserList(checkedUserList)
  }
  const updateFile = () => {
    fileInputRef.current && fileInputRef.current.click()
  }
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    let promiseList = []
    let files = e.target.files || []
    for (let i = 0; i < files.length; i++) {
      let postData = new FormData()
      postData.append('file', files[i])
      promiseList.push(service.commonApiService.uploadAttachment('mail', postData))
    }
    let hideLoading = message.loading('正在上传，请稍等')
    Promise.all(promiseList)
      .then((res) => {
        setFileList([
          ...fileList,
          ...res.map(({ data: item }: any) => {
            return {
              ...item,
              size: getFileSize(item.size)
            }
          })
        ])
        hideLoading()
      })
      .catch((e) => {
        hideLoading()
      })
  }

  const sendMail = () => {
    let hideLoading = message.loading('邮件正在发送中...')
    noticeService
      .sendMail({
        mail: {
          title,
          content
        },
        empNos: checkedUserList.reduce((prev: any, current: any) => {
          return [...prev, ...current.userList.map((item: any) => item.empNo)]
        }, []),
        fileIds: fileList.map((item) => item.id),
        tempSave: false
      })
      .then((res) => {
        hideLoading()
        message.success('邮件发送成功！')
        appStore.history.replace('/notice')
      })
      .catch(() => {
        hideLoading()
      })
  }
  const saveTemplateMail = () => {
    let hideLoading = message.loading('邮件正在存草稿...')
    noticeService
      .sendMail({
        mail: {
          title,
          content
        },
        empNos: checkedUserList.reduce((prev: any, current: any) => {
          return [...prev, ...current.userList.map((item: any) => item.empNo)]
        }, []),
        fileIds: fileList.map((item) => item.id),
        tempSave: true
      })
      .then((res) => {
        hideLoading()
        message.success('邮件存草稿成功！')
      })
      .catch(() => {
        hideLoading()
      })
  }
  return (
    <Wrapper>
      <InputBox>
        <div className='label'>主&nbsp;题</div>
        <div className='input-con'>
          <input
            type='text'
            className='text-input'
            placeholder='请输入主题'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>
      </InputBox>
      <InputBox>
        <div className='label'>
          收件人
          <img src={require('../images/添加.png')} alt='' className='add-icon' />
        </div>

        <div className='input-con' onClick={openSelectPeopleModal}>
          <Select
            mode='tags'
            placeholder='请添加收件人'
            value={checkedUserList}
            labelInValue={true}
            style={{ width: '100%' }}
            open={false}
          />
        </div>
      </InputBox>
      <InputBox style={fileList.length > 0 ? { border: 0 } : {}}>
        <div className='label'>
          附&nbsp;件
          <img src={require('../images/添加.png')} alt='' className='add-icon' />
        </div>

        <div className='input-con' onClick={updateFile} style={{ cursor: 'pointer' }} />
        <div className='' />
      </InputBox>
      {fileList.length > 0 && (
        <FilesBox>
          {fileList.map((item: FileItem, index: number) => (
            <div className='file-box' key={index}>
              <img src={require('../images/img.png')} className='type-img' alt='' />
              <div className='name'>{item.name}</div>
              <div className='size'>{item.size}</div>
            </div>
          ))}
        </FilesBox>
      )}
      <input type='file' style={{ display: 'none' }} ref={fileInputRef} onChange={onFileChange} />
      <Textarea
        className='scrollBox'
        placeholder='请输入邮件内容...'
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
      />
      <FooterCon>
        <Button type='primary' style={{ marginRight: 15 }} onClick={sendMail}>
          发 送
        </Button>
        <Button style={{ marginRight: 15 }} onClick={saveTemplateMail}>
          存草稿
        </Button>
        <Button> 取 消 </Button>
      </FooterCon>
      <selectPeopleModal.Component onOkCallBack={onOkCallBack} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: ${(p) => p.theme.$headerHeight};
  background: #fff;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
`

const InputBox = styled.div`
  min-height: 45px;
  border-bottom: 1px solid #dddddd;
  display: flex;
  align-items: center;
  overflow: hidden;
  .label {
    color: #333333;
    width: 110px;
    padding-left: 28px;
    font-weight: bold;
  }
  .input-con {
    flex: 1;
    min-height: 45px;
  }
  .text-input {
    border: 0;
    outline: none;
    width: 100%;
    min-height: 45px;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    padding-left: 10px;
    &::-webkit-input-placeholder {
      color: #bfbfbf;
      font-weight: normal;
    }
  }
  .add-icon {
    width: 14px;
    height: 14px;
    float: right;
    margin-top: 3px;
    margin-right: 13px;
  }
  .ant-select-selection {
    min-height: 30px;
    padding: 8px 0;
    border: 0;
    outline: none;
    box-shadow: none !important;
  }
`
const FilesBox = styled.div`
  padding: 0 30px 20px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  .file-box {
    width: 260px;
    height: 65px;
    background: rgba(246, 246, 246, 1);
    border-radius: 2px;
    float: left;
    margin-right: 8px;
    padding: 10px 12px;
    position: relative;
    .type-img {
      position: absolute;
      left: 12px;
      top: 0;
      bottom: 0;
      width: 44px;
      height: 44px;
      margin: auto 0;
    }
    .name {
      margin: 0 5px 0 60px;
      font-size: 13px;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .size {
      margin: 0 0px 0 60px;
      font-size: 13px;
      color: #999;
    }
  }
`

const Textarea = styled.textarea`
  width: 100%;
  flex: 1;
  height: 0;
  outline: 0;
  border: 0;
  resize: none;
  padding: 15px 30px;
`

const FooterCon = styled.div`
  height: 60px;
  background: rgba(247, 247, 247, 1);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
`
