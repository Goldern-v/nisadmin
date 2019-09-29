import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Progress, Modal, message as Message } from 'antd'
import { editPageModel } from './../../models/editPageModel'
import { observer } from 'mobx-react-lite'
import { getFileSize } from 'src/utils/file/file'
export interface Props { }

export default observer(function PagesUploader() {
  let [fileElVisible, setFileElVisible] = useState(false)
  let [files, setFiles] = useState([] as any)
  let [uploadIdx, setUploaddIdx] = useState(0)
  let [progressVisible, setProgressVisible] = useState(false)


  const { fileList, uploadLoading } = editPageModel;
  const accept = 'image/*,.pdf'


  useEffect(() => {
    setTimeout(() => setProgressVisible(uploadLoading), 500)
  }, [uploadLoading])

  const handleFileChange = (e: any) => {
    let files = e.target.files;
    if (files && files.length > 0) {
      setFiles(files)
      uploadFiles(files)
    }
    setFileElVisible(false)
  }

  const handleUploadClick = () => {
    setFileElVisible(true)
    setTimeout(() => {
      let fileEl = document.getElementById('pages-uploader-file');
      if (fileEl) fileEl.click()
    })
  }

  useEffect(() => {
    // console.log(baseParams)
  }, [fileList])

  const uploadFiles = (files: File[], idx?: number, errors?: any[]) => {
    let _uploadIdx = idx || 0
    let _errors: any[] = errors || []
    setUploaddIdx(_uploadIdx)

    if (_uploadIdx >= files.length) {
      editPageModel.setUploadLoading(false)
      if (_errors.length > 0) {
        let content = <div>
          <span>以下文件上传失败:</span>
          <br />
          <span>{_errors.join(', ')}</span>
        </div>
        Modal.error({
          centered: true,
          title: '提示',
          content: content
        })
      } else {
        Message.success('上传成功')
      }
      return
    }

    if (_uploadIdx === 0) {
      editPageModel.setUploadLoading(true)
    }

    editPageModel.uploadFile(files[_uploadIdx], (res: any) => {
      if (res && res.data) {
        let data = res.data
        let newList = [...editPageModel.fileList]

        let sameItem = newList.find((item: any) => item.fileName == data.fileName)

        if (sameItem) {
          let replaceIdx = newList.indexOf(sameItem)

          newList[replaceIdx] = data
        } else {
          newList.push(data)
        }
        editPageModel.setFileList(newList)
      } else {
        _errors.push(files[_uploadIdx].name)
      }

      _uploadIdx++
      uploadFiles(files, _uploadIdx, _errors)
    })
  }

  const FileInput = () => {
    if (fileElVisible) {
      return <input type="file" id="pages-uploader-file" accept={accept} multiple onChange={handleFileChange} />
    } else {
      return <span></span>
    }
  }

  const totalSize = () => {
    let size = 0;
    for (let i = 0; i < fileList.length; i++) {
      size += parseInt(fileList[i].fileSize.toString())
    }

    return getFileSize(size)
  }

  const deleteAllFile = () => {
    Modal.confirm({
      title: '删除文件',
      content: '是否删除全部已上传文件?',
      centered: true,
      onOk: () => {
        editPageModel.deletAllFile((success: boolean) => {
          if (success) Message.success('删除成功')
        })
      }
    })
  }

  const precent = parseInt((uploadIdx / files.length * 10000).toString()) / 100

  return <Wrapper>
    <div className="status-pannel">
      <Button
        onClick={handleUploadClick}
        disabled={uploadLoading}>
        点击上传
      </Button>
      <span
        className="info"
        style={{ display: uploadLoading || fileList.length > 0 ? 'inline-block' : 'none' }}>
        (已上传{fileList.length}个文件，共{totalSize()})
      </span>
      <span
        className="progress"
        style={{ display: progressVisible ? 'inline-block' : 'none' }}>
        <Progress percent={precent} size="small" status="active" />
      </span>
      <Button
        onClick={deleteAllFile}
        disabled={uploadLoading}
        style={{ display: !uploadLoading && fileList.length > 0 ? 'inline-block' : 'none' }}>
        清空上传文件
      </Button>
      {FileInput()}
    </div>
  </Wrapper>
})


const Wrapper = styled.div`
  .info,.tips{
    color: #999;
  }
  .status-pannel{
    &>*{
      margin-right: 10px;
    }
  }
  input[type="file"]{
    display: none
  }
  .progress{
    display: inline-block;
    position: relative;
    width: 150px;
  }
`