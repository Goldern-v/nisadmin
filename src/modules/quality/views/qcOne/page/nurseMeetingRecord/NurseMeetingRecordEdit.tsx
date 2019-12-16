import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, message, Select, Drawer, DatePicker, Checkbox, Spin, Modal } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import { ScrollBox } from 'src/components/common'
// import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import MultiFileUploader, { FileItem } from 'src/components/MultiFileUploader'

import { nurseMeetingRecordService } from './api/NurseMeetingRecordService'
import service from 'src/services/api'
import moment from 'moment'
const commonApi = service.commonApiService

const Option = Select.Option

export interface Props { }

export default observer(function NurseMeetingRecordEdit() {
  let { location, history } = appStore
  let { isRoleManage, isSupervisorNurse } = authStore
  let wardCode = authStore.selectedDeptCode
  let wardName = authStore.selectedDeptName
  let search = qs.parse(location.search.replace('?', ''))
  const [loading, setLoading] = useState(false)

  const [drawerList, setDrawerlist] = useState([] as any)
  const [drawerVisible, setDrawerVisible] = useState(false)

  const [nurseList, setNurseList] = useState([] as any)

  const [nurseMeeting, setNurseMeeting] = useState({
    id: '',
    status: '0',
    meetingDay: moment().format('YYYY-MM-DD'),
    meetingTime: moment().format('HH:mm'),
    meetingType: 'QCWMT001',
    wardCode: wardCode,
    meetingLocation: '',
    meetingConveyed: '',
    problemRectification: '',
    nurseStatement: '',
    creatorNo: '',
    creatorName: '',
    createTime: ''
  } as any)
  const [comperes, setComperes] = useState('')
  const [recorders, setRecorders] = useState([] as any[])
  const [attendees, setAttendees] = useState('')
  const [files, setFiles] = useState([] as FileItem[])
  // const [urls, setUrls] = useState([] as any)
  // const [ids, setIds] = useState([] as any)

  const handleSave = (cache?: boolean) => {
    let $recorders = nurseList.filter((item: any) => {
      if (recorders.indexOf(item.empName) >= 0) return true
      return false
    })
    let newAttendees = attendees
      .split('、')
      .map((name: string) => {
        let empNo = ''
        let target = nurseList.find((item: any) => item.empName == name)
        if (target) empNo = target.empNo
        return {
          empName: name,
          empNo
        }
      })
      .filter((item: any) => item.empNo)

    let params = {
      nurseMeeting: {
        ...nurseMeeting,
        status: cache ? '0' : '1'
      },
      comperes: comperes.split('、').filter((str: string) => str).map((str: string) => {
        return {
          empName: str
        }
      }),
      recorders: $recorders,
      attendees: newAttendees,
      fileIds: files.map((item: any) => item.id)
    }

    setLoading(true)
    nurseMeetingRecordService
      .saveOrUpdate(params)
      .then(res => {
        setLoading(false)
        message.success(`${cache ? '暂存' : '发布'}成功`, 1, () => {
          history.goBack()
          setLoading(false)
        })
      }, () => setLoading(false))
  }

  const handleDrawerShow = () => {
    setDrawerVisible(true)

    let arr = attendees.split('、').filter((str: string) => str)

    let newList = nurseList.map((item: any) => {
      return {
        ...item,
        checked: arr.indexOf(item.empName) >= 0
      }
    })

    setDrawerlist(newList)
  }

  const handleDarwerOk = () => {
    setDrawerVisible(false)
    let arr = drawerList
      .filter((item: any) => item.checked)
      .map((item: any) => item.empName)

    setAttendees(arr.join('、'))
  }

  const handleFileChange = (newList: FileItem[]) => {
    setFiles(newList)
    // setUrls(urls)
    // setIds(ids)
  }

  const handlePush = () => {
    Modal.confirm({
      title: '提示',
      content: "是否发布该会议记录?",
      onOk: () => handleSave()
    })
  }

  const initData = () => {
    setLoading(true)
    nurseMeetingRecordService
      .getEditDetail(search.id)
      .then(res => {
        if (res.data) {
          setLoading(false)

          if (res.data.attachs) {
            let attachs: FileItem[] = res.data.attachs
            setFiles(attachs)
            // setUrls(attachs.map((item: any) => item.path))
            // setIds(attachs.map((item: any) => item.id))
          }

          if (res.data.attendees) {
            let _attendees = res.data.attendees.map((item: any) => item.empName) || []
            setAttendees(_attendees.join('、'))
          }

          if (res.data.recorders) {
            let _recorders = res.data.recorders.map((item: any) => item.empName) || []
            setRecorders(_recorders)
          }

          if (res.data.comperes) {
            let _comperes = res.data.comperes.map((item: any) => item.empName) || []
            setComperes(_comperes.join('、'))
          }

          if (res.data.nurseMeeting) {
            let newNurseMeeting = { ...nurseMeeting }
            for (let x in newNurseMeeting) {
              if (res.data.nurseMeeting[x]) newNurseMeeting[x] = res.data.nurseMeeting[x]
            }

            console.log(newNurseMeeting)

            setNurseMeeting(newNurseMeeting)
          }
        }
      })
  }

  const isAllChecked = (() => {
    for (let i = 0; i < drawerList.length; i++) {
      if (!drawerList[i].checked) return false
    }
    return true
  })()

  const toggleAllChecked = () => {
    let newCheck = true
    if (isAllChecked) newCheck = false
    let newDrawerList = drawerList.map((item: any) => {
      return {
        ...item,
        checked: newCheck
      }
    })

    setDrawerlist(newDrawerList)
  }

  useEffect(() => {
    commonApi
      .userDictInfo(wardCode)
      .then(res => {
        if (res.data && res.data instanceof Array) {
          setNurseList(res.data.map((item: any) => {
            return {
              empName: item.name,
              empNo: item.code
            }
          }))
        }
      })

    if (search.id) {
      initData()
    }
  }, [])

  return <Wrapper>
    <TopPannel>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2
          }}
          data={[
            {
              name: '一级质控报告',
              link: '/qcOne'
            },
            {
              name: '护士会议记录',
              link: '/qcOne/nurseMeetingRecord'
            },
            {
              name: search.id ? '修改记录' : '新建记录'
            },
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">
            {search.id ? '修改' : '新建'}会议记录
          </div>
          <div className='topHeaderButton'>
            <Button onClick={() => handleSave(true)} disabled={loading}>暂存</Button>
            {(isRoleManage || isSupervisorNurse) && <Button onClick={() => handlePush()} disabled={loading} type="primary">发布</Button>}
            <Button onClick={() => history.goBack()}>返回</Button>
          </div>
        </div>
      </TopHeader>
    </TopPannel>
    <MainPannel>
      <MainContent className="main-contain">
        <Spin spinning={loading}>
          <div className="form-pannel">
            <table>
              <colgroup>
                <col width='10%' />
                <col width='40%' />
                <col width='10%' />
                <col width='40%' />
              </colgroup>
              <tbody>
                <tr>
                  <td className="label">会议日期</td>
                  <td className="content">
                    <DatePicker
                      value={
                        nurseMeeting.meetingDay && nurseMeeting.meetingTime ?
                          moment(`${nurseMeeting.meetingDay} ${nurseMeeting.meetingTime}`) :
                          undefined
                      }
                      onChange={(newTime) => {
                        setNurseMeeting({
                          ...nurseMeeting,
                          meetingDay: newTime.format('YYYY-MM-DD'),
                          meetingTime: newTime.format('HH:mm')
                        })
                      }}
                      format="YYYY-MM-DD HH:mm"
                      allowClear={false}
                      showTime={{
                        format: 'HH:mm'
                      }} />
                  </td>
                  <td className="label">会议种类</td>
                  <td>
                    <Select
                      value={nurseMeeting.meetingType}
                      onChange={(meetingType: string) =>
                        setNurseMeeting({ ...nurseMeeting, meetingType })
                      }>
                      <Option value="QCWMT001">周会</Option>
                      <Option value="QCWMT002">月会</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="label">科室</td>
                  <td>
                    <Input value={wardName} disabled />
                  </td>
                  <td className="label">会议地点</td>
                  <td>
                    <Input.TextArea
                      placeholder="请输入"
                      value={nurseMeeting.meetingLocation}
                      autosize
                      onChange={(e: any) =>
                        setNurseMeeting({ ...nurseMeeting, meetingLocation: e.target.value })
                      } />
                  </td>
                </tr>
                <tr>
                  <td className="label">会议主持</td>
                  <td>
                    <Select
                      showSearch
                      mode="tags"
                      value={comperes.split('、').filter((str: string) => str)}
                      onChange={(arr: any[]) => setComperes(arr.join('、'))}
                      placeholder="请输入"
                      filterOption={(input: string, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
                      {nurseList.map((item: any) => <Option key={item.empNo} value={item.empName}>{item.empName}</Option>)}
                    </Select>
                  </td>
                  <td className="label">记录人</td>
                  <td>
                    <Select
                      showSearch
                      mode="tags"
                      value={recorders}
                      onChange={(arr: any[]) => {
                        let newArr = [...arr]
                        newArr = newArr.filter((item: any) => {
                          let target = nurseList.find((nurse: any) => nurse.empName == item)
                          if (target)
                            return true
                          else
                            return false
                        })
                        setRecorders(newArr)
                      }}
                      placeholder="请输入"
                      filterOption={(input: string, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
                      {nurseList.map((item: any) => <Option key={item.empNo} value={item.empName}>{item.empName}</Option>)}
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className="label">到会人员</td>
                  <td colSpan={3}>
                    <Select
                      className="attendees-select"
                      showSearch
                      mode="tags"
                      value={attendees.split('、').filter((str: string) => str)}
                      onChange={(arr: any[]) => {
                        let newArr = arr.filter((name: string) => {
                          let target = nurseList.find((item: any) => item.empName == name)
                          if (target) return true
                          return false
                        })
                        setAttendees(newArr.join('、'))
                      }}
                      placeholder="请输入"
                      filterOption={(input: string, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
                      {nurseList.map((item: any) => <Option key={item.empNo} value={item.empName}>{item.empName}</Option>)}
                    </Select>
                    <Button
                      size="small"
                      className="more-btn"
                      onClick={handleDrawerShow}>
                      ...
                  </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="default-pannel">
            <div className="title">一、会议传达</div>
            <div className="content">
              <Input.TextArea
                value={nurseMeeting.meetingConveyed}
                autosize={{ minRows: 5 }}
                onChange={(e: any) =>
                  setNurseMeeting({ ...nurseMeeting, meetingConveyed: e.target.value })
                } />
            </div>
          </div>
          <div className="default-pannel">
            <div className="title">二、工作中问题及整改</div>
            <div className="content">
              <Input.TextArea
                value={nurseMeeting.problemRectification}
                autosize={{ minRows: 5 }}
                onChange={(e: any) =>
                  setNurseMeeting({ ...nurseMeeting, problemRectification: e.target.value })
                } />
            </div>
          </div>
          <div className="default-pannel">
            <div className="title">三、护士发言</div>
            <div className="content">
              <Input.TextArea
                value={nurseMeeting.nurseStatement}
                autosize={{ minRows: 5 }}
                onChange={(e: any) =>
                  setNurseMeeting({ ...nurseMeeting, nurseStatement: e.target.value })
                } />
            </div>
          </div>
          <div className="default-pannel">
            <div className="title">四、附件上传</div>
            <div className="content" style={{ paddingBottom: '20px' }}>
              {/* <MultipleImageUploader upload={(files) => {
                let reqList = [] as any
                for (let i = 0; i < files.length; i++) {
                  let form = new FormData()
                  form.set('file', files[i])
                  reqList.push(commonApi.uploadAttachment('qcNurseMeeting', form))
                }

                return Promise.all(reqList)
              }} ids={ids} value={urls} onChange={handleFileChange} /> */}
              <MultiFileUploader type='qcNurseMeeting' data={files} onChange={handleFileChange} />
            </div>
          </div>
        </Spin>
      </MainContent>
    </MainPannel>
    <Drawer
      onClose={() => setDrawerVisible(false)}
      title={'科室护士'}
      visible={drawerVisible}>
      <TemplateSelectCon>
        <div className="header">
          <div className="template-item" onClick={toggleAllChecked}>
            <span>全选</span>
            <span className="check">
              <Checkbox checked={isAllChecked} />
            </span>
          </div>
        </div>
        <ScrollBody className="body">
          {drawerList.map((item: any, idx: number) =>
            <div
              className="template-item"
              key={idx}
              onClick={() => {
                let newList = [...drawerList]
                newList[idx] = { ...item, checked: !item.checked }

                setDrawerlist(newList)
              }}>
              <span>{item.empNo} {item.empName}</span>
              <span className="check">
                <Checkbox checked={item.checked} />
              </span>
            </div>
          )}
        </ScrollBody>
        <div className="footer">
          <Button type="primary" onClick={handleDarwerOk}>确定</Button>
        </div>
      </TemplateSelectCon>
    </Drawer>
  </Wrapper>
})

const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
`

const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`

const ScrollBody = styled(ScrollBox)`
  position: absolute;
  left: 0;
  top: 95px;
  bottom: 45px;
  width: 100%;
`

const TemplateSelectCon = styled.div`
  .template-item{
    background: #fff;
    transition: all .3s;
    padding: 8px 10px;
    /* border-bottom: 1px solid #ddd; */
    cursor: pointer;
    transition: all .3s;
    :hover{
      background: #ddd;
    }
    &:last-of-type{
      border-bottom:none;
    }
    .check{
      float:right;
    }
  }
  .header{
    position: absolute;
    height: 45px;
    border-bottom: 1px solid #eee;
    left: 0;
    top: 55px;
    width: 100%;
    padding: 5px 10px;
    z-index: 1;
    background: #fff;
    padding-left: 0;
    .template-item:hover{
      background: #fff;
      color: #1db38b;
    }
  }
  .footer{
    position: absolute;
    height: 45px;
    border-top: 1px solid #ddd;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 5px 10px;
    .ant-btn{
      width: 100%;
    }
  }
`

const Wrapper = styled.div`
  .main-contain{
    margin: 0 auto;
    margin-left: 15px;
    width: 900px;
    padding: 20px 20px;
    padding-bottom: 30px;
    color: #000000;
    background: #fff;
    border: 1px solid #ddd;
    min-height: 100%;
  }
  .main-content{
    min-height: 400px;
  }
`

const MainContent = styled.div`
  .form-pannel{
    table {
      border-collapse: collapse;
      border-color: #ccc;
      width: 100%;
      table-layout: fixed;
      tr {
        width: 100%;
      }
      td {
        min-height: 30px;
        text-align: left;
        align-items: center;
        font-size: 14px;
        color: #000;
        border: 1px #ccc solid; 
        word-break: break-all;
        &.label{
          background: rgba(0,0,0,0.05);
          text-align: center;
        }
      }
    }

    .ant-input[disabled]{
      background: #fff;
    }
    .ant-calendar-picker,.ant-select{
      width: 100%;
      &.attendees-select{
        width: 94%;
      }
    }
    .ant-input{
      resize: none;
      ${defaultInputStyle}
      :hover{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
      :focus{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
    }
    .ant-select-selection{
      ${defaultInputStyle}
    }

    .ant-select-open,.ant-select-focused{
      .ant-select-selection{
        ${activeInputStyle}
        &:focus{
          ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
        }
      }
    } 
  }

  .default-pannel{
    .title{
      margin-top: 15px;
      margin-bottom: 10px;
    }
  }

  .more-btn{
    position: relative;
    left: 4px;
    top: 1px;
  }
`

const MainPannel = styled(ScrollBox)`
  height: calc(100vh - 122px);
  padding: 20px 0;
`
const TopPannel = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  padding-left: 20px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ddd;
`

const TopHeader = styled.div`
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    margin-bottom: 5px;
    /* font-weight: bold; */
    .topHeaderButton {
      position: absolute;
      bottom: 10px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
    .sub-title{
      color: #999;
      min-height: 29px;
      min-width: 10px;
      font-size: 12px;
      padding-bottom: 10px;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`