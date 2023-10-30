import styled from "styled-components";
import { AutoComplete, Input, Select,DatePicker } from "antd";
import React, { useEffect } from "react";
import { leaveRecordModal } from './modal';
import moment from "moment";
import { observer } from "mobx-react-lite";
interface Props {

}
export default observer(function MilitaryLeaveApplyForm(props: Props) {
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

  useEffect(()=>{
    employeePager.leaveDuration = moment(employeePager.leaveEndTime).add(1,'days').diff(moment(employeePager.leaveStartTime),"days") || 0
  },[employeePager])

  const showHeadNurseAudit = (key:any)=>{
    let obj:any = leaveRecordModal?.employeePager?.nodeList?.reverse().find((item:any) => item.nodeCode === key)
    let content = obj && obj.content || ""
    return content || ""
  }

  const isValidDate = (time:any)=>{
    return moment(time).isValid();
  }

  const antOnChange = (key: string, e: any) => {
    const value = e;
    const newData = {
      ...employeePager,
      [key]: value
    }
    leaveRecordModal.updateEmployeePager(newData);
  }

  return (
    <Pager className="leave-page">
      <div className="form-title">军队人员请休假（外出）审批报告表</div>
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
            <td>部职别</td>
            <td colSpan={3}>
              <Input 
                value={employeePager.departmentAndPosition}
                onChange={(e) => onChange('departmentAndPosition', e)}
              />
            </td>
          </tr>
          <tr>
            <td>人员类别</td>
            <td>
              <AutoComplete
                value={employeePager.personType}
                style={{ width: '100%' }}
                dataSource={['军官', '文职人员', '军士', '义务兵']}
                onChange={(value) => employeePager.personType = String(value)}
              />
            </td>
            <td>入伍（工作）年月</td>
            <td>
              {/* <Input 
                value={employeePager.enlistmentDate} 
                onChange={(e) => onChange('enlistmentDate', e)}
              /> */}
              <DatePicker placeholder="" size="small" value={isValidDate(employeePager.enlistmentDate) ? moment(employeePager.enlistmentDate) : undefined} onChange={(date) => antOnChange('enlistmentDate', moment(date).format('YYYY-MM-DD'))} />

            </td>
            <td>本次请假起止时间</td>
            <td>
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
          </tr>
          <tr>
            <td>本年度已<br/>休假情况</td>
            <td colSpan={3}>
              <div className="flex-wrap input-50">
                本人全年共
                <Input 
                  style={{width:"50px"}}
                  value={employeePager.shijia} 
                  onChange={(e) => onChange('shijia', e)}
                />天休假/探亲假，已休
                <Input 
                  style={{width:"50px"}}
                  value={employeePager.sabbatical} 
                  onChange={(e) => onChange('sabbatical', e)}
                />天（含路途
                  <Input 
                    style={{width:"50px"}}
                    value={employeePager.fangshejia} 
                    onChange={(e) => onChange('fangshejia', e)}
                  />天）
                </div>
            </td>
            <td>请休假天数</td>
            <td>
              <div>{employeePager.leaveDuration}</div>
            </td>
          </tr>
          <tr>
            <td>交通工具</td>
            <td>
              <Input 
                value={employeePager.transportation} 
                onChange={(e) => onChange('transportation', e)}
              />
            </td>
            <td>联系电话</td>
            <td>
              <Input 
                value={employeePager.personalPhoneNumber} 
                onChange={(e) => onChange('personalPhoneNumber', e)}
              />
            </td>
            <td>紧急联络<br/>人及电话</td>
            <td>
              <div>
                <Input 
                  value={employeePager.emergencyContact} 
                  onChange={(e) => onChange('emergencyContact', e)}
                />
              </div>
              <div>
                <Input 
                  value={employeePager.contactPhoneNumber} 
                  onChange={(e) => onChange('contactPhoneNumber', e)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>行动路线</td>
            <td colSpan={5}>
              <div className="flex-wrap input-50">
                <span>贵阳市至</span>
                <Input 
                  size="small"
                  className="flex-1"
                  value={employeePager.chanjia} 
                  onChange={(e) => onChange('chanjia', e)}
                />
                <span>省</span>
                <Input 
                  size="small"
                  className="flex-1"
                  value={employeePager.sangjia} 
                  onChange={(e) => onChange('sangjia', e)}
                />
                <span>市（县）</span>
                <Input 
                  size="small"
                  className="flex-1"
                  value={employeePager.bingjia} 
                  onChange={(e) => onChange('bingjia', e)}
                />
                <span>区（乡镇）</span>
              </div>
              <div className="flex-wrap">
              <span>途径地点（途中下车、转站地点）：</span>
                <Input 
                  size="small"
                  className="flex-1 align-left"
                  value={employeePager.hunjia} 
                  onChange={(e) => onChange('hunjia', e)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>请休假原因</td>
            <td colSpan={5}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={employeePager.buxiu}
                onChange={(e) => onChange('buxiu', e)}
              ></Input.TextArea>
            </td>
          </tr>
          <tr>
            <td>科室（部门）意见</td>
            <td colSpan={5}>
              <div className="h-60">
                {showHeadNurseAudit("head_nurse_audit")}
              </div>
              <div className="flex-wrap justify-center">
                <span>签字：</span>
                <div className="sign-con"></div>
                <div className="flex-wrap">
                  <Input 
                    readOnly
                    className="w-40"
                    size="small"
                  />
                  <span>年</span>
                  <Input 
                    readOnly
                    className="w-20"
                    size="small"
                  />
                  <span>月</span>
                  <Input 
                    readOnly
                    className="w-20"
                    size="small"
                  />
                  <span>日</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>分队长意见<br/>（仅士兵填写）</td>
            <td colSpan={5}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={employeePager.weekend}
                onChange={(e) => onChange('weekend', e)}
              ></Input.TextArea>
              <div className="flex-wrap justify-center">
                <span>签字：</span>
                <div className="sign-con"></div>
                <div className="flex-wrap">
                  <Input 
                    readOnly
                    className="w-40"
                    size="small"
                  />
                  <span>年</span>
                  <Input 
                    readOnly
                    className="w-20"
                    size="small"
                  />
                  <span>月</span>
                  <Input 
                    readOnly
                    className="w-20"
                    size="small"
                  />
                  <span>日</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>值班、备勤等<br/>工作交接</td>
            <td colSpan={2}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={employeePager.outDays}
                onChange={(e) => onChange('outDays', e)}
              ></Input.TextArea>
              <div className="flex-wrap justify-right">
                <Input 
                  readOnly
                  className="w-40"
                  size="small"
                />
                <span>年</span>
                <Input 
                  readOnly
                  className="w-20"
                  size="small"
                />
                <span>月</span>
                <Input 
                  readOnly
                  className="w-20"
                  size="small"
                />
                <span>日</span>
              </div>
            </td>
            <td>分管领导意见</td>
            <td colSpan={2}>
              <div className="h-60">
                {showHeadNurseAudit("minister_nurse_audit")}
              </div>
              <div className="flex-wrap justify-right">
                <Input 
                  readOnly
                  className="w-40"
                  size="small"
                />
                <span>年</span>
                <Input 
                  readOnly
                  className="w-20"
                  size="small"
                />
                <span>月</span>
                <Input 
                  readOnly
                  className="w-20"
                  size="small"
                />
                <span>日</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>政治工作处<br/>审批意见</td>
            <td colSpan={5}>
              <div className="h-60"></div>
            </td>
          </tr>
          <tr>
            <td>院首长审批<br/>意  见</td>
            <td colSpan={5}>
              <div className="h-60"></div>
              <div className="flex-wrap justify-right">
                <Input 
                  readOnly
                  className="w-40"
                  size="small"
                />
                <span>年</span>
                <Input 
                  readOnly
                  className="w-20"
                  size="small"
                />
                <span>月</span>
                <Input 
                  readOnly
                  className="w-20"
                  size="small"
                />
                <span>日</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>★销假时间</td>
            <td colSpan={5}>
              <Input
                className="align-left"
                value={employeePager.legal}
                onChange={(e) => onChange('legal', e)}
              ></Input>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colSpan={5}>
              <div className="remark">
                分管领导意见：1.医、药、技、工程类及卫生经济科由卫勤处处长签批；2.护类由护理部主任签批；3.机关三处一部无需分管领导签批；4.采购管理科、财务保障室由分管副院长签批；5.临床科室士兵按专业由卫勤处/护理部签批，勤务保障分队士兵由保障处处长签批，卫勤训练中心士兵由该部门主任签批。
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Pager>
  )
})

const Pager = styled.div`
  margin: 0 auto;
  width: 1000px;
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
        textarea {
          text-align: left;
          resize: none;
        }
        .ant-calendar-picker-icon{
          display:none;
        }
        .h-60{
          height:60px;
        }
      }
    }
  }
  .remark {
    text-align: left;
  }
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &.justify-right {
      justify-content: flex-end;
    }
    &.justify-center {
      justify-content: center;
    }
    .flex-1 {
      flex: 1;
    }
    .w-60 {
      width: 60px;
    }
    .w-40 {
      width: 40px;
    }
    .w-20 {
      width: 20px;
    }
  }
  .sign-con {
    width: 80px;
    margin-right: 12px;
  }
`