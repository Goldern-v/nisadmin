import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Input, Tooltip, Modal, Icon } from 'antd'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { nursingRulesApiService } from './../../api/nursingRulesNewService'

export interface Props {
  loading: boolean,
  chapter: any,
  onLoading?: (loading: boolean) => void,
}

export default observer(function ReversionBtn(props: Props) {
  const { queryObj, history } = appStore
  const viewType = queryObj.viewType
  const { loading, onLoading, chapter } = props
  const chapterName = chapter.name || ''

  const handleFileChange = (file: any) => {
    if (file) {
      onLoading && onLoading(true)

      nursingRulesApiService.revChapter({
        bodyFile: file,
        bookId: queryObj.bookId,
        nodeNum: chapter.nodeNum,
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

  const handleReversion = () => {
    let file: any
    let title = chapterName
    let iptStyle = {
      width: '175px',
      margin: '0 10px'
    }

    const handleCopyName = () => {
      let target = document.getElementById('chapterFileNmae') as HTMLInputElement
      if (target) {
        target.select()
        document.execCommand("Copy")
        message.success('章节对应文件名已复制')
      }
    }
    let noticeText = `请上传${chapter.fileName}`
    // if (chapter.fileName) title += `(${chapter.fileName})`
    let content = <React.Fragment>
      <ReversionCon>
        <span>章节名称:</span>
        <Input
          style={iptStyle}
          disabled={true}
          title={chapterName}
          value={title} />
        <input
          type="text"
          id="chapterFileNmae"
          style={{ width: '1px', height: '1px', border: 'none', opacity: 0 }}
          defaultValue={chapter.fileName || ''} />
      </ReversionCon>
      <ReversionCon>
        <span>上传文件:</span>
        <Input
          readOnly={true}
          style={iptStyle}
          onClick={handleCopyName}
          placeholder={noticeText}
          className="fileNameIpt" />
        <input type="file" style={{ display: 'none' }} onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            file = e.target.files[0]

            let fileName = e.target.files[0].name
            let fileNameIpt = document.querySelector('.fileNameIpt') as HTMLInputElement
            if (fileNameIpt) fileNameIpt.value = fileName
          }
        }} id="reversionIpt" />
        <Tooltip title={noticeText}>
          <Button
            onClick={() => {
              let target = document.getElementById('reversionIpt')
              if (target) target.click()
            }}>
            <span>...</span>
          </Button>
        </Tooltip>
      </ReversionCon>
    </React.Fragment>

    Modal.confirm({
      title: '修订本章节',
      content,
      icon: <Icon type="file-add" style={{ color: '#00A680' }} />,
      centered: true,
      onOk: () => {
        if (!file) {
          message.error('未选择上传文件')
          return
        }

        handleFileChange(file)
      }
    })
  }

  return <Button
    onClick={handleReversion}
    disabled={loading}
    style={{ display: viewType ? 'none' : 'block' }}>
    修订本章节
  </Button>
})

const ReversionCon = styled.div`
  margin-top: 10px;
  line-height: 32px;
  &>*{
    vertical-align: top;
  }
`