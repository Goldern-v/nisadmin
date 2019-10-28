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

  if (Object.prototype.toString.call(data) !== '[object String]') {
    src = window.URL.createObjectURL(data)
  } else {
    src = data
  }

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

  return <Wrapper className={className} >
    {src ?
      <BooPreview onClick={handleUpload} title="点击上传">
        <img src={src} />
      </BooPreview> :
      <UpLoadWrapper onClick={handleUpload} title="点击上传">
        <img src={require('./../../assets/addCover.png')} />
        <span>添加封面</span>
      </UpLoadWrapper>
    }
    <span className="advice">建议尺寸：（宽:194px 高:274px）</span>
    <input ref={fileRef} type="file" accept={accept} onChange={handleFileChange} />
  </Wrapper>
}
const Wrapper = styled.span`
  display: inline-block;
  input{
    display:none;
  }
  .advice{
    position: absolute;
    left: 218px;
    top: 123px;
    color: #999;
  }
`
const BooPreview = styled.div`
  cursor: pointer;
  width:97px;
  height:137px;
  background:rgba(245,245,245,1);
  border-radius:4px;
  border:1px solid rgba(217,217,217,1);
  text-align: center;
  color: #666;
    position: relative;
    overflow: hidden;
  img{
    position: absolute;
    height: 100%;
    min-width: 100%;
    left: 50%;
    transform: translate(-50%);
    background-size: 125px 178px;
    background-position: 50% 50%;
  }
`
const UpLoadWrapper = styled.div`
  cursor: pointer;
  width:97px;
  height:137px;
  background:rgba(245,245,245,1);
  border-radius:4px;
  border:1px solid rgba(217,217,217,1);
  text-align: center;
  color: #666;
  span{
    position: relative;
    top: -4px;
  }
  img{
    width: 34px;
    margin: 31px;
  }
`