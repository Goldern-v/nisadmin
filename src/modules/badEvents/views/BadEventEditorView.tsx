import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import _ from 'lodash'
import { HorizontalMenuItem } from 'src/types/horizontalMenu'

import { badEventViewModal } from './BadEventViewModal'
import TopCon from './components/TopCon'
import LeftMenu from './components/LeftMenu'
import BaseLayout from './components/BaseLayout'

// import 'src/modules/badEvents/views/editor/index.css'
import 'src/modules/badEvents/views/editor/table/style.scss'

import BraftEditor from 'src/modules/badEvents/views/editor/index.jsx'
import Table from 'src/modules/badEvents/views/editor/table/index.jsx'

BraftEditor.use(
  Table({
    defaultColumns: 4,
    defaultRows: 5,
    withDropdown: true,
    exportAttrString: 'border="1" style="border-collapse: collapse"'
  })
)

// import { BadEventViewModal } from './BadEventViewModal'
import { appStore } from 'src/stores'
import { message } from 'antd'
export interface Props extends RouteComponentProps<{ type?: string }> {
  payload: HorizontalMenuItem[]
}

const ROUTE_LIST = [
  {
    type: 'edit',
    // component: EventSearch,
    name: '不良事件编辑'
  },
  {
    type: 'create',
    // component: EventReport,
    name: '不良事件汇新建'
  }
  // {
  //   type: 'frequentOccurence',
  //   component: EventFrequentOccurence,
  //   name: '不良事件发生率'
  // },
  // {
  //   type: 'alanysis',
  //   component: EventAlanysis,
  //   name: '不良事件分析报告'
  // }
]

const P1 = require('src/modules/badEvents/views/EventAlanysis/images/1.png')
const P2 = require('src/modules/badEvents/views/EventAlanysis/images/2.png')
const P3 = require('src/modules/badEvents/views/EventAlanysis/images/3.png')
const P4 = require('src/modules/badEvents/views/EventAlanysis/images/4.png')
const P5 = require('src/modules/badEvents/views/EventAlanysis/images/5.png')

const pages = [P1, P2, P3, P4, P5]

export default function BadEventEditorView (props: Props) {
  // nurseFileDetailViewModal.nurserInfo = appStore.queryObj
  let history = appStore.history
  const [editorState, setEditorState] = useState(new Object() as any)
  const [breadcrumbItem, setBreadcrumbItem] = useState('创建分析报告')
  // const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

  useEffect(() => {
    //
    let type = props.match.params.type
    if (type && type === 'edit') {
      setBreadcrumbItem('编辑分析报告')
    }
    //
    console.log('BadEventEditorView:useEffect', props, props.match.params)
    //
    let html = `` // `<img src="${P1}" alt="" />`
    pages.map((p) => {
      html += `<br/><br/><br/><img src="${p}" alt="" /><br/><br/><br/>`
    })
    //
    setEditorHtml(html)
    //
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    // setEditorState(BraftEditor.createEditorState(htmlContent))
  }, [])

  const btnList = [
    {
      label: '删除报告',
      type: 'button',
      onClick: () => {
        console.log('删除报告')
      }
    },
    {
      label: '保存',
      type: 'button',
      onClick: () => {
        if (editorState) {
          message.success('保存报告')
          console.log('保存报告', editorState)
          console.log(editorState.toHTML())
        }
      }
    }
  ]

  // let currentRouteType: any = props.match.params.type || 'search'
  // let CurrentRoute: any = ROUTE_LIST.find((item) => item.type === currentRouteType)
  const submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = editorState.toHTML()
    // console.log('htmlContent', htmlContent)
    // const result = await saveEditorContent(htmlContent)
  }

  const handleEditorChange = (editorNewState: any) => {
    setEditorState(editorNewState)
    console.log('handleEditorChange', editorNewState)
  }

  const setEditorHtml = (htmlString: string) => {
    let html = BraftEditor.createEditorState(htmlString)
    setEditorState(html)
    console.log('handleEditorChange', html)
  }

  const controls: any[] = [
    'undo',
    'redo',
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
    'emoji',
    'separator',
    'table',
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
    'clear'
  ]

  return (
    <Wrapper>
      <MainCon>
        {/* <TopConBox>123</TopConBox> */}
        <TopCon title={badEventViewModal.reportTitle} breadcrumbItem={breadcrumbItem} btnList={btnList} />
        <EditorCon>
          <BraftEditor value={editorState} onChange={handleEditorChange} onSave={submitContent} controls={controls} />
        </EditorCon>
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const LeftMenuCon = styled.div`
  width: 220px;
  position: relative;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
`
const MainCon = styled.div`
  flex: 1;
  align-items: stretch;
  display: flex;
`

const DetailCon = styled.div`
  flex: 1;
  overflow: auto;
`
const TopConBox = styled.div`
  width: 100%;
  height: 81px;
  position: fixed;
`

const EditorCon = styled.div`
  width: 100%;
  /* height: 100%; */
  position: absolute;
  margin-top: 80px;
  background: white;
`
