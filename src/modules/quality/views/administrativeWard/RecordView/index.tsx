import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { Button, Input, Select, message, DatePicker } from "src/vendors/antd";
import { appStore } from "src/stores";
import api from '../api'
import moment from 'moment';
import { stringify } from "qs";
import service from 'src/services/api'
interface Props {
}
export interface DeptType {
  code: string;
  name: string;
}

export default observer((props: Props) => {
  let path = appStore.location.pathname
  const [deptList, setDeptList] = useState([])
  const { history } = appStore
  const [master, setMaster]: any = useState({})
  const [form, setForm]: any = useState({})
  const _user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const [createTime, setCreateTime]: any= useState({})
  const [viewOnly, setViewOnly] = useState<boolean>(false);
  
  function setFormItem(item: object) {
    setForm({ ...form, ...item });
  }
  // 全部科室
  const getDeptAll = () => {
    service.commonApiService.getNursingUnitAll().then(res => {
      if (res.data.deptList) setDeptList(res.data.deptList)
    })
  }

  const getData = async (id = appStore.queryObj.id) => {
    const { data } = await api.getItem(id)
    setCreateTime({
      0: moment(data.recordTime).format('YYYY-MM-DD').split('-')[0],
      1: moment(data.recordTime).format('YYYY-MM-DD').split('-')[1], 
      2: moment(data.recordTime).format('YYYY-MM-DD').split('-')[2]
    })
    setForm(data)
  }

  const handleSubmit = async () => {
    // 新建没有id 修改传id
    form.id = appStore.queryObj.id || ''
    // 处理时间
    form.recordTime = createTime['0'] + '-' + createTime['1'] + '-' + createTime['2']
    form.qcLevel = path.includes('qcTwo') ? '2' : '3'
    const res = await api.saveItem(form)
    if (res.code === '200') {
      message.success('保存成功')
      if (path.includes('qcTwo')) appStore.history.push(`/qcTwo/administrativeWard`)
      else appStore.history.push(`/qcThree/administrativeWard`)
    } else {
      message.warning(res.desc)
    }
  }

  useEffect(() => {
    if (appStore.queryObj.id) {
      getData().then()
    }
    getDeptAll()
    setForm({
      'searchRoomDate': moment(new Date).format("YYYY-MM-DD HH:mm"),
      'recorder': _user.empName,
      'deptCode': _user.deptCode,
      'deptName': _user.deptName
    })
    setCreateTime({
      0: moment(new Date).format('YYYY-MM-DD').split('-')[0],
      1: moment(new Date).format('YYYY-MM-DD').split('-')[1], 
      2: moment(new Date).format('YYYY-MM-DD').split('-')[2]
    })
  }, [])

  useEffect(()=>{
   const location = appStore?.history?.location;
   (location.pathname.indexOf("/viewOnly")!==-1) && (setViewOnly(true))
  },[appStore?.history?.location])


  return (
    <Wrapper>
      <BreadcrumbBox
        style={{ padding: '5px 10px 0', height: '26px' }}
        data={appStore.queryObj.id ? [
          { name: '行政查房记录', link: '/qcTwo/administrativeWard' },
          { name: "行政查房详情" },
        ] : [
          { name: '行政查房记录', link: '/qcTwo/administrativeWard' },
          { name: "新建行政查房" },
        ]}
      />
      <HeadWrapper>
        <div>
          <div style={{ fontWeight: "bold" }}>{master.deptName}护理行政查房记录表</div>
        </div>
        <div className='right-bottom'>
          <Button disabled={viewOnly} type='primary' className="con-item" onClick={() => handleSubmit()}>保存</Button>
          <Button className="con-item" onClick={() => history.goBack()}>返回</Button>
        </div>
      </HeadWrapper>
      <MainWrapper>
        <div className={viewOnly ? 'table-main viewOnly' : 'table-main' }>
          <div className='table-wrapper'>
            <div className='table-title'>
              护理行政查房记录表
            </div>
            {/* className={'disable'} */}
            <table >
              <tbody>
                <tr>
                  <td style={{width:'80px'}}>科室</td>
                  <td>
                    <Select className='select inpatientAreaSel'
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      value={form.deptCode}
                      onChange={(val: any) =>{
                        let newarr: any = deptList.filter((item: DeptType) => {
                          return item.code === val
                        })
                        setFormItem({deptCode: newarr[0].code, deptName: newarr[0].name})
                      }
                      }
                      >
                      {deptList.map((item: DeptType) => (
                        <Select.Option key={item.name} value={item.code}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td style={{width:'80px'}}>查房时间</td>
                  <td>
                    <DatePicker
                      format="YYYY-MM-DD HH:mm"
                      allowClear={false}
                      value={moment(form.searchRoomDate)}
                      showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                      onChange={_date => {
                        setFormItem({ 'searchRoomDate': moment(_date).format("YYYY-MM-DD HH:mm") })
                      }}
                      onOk={_data => {
                        setFormItem({ 'searchRoomDate': moment(_data).format("YYYY-MM-DD HH:mm") })
                      }}
                    />
                  </td>
                  <td style={{width:'80px'}}>主持人</td>
                  <td>
                    <Input
                      value={form.compere}
                      onChange={(e) =>
                        setFormItem({ 'compere': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td >地点</td>
                  <td colSpan={5}>
                    <Input
                      value={form.place}
                      onChange={(e) =>
                        setFormItem({ 'place': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td >参与人员</td>
                  <td colSpan={5} >
                    <Input.TextArea
                      value={form.participants}
                      autosize
                      onChange={(e: any) =>
                        setFormItem({ 'participants': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{textAlign: 'left'}}>&nbsp;一、查房理由</td>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <Input.TextArea
                      value={form.reason}
                      autosize={{minRows: 3}}
                      onChange={(e: any) =>
                        setFormItem({ 'reason': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{textAlign: 'left'}}>&nbsp;二、科室汇报</td>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <Input.TextArea
                      value={form.deptReport}
                      autosize={{minRows: 5}}
                      onChange={(e: any) =>
                        setFormItem({ 'deptReport': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{textAlign: 'left'}}>&nbsp;三、参加人员讨论意见</td>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <Input.TextArea
                      value={form.participantsOpinion}
                      autosize={{minRows: 7}}
                      onChange={(e: any) =>
                        setFormItem({ 'participantsOpinion': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{textAlign: 'left'}}>&nbsp;四、护理部主任总结</td>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <Input.TextArea
                      value={form.nurseHeadSummary}
                      autosize={{minRows: 5}}
                      onChange={(e: any) =>
                        setFormItem({ 'nurseHeadSummary': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <div className='dateItem'>
                      <div className='item'>
                        <span className='name'>记录人:</span>
                        <Input
                          value={form.recorder}
                          onChange={(e: any) =>
                            setFormItem({ 'recorder': e.target.value })
                          }
                        />
                      </div>
                      <div className='date'>
                        <Input
                          value={createTime['0']}
                          onChange={(e: any) =>
                            setCreateTime({...createTime, 0: e.target.value})
                          }
                        />
                        <span>年</span>
                        <Input
                          value={createTime['1']}
                          onChange={(e: any) =>
                            setCreateTime({...createTime, 1: e.target.value})
                          }
                        />
                        <span>月</span>
                        <Input
                          value={createTime['2']}
                          onChange={(e: any) =>
                            setCreateTime({...createTime, 2: e.target.value})
                          }
                        />
                        <span>日</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </MainWrapper>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`

const HeadWrapper = styled.div`
  height: 50px;
  background: #fff;
  font-size: 14px;
  display:flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  
  .right-bottom{
    .con-item{
      margin-left: 10px;
      font-size: 12px;
    }
  }
`

const MainWrapper = styled.div`
   height: calc(100% - 50px);
   position: relative;
   .disable{
    pointer-events: none;
   }
   .table-main {
    height: 100%
   }
   .viewOnly{
    pointer-events:none;
   }
   .table-wrapper::-webkit-scrollbar-track-piece,
   .audit-wrapper::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      background-color:#f8f8f8;
    }
    .table-wrapper::-webkit-scrollbar,
    .audit-wrapper::-webkit-scrollbar {//滚动条的宽度
      width:9px;
      height:9px;
    }
    .table-wrapper::-webkit-scrollbar-track,
    .audit-wrapper::-webkit-scrollbar-track{//滚动条的设置
      background-color:#dddddd;
      border-radius:5px;
    }
    .table-wrapper::-webkit-scrollbar-thumb,
    .audit-wrapper::-webkit-scrollbar-thumb {//滚动条的设置
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:18px;
      border-radius:5px;
    }
    .table-wrapper::-webkit-scrollbar-thumb:hover,
    .audit-wrapper::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
    }
   .table-wrapper{
      background: #fff;
      height: 100%;
      width: 55%;
      margin: 0 22.5%;
      padding: 30px 50px 80px;
      overflow: auto;
      .table-title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      table{
        border-collapse: collapse;
        border-color: #000;
        width: 100%;
        table-layout: fixed;
        tr {
          width: 100%;
        }
        td{
          border: 1px #000 solid;
          line-height: 24px;
          min-height: 24px;
          text-align: center;
          input,
          .ant-input{
            border: none;
            resize:none
          }
          .ant-input:focus,
          .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active{
            box-shadow: none;
            border-right-width: 0 !important;
          }
          p{
            line-height: 24px;
            margin: 0;
          }
          .ant-input-number-handler-wrap{
            border: none;
          }
          .ant-calendar-picker{
            min-width: 126px !important;
            svg{
              display: none;
            }
          }
          .dateItem {
            display: flex;
            width: 100%;
            justify-content: end;
            .item{
              input{
                width: 120px;
              }
              .name{
                width: 60px;
              }
            }
            .date{
              margin-right: 100px;
              input{
                width: 50px;
                text-align: center;
              }
            }
          }
        }
        .text-left{
          text-align:left;
        }
        .select{
          width: 100%;
          height: 100%
        }
        .ant-select-selection{
          border: none;
        }
        .ant-select-arrow{
          display: none;
        }
        //病区选择
        .inpatientAreaSel{
          .ant-select-selection-selected-value{
            white-space: break-spaces;
            text-align: left;
          }
        }
      }
   }
`