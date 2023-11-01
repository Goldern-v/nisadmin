import styled from "styled-components";
import { Input,DatePicker } from "antd";
import React, { useState, useEffect,useMemo } from "react";
const { TextArea } = Input;
import { appStore } from "src/stores";
import moment from "moment";
import { leaveRecordModal,Alldays } from './modal';
import { observer } from "mobx-react-lite";

const { RangePicker } = DatePicker

interface Props {

}
export default observer(function EmployeeLeaveApplyForm(props: Props) {
  const employeePager = leaveRecordModal.employeePager;
  const column = new Array(6).fill({}).map(() => ({
    width: `${100 / 6}%`
  }));

  const onChange = (key: string, e: any) => {
    const value = e.target.value;
    const newData = {
      ...employeePager,
      [key]: value
    }
    leaveRecordModal.updateEmployeePager(newData);
  }

  const antOnChange = (key: string, e: any) => {
    const value = e;
    const newData = {
      ...employeePager,
      [key]: value
    }
    leaveRecordModal.updateEmployeePager(newData);
  }

  const canEditTime = () =>{
    return leaveRecordModal.employeePager.leaveStartTime && leaveRecordModal.employeePager.leaveEndTime
  }

  useEffect(()=>{
    let _Alldays = {...Alldays}
    delete _Alldays.otherName
    leaveRecordModal.employeePager.leaveDuration = Object.keys(leaveRecordModal.employeePager).reduce((prev:any,next:any)=>{
      return prev + Number(_Alldays.hasOwnProperty(next) && leaveRecordModal.employeePager[next])
    },0)
  },[employeePager])

  const isValidDate = (time:any)=>{
    return moment(time).isValid();
  }
  
  // const showHeadNurseAudit = (key:any)=>{
  //   let obj:any = leaveRecordModal?.employeePager?.nodeList?.reverse().find((item:any) => item.nodeCode === key)
  //   let content = obj && obj.content || ""
  //   return content || ""
  // }

  const _showHeadNurseAudit = useMemo(() => {
    let obj:any = leaveRecordModal?.employeePager?.nodeList?.reverse().find((item:any) => item.nodeCode === "head_nurse_audit")
    return obj
  }, [employeePager])

  const _ministerNurseAudit = useMemo(() => {
    let obj:any = leaveRecordModal?.employeePager?.nodeList?.reverse().find((item:any) => item.nodeCode === "minister_nurse_audit")
    return obj
  }, [employeePager])

  return (
    <Pager className="leave-page">
      <div className="form-title">聘用人员请（休）假审批报告表</div>
      <table>
        <colgroup>
          {column.map((col, index) => <col key={'col' + index} width={col.width}/>)}
        </colgroup>
        <tbody>
          <tr>
            <td>姓名</td>
            <td>
              <Input readOnly value={employeePager.creatorName} />
            </td>
            <td>出生年月</td>
            <td>
              <Input readOnly value={employeePager.birthday}/>
            </td>
            <td>科室（部门）</td>
            <td>
              <Input readOnly value={employeePager.deptName}/>
            </td>
          </tr>
          <tr>
            <td>休假地点</td>
            <td>
              <Input 
                value={employeePager.position} 
                onChange={(e) => onChange('position', e)}
              />
            </td>
            <td>来院工作时间</td>
            <td>
              <Input readOnly value={employeePager.goHospitalWorkDate}/>
            </td>
            <td>上次休假时间</td>
            <td>
              <DatePicker placeholder="" size="small" value={isValidDate(employeePager.preLeaveTime) ? moment(employeePager.preLeaveTime) : undefined} onChange={(date) => antOnChange('preLeaveTime', moment(date).format('YYYY-MM-DD'))} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>请（休）假起止时间</td>
            <td colSpan={2}>
              <DatePicker.RangePicker placeholder={['','']} size="small" 
                value={employeePager.leaveStartTime && employeePager.leaveEndTime
                  ? [
                      moment(employeePager.leaveStartTime),
                      moment(employeePager.leaveEndTime)
                    ]
                  : []}
                  onChange = {(e)=>{
                    let leaveStartTime = moment(e[0]).format('YYYY-MM-DD')
                    let leaveEndTime = moment(e[1]).format('YYYY-MM-DD')
                    const newData = {
                      ...employeePager,
                      leaveStartTime,
                      leaveEndTime
                    }
                    leaveRecordModal.updateEmployeePager(newData);
                  }}
                />
            </td>
            <td>本人联系电话</td>
            <td>
              <Input 
                value={employeePager.personalPhoneNumber} 
                onChange={(e) => onChange('personalPhoneNumber', e)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>本年已请（休）假天数</td>
            <td colSpan={2}>
              <Input 
                value={employeePager.annualLeaveTakenDays} 
                onChange={(e) => onChange('annualLeaveTakenDays', e)}
              />
            </td>
            <td>本年公休假剩余天数</td>
            <td>
              <Input 
                value={employeePager.remainingPublicHolidays} 
                onChange={(e) => onChange('remainingPublicHolidays', e)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>行动路线</td>
            <td colSpan={2}>
              <Input 
                value={employeePager.travelRoute} 
                onChange={(e) => onChange('travelRoute', e)}
              />
            </td>
            <td>交通工具</td>
            <td>
              <Input 
                value={employeePager.transportation} 
                onChange={(e) => onChange('transportation', e)}
              />
            </td>
          </tr>
          <tr>
            <td>家庭联系人</td>
            <td>
              <Input 
                value={employeePager.emergencyContact} 
                onChange={(e) => onChange('emergencyContact', e)}
              />
            </td>
            <td>与本人关系</td>
            <td>
              <Input 
                value={employeePager.relationshipToEmployee} 
                onChange={(e) => onChange('relationshipToEmployee', e)}
              />
            </td>
            <td>联系人电话</td>
            <td>
              <Input 
                value={employeePager.contactPhoneNumber} 
                onChange={(e) => onChange('contactPhoneNumber', e)}
              />
            </td>
          </tr>
          <tr>
            <td><span style={{color:'red'}}>*</span>填写请假（外出）天数</td>
            <td colSpan={5} style={{pointerEvents:canEditTime() ? 'auto' : 'none'}}>
              <div className="flex-wrap">
                <span>公休假（</span>
                <Input 
                  size="small"
                  value={employeePager.sabbatical} 
                  onChange={(e) => onChange('sabbatical', e)} 
                />
                <span>）天；事假（</span>
                <Input 
                  size="small"
                  value={employeePager.shijia} 
                  onChange={(e) => onChange('shijia', e)} 
                />
                <span>）天；病假（</span>
                <Input 
                  size="small"
                  value={employeePager.bingjia} 
                  onChange={(e) => onChange('bingjia', e)} 
                />
                <span>）天；放射假（</span>
                <Input 
                  size="small"
                  value={employeePager.fangshejia} 
                  onChange={(e) => onChange('fangshejia', e)} 
                />
                <span>）天；产假（</span>
                <Input 
                  size="small"
                  value={employeePager.chanjia} 
                  onChange={(e) => onChange('chanjia', e)} 
                />
                <span>）天；</span>
                
              </div>
              <div className="flex-wrap">
                <span>丧假（</span>
                <Input 
                  size="small"
                  value={employeePager.sangjia} 
                  onChange={(e) => onChange('sangjia', e)} 
                />
                <span>）天；婚假（</span>
                <Input 
                  size="small"
                  value={employeePager.hunjia} 
                  onChange={(e) => onChange('hunjia', e)} 
                />
                <span>）天；补休（</span>
                <Input 
                  size="small"
                  value={employeePager.buxiu} 
                  onChange={(e) => onChange('buxiu', e)} 
                />
                <span>）天；周末（</span>
                <Input 
                  size="small"
                  value={employeePager.weekend} 
                  onChange={(e) => onChange('weekend', e)} 
                />
                <span>）天；</span>
                <span>法定节假日（</span>
                <Input 
                  size="small"
                  value={employeePager.legal} 
                  onChange={(e) => onChange('legal', e)} 
                />
                <span>）天；</span>
              </div>
              <div className="flex-wrap">
                <span>外出培训/进修（</span>
                <Input 
                  size="small"
                  value={employeePager.outDays} 
                  onChange={(e) => onChange('outDays', e)} 
                />
                <span>）天；其他</span>
                <Input 
                  size="small"
                  value={employeePager.otherName} 
                  onChange={(e) => onChange('otherName', e)} 
                  className="other-name-input"
                />
                <span>（</span>
                <Input 
                  size="small"
                  value={employeePager.otherDays} 
                  onChange={(e) => onChange('otherDays', e)} 
                />
                <span>）天；合计请假</span>
                <Input 
                  size="small"
                  value={employeePager.leaveDuration} 
                  onChange={(e) => onChange('leaveDuration', e)} 
                />
                <span>天</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>科室（部门）支部<br/>呈报意见</td>
            <td colSpan={5}>
              {/* <Input.TextArea
                className="align-left"
                rows={3}
                value={employeePager.otherName}
                onChange={(e) => onChange('otherName', e)} 
              ></Input.TextArea> */}
              <div className="h-60">{
                _showHeadNurseAudit?.content
                // showHeadNurseAudit("head_nurse_audit")
              }</div>
              <div className="flex-wrap justify-right">
                <Input 
                  readOnly
                  value={_showHeadNurseAudit?.handleTime ? moment(_showHeadNurseAudit?.handleTime).get('year') : ""}
                  className="w-40"
                  size="small"
                />
                <span>年</span>
                <Input 
                  readOnly
                  value={_showHeadNurseAudit?.handleTime ? moment(_showHeadNurseAudit?.handleTime).get('month') : ""}
                  className="w-20"
                  size="small"
                />
                <span>月</span>
                <Input 
                  readOnly
                  value={_showHeadNurseAudit?.handleTime ? moment(_showHeadNurseAudit?.handleTime).get('date') : ""}
                  className="w-20"
                  size="small"
                />
                <span>日</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>分管领导<br/>审核意见</td>
            <td colSpan={5}>
              {/* <Input.TextArea
                className="align-left"
                rows={3}
                value={employeePager.otherName}
                onChange={(e) => onChange('otherName', e)} 
              ></Input.TextArea> */}
              <div className="h-60">
                {_ministerNurseAudit?.content}
                {/* {showHeadNurseAudit("minister_nurse_audit")} */}
              </div>
              <div className="flex-wrap justify-right">
                <Input 
                  readOnly
                  value={_ministerNurseAudit?.handleTime ? moment(_ministerNurseAudit?.handleTime).get('year') : ""}
                  className="w-40"
                  size="small"
                />
                <span>年</span>
                <Input 
                  readOnly
                  value={_ministerNurseAudit?.handleTime ? moment(_ministerNurseAudit?.handleTime).get('month') : ""}
                  className="w-20"
                  size="small"
                />
                <span>月</span>
                <Input 
                  readOnly
                  className="w-20"
                  value={_ministerNurseAudit?.handleTime ? moment(_ministerNurseAudit?.handleTime).get('date') : ""}
                  size="small"
                />
                <span>日</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>政治工作处<br/>审核意见</td>
            <td colSpan={5}>
            <div className="h-60"></div>
              <div className="flex-wrap justify-right">
                <span>年</span>
                <span className="w-30"></span>
                <span>月</span>
                <span className="w-30"></span>
                <span>日</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>院领导审核意见</td>
            <td colSpan={5}>
              <div className="h-60"></div>
              <div className="flex-wrap justify-right">
                <span>年</span>
                <span className="w-30"></span>
                <span>月</span>
                <span className="w-30"></span>
                <span>日</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="remark-wrap">
        <div className="remark">备注：1、各类休假时间按照《聘用人员管理规定》执行；</div>
        <div className="remark">2、请（休）假人员应逐级呈报、审批，不得越级请（休）假（护士分管领导为护理主任；医生、技师分管理领导为卫勤处处长；信息科、医学工程科、药剂科、消毒供应室分管领导为医疗保障中心主任；其他科室、部门为相应分管领导。）</div>
        <div className="remark">3、请（休）假结束后至政治工作处509室销假；</div>
        <div className="remark">4、此审批报告表请用A4纸打印。</div>
      </div>
    </Pager>
  )
})

const Pager = styled.div`
  margin: 0 auto;
  width: 760px;
  height: 1040px;
  background-color: #fff;
  padding: 20px 30px;
  .form-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    tr {
      td {
        border: 1px solid #000;
        line-height: 18px;
        padding: 1px;
        height: 35px;
        .ant-input {
          border: none;
          outline: none;
          text-align: center;
          padding: 1px 3px;
          &:focus {
            box-shadow: none;
          }
        }
        .align-left {
          text-align: left;
        }
        .h-60{
          height:60px;
        }
        .ant-calendar-picker-icon{
          display:none;
        }
        textarea {
          text-align: left;
          resize: none;
        }
      }
    }
  }
  .remark-wrap {
    margin-top: 8px;
    .remark {
      text-align: left;
    }
  }
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &.justify-right {
      justify-content: flex-end;
    }
    .ant-input {
      width: 28px;
      font-size: 13px;
    }
    .w-40 {
      width: 40px;
    }
    .w-30 {
      width: 30px;
    }
    .w-20 {
      width: 20px;
    }
    .other-name-input {
      width: 80px;
    }
  }
`