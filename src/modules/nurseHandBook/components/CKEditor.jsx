import styled from 'styled-components'
import React, { useState } from 'react'
import { appStore, authStore } from 'src/stores'
import CKEditor from 'ckeditor4-react'
CKEditor.editorUrl = `ckeditor/ckeditor.js`

export default function CKEditorFn(props) {
  let {textValue,setTextValue} = props
  const [editorData, setEditorData] = useState(textValue)
  const editorRef = React.createRef()
  const handleEditorChange = (evt) => {
    setEditorData(evt.editor.getData())
    setTextValue(evt.editor.getData())
  }
  return <Wrapper>
    <CKEditor
      ref={editorRef}
      data={editorData}
      onChange={handleEditorChange}
      config={{
        extraPlugins: 'stylesheetparser,colorbutton,colordialog',
        removePlugins: 'easyimage,cloudservices,html5video,flash',
        filebrowserUploadUrl:
          `/crNursing/api/briefMission/uploadPicture?App-Token-Nursing=${appStore.appToken}&Auth-Token-Nursing=${authStore.authToken}`,
        filebrowserHtml5videoUploadUrl:
          `/crNursing/api/briefMission/uploadPicture?App-Token-Nursing=${appStore.appToken}&Auth-Token-Nursing=${authStore.authToken}`,
        height: 330,
      }}
    />
  </Wrapper >
}
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
