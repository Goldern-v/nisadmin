import { observer } from 'mobx-react'
import React, { forwardRef, useRef } from 'react'
import { appStore } from 'src/stores'
import styled from 'styled-components'
import CKEditor from 'ckeditor4-react'
import { nurseHandbookRecordModel as model } from '../model'
import { Input } from 'antd'
import { DetailCtxCon } from '../../../style'
CKEditor.editorUrl = `ckeditor/ckeditor.js`

export interface Props {
}
export default observer(function (props: Props, ref) {
  const editorRef = useRef()

  const onChange = (e: any) => {
    model.handleEditorChange({ v1: e.editor.getData() })
  }

  return (
    <Wrapper ref={model.ctxRef}  style={{ pointerEvents: model.allowEdit ? 'auto' : 'none' }}>
      <Input className='title' value={model.editorTitle} onChange={(e) => model.onChangeTitle(e)} />
      {model.isPrint ?
      <div dangerouslySetInnerHTML={{ __html: model.editorData.v1}}></div>
      :
      <CKEditor
        ref={editorRef}
        data={model.editorData.v1}
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
  

`