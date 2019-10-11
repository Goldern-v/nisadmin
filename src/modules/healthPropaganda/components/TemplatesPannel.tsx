import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { editorTemplate } from '../assets/editorTemplates'
export interface Props {
  onSelect?: Function
}

export default function TemplatesPannel(props: Props) {
  const { onSelect } = props

  return <Wrapper>
    <div className="title">快速模板</div>
    <div className="content">
      {editorTemplate.map((html: string, idx: number) => <div
        className="html-content"
        key={idx}
        onClick={() => onSelect && onSelect(html)}
        dangerouslySetInnerHTML={{ __html: html }}></div>
      )}
    </div>
  </Wrapper>
}
const scrollBarStyle = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-track {
    background-color: #ddd;
  }
`

const Wrapper = styled.div`
  position: absolute;
  right: 15px;
  left: 80%;
  z-index: 1;
  bottom: 60px;
  background: #fff;
  border: 1px solid #ddd;
  top: 20px;
  box-shadow: -3px 0px 5px rgba(0,0,0,0.05);
  .title{
    height: 36px;
    font-weight: bold;
    color: #666;
    font-size: 16px;
    background: rgba(0,0,0,0.01);
    text-align: center;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
  }
  .content{
    position: absolute;
    top: 36px;
    width: 100%;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    ${scrollBarStyle}
    .html-content{
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px dashed #ddd;
      background: rgba(0,0,0,0.00);
      transition: all .3s;
      :hover{
        background: rgba(0,0,0,0.03);
      }
    }
  }
`