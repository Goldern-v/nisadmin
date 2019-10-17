import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Input, Checkbox } from 'antd'
// import { appStore } from 'src/stores'
import { qualityControlRecordEditModel as qcModel, Emp, BedNurse } from './../model/QualityControlRecordEditModel'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import QcItemGroup from './QcItemGroup'

const Option = Select.Option

export interface Props { }

export default observer(function FormPannel() {
  const {
    itemGroupList,
    master,
    masterErrObj,
    userList,
    deptlist,
    bedNurseList,
    writeMoreNurse,
    selectedBedNurse,
    causeList
  } = qcModel

  const handleUserListChange = (empNo: any) => {
    let target = userList.find((item: Emp) => item.empNo == empNo)

    if (target) qcModel.setMaster({
      ...master, userList: [{
        empNo: empNo,
        empName: target.empName
      }]
    })
  }

  const handleWarCodeChange = (wardCode: string) => {
    qcModel.setMaster({ ...master, wardCode, bedNurseList: [] })

    qcModel.getBedNurseList()
  }

  const handleBedNurseListChange = (empNameGroup: any) => {
    let newBedNurseList: BedNurse[] = []

    if (!writeMoreNurse) {
      //不允许多选
      let newItem: BedNurse = { empName: "" }

      if (empNameGroup.length > 0) newItem.empName = empNameGroup[empNameGroup.length - 1]

      let target = bedNurseList.find((item: BedNurse) => item.empName == newItem.empName)

      if (target) newItem = target

      newBedNurseList = [newItem]
    } else {
      for (let i = 0; i < empNameGroup.length; i++) {
        let empName = empNameGroup[i]
        let newItem: BedNurse = { empName }
        let target = bedNurseList.find((item: BedNurse) => item.empName == empName)
        if (target) newItem = target

        newBedNurseList.push(newItem)
      }
    }

    qcModel.setMaster({ ...master, bedNurseList: newBedNurseList })
  }

  const checkClass = (key: string) => {
    let classList = ['content']

    if (masterErrObj[key]) classList.push('error')

    return classList.join(' ')
  }

  return <Wrapper>
    <div className="master-area" id="masterArea">
      <div className="item">
        <div className="label">质控日期:</div>
        <div className={checkClass('evalDate')}>
          <DatePicker
            allowClear={false}
            format="YYYY-MM-DD HH:mm"
            value={master.evalDate ? moment(master.evalDate) : undefined}
            onChange={(date) => {
              qcModel.setMasterErrObj('evalDate', false)
              qcModel.setMaster({ ...master, evalDate: date.format('YYYY-MM-DD HH:mm') })
            }} />
        </div>
      </div>
      <div className="item">
        <div className="label">质控人:</div>
        <div className={checkClass('userList')}>
          <Select
            showSearch
            placeholder="请选择质控人"
            onChange={(val: any) => {
              qcModel.setMasterErrObj('userList', false)
              handleUserListChange(val)
            }}
            value={(master.userList[0] && master.userList[0].empNo) || undefined}
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {userList.map((item: any, idx: number) => <Option key={idx} value={item.empNo}>{item.empName}</Option>)}
          </Select>
        </div>
      </div>
      <div className="item">
        <div className="label">质控病区:</div>
        <div className={checkClass('wardCode')}>
          <Select
            placeholder="请选择质控病区"
            showSearch
            onChange={(val: any) => {
              qcModel.setMasterErrObj('wardCode', false)
              handleWarCodeChange(val)
            }}
            value={master.wardCode || undefined}
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {deptlist.map((item: any, idx: number) => <Option key={idx} value={item.code}>{item.name}</Option>)}
          </Select>
        </div>
      </div>
      <div className="item">
        <div className="label">管床护士:</div>
        <div className={checkClass('bedNurseList')}>
          <Select
            mode="tags"
            placeholder="请输入管床护士"
            value={selectedBedNurse}
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(val: any) => {
              qcModel.setMasterErrObj('bedNurseList', false)
              handleBedNurseListChange(val)
            }}>
            {bedNurseList.map((item: any, idx: number) => <Option key={idx} value={item.empName}>{item.empName}</Option>)}
          </Select>
        </div>
      </div>
      <div className="item">
        <div className="label">床号:</div>
        <div className={checkClass('bedLabel')}>
          <Input
            placeholder="请输入床号"
            value={master.bedLabel}
            onChange={(e: any) => {
              qcModel.setMasterErrObj('bedLabel', false)
              qcModel.setMaster({ ...master, bedLabel: e.target.value })
            }} />
        </div>
      </div>
      <div className="item">
        <div className="label">住院号:</div>
        <div className={checkClass('inpNo')}>
          <Input
            placeholder="请输入住院号"
            value={master.inpNo}
            onChange={(e: any) => {
              qcModel.setMasterErrObj('inpNo', false)
              qcModel.setMaster({ ...master, inpNo: e.target.value })
            }} />
        </div>
      </div>
    </div>
    <QuestionCon>
      {itemGroupList.map((itemGroup: any, groupIdx: number) =>
        <QcItemGroup
          itemGroup={itemGroup}
          index={groupIdx}
          key={groupIdx} />
      )}
    </QuestionCon>
    {causeList.length > 0 &&
      <ReasonCon>
        <div className="title">问题可能原因</div>
        {causeList.map((item: any, idx: any) =>
          <Checkbox
            key={idx}
            onChange={(e: any) => qcModel.setCauseListChecked(idx, e.target.checked)}
            checked={item.checked}>
            {item.causeContent}
          </Checkbox>)}
      </ReasonCon>}
  </Wrapper>
})
const ReasonCon = styled.div`
  font-size: 12px;
  padding-bottom: 20px;
  .title{
    margin: 5px 0 0;
    height: 30px;
    line-height: 30px;
  }
`

const Wrapper = styled.div`
  .master-area{
    margin-top: 10px;
    min-height: 138px;
    line-height: 24px;
    padding: 10px 20px;
    background-color: #f2f2f2;
    font-size: 14px;
    .item{
      width: 50%;
      margin: 5px 0;
      display: inline-block;
      &>div{
        display: inline-block;
      }
      .label{
        width: 90px;

      }
      .content{
        width: 200px;
        &>*{
          width:100%;
        }
        &.error{
          input,.ant-select-selection{
            border-color: red;
          }
          .ant-input:focus,.ant-select-open .ant-select-selection{
            border-right-width: 1px !important;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(255, 166, 128, 0.2);
          }

        }
      }
    }
  }
`

const QuestionCon = styled.div`
  margin-top: 10px;
  /* flex: 1;
  height: 0; */
  font-size: 12px;
  padding-bottom: 10px;
`