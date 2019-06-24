import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import BraftEditor from './editor/index.jsx'
import Moment from 'moment'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import HealthProgandaService from './api/healthProgandaService'
import { Select, Input, Button, message as Message, Modal } from 'antd'


const api = new HealthProgandaService()

const Option = Select.Option;

export default withRouter(observer(function HealthPropagandaEdit(props: any) {
  const { history, match } = props;
  const [editorState, setEditorState] = useState(new Object() as any);

  const [typeList, setTypeList] = useState(new Array() as any);

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
  })

  const controls: any[] = [
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
      Promise.all([api.getContent(match.params.id), api.getTypeList()])
        .then(res => {
          let data0 = res[0].data;
          let data1 = res[1].data;
          let newParams: any = {}
          if (data0 instanceof Array && data0.length > 0) {
            newParams = data0[0];
            let { missionId, deptCode, deptName, publicUse, type, content, name, creator, creatorName, creatDate } = newParams;
            setEditorState(BraftEditor.createEditorState(content));
            setParams({ missionId, deptCode, deptName, publicUse, type, content: '', name, creator, creatorName, creatDate })
          }

          if (data1 instanceof Array) setTypeList(data1);
        })
    } else {
      let newParams: any = {}
      let sessionData = window.sessionStorage.healthPropagandaEditData;
      if (sessionData) {
        //如果有导出word的内容
        sessionData = JSON.parse(sessionData);
        let { content } = sessionData;
        setEditorState(BraftEditor.createEditorState(content));
      };

      if (authStore.user) {
        let { deptCode, deptName } = authStore.user;
        newParams.deptCode = deptCode;
        newParams.deptName = deptName;
      }

      api.getTypeList()
        .then(res => {
          let data = res.data;
          if (data) {
            if (!params.type && data[0]) {
              newParams.type = data[0].type;
              setParams({ ...params, ...newParams })
            }
            setTypeList(data);
          }
        })
    }
  }, [])


  const handleDeptSelect = (code: any) => {
    authStore.deptList.map((item: any) => {
      if (item.code == code) setParams({
        ...params,
        deptCode: code,
        deptName: item.name
      });
    })
  }

  const saveEdit = () => {
    let content = editorState.toHTML();
    if (content == '' || content == '<p></p>') return Message.error('请输入宣教内容');
    if (!params.deptCode) return Message.error('请选择科室');
    if (params.name == '') return Message.error('请输入宣教名称');

    let creatDate = Moment().format('YYYY-MM-DD HH:mm:ss');
    // let creatorName = params.creatorName;
    // let creator = params.creator;

    // let user = authStore.user;
    // if (user) {
    //   creatorName = creatorName || user.empName;
    //   creator = creator || user.empNo;
    // }
    let creatorName = '';
    let creator = '';

    let user = authStore.user;
    if (user) {
      creatorName = user.empName;
      creator = user.empNo;
    }

    let publicUse = params.publicUse;
    if (!params.deptCode)
      publicUse = "1"
    else
      publicUse = "0"


    api.save({
      ...params,
      content,
      creatDate,
      creatorName,
      creator,
      publicUse
    }).then(res => {
      if (res.code == "200") {
        Message.success('健康宣教保存成功');
        setTimeout(() => history.goBack(), 1000);
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
        history.goBack();
      }
    })
  }

  return <Wrapper>
    <div className="top">
      <div className="nav">
        <Link to="/setting/健康宣教字典">健康宣教字典</Link> > {match.params.id ? params.name : '新建健康宣教字典'}
      </div>
    </div>
    <div className="main">
      <BraftEditor controls={controls} value={editorState} onChange={(newState: any) => setEditorState(newState)} />
    </div>
    <div className="bottom">
      <span className="title">宣教名称:</span>
      <span>
        <Input value={params.name} onChange={(e: any) => setParams({ ...params, name: e.target.value })} />
      </span>
      <span className="title">科室:</span>
      <span>
        <Select className="dept-select" value={params.deptCode} onChange={handleDeptSelect} defaultValue={params.deptCode}>
          {authStore.deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
        </Select>
      </span>
      <span className="title">类别:</span>
      <span>
        <Select className="type-select" onChange={(type: any) => setParams({ ...params, type })} value={params.type}>
          {typeList.map((item: any) => <Option value={item.type} key={item.id}>{item.type}</Option>)}
        </Select>
      </span>
      <span className="float-right">
        <Button onClick={saveEdit} type="primary">保存</Button>
        <Button onClick={handleCancel}>取消</Button>
      </span>
    </div>
  </Wrapper>
}))

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &>.top{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    .nav{
      text-indent: 15px;
    }
  }
  &>.main{
    position: absolute;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 45px;
    overflow: hidden;
    .bf-controlbar {
      margin-top: -46px;
      background: #fff;
    }
    .bf-container{
      padding-top: 46px;
      .bf-content{
        height: 100%;
        padding-bottom: 0;
        .public-DraftEditor-content{
          box-shadow: none;
          width: 100%;
          margin: 0;
          min-height: 100%;
        }
      }
    }
  }
  &>.bottom{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 45px;
    &>span{
      margin-left: 8px;
      display: inline-block;
      vertical-align: middle;
      line-height: 45px;
      height: 45px;
      &.title{
        margin-left: 15px;
      }
      &>.ant-btn{
        margin-left: 8px;
      }
      .dept-select{
        min-width: 150px;
      }
      .type-select{
        min-width: 100px;
      }
    }
    .float-right{
      margin-right: 15px;
      float: right;
    }
  }
`