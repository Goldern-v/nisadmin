import styled, { keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Progress } from 'antd'
import { editPageModel } from './../../models/editPageModel'
import { observer } from 'mobx-react-lite'
export interface Props { }

export default observer(function PagesUploader() {
  let [fileElVisible, setFileElVisible] = useState(false)
  let [files, setFiles] = useState([] as any);
  let [uploadIdx, setUploaddIdx] = useState(0);
  let [progressVisible, setProgressVisible] = useState(false);


  const { baseParams, uploadLoading } = editPageModel;
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
  }, [baseParams])

  const uploadFiles = (files: File[], idx?: number) => {
    let _uploadIdx = idx || 0;
    setUploaddIdx(_uploadIdx);

    if (_uploadIdx >= files.length) {
      editPageModel.setUploadLoading(false)
      return
    }

    if (_uploadIdx === 0) {
      editPageModel.setUploadLoading(true)
    }

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ok')
      }, 2000)
    })
      .then(() => {
        let newParams = { ...baseParams }

        let sameItem = newParams.fileList.find((item: any) => item.name == files[_uploadIdx].name)

        if (sameItem) {
          let replaceIdx = newParams.fileList.indexOf(sameItem)

          newParams.fileList[replaceIdx] = files[_uploadIdx]
        } else {
          newParams.fileList.push(files[_uploadIdx])
        }

        editPageModel.setBaseParams(newParams)

        _uploadIdx++
        uploadFiles(files, _uploadIdx)
      }, err => {
        _uploadIdx++
        uploadFiles(files, _uploadIdx)
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
    for (let i = 0; i < baseParams.fileList.length; i++) {
      size += baseParams.fileList[i].size
    }

    return editPageModel.formatFileSize(size)
  }

  const deleteAllFile = () => {
    let newParams = { ...editPageModel.baseParams }
    newParams.fileList = []

    editPageModel.setBaseParams(newParams);
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
        style={{ display: uploadLoading || baseParams.fileList.length > 0 ? 'inline-block' : 'none' }}>
        (已上传{baseParams.fileList.length}个文件，共{totalSize()})
      </span>
      <span
        className="progress"
        style={{ display: progressVisible ? 'inline-block' : 'none' }}>
        <Progress percent={precent} size="small" status="active" />
      </span>
      <Button
        onClick={deleteAllFile}
        disabled={uploadLoading}
        style={{ display: !uploadLoading && baseParams.fileList.length > 0 ? 'inline-block' : 'none' }}>
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