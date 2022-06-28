import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Button, Spin, Select, message as Message, Modal, Icon, Input } from 'antd'
import moment from 'moment'
import store, { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import TemplatesPannel from './components/TemplatesPannel'
import { healthProagandaService } from './api/healthProgandaService'
import service from 'src/services/api'
import FullPageLoading from 'src/components/loading/FullPageLoading'
import { throttle } from "src/utils/throttle/throttle";

import CKEditor from 'ckeditor4-react'

// CKEditor.editorUrl = `${window.location.origin}${window.location.pathname}/ckeditor/ckeditor.js`
CKEditor.editorUrl = `ckeditor/ckeditor.js`

const Option = Select.Option

export default observer(function HealthPropagandaEditNew(props) {
  const { history, match, location } = props
  const [editorData, setEditorData] = useState('')
  const [typeList, setTypeList] = useState([])
  const [editorLoading, setEditorLaoding] = useState(false)
  const [videoUploadVisible, setVideoUploadVisible] = useState(false)

  const filebrowserUploadUrl =
    `/crNursing/api/briefMission/uploadPicture?App-Token-Nursing=${appStore.appToken}&Auth-Token-Nursing=${authStore.authToken}`
  const filebrowserHtml5videoUploadUrl =
    `/crNursing/api/briefMission/uploadPicture?App-Token-Nursing=${appStore.appToken}&Auth-Token-Nursing=${authStore.authToken}`

  const videoUploadId = 'customVideoUpload'

  const editorRef = useRef()

  const [params, setParams] = useState({
    missionId: '', //宣教id (修改用)
    deptCode: '', //科室代码
    deptName: '', //科室名称
    publicUse: '0', //是否公用 公用：1，非公用：0
    type: '', //宣教类型
    content: '', //内容
    name: '', //宣教名称
    creator: '', //创建人工号
    creatorName: '', //创建人名字
    creatDate: '', //创建时间
    templateCode: '', //推送类型
    templateName: '' //推送类型名称
  })

  const handleEditorChange = (evt) => {
    setEditorData(evt.editor.getData())
  }

  useEffect(() => {
    initAuth()
    initData()
  }, [])

  const initAuth = () => {
    service.homeDataApiServices.getListDepartment().then((res) => {
      if (res && res.data && res.data.deptList) {
        store.authStore.deptList = res.data.deptList || []
        if (!store.authStore.defaultDeptCode) {
          store.authStore.defaultDeptCode = store.authStore.deptList[0].code
          store.authStore.selectedDeptCode = store.authStore.deptList[0].code
        }
      }
    })
    if (appStore.HOSPITAL_ID === 'wh') {
      if (!authStore.user || (authStore.user && authStore.user.roleManage !== '1')) {
        // appStore.history.push('/login')
      }
    }
  }

  const initData = () => {
    let id = match.params.id
    // 肺科正式的id有/,match.params.id 拿不到/及后面的数据
    if (['whfk'].includes(appStore.HOSPITAL_ID)) {
      let text = window.location.href.split('healthPropagandaEditNew/')[1]
      text && (id = text)
    }
    
    if (id) {
      setEditorLaoding(true)
      Promise.all([
        healthProagandaService.getContent(id),
        healthProagandaService.getTypeList()
      ])
        .then((res) => {
          let data0 = res[0].data
          let data1 = res[1].data
          let newParams = {}
          let tpType = ''
          let tpName = ''
          if (data0 instanceof Array && data0.length > 0) {
            let {
              missionId,
              deptCode,
              deptName,
              publicUse,
              type,
              content,
              name,
              creator,
              creatorName,
              creatDate,
              templateCode,
              templateName
            } = data0[0]

            editorContentReady(content)

            newParams = {
              missionId,
              deptCode,
              deptName,
              publicUse,
              type,
              content,
              name,
              creator,
              creatorName,
              creatDate
            }
            tpType = templateCode || ''
            tpName = templateName || ''
          }

          if (data1 instanceof Array) {
            setTypeList(data1)
            if (!tpType) {
              for (let i = 0; i < data1.length; i++) {
                if (newParams.type === data1[i]) {
                  tpType = data1[i].messageType
                  tpName = data1[i].messageTypeName
                  break
                }
              }
            }
          }

          setParams({ ...newParams, templateCode: tpType, templateName: tpName })
        })
    } else {
      let newParams = {}
      let sessionData = window.sessionStorage.healthPropagandaEditData

      if (authStore.user) {
        let { deptCode, deptName } = authStore.user
        newParams.deptCode = deptCode
        newParams.deptName = deptName
      }

      if (sessionData) {
        //如果有导出word的内容
        sessionData = JSON.parse(sessionData)
        let { content, name, deptCode, deptName } = sessionData
        editorContentReady(content)
        if (name) newParams.name = name;
        if (deptCode) newParams.deptCode = deptCode;
        if (deptName) newParams.deptName = deptName;
      }

      healthProagandaService.getTypeList().then((res) => {
        let data = res.data
        if (data) {
          if (!params.type && data[0]) {
            newParams.type = data[0].type
            newParams.templateCode = data[0].messageType
            newParams.templateName = data[0].messageTypeName
            setParams({ ...params, ...newParams })
          }
          setTypeList(data)
        }
      })
    }
  }

  const editorContentReady = (content) => {
    // console.log(document.querySelectorAll('iframe.cke_reset'))
    const findEditorEl = () => {

      if (/healthPropagandaEditNew/.test(location.pathname))
        setTimeout(() => {
          if (document.querySelectorAll('iframe.cke_reset').length > 0) {
            setEditorData(content)
            setEditorLaoding(false)
          } else {
            findEditorEl()
          }
        }, 500)
    }
    if (content) findEditorEl()

    // setTimeout(() => {
    //   console.log(document.querySelectorAll('iframe.cke_reset'))
    // setEditorData(content)
    // setEditorLaoding(false)
    // }, 1000)
  }

  const handleDeptSelect = (code) => {
    if (code === '000000') {
      setParams({
        ...params,
        deptCode: code,
        deptName: '公共'
      })
    } else {
      authStore.deptList.map((item) => {
        if (item.code === code) {
          setParams({
            ...params,
            deptCode: code,
            deptName: item.name
          })
        }
        return item.code
      })
    }
  }

  const handleTypeChange = (type) => {
    for (let i = 0; i < typeList.length; i++) {
      let item = typeList[i]
      if (type === item.type) {
        let { messageType, messageTypeName } = item
        setParams({ ...params, type, templateCode: messageType, templateName: messageTypeName })
        break
      }
    }
  }
  let requestFlag = false
  const getThrottle = throttle(1000)
  
  const saveEdit = () => getThrottle(() => {
    let content = editorData

    if (content === '' || content === '<p></p>') return Message.error('请输入宣教内容')
    if (!params.deptCode) return Message.error('请选择科室')
    if (params.name === '') return Message.error('请输入宣教名称')

    let creatDate = moment().format('YYYY-MM-DD HH:mm:ss')
    // let creatorName = params.creatorName;
    // let creator = params.creator;

    // let user = authStore.user;
    // if (user) {
    //   creatorName = creatorName || user.empName;
    //   creator = creator || user.empNo;
    // }
    let creatorName = ''
    let creator = ''

    let user = authStore.user
    if (user) {
      creatorName = user.empName
      creator = user.empNo
    }

    let publicUse = params.publicUse
    if (!params.deptCode || params.deptCode === '000000') publicUse = '1'
    else publicUse = '0'

    content = content.split('')

    content = content.map((chat) => {
      let newChart = chat
      let code = chat.charCodeAt(0)
      if (code === 160) {
        newChart = String.fromCharCode(32)
      }
      return newChart
    })

    content = content.join('')
    if (requestFlag) return
    requestFlag = true
    healthProagandaService
      .save({
        ...params,
        content,
        creatDate,
        creatorName,
        creator,
        publicUse
      })
      .then((res) => {
        if (res.code === '200') {
          Message.success('健康宣教保存成功')
          setTimeout(() => {
            history.goBack()
            // requestFlag = false
          }, 1000)
        } else {
          if (res.desc) Message.error(res.desc)
          requestFlag = false
        }
      }).catch(() => {
        requestFlag = false
      })
  })
  useEffect(()=> {
    return () => {
      requestFlag = false
    }
  },[])

  const handleCancel = () => {
    Modal.confirm({
      title: '提示',
      content: '是否取消编辑',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        history.goBack()
      }
    })
  }

  const handleHtmlInsert = (html) => {
    let current = editorRef.current
    if (current) current.editor.insertHtml(html)
  }

  const customVideoUpload = () => {
    setVideoUploadVisible(false)

    new Promise((resolve) => {
      setVideoUploadVisible(true)
      resolve()
    }).then(() => {
      let el = document.getElementById(videoUploadId)
      if (el) el.click()
    })
  }

  const handleVideoUpload = (e) => {
    let file = e.target.files[0]

    appStore.openFullLoadingBar({
      aside: '正在上传，请稍候',
      progress: '0%',
      isFullpage: true
    })

    if (file)
      healthProagandaService.editorUploadFile(file, (payload) => {
        appStore.openFullLoadingBar({
          aside: '正在上传数据，请稍候',
          progress: `${Number(Math.min(payload.loaded / (payload.total * 10000 || 1), 1) * 100).toFixed(
            0
          )}%`
        })
      })
        .then(res => {
          appStore.closeFullLoadingBar('上传完成', { delay: 800 })
          let resData = res.data
          if (resData.uploaded === '1') {
            handleHtmlInsert(`
        <div class="ckeditor-html5-video" style="text-align: center;">
          <video 
            controlslist="nodownload" 
            src="${resData.url}">
            &nbsp;
          </video>
        </div>
        `)
          }
        }, err => {
          appStore.closeFullLoadingBarInFail('上传失败', { delay: 800 })
        })
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      let videoBtnEl = document.getElementsByClassName('cke_button__html5video')[0]

      if (videoBtnEl)
        videoBtnEl.onclick = () => customVideoUpload()
    }, 1000)
    return () => {
      let videoBtnEl = document.getElementsByClassName('cke_button__html5video')[0]
      if (videoBtnEl) videoBtnEl.onclick = null
    };
  }, [])

  return <Wrapper>
    <Button className='back' onClick={() => history.goBack()}>
      <Icon type='double-left' className='icon-back' />
      返回
    </Button>
    <TemplatesPannel onSelect={handleHtmlInsert} />
    <div className="editor-warpper">
      <div className="editor-contain">
        <Spin spinning={editorLoading}>
          <Input.TextArea className="title-input" autosize placeholder='请输入宣教名称'
            value={params.name}
            onChange={(e) => setParams({ ...params, name: e.target.value })} />
          <div className="hr"></div>
          <CKEditor
            ref={editorRef}
            data={editorData}
            onChange={handleEditorChange}
            config={{
              extraPlugins: 'stylesheetparser,colorbutton,colordialog,html5video',
              removePlugins: 'easyimage,cloudservices',
              filebrowserUploadUrl,
              filebrowserHtml5videoUploadUrl,
              height: 600,
              title: ''
            }}
          />
        </Spin>
      </div>
    </div>
    <div className="bottom">
      <span className='title'>科室权限:</span>
      <span>
        <Select
          className='dept-select'
          value={params.deptCode}
          onChange={handleDeptSelect}
          defaultValue={params.deptCode}
        >
          <Option value='000000'>公共</Option>
          {authStore.deptList.map((item) => (
            <Option value={item.code} key={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
      </span>
      <span className='title'>类别:</span>
      <span>
        <Select className='type-select' onChange={handleTypeChange} value={params.type}>
          {typeList.map((item) => (
            <Option value={item.type} key={item.id}>
              {item.type}
            </Option>
          ))}
        </Select>
      </span>
      <span className='float-right'>
        <Button onClick={saveEdit} type='primary'>
          保存
        </Button>
        <Button onClick={handleCancel}>取消</Button>
      </span>
    </div>
    {videoUploadVisible && <input id={videoUploadId} type="file" accept="video/*" onChange={(e) => handleVideoUpload(e)} />}
    {appStore.fullLoadingBarObj && <FullPageLoading />}
  </Wrapper>
})

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
  width:100%;
  height: 100%;
  position:fixed;
  top: 0;
  .editor-warpper{
    padding: 20px 0;
    background: #eee;
    overflow: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 45px;
    width: 100%;
    ${scrollBarStyle}
    .editor-contain{
      padding: 20px;
      background: #fff;
      border: 1px solid #ddd;
      width: 760px;
      min-height: 500px;
      margin: 0 auto;
      .title-input{
        line-height: 30px !important;
        font-size: 22px !important;
        font-weight: bold !important;
        text-align: center;
        border: 0 !important;
        outline: none !important;
        box-shadow: none !important;
        font-family: 'braft-icons' !important;
        resize: none;
      }
      .hr{
        margin: 10px 0;
        margin-bottom: 20px;
        border-bottom: 1px dashed #aaa;
      }
    }
  }
  .back {
      position: absolute;
      left: 10px;
      top: 6px;
      z-index:1;
      .icon-back {
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        color: #c0cbce;
        position: absolute;
        left: 6px;
        top: 7px;
      }
      &:hover {
        .icon-back {
          color: #1db38b;
        }
      }
    }
  .bottom {
    background: rgba(0, 0, 0, 0.015);
    border-top: 1px solid #ddd;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 45px;
    & > span {
      margin-left: 8px;
      display: inline-block;
      vertical-align: middle;
      line-height: 45px;
      height: 45px;
      &.title {
        margin-left: 15px;
      }
      & > .ant-btn {
        margin-left: 8px;
      }
      .dept-select {
        min-width: 150px;
      }
      .type-select {
        min-width: 100px;
      }
    }
    .float-right {
      margin-right: 15px;
      float: right;
    }
  }
`