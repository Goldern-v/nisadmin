import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Input, Tooltip, Modal, Icon } from 'antd'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { nursingRulesApiService } from './../../api/nursingRulesNewService'

export interface Props {
  loading: boolean,
  chapter: any,
  onLoading?: (loading: boolean) => void,
}

export default observer(function RevisionBtn(props: Props) {
  const { queryObj, history } = appStore
  const viewType = queryObj.viewType
  const { loading, onLoading, chapter } = props

  const chapterName = chapter.cataLogName || chapter.name || ''

  const handleFileChange = (file: any, cataLogName: string) => {
    if (file) {
      onLoading && onLoading(true)

      nursingRulesApiService.revChapter({
        bodyFile: file,
        bookId: queryObj.bookId,
        nodeNum: chapter.nodeNum,
        cataLogName,
        rematk: ''
      })
        .then(res => {
          onLoading && onLoading(false)
          message.success('修订已提交,待护理部审核', 1, () => {
            // history.replace(`/nursingRulesNewDetail?bookId=${search.bookId}`)
            history.goBack()
          })
        }, (err) => onLoading && onLoading(false))
    }
  }

  const handleRevision = () => {
    let file: any
    let title = chapterName
    let iptStyle = {
      width: '260px',
      margin: '0 10px'
    }

    let noticeText = `请上传${chapter.fileName}`
    // if (chapter.fileName) title += `(${chapter.fileName})`
    let content = <React.Fragment>
      <RevisionCon>
        <span>章节名称:</span>
        <Input
          style={iptStyle}
          // disabled={true}
          id="chapterFileName"
          defaultValue={title} onChange={(e) => title = e.target.value} />
      </RevisionCon>
      <RevisionCon>
        <span>上传文件:</span>
        <Input
          readOnly={true}
          style={iptStyle}
          placeholder='上传文件'
          className="fileNameIpt" />
        <input
          accept=".pdf"
          type="file"
          style={{ display: 'none' }}
          id="revisionIpt"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              file = e.target.files[0]

              let fileName = e.target.files[0].name
              title = fileName.replace('.pdf', '')
              let titleIpt = document.querySelector('#chapterFileName') as HTMLInputElement
              let fileNameIpt = document.querySelector('.fileNameIpt') as HTMLInputElement
              if (fileNameIpt) fileNameIpt.value = fileName
              if (titleIpt) titleIpt.value = title
            }
          }} />
        <Button
          onClick={() => {
            let target = document.getElementById('revisionIpt')
            if (target) target.click()
          }}>
          <span>...</span>
        </Button>
      </RevisionCon>
    </React.Fragment>

    Modal.confirm({
      title: '修订本章节',
      width: 500,
      content,
      icon: <Icon type="file-add" style={{ color: '#00A680' }} />,
      centered: true,
      onOk: () => {
        if (!file) {
          message.error('未选择上传文件')
          return
        }

        handleFileChange(file, title)
      }
    })
  }

  if (authStore.isDepartment || authStore.selectedDeptName == '护理部')
    return (<Button
      onClick={handleRevision}
      disabled={loading}
      style={{ display: viewType ? 'none' : 'block' }}>
      修订本章节
    </Button>)
  else
    return (<span></span>)
})

const RevisionCon = styled.div`
  margin-top: 10px;
  line-height: 32px;
  &>*{
    vertical-align: top;
  }
`