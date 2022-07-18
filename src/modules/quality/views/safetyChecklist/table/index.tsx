import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { Button, Input, Select, message, DatePicker, Radio } from "src/vendors/antd";
import { appStore, authStore } from "src/stores";
import api from '../api'
import moment from 'moment';
import { stringify } from "qs";
import service from 'src/services/api'
import { nextTick } from "process";
interface Props {
}
export interface DeptType {
  code: string;
  name: string;
}

export default observer((props: Props) => {
  let path = appStore.location.pathname
  const [deptList, setDeptList] = useState([])
  const [areaList, setAreaList] = useState([])
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
  // const getDeptAll = () => {
  //   service.commonApiService.getNursingUnitAll().then(res => {
  //     if (res.data.deptList) setDeptList(res.data.deptList)
  //   })
  // }
  // 全部片区
  const getAreaList = () => {
    api.getAreaList().then(res => {
      if (res.data) setAreaList(res.data)
    })
  }

  const onChangeArea = async (val: string) => {
    let newarr: any = areaList.filter((item: DeptType) => {
      return item.code === val
    })
    setFormItem({areaCode: newarr[0].code, areaName: newarr[0].name, deptCode: val !==  form.areaCode ? '' : form.deptCode})
    // 根据片区获取科室
    // let { data } = await api.getDeptListByArea({areaCode: val})
    // setDeptList(data || [])
    getDeptListByArea(val)
  }
  const getDeptListByArea = async(areaCode: string) => {
    // 根据片区获取科室
    let { data } = await api.getDeptListByArea({areaCode})
    setDeptList(data || [])
  }

  const getData = async (id = appStore.queryObj.id) => {
    const { data } = await api.getItem(id)
    setForm(data)
    getDeptListByArea(data?.areaCode)
  }

  const handleSubmit = async () => {
    // 新建没有id 修改传id
    form.id = appStore.queryObj.id || ''
    const res = await api.saveItem(form)
    if (res.code === '200') {
      message.success('保存成功')
      appStore.history.push(`/qcTwo/safetyChecklist`)
    } else {
      message.warning(res.desc)
    }
  }

  useEffect(() => {
    if (appStore.queryObj.id) {
      getData().then()
    }
    setForm({
      'checkDate': moment(new Date).format("YYYY-MM-DD"),
    })
    getAreaList()
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
          { name: '安全检查表', link: '/qcTwo/safetyChecklist' },
          { name: "安全检查表详情" },
        ] : [
          { name: '安全检查表', link: '/qcTwo/safetyChecklist' },
          { name: "新建安全检查表" },
        ]}
      />
      <HeadWrapper>
        <div>
          <div style={{ fontWeight: "bold" }}>{master.deptName}安全检查表</div>
        </div>
        <div className='right-bottom'>
          <Button disabled={viewOnly} type='primary' className="con-item" onClick={() => handleSubmit()}>保存</Button>
          <Button className="con-item" onClick={() => history.goBack()}>返回</Button>
        </div>
      </HeadWrapper>
      <MainWrapper>
        <div className='table-main'>
          <div className='table-wrapper'>
            <div className='table-title'>
              安全检查表
            </div>
            {/* className={'disable'} */}
            <table className={viewOnly ? 'viewOnly' : '' }>
              <tbody>
              <tr className='checkRadio'>
                <td colSpan={6}>
                  <Radio.Group onChange={(e) => { 
                    setFormItem({festivalType: e.target.value})
                  }}
                  value={form.festivalType}>
                    <Radio value={1}>元旦</Radio>
                    <Radio value={2}>春节</Radio>
                    <Radio value={3}>五一</Radio>
                    <Radio value={4}>国庆</Radio>
                    <Radio value={5}>特殊节日</Radio>
                    <Radio value={6}>专项检查</Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr className='checkRadio'>
                <td>检查时间</td>
                <td colSpan={5} style={{textAlign: 'left' }}>
                  <DatePicker
                    format="YYYY-MM-DD"
                    allowClear={false}
                    value={moment(form.checkDate)}
                    onChange={_date => {
                      setFormItem({ 'checkDate': moment(_date).format("YYYY-MM-DD") })
                    }}
                  />
                </td>
              </tr>
              <tr className='checkRadio'>
                <td>参加检查人员</td>
                <td colSpan={5} >
                  <Input.TextArea
                    value={form.checkParticipants}
                    autosize
                    onChange={(e: any) =>
                      setFormItem({ 'checkParticipants': e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{width:'80px'}}>片区</td>
                <td colSpan={5}>
                  <Select className='select inpatientAreaSel'
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    value={form.areaName}
                    onChange={(val: any) => onChangeArea(val)}
                    >
                    {areaList.map((item: DeptType) => (
                      <Select.Option key={item.name} value={item.code}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td colSpan={6} style={{textAlign: 'left'}}>检查内容</td>
              </tr>
              <tr>
                <td colSpan={6}>
                  <Input.TextArea
                    value={form.checkContent}
                    autosize={{minRows: 5}}
                    onChange={(e: any) =>
                      setFormItem({ 'checkContent': e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td style={{width:'80px'}}>科室</td>
                <td colSpan={5}>
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
              </tr>
              <tr>
                <td colSpan={6} style={{textAlign: 'left'}}>存在问题</td>
              </tr>
              <tr>
                <td colSpan={6}>
                  <Input.TextArea
                    value={form.problem}
                    autosize={{minRows: 5}}
                    onChange={(e: any) =>
                      setFormItem({ 'problem': e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={6} style={{textAlign: 'left'}}>科室整改</td>
              </tr>
              <tr>
                <td colSpan={6}>
                  <Input.TextArea
                    value={form.deptRectification}
                    autosize={{minRows: 5}}
                    onChange={(e: any) =>
                      setFormItem({ 'deptRectification': e.target.value })
                    }
                    disabled={!authStore.isRoleManage}
                  />
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
    pointer-events: none;
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
      .checkRadio{
        width: 100%;
        .ant-radio-group{
          display: flex;
          justify-content: space-around;
        }
      }
   }
  
`
