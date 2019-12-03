import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Progress, Modal, message as Message, message } from 'antd'
import { editPageModel } from './../../models/editPageModel'
import { observer } from 'mobx-react-lite'
// import { getFileSize } from 'src/utils/file/file'
import { appStore } from 'src/stores'
export interface Props { }

export default observer(function PagesUploader() {
  let [fileElVisible, setFileElVisible] = useState(false)
  let [files, setFiles] = useState([] as any)
  let [uploadIdx, setUploaddIdx] = useState(0)
  // let [progressVisible, setProgressVisible] = useState(false)


  const { fileList, uploadLoading, indexParams } = editPageModel;
  const accept = 'image/*,.pdf'

  // useEffect(() => {
  //   setTimeout(() => setProgressVisible(uploadLoading), 500)
  // }, [uploadLoading])

  const handleFileChange = (e: any) => {
    let files = e.target.files;

    if (files && files.length > 0) {

      if (appStore.fullLoadingBarObj) {
        return message.warning('正在上传文件，请不要操作电脑。')
      }

      setFiles(files)
      uploadFiles(files)
    }
    setFileElVisible(false)
  }

  const handleUploadClick = () => {

    if (indexParams.length <= 0) {
      message.warning('未上传目录')
      return
    }

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
        appStore.closeFullLoadingBar('上传结束')
      } else {
        appStore.closeFullLoadingBar('上传成功')
        Message.success('上传成功')
      }
      return
    }

    if (_uploadIdx === 0) {
      editPageModel.setUploadLoading(true)
    }


    appStore.openFullLoadingBar({
      aside: `正在上传文件，请不要操作电脑。当前第${_uploadIdx + 1}/${files.length}个文件`,
      progress: `${parseInt((_uploadIdx / files.length * 10000).toString()) / 100}%`,
      isFullpage: true
    })

    editPageModel.uploadFile(files[_uploadIdx], (res: any) => {
      let newList = [...editPageModel.fileList]
      let sameItem = newList.find((item: any) => item.fileName == files[_uploadIdx].name)

      if (res && res.data) {
        let data = res.data

        if (sameItem) {
          let replaceIdx = newList.indexOf(sameItem)

          newList[replaceIdx] = { ...data, status: 'success' }
        } else {
          newList.push({ ...data, status: 'success' })
        }

      } else {
        let failItem = {
          fileName: files[_uploadIdx].name,
          filePath: '',
          fileSize: files[_uploadIdx].size,
          status: 'fail'
        }

        if (sameItem) {
          let replaceIdx = newList.indexOf(sameItem)
          newList[replaceIdx] = failItem
        } else {
          newList.push(failItem)
        }

        _errors.push(files[_uploadIdx].name)
      }



      editPageModel.setFileList(newList)

      _uploadIdx++
      uploadFiles(files, _uploadIdx, _errors)
    })
  }

  const FileInput = () => {
    if (fileElVisible) {
      return <input type="file" className="file-input" id="pages-uploader-file" accept={accept} multiple onChange={handleFileChange} />
    } else {
      return <span className="file-input"></span>
    }
  }

  // const totalSize = () => {
  //   let size = 0;
  //   for (let i = 0; i < fileList.length; i++) {
  //     size += parseInt(fileList[i].fileSize.toString())
  //   }

  //   return getFileSize(size)
  // }

  // const deleteAllFile = () => {
  //   Modal.confirm({
  //     title: '删除文件',
  //     content: '是否删除全部已上传文件?',
  //     centered: true,
  //     onOk: () => {
  //       editPageModel.deletAllFile((success: boolean) => {
  //         if (success) Message.success('删除成功')
  //       })
  //     }
  //   })
  // }

  // const precent = parseInt((uploadIdx / files.length * 10000).toString()) / 100

  return <Wrapper>
    <div className="status-pannel">
      <Button
        onClick={handleUploadClick}
        disabled={uploadLoading}>
        文件批量上传
      </Button>
      {/* <span
        className="info"
        style={{ display: uploadLoading || fileList.length > 0 ? 'inline-block' : 'none' }}>
        (已上传{fileList.length}个文件，共{totalSize()})
      </span>
      <span
        className="progress"
        style={{ display: progressVisible ? 'inline-block' : 'none' }}>
        <Progress percent={precent} size="small" status="active" />
      </span> */}
      {/* <Button
        onClick={deleteAllFile}
        disabled={uploadLoading}
        style={{ display: !uploadLoading && fileList.length > 0 ? 'inline-block' : 'none' }}>
        清空上传文件
      </Button> */}
      {FileInput()}
    </div>
  </Wrapper>
})


const Wrapper = styled.div`
  display:inline-block;
  .info,.tips{
    color: #999;
  }
  .status-pannel{
    &>*{
      margin-right: 10px;
    }
  }
  .file-input{
    display: none;
  }
  .progress{
    display: inline-block;
    position: relative;
    width: 150px;
  }
`