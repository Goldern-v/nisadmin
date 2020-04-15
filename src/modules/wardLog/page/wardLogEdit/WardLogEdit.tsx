import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import {
  Button,
  Icon,
  Spin,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Select,
  message
} from 'antd'
import store, { authStore, appStore } from 'src/stores'
import { wardLogService } from './../../services/WardLogService'
import MultiFileUploader, { FileItem } from 'src/components/MultiFileUploader'
import service from 'src/services/api'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import createModal from 'src/libs/createModal'
import SelectPeopleModal from './../../components/selectNurseModal/SelectPeopleModal'
import moment from 'moment'

const Option = Select.Option

export interface Props { }

export default observer(function WardLogEdit(props: any) {
  const { location, history } = props
  const search = qs.parse(location.search.replace('?', ''))
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')

  const [recievers, setRecievers] = useState([] as any)
  const [info, setInfo] = useState({} as any)
  const [editList, setEditList] = useState([] as any[])
  const [remark, setRemark] = useState('')
  const [attachmentList, setAttachmentList] = useState([] as FileItem[])
  const [showAllReciever, SetShowAllReciever] = useState(false)

  const selectPeopleModal = createModal(SelectPeopleModal)

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

  const saveEdit = (tempSave?: boolean) => {
    if (!search.id && !search.templateId) {
      message.error('未知模板 或 未知病区日志ID', 1, () => history.goBack())
      return
    }

    let params = {
      inpatientAreaLog: {
        remark,
        templateId: search.templateId,
      },
      templateDto: {
        ...info,
        templateProgress: editList
      },
      empNos: recievers.map((item: any) => item.empNo),
      fileIds: attachmentList,
      // tempSave
    }

    console.log(params)
    setLoading(true)
    wardLogService
      .saveRecord(params)
      .then(res => {
        setLoading(false)

        message.success('提交成功', 1, () => history.goBack())
      }, err => setLoading(false))
  }

  const initEdit = () => {
    setLoading(true)

    wardLogService
      .templateDetail(search.templateId)
      .then(res => {
        setLoading(false)

        if (res.data) {
          const { templateDto } = res.data


          if (templateDto) {
            setInfo(templateDto)
            setTitle(`${templateDto.creatorName}的${templateDto.name}`)

            if (templateDto?.defaultReciever) {
              let newRecievers = (res.data.recievers || [])
                .map((item: any) => {
                  return {
                    ...item,
                    label: item.empName,
                    key: item.empNo,
                  }
                })
              setRecievers(newRecievers)
            }

            if (templateDto.templateProgress)
              setEditList(templateDto.templateProgress)
          }


        }
      }, err => setLoading(false))
  }

  const getRecordData = () => {
    console.log(search)
    setLoading(true)
    wardLogService
      .getDetail(search.id)
      .then(res => {
        setLoading(false)
        if (res.data) {
          console.log(res.data)
        }
      }, err => setLoading(false))
  }

  const formatRecievers = (data: any, containArr: any[]) => {
    if (data instanceof Array) {
      for (let i = 0; i < data.length; i++)formatRecievers(data[i], containArr)
    } else {
      if (data.empNo) {
        let appendItem = JSON.parse(JSON.stringify(data))
        appendItem = {
          ...appendItem,
          key: appendItem.empNo,
          label: appendItem.empName,
        }
        delete appendItem.userList
        containArr.push(appendItem)
      } else if (data.userList) {
        formatRecievers(data.userList, containArr)
      }
    }
  }

  const editContent = (item: any, idx: number) => {
    const handleChange = (content: any) => {
      let newItem = { ...item, content }

      let newList = editList.concat()
      newList[idx] = newItem

      setEditList(newList)
    }

    let format = 'YYYY-MM-DD HH:mm'

    switch (item.type) {
      case "0":
        return <Input.TextArea
          value={item.content}
          autosize={{ minRows: 1 }}
          onChange={(e: any) => handleChange(e.target.value)} />
      case "1":
        return <InputNumber
          value={Number(item.content)}
          onChange={(num) => handleChange(num)} />
      case "2":
      case "3":
        if (item.type == '3') format = 'YYYY-MM-DD'
        return <DatePicker
          format={format}
          value={item.content ? moment(item.content) : undefined}
          onChange={(_moment) => {
            let val = ''
            if (_moment) val = _moment.format(format)
            handleChange(val)
          }} />
      case "4":
        format = 'HH:mm'
        return <TimePicker
          value={item.content ? moment(item.content) : undefined}
          format={format}
          onChange={(_moment) => {
            let val = ''
            if (_moment) val = _moment.format(format)
            handleChange(val)
          }} />
      case "5":
        return <Select
          value={item.content}
          allowClear
          style={{ minWidth: 180 }}
          onChange={(val: string) => handleChange(val)}>
          {(item.dropDowns || []).map((dropItem: any) =>
            <Option
              key={dropItem.indexNo}
              value={dropItem.name}>
              {dropItem.name}
            </Option>)}
        </Select>
      default:
        return <span>{item.content}</span>
    }
  }

  const handleRecieverEdit = () => {
    selectPeopleModal.show({
      checkedUserList: recievers,
      onOkCallBack: (payload) => {

        let newRecieversArr = [] as any[]
        formatRecievers(payload, newRecieversArr)
        setRecievers(newRecieversArr)
      }
    })
  }

  //要显示的抄送人列表
  let visibleRecievers = recievers
  if (!showAllReciever && recievers.length >= 24) visibleRecievers = recievers.slice(0, 23)

  useEffect(() => {
    initAuth()

    if (search.templateId)
      initEdit()
    else
      getRecordData()
  }, [])

  return <Wrapper>
    <Button className='back' onClick={() => history.goBack()}>
      <Icon type='double-left' className='icon-back' />
      返回
    </Button>
    <div className="editor-warpper">
      <div className="editor-contain">
        <Spin spinning={loading}>
          <div className="title-input">{title}</div>
          <div className="hr"></div>
          {editList.map((item: any, idx: number) =>
            <div className="edit-row" key={idx}>
              <div className="title">{item.name}</div>
              <div className="content">
                {editContent(item, idx)}
              </div>
            </div>)}
          <div className="edit-row">
            <div className="title">备注</div>
            <div className="content">
              <Input.TextArea autosize={{ minRows: 3 }} value={remark} onChange={(e) => setRemark(e.target.value)} />
            </div>
          </div>
          <div className="edit-row">
            <div className="title">附件</div>
            <div className="content">
              <MultiFileUploader
                data={attachmentList}
                onChange={(newList: FileItem[]) => setAttachmentList(newList)} />
            </div>
          </div>
          <div className="edit-row">
            <div className="title">
              <span>抄送 </span>
              <span className="size"> {recievers.length} </span>
              <span className="fr">
                <Button size="small"
                  disabled={recievers.length <= 0}
                  onClick={() => setRecievers([])}>清空</Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={handleRecieverEdit}>
                  添加
                </Button>
              </span>
            </div>
            <div className="content reciever-content">
              {recievers.length > 0 && visibleRecievers.map((item: any, idx: number) =>
                <span className="nurse-item" key={idx}>
                  <span
                    title="删除"
                    className="delete"
                    onClick={() => {
                      let newArr = recievers.concat()
                      newArr.splice(idx, 1)
                      setRecievers(newArr)
                    }}>×</span>
                  <img
                    className='head-img'
                    src={item.nearImageUrl || ''}
                    alt='' />
                  <br />
                  <span className="emp-name">{item.empName}</span>
                </span>)}
              {recievers.length <= 0 &&
                <div
                  style={{
                    color: "#999",
                    lineHeight: '50px',
                    textAlign: 'center'
                  }}>
                  还没有选择抄送人哦
              </div>}
              {recievers.length >= 24 &&
                <span
                  className="view-more-recievers"
                  onClick={() =>
                    SetShowAllReciever(!showAllReciever)}>
                  {showAllReciever ? '收起' : '更多'}
                </span>}
            </div>
          </div>
        </Spin>
      </div>
    </div>
    <div className="bottom">
      <div className="float-right">
        <Button onClick={() => saveEdit()} type='primary'>提交</Button>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </div>
    <selectPeopleModal.Component />
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
        text-align:center;
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
      button{
        margin-top: 5px;
        margin-left: 10px;
      }
    }
  }
  .edit-row{
    .title{
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
      .size{
        font-weight: normal;
        color: #999;
      }
      .fr{
        float: right;
        button{
          margin-left: 15px;
        }
      }
    }
    .content{
      margin-bottom: 25px;
      &.reciever-content{
        margin-top: 20px;
      }
    }
    &:last-of-type{
      .content{
        margin-bottom: 10px;
      }
    }
  }
  .nurse-item{
    margin: 5px 8px;
    width: 72px;
    display: inline-block;
    vertical-align: top;
      position: relative;
    &>*{
      display: inline-block;
    }
    .delete{
      position: absolute;
      right: 5px;
      top: -5px;
      color: #fff;
      cursor: pointer;
      width: 18px;
      height: 18px;
      background: red;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      font-weight: bold;
    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: url('${require('src/assets/护士默认头像.png')}');
      background-size: 100%;
      object-fit: cover;
    }
    .emp-name{
      margin-top: 5px;
    }
    text-align: center;
  }
  .view-more-recievers{
    width: 72px;
    text-align: center;
    display: inline-block;
    margin: 5px 8px;
    line-height: 56px;
    cursor: pointer;
    color: #00A680;
    &:hover{
      font-weight: bold;
    }
  }
`