import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Radio, Spin, message, Select } from 'antd'
import { Place } from 'src/components/common'
import { appStore, authStore } from 'src/stores'
import MultiFileUploader from 'src/components/MultiFileUploader'
import CKEditor from 'ckeditor4-react'
import typeList from './utils/typeList'
import { localityService } from './api/LocalityService'
CKEditor.editorUrl = `ckeditor/ckeditor.js`

const Option = Select.Option

export default function 医院应知应会修改() {
  const { history, queryObj } = appStore
  const [editParams, setEditParams] = useState({
    status: 0,
    type: '1',
    attachmentList: []
  })
  const [loading, setLoading] = useState(false)
  const [editorData, setEditorData] = useState('')

  const editorRef = React.createRef()

  const handleEditorChange = (evt) => {
    setEditorData(evt.editor.getData())
  }

  const getEditData = () => {
    if (queryObj.id) {
      localityService
        .getCompleteInfo(queryObj.id)
        .then(res => {
          if (res.data) {
            let {
              id,
              briefIntroduction,
              detailContent,
              name,
              status,
              type,
              attachmentList
            } = res.data

            setTimeout(() => setEditorData(detailContent || ''), 1000)

            setEditParams({
              id,
              briefIntroduction,
              name,
              status,
              type,
              attachmentList: attachmentList || []
            })
          }
        })
    }
  }

  const handleSave = () => {

    let saveParams = {
      ...editParams,
      detailContent: editorData
    }

    if (saveParams.name.trim() === '') {
      message.warn('标题不能为空')
      return
    }

    setLoading(true)

    localityService.addOrUpdate(saveParams)
      .then(res => {
        message.success('操作成功', 2, () => {
          setLoading(false)
          history.goBack()
        })
      }, () => setLoading(false))
  }

  useEffect(() => {
    getEditData()
  }, [])

  return <Wrapper>
    <HeaderCon>
      <Title>医院应知应会{queryObj.id ? '修改' : '添加'}</Title>
      <Place />
      {/* <Button
        type="primary"
        disabled={loading}
        onClick={() => handleSave()}>
        保存
      </Button> */}
      <Button className="sub" onClick={() => history.goBack()}>返回</Button>
    </HeaderCon>
    <MainCon>
      <Spin spinning={loading}>
        <div className="pannel">
          <div className="row-item">
            <div className="row-label">名称：</div>
            <div className="row-content">
              <Input
                value={editParams.name}
                style={{ width: '100%', maxWidth: 600 }}
                onChange={(e) => setEditParams({ ...editParams, name: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="pannel">
          <div className="row-item">
            <div className="row-label">简介：</div>
            <div className="row-content">
              <Input.TextArea
                value={editParams.briefIntroduction}
                onChange={(e) => setEditParams({ ...editParams, briefIntroduction: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="pannel">
          <div className="row-item">
            <div className="row-label">类型：</div>
            <div className="row-content">
              <Select
                style={{ width: '150px' }}
                value={editParams.type}
                onChange={(type) => setEditParams({ ...editParams, type })}>
                {typeList.map((item) => (
                  <Option value={item.type} key={item.type}>{item.name}</Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="pannel">
          <div className="row-item">
            <div className="row-label">内容：</div>
            <div>
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
                  height: 400,
                }}
              />
            </div>
          </div>
        </div>
        <div className="pannel">
          <div className="row-item">
            <div className="row-label">添加学习附件：</div>
            <div className="row-content">
              <MultiFileUploader
                style={{ paddingBottom: 20 }}
                size={1}
                data={editParams.attachmentList}
                type="lat_sr_hospital_shouldknow"
                onChange={(payload) => {
                  let attachmentList = [...payload]
                  setEditParams({ ...editParams, attachmentList })
                }} />
            </div>
          </div>
        </div>
        <div className="pannel">
          <div className="row-item">
            <div className="row-label">状态：</div>
            <div className="row-content">
              <Radio.Group
                value={editParams.status}
                onChange={(e) =>
                  setEditParams({ ...editParams, status: e.target.value })}>
                <Radio value={0}>编辑中</Radio>
                <Radio value={2}>发布</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="pannel">
          <Button
            type="primary"
            disabled={loading}
            onClick={() => handleSave()}>
            保存
        </Button>
        </div>
      </Spin>
    </MainCon>
  </Wrapper >
}
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`
const MainCon = styled.div`
  flex: 1;
  padding: 0 15px;
  padding-top: 0;
  overflow: auto;
  .ant-spin-container{
    overflow: hidden;
  }
  .pannel{
    width: 100%;
    background: #fff;
    min-height: 50px;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .row-item{
      display: flex;
      line-height: 30px;
      margin-bottom: 15px;
      &:last-of-type{
        margin-bottom: 0;
      }
      .row-label{
        font-size: 14px;
        font-weight: bold;
      }
      .row-content{
        flex: 1;
      }
    }
  }
`

const HeaderCon = styled.div`
  box-sizing: content-box;
  padding: 15px;
  display: flex;
  align-items: center;
  color: #333;
  height: 32px;
  .sub{
    margin-left: 10px;
    &:first-of-type{
      margin-left:0;
    }
  }
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`