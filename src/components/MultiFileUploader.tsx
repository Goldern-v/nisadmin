import styled from 'styled-components'
import React, { useState, useEffect, forwardRef, useMemo } from 'react'
import { Button, Icon } from 'antd'
import { getFilePrevImg, getFileType } from 'src/utils/file/file'
import service from 'src/services/api'
import createModal from 'src/libs/createModal'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import Zimage from 'src/components/Zimage'
import { message } from 'antd/es'

const commonApi = service.commonApiService

export interface FileItem {
  id: string,
  name: string,
  path: string,
  [p: string]: any
}

/**
 * type?: 接口动态路径
 * maxSize?: 文件大小限制 按字节
 * typeList?: 可上传文件类型
 * isFormModel?: 是否为列表风格
 */
export interface Props {
  accept?: string,
  type?: string,
  onChange?: any,
  readOnly?: boolean,
  style?: any,
  size?: number,
  data?: FileItem[],
  maxSize?: number,
  typeList?: string[],
  isFormModel?: boolean
  buttonSize?:any
}
const setSizeText = (size: number, i = 0): any => {
  let suffixList = ['B', 'K', 'M']
  if (size < 1024 || i >= suffixList.length - 1) {
    return size + suffixList[i]
  }
  return setSizeText(parseInt(size / 1024 + ''), i + 1)
}

export default forwardRef(function MultiFileUploader(props: Props) {
  const { accept, type, onChange, data, readOnly, size, style, maxSize, typeList, isFormModel = false,buttonSize ='default' } = props
  const maxSizeText = maxSize ? setSizeText(maxSize) : ''
  const [iptVisible, setIptVisible] = useState(true)
  const [loading, setLoading] = useState(false)

  const [randomClass, setRandomClass] = useState('')
  const previewModal = createModal(PreviewModal)
  /**文件名称字段 */
  const fileNameKey = useMemo(() => {
    return type ? 'name' : 'fileName'
  }, [type])

  useEffect(() => {
    setRandomClass(`file-input-${parseInt(`${Math.random() * 1000}`)}`)
  }, [])

  const handleChange = (e: any) => {
    let files = e.target.files
    let callback = () => {
      setIptVisible(false)
      setTimeout(() => setIptVisible(true), 100)
    }

    if (files && files.length > 0) {
      if (size !== undefined && (files.length + (data || []).length) > size) {
        message.warn(`超过最大上传限制,最大上传文件数量限制为${size}`)
        return
      }

      let reqList: any = []
      for (let i = 0; i < files.length; i++) {
        // 限制文件大小
        if (maxSize) {
          if (files[i].size > maxSize) {
            message.warn(`超过最大文件限制，最大上传文件大小限制为${maxSizeText}`)
            return
          }
        }
        // 限制文件类型
        if (typeList) {
          if (typeList.findIndex((v: any) => files[i].type.indexOf(v) > -1) === -1) {
            message.warn(`该类型不允许上传，允许上文件类型为${typeList.join('、')}`)
            return
          }
        }
        if (type) {
          let form = new FormData()
          form.append('file', files[i])
          reqList.push(commonApi.uploadAttachment(type, form))
        } else {
          reqList.push(commonApi.uploadFile({ 'file': files[i] }))
        }
      }

      setLoading(true)

      Promise.all(reqList).then(res => {
        setLoading(false)
        callback()
        let newData: FileItem[] = []
        let resList: FileItem[] = res.map((item: any) => item.data)
        if (data) newData = [...data]
        newData = [...newData, ...resList]
        onChange && onChange(newData, resList,files[0])
      }, () => {
        callback()
        setLoading(false)
      })
    }
  }

  const handleUploadOpen = () => {
    if (loading) return
    let classSelector = `.${randomClass}`
    let target: HTMLInputElement | null = document.querySelector(classSelector)
    if (target) target.click()
  }

  const handleDelete = (idx: number) => {
    if (data) {
      let newData = [...data]
      newData.splice(idx, 1)
      onChange && onChange(newData, [])
    }
  }

  const FileEl = () => {
    if (iptVisible) return <input
      type="file"
      accept={accept || ''}
      multiple
      className={`file-input ${randomClass}`}
      onChange={handleChange} />
    return <span className="file-input"></span>
  }
  /**当前文件数据是否超过最大数量 */
  const notOverSize = () => {
    if (size !== undefined) {
      if ((data || []).length >= size)
        return false
      return true
    }
    return true
  }

  const onPreview = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, file: any) => {
    previewModal.show({
      title: file.name,
      path: file.path
    })
    e.stopPropagation()
  }

  return <Wrapper style={style} className={isFormModel ? 'form-model' : ''}>
    {data && data.map((item: any, idx: number) => <div className="list-item" key={idx}>
      {getFileType(item.path) === 'img' ? (
        <Zimage src={item.path} className='type-img' alt='' />
      ) : (
        !isFormModel && <img
          src={getFilePrevImg(item.path)}
          className='type-img'
          alt=''
          onClick={(e) => onPreview(e, item)}
        />
      )}
      {item[fileNameKey] && <span className="file-name" title={item[fileNameKey]} onClick={(e: any) => onPreview(e, item)}>{item[fileNameKey]}</span>}
      {!readOnly && <div className="delete" onClick={() => handleDelete(idx)} title="删除">X</div>}
    </div>)}
    {!readOnly && notOverSize() &&
      (isFormModel
        ? <Button className="add-btn" type='primary' size={buttonSize} ghost onClick={handleUploadOpen}>上传</Button>
        : <div className="add-btn" title="添加文件" onClick={handleUploadOpen}>
          <StyledIcon type={loading ? 'loading' : 'plus'} />
        </div>
      )}
    {FileEl()}
    < previewModal.Component />
  </Wrapper >
})
const Wrapper = styled.div`
  margin-top: -30px;
  .file-input{
    display: none;
    height: 0;
    opacity: 0;
  }
  div.add-btn {
    display: inline-block;
    width: 70px;
    height: 70px;
    vertical-align: middle;
    border: 2px dashed #ddd;
    color: #ddd;
    font-size: 20px;
    text-align: center;
    border-radius: 5px;
    margin-top: 30px;
    padding-top: 5px;
    cursor: pointer;
  }
  .delete {
    width: 20px;
    height: 20px;
    background: red;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    right: -10px;
    line-height: 21px;
    text-indent: 1px;
    cursor: pointer;
    font-family: simsun !important;
  }
  .list-item {
    display: inline-block;
    width: 70px;
    min-height: 70px;
    /* background: #ddd; */
    vertical-align: middle;
    border-right: 5px;
    margin-right: 15px;
    margin-top: 30px;
    border-radius: 5px;
    position: relative;
    img{
      width: 70px;
      height: 70px;
      border-radius: 5px;
      object-fit: cover;
      display: inline-block;
    }
    .file-name{
      width: 80px;
      position: relative;
      height: 18px;
      line-height: 18px;
      margin-top: 5px;
      background: #ddd;
      border-radius: 5px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      left: -5px;
      padding: 0 5px;
    }
  }
  /* 列表风格 */
   &.form-model {
    margin-top: 0;
    .add-btn{
      position: absolute;
      top: -30px;
      right: 0;
    }
    .delete {
      position: static;
    }
    .list-item {
      display: flex;
      width: 100%;
      min-height: 20px;
      margin-right: 0;
      margin-top: 0;
      align-items: center;
      border-radius: 0;
      border-top: 1px solid #000;
      &:nth-last-child(2) {
        border-bottom: 1px solid #000;
      }
      .file-name{
        width: 0;
        flex: 1;
        height: auto;
        line-height: 18px;
        margin-top: 0;
        background: transparent;
        display: block;
        left: 0;
        padding: 10px 0;
        cursor: pointer;
        color: ${p => p.theme.$mtc};
      }
    }
  }
`

const StyledIcon = styled(Icon)`
  margin-top: 6px;
  font-size: 2.3em;
  color: rgba(0, 0, 0, 0.65);
`