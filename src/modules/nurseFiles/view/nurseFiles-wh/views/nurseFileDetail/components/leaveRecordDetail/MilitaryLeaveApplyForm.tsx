import styled from "styled-components";
import { AutoComplete, Input, Select } from "antd";
import React, { useEffect } from "react";
import { leaveRecordModal } from './modal';
import { observer } from "mobx-react-lite";
interface Props {

}
export default observer(function MilitaryLeaveApplyForm(props: Props) {
  const militaryPager = leaveRecordModal.militaryPager;
  const column = new Array(6).fill({}).map(() => ({
    width: `${100 / 6}%`
  }));

  const onChange = (key: string, e: any) => {
    const value = e.target.value;
    const newData = {
      ...militaryPager,
      [key]: value
    }
    leaveRecordModal.updateMilitaryPager(newData);
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
              <Input readOnly value={militaryPager.name} />
            </td>
            <td>部职别</td>
            <td colSpan={3}>
              <Input 
                value={militaryPager.birthday}
                onChange={(e) => onChange('leaveLocation', e)}
              />
            </td>
          </tr>
          <tr>
            <td>人员类别</td>
            <td>
              <AutoComplete
                value={militaryPager.name}
                style={{ width: '100%' }}
                dataSource={['军官', '文职人员', '军士', '义务兵']}
                onChange={(value) => militaryPager.name = value}
              />
            </td>
            <td>入伍（工作）年月</td>
            <td>
              <Input 
                value={militaryPager.workDate} 
                onChange={(e) => onChange('lastLeaveTime', e)}
              />
            </td>
            <td>本次请假起止时间</td>
            <td>
              <Input 
                value={militaryPager.lastLeaveTime} 
                onChange={(e) => onChange('lastLeaveTime', e)}
              />
            </td>
          </tr>
          <tr>
            <td>本年度已<br/>休假情况</td>
            <td colSpan={3}>
              <Input 
                value={militaryPager.leaveRange} 
                onChange={(e) => onChange('leaveRange', e)}
              />
            </td>
            <td>请休假天数</td>
            <td>
              <Input 
                value={militaryPager.phone} 
                onChange={(e) => onChange('phone', e)}
              />
            </td>
          </tr>
          <tr>
            <td>交通工具</td>
            <td>
              <Input 
                value={militaryPager.transportation} 
                onChange={(e) => onChange('transportation', e)}
              />
            </td>
            <td>联系电话</td>
            <td>
              <Input 
                value={militaryPager.route} 
                onChange={(e) => onChange('route', e)}
              />
            </td>
            <td>紧急联络<br/>人及电话</td>
            <td>
              <Input 
                value={militaryPager.route} 
                onChange={(e) => onChange('route', e)}
              />
            </td>
          </tr>
          <tr>
            <td>行动路线</td>
            <td colSpan={5}>
              <div className="flex-wrap">
                <span>贵阳市至</span>
                <Input 
                  size="small"
                  className="flex-1"
                  value={militaryPager.familyName} 
                  onChange={(e) => onChange('familyName', e)}
                />
                <span>省</span>
                <Input 
                  size="small"
                  className="flex-1"
                  value={militaryPager.familyName} 
                  onChange={(e) => onChange('familyName', e)}
                />
                <span>市（县）</span>
                <Input 
                  size="small"
                  className="flex-1"
                  value={militaryPager.familyName} 
                  onChange={(e) => onChange('familyName', e)}
                />
                <span>区（乡镇）</span>
              </div>
              <div className="flex-wrap">
              <span>途径地点（途中下车、转站地点）：</span>
                <Input 
                  size="small"
                  className="flex-1 align-left"
                  value={militaryPager.familyName} 
                  onChange={(e) => onChange('familyName', e)}
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
                value={militaryPager.otherName}
                onChange={(e) => onChange('otherName', e)}
              ></Input.TextArea>
            </td>
          </tr>
          <tr>
            <td>科室（部门）意见</td>
            <td colSpan={5}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={militaryPager.otherName}
                onChange={(e) => onChange('otherName', e)}
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
            <td>分队长意见<br/>（仅士兵填写）</td>
            <td colSpan={5}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={militaryPager.otherName}
                onChange={(e) => onChange('otherName', e)}
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
                value={militaryPager.bbbb}
                onChange={(e) => onChange('bbbb', e)}
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
              <Input.TextArea
                className="align-left"
                rows={3}
                value={militaryPager.aaaa}
                onChange={(e) => onChange('aaaa', e)}
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
          </tr>
          <tr>
            <td>政治工作处<br/>审批意见</td>
            <td colSpan={5}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={militaryPager.otherName}
                onChange={(e) => onChange('otherName', e)}
              ></Input.TextArea>
            </td>
          </tr>
          <tr>
            <td>院首长审批<br/>意  见</td>
            <td colSpan={5}>
              <Input.TextArea
                className="align-left"
                rows={3}
                value={militaryPager.otherName}
                onChange={(e) => onChange('otherName', e)}
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
          </tr>
          <tr>
            <td>★销假时间</td>
            <td colSpan={5}>
              <Input
                className="align-left"
                value={militaryPager.otherName}
                onChange={(e) => onChange('otherName', e)}
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