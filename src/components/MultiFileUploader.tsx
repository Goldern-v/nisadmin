import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Icon } from 'antd'
import { getFilePrevImg, getFileType } from 'src/utils/file/file'
import service from 'src/services/api'
import createModal from 'src/libs/createModal'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import Zimage from 'src/components/Zimage'

const commonApi = service.commonApiService


export interface FileItem {
  id: string,
  name: string,
  path: string,
  [p: string]: any
}

export interface Props {
  accept?: string,
  type: string,
  onChange?: any,
  readOnly?: boolean,
  data?: FileItem[]
}

export default function MultiFileUploader(props: Props) {
  const { accept, type, onChange, data, readOnly } = props

  const [iptVisible, setIptVisible] = useState(true)

  const [loading, setLoading] = useState(false)

  const [randomClass, setRandomClass] = useState('')
  const previewModal = createModal(PreviewModal)

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

      let reqList = [] as any
      for (let i = 0; i < files.length; i++) {
        let form = new FormData()
        form.append('file', files[i])
        reqList.push(commonApi.uploadAttachment(type, form))
      }

      setLoading(true)

      Promise.all(reqList).then(res => {
        setLoading(false)
        callback()
        let newData = [] as FileItem[]
        let resList: FileItem[] = res.map((item: any) => item.data)
        if (data) newData = [...data]

        newData = [...newData, ...resList]
        onChange && onChange(newData, resList)
      }, () => {
        callback()
        setLoading(false)
      })
    }
  }

  const handleUploadOpen = () => {
    if (loading) return
    let classSelector = `.${randomClass}`
    let target = document.querySelector(classSelector) as HTMLInputElement
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

  const onPreView = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, file: any) => {
    previewModal.show({
      title: file.name,
      path: file.path
    })
    e.stopPropagation()
  }

  return <Wrapper>
    {data && data.map((item: any, idx: number) => <div className="list-item" key={idx}>
      {getFileType(item.path) == 'img' ? (
        <Zimage src={item.path} className='type-img' alt='' />
      ) : (
          <img
            src={getFilePrevImg(item.path)}
            className='type-img'
            style={{ cursor: 'pointer' }}
            alt=''
            onClick={(e) => onPreView(e, item)}
          />
        )}
      {!readOnly && <div className="delete" onClick={() => handleDelete(idx)} title="删除">X</div>}
      {item.name && <span className="file-name" title={item.name}>{item.name}</span>}
    </div>)}
    {!readOnly && <div className="add-btn" title="添加文件" onClick={handleUploadOpen}>
      <StyledIcon type={loading ? 'loading' : 'plus'} />
    </div>}
    {FileEl()}
    <previewModal.Component />
  </Wrapper>
}
const Wrapper = styled.div`
  margin-top: -30px;
  .file-input{
    display: none;
  }
  .add-btn{
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
  .delete{
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
  }
  .list-item{
    display: inline-block;
    width: 70px;
    height: 70px;
    background: #ddd;
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
`

const StyledIcon = styled(Icon)`
  margin-top: 6px;
  font-size: 2.3em;
  color: rgba(0, 0, 0, 0.65);
`