import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Button, Row, Col, message as Message, message } from 'antd'
import { editPageModel } from '../../models/editPageModel'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { nursingRulesApiService } from '../../api/nursingRulesNewService'
// import IndexList from '../IndexList'
import { fileDownload, getFileSize } from 'src/utils/file/file'
import PagesUploader from './PagesUploader'
export interface Props { }

export default observer(function BookIndexFilesEdit() {
  let {
    indexParams,
    baseInfo,
    fileList,
    chapterTotalSize,
    chapterUploadedSize
  } = editPageModel;

  const handleUpload = () => {
    let indexUploadEl = document.getElementById('IndexUploadEl')
    if (indexUploadEl) indexUploadEl.click();
  }

  const handleDownload = () => {
    nursingRulesApiService.getCatalogTemplate().then(res => {
      fileDownload(res)
    })
  }

  const handleChange = (e: any) => {
    let files = e.target.files

    if (files.length > 0) {
      editPageModel.setBaseLoading(true)
      nursingRulesApiService.upLoadTaskCataLog({
        taskCode: baseInfo.taskCode,
        cataLog: files[0]
      }).then(res => {
        editPageModel.setBaseLoading(false)
        resetFileEl()

        editPageModel.getIndex(() => {
          Message.success('目录上传成功')
        })

      }, () => {
        resetFileEl()
        editPageModel.setBaseLoading(false)
      })
    }
  }

  const reUploadEl = 'ReUploadChapterFile'
  const [reUploadChapter, setReUploadChapter] = useState({} as any)

  const handleFile = (item: any) => {
    setReUploadChapter({ ...item })

    let fileInput = document.getElementById(reUploadEl)
    if (fileInput) fileInput.click()
  }

  const resetFileEl = () => {
    setInputVisible(false)
    setTimeout(() => setInputVisible(true))
  }

  const handleFileIptChange = (e: any) => {

    if (!e.target.files || e.target.files.length <= 0) {
      resetFileEl()
      return
    }

    let file = e.target.files[0]
    let sameItem = fileList.find((item: any) => item.fileName == file.name)
    let replaceIdx: any = sameItem ? fileList.indexOf(sameItem) : null
    let newList = [...fileList]

    if (reUploadChapter.fileName !== file.name) {
      message.error(`章节对应文件名称不匹配 应为${reUploadChapter.fileName}`)
      resetFileEl()
      return
    }

    let formData = new FormData()
    formData.append('taskCode', baseInfo.taskCode)
    formData.append('nodeNum', reUploadChapter.nodeNum)
    formData.append('bodyFile', file)
    formData.append('remark', '')

    appStore.openFullLoadingBar({
      aside: `正在上传文件，请不要操作电脑。`,
      progress: `0%`,
      isFullpage: true
    })

    nursingRulesApiService
      .upLoadTaskBodyFilebyNode(formData).then(res => {
        if (res && res.data) {
          message.success('上传成功')
          appStore.closeFullLoadingBar('上传成功')

          let successItem = { ...res.data, status: 'success' }
          if (sameItem) {
            newList[replaceIdx] = successItem
          } else {
            newList.push(successItem)
          }
          editPageModel.setFileList(newList)
        }
      }, () => {
        appStore.closeFullLoadingBar('上传失败')

        let failItem = {
          fileName: file.name,
          filePath: '',
          fileSize: file.size,
          status: 'fail'
        }

        if (sameItem) {
          newList[replaceIdx] = failItem
        } else {
          newList.push(failItem)
        }

        editPageModel.setFileList(newList)
      })

    resetFileEl()
  }

  const [inputVisible, setInputVisible] = useState(true)

  const FileEl = (id: string, onChange: any, accept?: string) => {
    if (inputVisible)
      return <input
        className="file-input"
        id={id}
        accept={accept || ''}
        onChange={onChange}
        type="file" />
    else
      return <span className="file-input"></span>
  }

  return <Wrapper>
    <div className="row">
      <div className="label">
        目录共
        <span>{chapterTotalSize}</span>
        章，文件成功上传
<span style={{ color: 'blue' }}>{chapterUploadedSize}</span>
        章，未上传
<span style={{ color: 'red' }}>{chapterTotalSize - chapterUploadedSize}</span>
        章
      </div>
      <div className="content">
        <Button
          style={{ marginRight: '10px' }}
          onClick={handleUpload}>
          {indexParams.length > 0 ? '重新上传' : '目录上传'}
        </Button>
        <PagesUploader />
        <span className="tips">
          (上传目录需要按照目录模板格式，点击此处<span className="template-download" onClick={handleDownload}>下载</span>目录模板)
        </span>
        {FileEl('IndexUploadEl', handleChange, '.xls,.xlsx')}
      </div>
    </div>
    {/* <IndexList indexList={indexParams} /> */}
    <CataLogCon>
      {indexParams.map((item0: any, idx: number) => {
        let childen = [] as any

        if (item0.childrenList)
          for (let i = 0; i < item0.childrenList.length; i++) {
            if (i % 3 == 0) {
              childen.push([item0.childrenList[i]])
            } else {
              childen[childen.length - 1].push(item0.childrenList[i])
            }
          }

        return <Fragment key={idx}>
          <Row >
            <Col
              span={24}>
              <div
                className='h1'>
                {item0.name}
              </div>
            </Col>
          </Row>
          {childen.map((item1: any, idx1: number) =>
            <Row className="split" key={`${idx} ${idx1}`}>
              {item1.map((item2: any, idx2: number) => {
                let target = fileList.find((file: any) => file.fileName == item2.fileName)

                let fileInfo = <span>未上传</span>

                if (target) {
                  if (target.status === 'success')
                    fileInfo = <span>({getFileSize(target.fileSize)})</span>
                  else
                    fileInfo = <span style={{ color: 'red' }}>上传失败</span>
                }

                return <Col span={8} key={`${idx} ${idx1} ${idx2}`}>
                  <div className="h2">
                    <span className="circle"></span>
                    <span className="title" title={item2.name}>{`${item2.name}(${item2.fileName})`}</span>
                    <span className="info">
                      {fileInfo}
                    </span>
                    <span
                      className="operate"
                      title={`上传 ${item2.fileName}`}
                      onClick={() => handleFile(item2)}>
                      {target ? '重新上传' : '选择文件'}
                    </span>
                  </div>
                </Col>
              })}
            </Row>)}
        </Fragment>
      })}
    </CataLogCon>
    {FileEl(reUploadEl, handleFileIptChange)}
  </Wrapper>
})

const Wrapper = styled.div`
  padding: 10px;
  .row{
    width: 940px;
    display: flex;
    margin-bottom: 10px;
    &>div{
    line-height: 30px;
    }
    .label{
      /* width: 80px; */
      font-size: 14px;
      text-align: right;
      margin-right: 10px;
    }
    .content{
      flex: 1;
    }
  }
  .tips{
    color: #999;
  }
  .template-download{
    color: blue;
    cursor: pointer;
    text-decoration: underline;
    :hover{
      font-weight: bold;
    }
  }
  .file-input{
    display:none
  }
`

const CataLogCon = styled.div`
  padding: 10px;
  .h1{
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  .h2{
    padding-right: 8px;
    line-height: 30px;
    font-size: 13px;
    display:flex;
    color: #333;
    &>span{
      display:inline-block;
      line-height: 30px;
      height: 30px;
    }
    .circle{
      width: 4px;
      height: 4px;
      background: rgba(204,204,204,1);
      margin: 13px;
      border-radius: 50%;
    }
    .title{
      flex: 1;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .info{
      width: 80px;
      color: #999;
      padding-left: 10px;
      margin-right: 10px;
      text-align: right;
    }
    .operate{
      color: blue;
      cursor:pointer;
      width: 60px;
      margin-right: 30px;
      text-align: left;
      :hover{
        font-weight: bold;
      }
    }
  }
  .ant-row{
    margin-bottom: 8px;
    &.split{
      border-bottom: 1px solid #ddd;
    }
  }
`