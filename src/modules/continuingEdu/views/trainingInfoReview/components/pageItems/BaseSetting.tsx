import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseInfo from 'src/modules/nurseFiles/view/nurseFiles-hj/views/exportNurseFile/page/BaseInfo'
export interface Props {
  labelWidth?: number,
  info: any
}

export default function BaseSetting(props: Props) {
  const { labelWidth, info } = props
  const _labelWidth = labelWidth ? `${labelWidth}px` : '92px'

  const creditInfo = () => {
    let credit = info.credit || info.studentCredit || ''
    let creditType = info.creditType || info.studentCreditType || ''
    let classHours = info.classHours || info.studentClassHours || ''
    let baseCredit = <React.Fragment>
      <div className="row">
        <div className="label" style={{ width: _labelWidth }}>学 分：</div>
        <div className="content">{creditType} {credit}</div>
      </div>
      <div className="row">
        <div className="label" style={{ width: _labelWidth }}>学 时：</div>
        <div className="content">{classHours}</div>
      </div>
    </React.Fragment>

    // console.log(JSON.parse(JSON.stringify(info)))

    if (info.teachingMethod == 2)
      return <React.Fragment>
        <div className="row">
          <div className="label" style={{ width: _labelWidth }}>讲 师：</div>
          <div className="content">
            {(info.teacherList || []).map((teacher: any) =>
              `${teacher.deptName}/${teacher.empName}`).join(', ')}
          </div>
        </div>
        <div className="row">
          <div className="label" style={{ width: _labelWidth }}>学员学分：</div>
          <div className="content">{creditType} {credit}</div>
        </div>
        <div className="row">
          <div className="label" style={{ width: _labelWidth }}>讲师学分：</div>
          <div className="content">{info.teacherCreditType} {info.teacherCredit}</div>
        </div>
        <div className="row">
          <div className="label" style={{ width: _labelWidth }}>学员学时：</div>
          <div className="content">{classHours}</div>
        </div>
        <div className="row">
          <div className="label" style={{ width: _labelWidth }}>讲师学时：</div>
          <div className="content">{info.teacherClassHours}</div>
        </div>
      </React.Fragment>
    else
      return baseCredit
  }

  const ratersInfo = () => {
    switch (info.teachingMethodName) {
      case '考试':
      case '实操':
        return <div className="row">
          <div className="label" style={{ width: _labelWidth }}>评分负责人：</div>
          <div className="content">{
            !!(info.scorePersonList || []).length ?
              `需要（${(info.scorePersonList || [])
                .map((item: any) =>
                  `${item.deptName}/${item.empName}`)
                .join(', ')}）` :
              '不需要'
          }</div>
        </div>
      default:
        return <span></span>
    }
  }

  const signerInfo = () => {
    if ((info.organizationWayName || info.organizationWay) == '线下')
      return <React.Fragment>
        <div className="row">
          <div className="label" style={{ width: _labelWidth }}>签到负责人：</div>
          <div className="content">{
            (info.sicPersonList || [])
              .map((signer: any) =>
                `${signer.deptName}/${signer.empName}`)
              .join(', ')
          }</div>
        </div>
        <div className="row">
          <div className="label" style={{ width: _labelWidth }}>签到方式：</div>
          <div className="content">二维码</div>
        </div>
      </React.Fragment>
    else
      return <span></span>
  }

  return <Wrapper>
    <div className="content-item-title">基本设置</div>
    <div className="row">
      <div
        className="label"
        style={{ width: _labelWidth }}>
        {info.teachingMethodName}开始时间：
      </div>
      <div className="content">{info.startTime}</div>
    </div>
    <div className="row">
      <div
        className="label"
        style={{ width: _labelWidth }}>
        {info.teachingMethodName}开放时间：
      </div>
      <div className="content">{info.openTime}  （即{info.endTime}结束）</div>
    </div>
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>教学类型：</div>
      <div className="content">
        {info.teachingTypeName} ({info.teachingMethodName})
      </div>
    </div>
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>组织方式：</div>
      <div className="content">{info.organizationWayName || info.organizationWay}</div>
    </div>
    {/* 类型对应地址 */}
    {info.address &&
      <div className="row">
        <div
          className="label"
          style={{ width: _labelWidth }}>
          {info.teachingMethodName}地址：
      </div>
        <div className="content">{info.address}</div>
      </div>}
    {/* 签到负责人 */}
    {signerInfo()}
    {/* 评分负责人 */}
    {ratersInfo()}
    {/* 根据对应的类型和组织方式显示学分 */}
    {creditInfo()}
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>必修/选修：</div>
      <div className="content">{info.necessaryDesc ? info.necessaryDesc.join(',') : ""}</div>
    </div>
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>通知设置：</div>
      <div className="content">{info.noticeSetting}</div>
    </div>
    <div className="row">
      <div className="label" style={{ width: _labelWidth }}>通知详情：</div>
      <div className="content">{info.noticeContent}</div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  .row{
    margin-bottom: 5px;
    width: 100%;
    font-size: 13px;
    overflow: hidden;
    .label{
      float: left;
      text-align: right;
    }
    .content{
      overflow: hidden;
      padding-right: 50px;
    }
  }
`