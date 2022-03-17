import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button } from 'antd'
import BraftEditor from './editor/index.jsx'

export interface Props extends RouteComponentProps { }

export default function AnalysisEdit() {

  const [editorState, setEditorState] = useState(new Object() as any)

  const controls: any[] = [
    'separator',
    'font-size',
    // 'line-height',
    // 'letter-spacing',
    'headings',
    'separator',
    'text-color',
    'bold',
    'italic',
    'underline',
    'strike-through',
    'separator',
    'superscript',
    'subscript',
    'remove-styles',
    // 'emoji',
    // 'separator',
    // 'table',
    'separator',
    'text-indent',
    'text-align',
    'separator',
    'list-ul',
    'list-ol',
    'blockquote',
    'code',
    'separator',
    // 'link',
    // 'separator',
    // 'hr',
    // 'separator',
    'media',
    'separator',
    'undo',
    'redo',
    'clear'
  ]

  return <Wrapper>
    <div className="topbar">
      <div className="title">2019年3月份XXXXXXXX表单分析报告</div>
      {/* <div className="sub">由王大锤创建，最后修改于2019-01-01 10:00:00</div> */}
      <div className="btn-group">
        <Button>删除报告</Button>
        <Button>保存</Button>
      </div>
    </div>
    <div className="main-contain">
      <BraftEditor
        controls={controls}
        value={editorState}
        onChange={(newState: any) => setEditorState(newState)} />
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 45px;
  .topbar{
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 45px;
    background: #fff;
    padding: 0px 20px 15px;
    border-bottom: 1px solid #ddd;

    .title{
      font-size: 20px;
      color: #000;
      line-height: 26px;
      margin-bottom: 5px;
    }
    
    .btn-group{
      position: absolute;
      right: 15px;
      top: 0;
      .ant-btn{
        margin-left: 10px;
      }
    }
  }

  .main-contain{
    height: 100%;
    width: 100%;
    overflow: hidden;
    .bf-container{
      padding-top: 46px;
    }
    .bf-content{
      height: 100%!important;
      padding: 0;
    }
    .bf-controlbar{
      margin-top: -46px;
      background: #fff;
    }
    .DraftEditor-root{
      overflow: hidden;
    }
    .DraftEditor-editorContainer{
      height: 100%;
      overflow-y: auto;
      padding: 15px 0;
      box-sizing: border-box;
    }
    .public-DraftEditor-content{
      min-height: 100%;
      box-shadow: none;
      border: 1px solid #ddd;
      margin-top: 0;
      margin-bottom: 0;

    }
  }
`