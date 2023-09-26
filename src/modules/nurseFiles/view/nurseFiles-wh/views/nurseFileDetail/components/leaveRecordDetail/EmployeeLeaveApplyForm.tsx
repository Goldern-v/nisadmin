import styled from "styled-components";
import { Input } from "antd";
import React, { useState, useEffect } from "react";
const { TextArea } = Input;
import { appStore } from "src/stores";
import { leaveRecordModal } from './modal';
import { observer } from "mobx-react-lite";
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
              <Input readOnly value={employeePager.name} />
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
                value={employeePager.leaveLocation} 
                onChange={(e) => onChange('leaveLocation', e)}
              />
            </td>
            <td>来院工作时间</td>
            <td>
              <Input readOnly value={employeePager.workDate}/>
            </td>
            <td>上次休假时间</td>
            <td>
              <Input 
                value={employeePager.lastLeaveTime} 
                onChange={(e) => onChange('lastLeaveTime', e)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>请（休）假起止时间</td>
            <td colSpan={2}>
              <Input 
                value={employeePager.leaveRange} 
                onChange={(e) => onChange('leaveRange', e)}
              />
            </td>
            <td>本人联系电话</td>
            <td>
              <Input 
                value={employeePager.phone} 
                onChange={(e) => onChange('phone', e)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>本年已请（休）假天数</td>
            <td colSpan={2}>
              <Input 
                value={employeePager.leaveDays} 
                onChange={(e) => onChange('leaveDays', e)}
              />
            </td>
            <td>本年公休假剩余天数</td>
            <td>
              <Input 
                value={employeePager.restDays} 
                onChange={(e) => onChange('restDays', e)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>行动路线</td>
            <td colSpan={2}>
              <Input 
                value={employeePager.route} 
                onChange={(e) => onChange('route', e)}
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
                value={employeePager.familyName} 
                onChange={(e) => onChange('familyName', e)}
              />
            </td>
            <td>与本人关系</td>
            <td>
              <Input 
                value={employeePager.relationship} 
                onChange={(e) => onChange('relationship', e)}
              />
            </td>
            <td>联系人电话</td>
            <td>
              <Input 
                value={employeePager.relationPhone} 
                onChange={(e) => onChange('relationPhone', e)}
              />
            </td>
          </tr>
          <tr>
            <td>必须填写<br/>请假（外出）天数</td>
            <td colSpan={5}>
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
                  value={employeePager.total} 
                  onChange={(e) => onChange('total', e)} 
                />
                <span>天</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>科室（部门）支部<br/>呈报意见</td>
            <td colSpan={5}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={employeePager.otherName}
                onChange={(e) => onChange('otherName', e)} 
              ></Input.TextArea>
              <div className="flex-wrap justify-right">
                <Input 
                  className="w-40"
                  size="small"
                  value={employeePager.total} 
                  onChange={(e) => onChange('total', e)} 
                />
                <span>年</span>
                <Input 
                  size="small"
                  value={employeePager.total} 
                  onChange={(e) => onChange('total', e)} 
                />
                <span>月</span>
                <Input 
                  size="small"
                  value={employeePager.total} 
                  onChange={(e) => onChange('total', e)} 
                />
                <span>日</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>分管领导<br/>审核意见</td>
            <td colSpan={5}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={employeePager.otherName}
                onChange={(e) => onChange('otherName', e)} 
              ></Input.TextArea>
              <div className="flex-wrap justify-right">
                <Input 
                  className="w-40"
                  size="small"
                  value={employeePager.total} 
                  onChange={(e) => onChange('total', e)} 
                />
                <span>年</span>
                <Input 
                  size="small"
                  value={employeePager.total} 
                  onChange={(e) => onChange('total', e)} 
                />
                <span>月</span>
                <Input 
                  size="small"
                  value={employeePager.total} 
                  onChange={(e) => onChange('total', e)} 
                />
                <span>日</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>政治工作处<br/>审核意见</td>
            <td colSpan={5}>
              <Input.TextArea
                readOnly
                className="align-left"
                rows={3}
                value={employeePager.otherName}
              ></Input.TextArea>
              <div className="flex-wrap justify-right">
                <Input 
                  readOnly
                  className="w-40"
                  size="small"
                  value={employeePager.total} 
                />
                <span>年</span>
                <Input 
                  readOnly
                  size="small"
                  value={employeePager.total} 
                />
                <span>月</span>
                <Input 
                  readOnly
                  size="small"
                  value={employeePager.total} 
                />
                <span>日</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>院领导审核意见</td>
            <td colSpan={5}>
              <Input.TextArea
                readOnly
                className="align-left"
                rows={3}
                value={employeePager.otherName}
              ></Input.TextArea>
              <div className="flex-wrap justify-right">
                <Input 
                  readOnly
                  className="w-40"
                  size="small"
                  value={employeePager.total} 
                />
                <span>年</span>
                <Input 
                  readOnly
                  size="small"
                  value={employeePager.total} 
                />
                <span>月</span>
                <Input 
                  readOnly
                  size="small"
                  value={employeePager.total} 
                />
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
    .other-name-input {
      width: 80px;
    }
  }
`