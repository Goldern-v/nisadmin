import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import BraftEditor from './editor/index.jsx'
import Moment from 'moment'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import HealthProgandaService from './api/healthProgandaService'
import { Select, Input, Button, message as Message, Modal, Icon } from 'antd'

const api = new HealthProgandaService()

const Option = Select.Option

export default withRouter(
  observer(function HealthPropagandaEdit(props: any) {
    const { history, match } = props
    const [editorState, setEditorState] = useState(new Object() as any)
    const [phoneView, setPhoneView] = useState(true)

    const [typeList, setTypeList] = useState(new Array() as any)

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

    useEffect(() => {
      // console.log(match.params)
      if (match.params.id) {
        Promise.all([api.getContent(match.params.id), api.getTypeList()]).then((res) => {
          let data0 = res[0].data
          let data1 = res[1].data
          let newParams: any = {}
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
            setEditorState(BraftEditor.createEditorState(content))
            // console.log(BraftEditor.createEditorState(content), 'BraftEditor.createEditorState(content)')
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
                if (newParams.type == data1[i]) {
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
        let newParams: any = {}
        let sessionData = window.sessionStorage.healthPropagandaEditData
        if (sessionData) {
          //如果有导出word的内容
          sessionData = JSON.parse(sessionData)
          let { content } = sessionData
          setEditorState(BraftEditor.createEditorState(content))
          if(sessionData.name)newParams.name=sessionData.name;
        }

        if (authStore.user) {
          let { deptCode, deptName } = authStore.user
          newParams.deptCode = deptCode
          newParams.deptName = deptName
        }

        api.getTypeList().then((res) => {
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
    }, [])

    const handleDeptSelect = (code: any) => {
      if (code == '000000') {
        setParams({
          ...params,
          deptCode: code,
          deptName: '公共'
        })
      } else {
        authStore.deptList.map((item: any) => {
          if (item.code == code)
            setParams({
              ...params,
              deptCode: code,
              deptName: item.name
            })
        })
      }
    }

    const handleTypeChange = (type: any) => {
      for (let i = 0; i < typeList.length; i++) {
        let item = typeList[i]
        if (type == item.type) {
          let { messageType, messageTypeName } = item
          setParams({ ...params, type, templateCode: messageType, templateName: messageTypeName })
          break
        }
      }
    }

    const saveEdit = () => {
      let content = editorState.toHTML()
      if (content == '' || content == '<p></p>') return Message.error('请输入宣教内容')
      if (content == '' || content == '<p></p>') return Message.error('请输入宣教内容')
      if (!params.deptCode) return Message.error('请选择科室')
      if (params.name == '') return Message.error('请输入宣教名称')

      let creatDate = Moment().format('YYYY-MM-DD HH:mm:ss')
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
      if (!params.deptCode || params.deptCode == '000000') publicUse = '1'
      else publicUse = '0'

      content = content.split('')

      content = content.map((chat: string) => {
        let newChart = chat
        let code = chat.charCodeAt(0)
        if (code == 160) {
          newChart = String.fromCharCode(32)
        }
        return newChart
      })

      content = content.join('')

      api
        .save({
          ...params,
          content,
          creatDate,
          creatorName,
          creator,
          publicUse
        })
        .then((res) => {
          if (res.code == '200') {
            Message.success('健康宣教保存成功')
            setTimeout(() => history.goBack(), 1000)
          } else {
            if (res.desc) Message.error(res.desc)
          }
        })
    }

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

    // 定义输入转换函数
    const unitImportFn = (unit: any, type: any, source: any) => {
      // type为单位类型，例如font-size等
      // source为输入来源，可能值为create或paste

      // 此函数的返回结果，需要过滤掉单位，只返回数值

      return parseFloat(unit)
    }

    // 定义输出转换函数
    const unitExportFn = (unit: any, type: any, target: any) => {
      // if (type === 'line-height') {
      //   // 输出行高时不添加单位
      //   return unit + 'px'
      // }
      return unit + 'px'
    }

    useLayoutEffect(() => {
      try {
        setTimeout(() => {
          let titleInputCon = document.querySelector('#title-input-con')
          let bfContent = document.querySelector('.bf-content')
          if (bfContent && titleInputCon) {
            if (!bfContent.querySelector('#title-input-con')) {
              bfContent.append(titleInputCon)
            }
          }
        }, 100)
      } catch (error) {}
    })

    return (
      <Wrapper>
        {/* <div className="top">
      <div className="nav">
        <Link to="/setting/健康宣教字典">健康宣教字典</Link> > {match.params.id ? params.name : '新建健康宣教字典'}
      </div>
    </div> */}
        <div className={phoneView ? 'main phone-view' : 'main'}>
          {/* <div>
            <Input value={params.name} onChange={(e: any) => setParams({ ...params, name: e.target.value })} />
          </div> */}
          <TitleInputCon id='title-input-con'>
            <Input
              placeholder='请输入宣教名称'
              value={params.name}
              onChange={(e: any) => setParams({ ...params, name: e.target.value })}
            />
          </TitleInputCon>
          <BraftEditor
            controls={controls}
            value={editorState}
            converts={{ unitImportFn, unitExportFn }}
            onChange={(newState: any) => setEditorState(newState)}
          />
          <Button className='back' onClick={() => history.goBack()}>
            <Icon type='double-left' className='icon-back' />
            返回
          </Button>
          {/* <div className="view-model-change-btns">
        <Button.Group>
          <Button className={phoneView ? 'active' : ''} onClick={() => setPhoneView(true)}>
            <embed className="phone height-light" src={require('./assets/手机.svg')} type='image/svg+xml' />
            <embed className="phone" src={require('./assets/手机(1).svg')} type='image/svg+xml' />
            <span>手机模式</span>
          </Button>
          <Button className={!phoneView ? 'active' : ''} onClick={() => setPhoneView(false)}>
            <embed className="pc height-light" src={require('./assets/电脑.svg')} type='image/svg+xml' />
            <embed className="pc" src={require('./assets/电脑(1).svg')} type='image/svg+xml' />
            <span>PC模式</span>
          </Button>
        </Button.Group>
      </div> */}
        </div>
        <div className='bottom'>
          {/* <span className='title'>宣教名称:</span>
          <span>
            <Input value={params.name} onChange={(e: any) => setParams({ ...params, name: e.target.value })} />
          </span> */}
          <span className='title'>科室权限:</span>
          <span>
            <Select
              className='dept-select'
              value={params.deptCode}
              onChange={handleDeptSelect}
              defaultValue={params.deptCode}
            >
              <Option value='000000'>公共</Option>
              {authStore.deptList.map((item: any) => (
                <Option value={item.code} key={item.code}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </span>
          <span className='title'>类别:</span>
          <span>
            <Select className='type-select' onChange={handleTypeChange} value={params.type}>
              {typeList.map((item: any) => (
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
      </Wrapper>
    )
  })
)

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  * {
    font-size: inherit;
  }
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.17em;
  }
  h5 {
    font-size: 0.83em;
  }
  h6 {
    font-size: 0.67em;
  }
  & > .top {
    position: absolute;
    background: rgba(0, 0, 0, 0.015);
    left: 0;
    top: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    .nav {
      text-indent: 15px;
    }
  }
  & > .main {
    position: absolute;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    left: 0;
    top: 0;
    right: 0;
    bottom: 45px;
    overflow: hidden;
    .back {
      position: absolute;
      left: 10px;
      top: 6px;
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
    .view-model-change-btns {
      position: absolute;
      right: 10px;
      top: 6px;
      .ant-btn {
        transition: none;
        embed {
          display: inline-block;
          &.height-light {
            display: none;
          }
        }
        &.active {
          border-color: #1db38b;
          color: #1db38b;
          embed {
            display: none;
            &.height-light {
              display: inline-block;
            }
          }
        }
        :hover {
          embed {
            display: none;
            &.height-light {
              display: inline-block;
            }
          }
        }
      }
      embed.phone {
        width: 10px;
        height: 15px;
        position: relative;
        top: 2px;
        left: -5px;
      }
      embed.pc {
        width: 15px;
        height: 15px;
        position: relative;
        top: 2px;
        left: -5px;
      }
    }
    .bf-controlbar {
      margin-top: -46px;
      background: #fff;
      padding-left: 80px;
      /* padding-right: 192px; */
      .bf-font-size-dropdown,
      .headings-dropdown {
        min-width: auto;
        .dropdown-handler {
          padding: 0;
          span {
            padding: 0 5px;
          }
        }
        .dropdown-content {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.02);
          .dropdown-arrow {
            background-color: #fff;
          }
          .dropdown-content-inner {
            background-color: #fff;
          }
          li {
            color: #666;
            background-color: rgba(0, 0, 0, 0.03);
            :hover {
              background-color: rgba(0, 0, 0, 0.05);
            }
            &.active {
              font-weight: bold;
              background-color: rgba(0, 0, 0, 0.08);
            }
          }
          .menu-item {
            color: #666;
            background-color: #fff;
            &.active {
              background-color: rgba(0, 0, 0, 0.03);
              color: #333;
            }
            :hover {
              background-color: rgba(0, 0, 0, 0.05);
            }
          }
        }
      }
    }
    .bf-container {
      padding-top: 46px;
      .bf-content {
        height: 100%;
        padding-bottom: 0;
        position: relative;
        .public-DraftEditor-content {
          box-shadow: none;
          width: 100%;
          margin: 0;
          min-height: 100%;
          /** 编辑器上边框 **/
          padding-top: 100px;
          box-sizing: border-box;
        }
      }
    }

    &.phone-view {
      .bf-container {
        .bf-content {
          .public-DraftEditor-content {
            width: 720px;
            margin: 10px auto;
            border: 1px solid #ddd;
            min-height: 100%;
            height: auto;
          }
        }
      }
    }
  }
  & > .bottom {
    background: rgba(0, 0, 0, 0.015);
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

const TitleInputCon = styled.div`
  position: absolute;
  /* background: red; */
  width: 688px;
  height: 50px;
  margin: 0 auto 0;
  left: 0;
  right: 0px;
  z-index: 2;
  padding-bottom: 20px;
  border-bottom: 1px dotted #666;
  top: 40px;
  input {
    line-height: 22px !important;
    font-size: 22px !important;
    font-weight: bold !important;
    text-align: center;
    border: 0 !important;
    outline: none !important;
    box-shadow: none !important;
  }
`
