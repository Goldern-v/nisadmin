import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Popover, Button } from 'antd'
import { stringify } from 'querystring'

export interface Props {
  itemCfg: any,
  record: any,
  index: number,
  cellDisabled: Function,
  handleUpload: Function,
  handlePreview: Function,
  className?: string,
  updateDataSource: Function,
}

/** 上传附件render组件 */
export default function FileUploadColumnRender(props: Props) {
  const {
    className,
    record, //登记本行
    itemCfg, //当前列配置
    index, //行下标
    cellDisabled, //是否禁用行
    handleUpload, //附件上传方法
    handlePreview, //预览方法,
    updateDataSource, //更新数据的方法
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

  const handleDelete = (fileStr: string) => {
    let newFileArr = fileArr.map((item: any) => item.origin)
    newFileArr = newFileArr.filter((str: string) => fileStr !== str)

    record.modified = true
    record[itemCfg.itemCode] = newFileArr.join(';')

    updateDataSource()
  }

  return <Wrapper className={["file-upload", className || ''].join(' ')}>
    {fileArr.length <= 0 && (() => {
      if (cellDisabled(record)) {
        return <span>无附件</span>
      } else {
        return <span
          title="点击上传附件"
          style={{ cursor: 'pointer' }}
          onClick={() =>
            handleUpload(itemCfg, record, index, 'append')}>
          {uploadText}
        </span>
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
`