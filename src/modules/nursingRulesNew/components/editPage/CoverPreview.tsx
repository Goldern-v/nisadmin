import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import tinyPic from 'src/utils/img/tinyPic'

export interface Props {
  data: any,
  className?: string,
  onChange?: Function
}

export default function CoverPreview(props: Props) {
  let { data, className, onChange } = props
  let src = ''
  let fileRef = React.createRef<HTMLInputElement>()
  const accept = 'image/jpg, image/jpeg, image/png, image/bmp'

  if (Object.prototype.toString.call(data) !== '[object String]') src = window.URL.createObjectURL(data)

  const handleUpload = () => {
    if (fileRef.current) fileRef.current.click()
  }

  const handleFileChange = async (e: any) => {
    let files = e.target.files;
    if (files.length <= 0) return;
    /** 图片压缩 */
    let img = await tinyPic(files[0])
    var fileObj = new File([img.img], files[0].name, { type: files[0].type, lastModified: Date.now() })

    onChange && onChange(fileObj)
  }

  return <Wrapper className={className} onClick={handleUpload} title="点击上传">
    <img src={src} />
    <input ref={fileRef} type="file" accept={accept} onChange={handleFileChange} />
  </Wrapper>
}
const Wrapper = styled.div`
  width: 140px;
  height: 180px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background: #eee;
  img{
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
  input{
    display:none;
  }
`