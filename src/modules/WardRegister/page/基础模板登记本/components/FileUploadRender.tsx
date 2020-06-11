import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Popover } from 'antd'
import service from "src/services/api"

export interface Props {
  itemCfg: any,
  record: any,
  index: number,
  cellDisabled: Function,
  onChange: Function,
  className?: string,
  handlePreview: Function,
  setLoading: Function,
}

/** 上传附件render组件 */
export default function FileUploadRender(props: Props) {
  const {
    className, //类名
    record, //登记本行
    itemCfg, //当前列配置
    index, //行下标
    cellDisabled, //是否禁用行
    onChange, //更新数据的方法
    handlePreview, //预览方法
    setLoading, //设置loading状态
  } = props

  let fileStr = record[itemCfg.itemCode] || ''
  let fileArr = [] as any[]

  let uploadText: string = '上传附件'

  if (fileStr.trim() !== '') {
    let fileArrStr = fileStr.split(';')
    for (let i = 0; i < fileArrStr.length; i++) {
      let name = fileArrStr[i].split(',')[0] || ''
      let path = fileArrStr[i].split(',')[1] || ''
      if (name && path) fileArr.push({
        name,
        path: `${window.location.origin}/crNursing${path}`,
        origin: fileArrStr[i]
      })
    }
  }

  /**删除 */
  const handleDelete = (fileStr: string) => {
    let newFileArr = fileArr.map((item: any) => item.origin)
    newFileArr = newFileArr.filter((str: string) => fileStr !== str)

    let newRecord = { ...record }
    newRecord.modified = true
    newRecord[itemCfg.itemCode] = newFileArr.join(';')

    onChange(newRecord, index)
  }

  /**调用上传接口 */
  const handleUpload = (
    cfg: any,
    record: any,
    index: number,
    uploadType: 'append' | 'replace', //替换当前还是新增附件
    replaceStr?: string
  ) => {
    const id = "wardRegisterItemCodeAttachmentUploader"
    const entityType = 'qcRegister'

    let oldEl = document.getElementById(id)
    if (oldEl) document.body.removeChild(oldEl)

    let fileEl = document.createElement('input') as any
    fileEl.id = id
    fileEl.type = 'file'
    fileEl.accept = cfg.options ? cfg.options.replace(/;/g, ',') : ''
    if (!replaceStr) fileEl.multiple = 'multiple'
    fileEl.onchange = () => {
      if (fileEl.files.length >= 0) {
        setLoading(true)

        let reqArr = []

        for (let i = 0; i < fileEl.files.length; i++) {
          let form = new FormData()
          form.append('file', fileEl.files[0])

          reqArr.push(
            service
              .commonApiService
              .uploadAttachment(entityType, form, (a: any, b: any, c: any) => {
                console.log(a, b, c)
              })
          )
        }

        Promise.all(reqArr)
          .then((resArr: any[]) => {
            let val = record[cfg.itemCode] || ''
            if (uploadType == 'replace') {
              let res = resArr[0]
              val = val.replace(
                replaceStr,
                `${res.data.name || ''},${res.data.relativePath || ''}`
              )

            } else {
              let valArr = val.split(';')

              let appendArr = resArr.map((res: any) => {
                return `${res.data.name || ''},${res.data.relativePath || ''}`
              })

              val = valArr.concat(appendArr).filter((str: string) => str.trim() !== '').join(';')
            }

            let newRecord = { ...record }
            newRecord[cfg.itemCode] = val
            newRecord.modified = true
            onChange(newRecord, index)
            setLoading(false)
          },
            () => setLoading(false))
      } else {
        document.body.removeChild(fileEl)
        fileEl = null
      }
    }

    document.body.appendChild(fileEl)
    fileEl.click()
  }

  return <Wrapper className={["file-upload", className || ''].join(' ')}>
    {fileArr.length <= 0 && (() => {
      if (cellDisabled(record)) {
        return <div className="no-file">无附件</div>
      } else {
        return <div
          title="点击上传附件"
          className="no-file"
          style={{ cursor: 'pointer' }}
          onClick={() =>
            handleUpload(itemCfg, record, index, 'append')}>
          {uploadText}
        </div>
      }
    })()}
    {fileArr.length > 0 && fileArr
      .map((file: any, fileIdx: number) => {
        if (cellDisabled(record)) {
          return <span
            style={{ cursor: 'pointer', wordBreak: 'break-all' }}
            key={`${itemCfg.itemCode}-${index}-${fileIdx}`}
            onClick={() => handlePreview(file)}>
            {file.name}
          </span>
        } else {
          return <Popover
            key={`${itemCfg.itemCode}-${index}-${fileIdx}`}
            placement="leftTop"
            content={
              <React.Fragment>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginRight: '8px' }}
                  onClick={() =>
                    handleUpload(itemCfg, record, index, 'replace', file.origin)}>
                  重新上传
                </Button>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginRight: '8px' }}
                  onClick={() => handleUpload(itemCfg, record, index, 'append')}>
                  上传更多
                </Button>
                <Button
                  type="danger"
                  size="small"
                  style={{ marginRight: '8px' }}
                  onClick={() => handleDelete(file.origin)}>
                  删除
                </Button>
              </React.Fragment>}
            title={file.name}
            trigger="hover">
            <div
              className="file-item"
              style={{ cursor: 'pointer', wordBreak: 'break-all' }}
              onClick={() => handlePreview(file)}>
              {file.name}
            </div>
          </Popover>
        }
      })}
  </Wrapper>
}
const Wrapper = styled.span`
  .file-item{
    width: 100%;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align:left;
    margin: 2px 0;
    padding: 0 2px;
  }
  .no-file{
    width: 100%;
    text-align:center;
  }
`