import {observer} from 'mobx-react'
import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {appStore} from 'src/stores'
import styled from 'styled-components'
import CKEditor from 'ckeditor4-react'
import {jmfydModel as model} from '../model'
import {Input, Spin} from 'antd'
import {DetailCtxCon} from '../../../style'

CKEditor.editorUrl = `ckeditor/ckeditor.js`

export interface Props {
    title?:string
}


let editorInstance: any;
export default observer(function (props: Props, ref) {
    const {title}=props
    const editorRef = useRef()
    const onChange = (e: any) => {
        model.handleEditorChange({v1: e.editor.getData()})
    }
    return (
        <Wrapper ref={model.ctxRef} >
            <div  className='title'>{title||model.editorTitle}</div>
            {/*<Input className='title' value={title||model.editorTitle} onChange={(e) => model.onChangeTitle(e)}/>*/}
            {model.isPrint?
                <div dangerouslySetInnerHTML={{__html: model.editorData.v1}}></div>
                :
                <CKEditor
                    ref={editorRef}
                    onInstanceReady={(editor: any) => {
                        // 将 CKEditor 4 实例赋值给全局变量
                        editorInstance = editor.editor;
                    }}
                    data={model.editorData.v1}
                    name='editor1'
                    onChange={onChange}
                    config={{
                        extraPlugins: 'stylesheetparser,colorbutton,colordialog,html5video',
                        removePlugins: 'easyimage,cloudservices',
                        filebrowserUploadUrl: appStore.uploadCKEUrl,
                        filebrowserHtml5videoUploadUrl: appStore.uploadCKEUrl,
                        height: 400,
                        title: ''
                    }}
                />}
        </Wrapper>
    )
})
const Wrapper = styled(DetailCtxCon)`
  .title {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0;

    :focus {
      box-shadow: none;
    }
  }
`