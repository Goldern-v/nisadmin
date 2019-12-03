import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
export interface Props {
  src: string,
  title?: string,
  name?: string,
}

const bgImg = require('./../assets/默认封面.png')

export default function BookCover(props: Props) {
  let { src, title, name } = props
  title = title || ''
  name = name || ''
  if (!src) src = bgImg
  return <Wrapper>
    <div className="book-box">
      <img src={src} title={title} className="content" />
      <div className="book-name">{name}</div>
      <img src={require('./../assets/封面阴影.png')} className="cover" />
    </div>
    <img src={require('./../assets/侧边厚度.png')} className="cover-right" />
    <img src={require('./../assets/底边阴影.png')} className="shadow" />
  </Wrapper>
}

const coverWidth = '125px'
const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  .book-box{
    width: ${coverWidth};
    height: 178px;
    overflow: hidden;
    position: relative;
    .book-name{
      position: relative;
      font-size:18px;
      line-height: 22px;
      width: 80%;
      text-align:center;
      font-weight:bold;
      color:rgba(97,120,116,1);
      top:20%;
      left: 50%;
      transform: translate(-50%);
    }
    img{
      &.content{
        position: absolute;
        height: 100%;
        min-width: 100%;
        left: 50%;
        transform: translate(-50%);
        background-image: url(${bgImg});
        background-size: 125px 178px;
        background-position: 50% 50%;
      }
      &.cover{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
  .shadow{
    position: absolute;
    bottom: -24px;
    z-index: -1;
    width: ${coverWidth};
  }
  .cover-right{
    position: absolute;
    bottom: 0;
    right: -5px;
    height: 178px;
  }
`