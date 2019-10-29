import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, DatePicker, Input, message, Spin } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import { ScrollBox } from 'src/components/common'
// import MultipleImageUploader from 'src/components/ImageUploader/MultipleImageUploader'
import service from 'src/services/api'
import { badEventRecordService } from './api/BadEventRecordService'
import moment from 'moment'
import MultiFileUploader, { FileItem } from 'src/components/MultiFileUploader'
const commonApi = service.commonApiService

export interface Props { }
const Option = Select.Option

export default observer(function BadEventRecordEdit() {
  let { location, history } = appStore
  let wardCode = authStore.selectedDeptCode
  let wardName = authStore.selectedDeptName
  let search = qs.parse(location.search.replace('?', ''))
  const [loading, setLoading] = useState(false)

  const [nurseList, setNurseList] = useState([] as any)
  const [files, setFiles] = useState([] as FileItem[])
  // const [urls, setUrls] = useState([] as any)
  // const [ids, setIds] = useState([] as any)
  const [typeList, setTypeList] = useState([] as any[])

  const [badEvent, setBadEvent] = useState({
    id: '',
    status: '1',
    creatorNo: '',
    creatorName: '',
    createTime: '',
    eventDay: moment().format('YYYY-MM-DD'),
    eventTime: moment().format('HH:mm'),
    eventType: '',
    briefCourseEvent: '',
    result: '',
  } as any)

  const [parties, setParties] = useState([] as any[])

  const handleSave = () => {
    let params = {
      badEvent,
      wardCode,
      fileIds: files.map((item: any) => item.id),
      parties: parties.map((name: string) => {
        return {
          empName: name
        }
      })
    }

    setLoading(true)
    badEventRecordService
      .saveOrUpdate(params)
      .then(res => {
        message.success('保存成功', 1, () => {
          setLoading(false)
          history.goBack()
        })
      }, () => setLoading(false))
    console.log(params)
  }

  const handleFileChange = (newList: any) => {
    setFiles(newList)
    // setUrls(urls)
    // setIds(ids)
  }

  const getTypeList = () => {
    badEventRecordService.getDict({
      groupCode: 'qc',
      dictCode: 'qc_bad_event_type'
    })
      .then(res => {
        if (res.data) setTypeList(res.data)
      })
  }

  const getDetail = () => {
    setLoading(true)
    badEventRecordService.toSaveOrUpdate(search.id).then(res => {
      if (res.data) {
        if (res.data.attachs) {
          let attachs = res.data.attachs
          setFiles(attachs)
          // setUrls(attachs.map((item: any) => item.path))
          // setIds(attachs.map((item: any) => item.id))
        }

        if (res.data.parties) {
          let _parties = res.data.parties.map((item: any) => item.empName) || []
          setParties(_parties)
        }

        if (res.data.badEvent) {
          let newBadEvent = { ...badEvent }
          for (let x in badEvent) {
            if (res.data.badEvent[x]) newBadEvent[x] = res.data.badEvent[x]
          }

          setBadEvent(newBadEvent)
        }

        setLoading(false)
      }

    }, () => setLoading(false))
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

    getTypeList()

    if (search.id) getDetail()
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
              name: '不良事件记录',
              link: '/qcOne/nursingMeetingRecord'
            },
            {
              name: search.id ? '修改记录' : '新建记录'
            },
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">
            {search.id ? '修改' : '新建'}不良事件
          </div>
          <div className='topHeaderButton'>
            <Button onClick={handleSave} disabled={loading} type="primary">保存</Button>
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
                  <td className="label">发生时间</td>
                  <td className="content">
                    <DatePicker
                      format="YYYY-MM-DD HH:mm"
                      value={
                        badEvent.eventDay && badEvent.eventTime ?
                          moment(`${badEvent.eventDay} ${badEvent.eventTime}`) :
                          undefined
                      }
                      onChange={(newTime) => {
                        setBadEvent({
                          ...badEvent,
                          eventDay: newTime.format('YYYY-MM-DD'),
                          eventTime: newTime.format('HH:mm')
                        })
                      }}
                      allowClear={false}
                      showTime />
                  </td>
                  <td className="label">发生科室</td>
                  <td>
                    <Input value={wardName} disabled />
                  </td>
                </tr>
                <tr>
                  <td className="label">事件种类</td>
                  <td className="content">
                    <Select
                      placeholder="请选择"
                      value={badEvent.eventType}
                      onChange={(eventType: any) => setBadEvent({ ...badEvent, eventType })}>
                      {typeList.map((item: any) =>
                        <Option value={item.code} key={item.code}>{item.name}</Option>
                      )}
                    </Select>
                  </td>
                  <td className="label">当事人</td>
                  <td className="content">
                    <Select
                      showSearch
                      mode="tags"
                      value={parties}
                      onChange={(arr: any[]) => setParties(arr)}
                      placeholder="请输入"
                      filterOption={(input: string, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
                      {nurseList.map((item: any) => <Option key={item.empNo} value={item.empName}>{item.empName}</Option>)}
                    </Select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="default-pannel">
            <div className="title">一、事件简要经过</div>
            <div className="content">
              <Input.TextArea
                value={badEvent.briefCourseEvent}
                autosize={{ minRows: 5 }}
                onChange={(e: any) =>
                  setBadEvent({ ...badEvent, briefCourseEvent: e.target.value })
                }
              />
            </div>
          </div>
          <div className="default-pannel">
            <div className="title">二、后果</div>
            <div className="content">
              <Input.TextArea
                value={badEvent.result}
                autosize={{ minRows: 5 }}
                onChange={(e: any) =>
                  setBadEvent({ ...badEvent, result: e.target.value })
                }
              />
            </div>
          </div>
          <div className="default-pannel">
            <div className="title">三、附件</div>
            <div className="content">
              {/* <MultipleImageUploader upload={(files) => {
                let reqList = [] as any
                for (let i = 0; i < files.length; i++) {
                  let form = new FormData()
                  form.set('file', files[i])
                  reqList.push(commonApi.uploadAttachment('qcBadEvent', form))
                }

                return Promise.all(reqList)
              }} ids={ids} value={urls} onChange={handleFileChange} /> */}
              <MultiFileUploader type='qcNurseMeeting' data={files} onChange={handleFileChange} />
            </div>
          </div>
        </Spin>
      </MainContent>
    </MainPannel>
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
`

const ScrollBody = styled(ScrollBox)`
  position: absolute;
  left: 0;
  top: 55px;
  bottom: 45px;
  width: 100%;
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