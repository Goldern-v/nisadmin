import { observer } from 'mobx-react'
import React, { forwardRef, useEffect,useRef } from 'react'
import { appStore } from 'src/stores'
import styled from 'styled-components'
import CKEditor from 'ckeditor4-react'
import { nurseHandbookRecordModel as model } from '../model'
import { Input } from 'antd'
import { DetailCtxCon } from '../../../style'
CKEditor.editorUrl = `ckeditor/ckeditor.js`

export interface Props {
}
let editorInstance:any;
export default observer(function (props: Props, ref) {
  // const editorRef = useRef()

  const onChange = (e: any) => {
    console.log(e.editor.getData());
    model.handleEditorChange({ v1: e.editor.getData() })
  }
  useEffect(() => {
    // 销毁 CKEditor 实例
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
    }, []);
  return (
      <Wrapper ref={model.ctxRef}  style={{ pointerEvents: model.allowEdit ? 'auto' : 'none' }}>
        <Input className='title' value={model.editorTitle} onChange={(e) => model.onChangeTitle(e)} />
        {model.isPrint ?
            <div dangerouslySetInnerHTML={{ __html: model.editorData.v1}}></div>
            :
            <CKEditor
                onInstanceReady={(editor:any) => {
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