import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { DatePicker, Select, Input, Checkbox, message } from 'antd'
import { authStore, appStore } from 'src/stores'
import { qualityControlRecordEditModel as qcModel, BedNurse, IAudit, ICode, INodeAppoint } from './../model/QualityControlRecordEditModel'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import QcItemGroup from './QcItemGroup'
import { qualityControlRecordApi,IAppointUserCode } from './../../api/QualityControlRecordApi'

const Option = Select.Option

export interface Props { }

export default observer(function FormPannel() {
  const { queryObj } = appStore
  const qcCode = queryObj.qcCode
  //匹配展示对应编辑模块的code
  //默认医院ID
  let qcMatchCode = appStore.HOSPITAL_ID as string

  const {
    itemGroupList,
    master,
    masterErrObj,
    userList,
    deptlist,
    bedNurseList,
    writeMoreNurse,
    selectedBedNurse,
    causeList,
    auditList,
    baseInfo,
    nodeAppointList,
  } = qcModel


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

      if (newItem.empName) newBedNurseList = [newItem]
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

  //获取下拉数据
  const getAuditList = (item: IAudit) => {
    // qualityControlRecordApi.getListByAppointUserCode(baseInfo.qcCode, master.wardCode, item.appointUserCode).then(res => {
      let params:IAppointUserCode={
        qcCode:baseInfo.qcCode,
        appointUserCode:item.appointUserCode,
      };
      appStore.hisMatch({
        map: {
          gzsrm: params={},
          other: params={
            qcCode:baseInfo.qcCode, 
            wardCode:master.wardCode, 
            appointUserCode:item.appointUserCode
          },
        }
      }),
      qualityControlRecordApi.getListByAppointUserCode(params).then(res => {
      console.log(res);
      if(res?.data && res?.data.length>0){
        //设置auditList
        qcModel.setAuditList(auditList.map((itemModel:IAudit)=>{
          if(itemModel.appointUserCode===item.appointUserCode){
            itemModel.codeList=res.data;
          }
          return itemModel;
        }))
      }
      
      //(res?.data) && (setCodeList(res?.data));
    }).catch(error => {
      console.log(error)
      message.error(error)
    })
  }

  /**
   * 更新nodeAppointList
   * @param item 
   * @param value 
   */

  const setAuditSelect = (item: IAudit, value: string, codeList: Array<ICode>) => {
    let newNodeAppointList = nodeAppointList.map((itemNodeAppoint: INodeAppoint) => {
      let newItemNodeAppoint = { ...itemNodeAppoint };
      if (newItemNodeAppoint.appointUserCode === item.appointUserCode) {
        let codeItem = codeList.find(findItem => findItem.code == value);
        (codeItem) && (newItemNodeAppoint.userList = [{ empNo: codeItem.code, empName: codeItem.name }])

      }
      return newItemNodeAppoint

    })
    qcModel.setNodeAppointList(newNodeAppointList)

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
        <div className="label">总项数:</div>
        <Input className="content" disabled value={ qcModel.yxGradeObj.total }/>
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
        <div className="label">合格项数:</div>
        <Input className="content" disabled value={ qcModel.yxGradeObj.right }/>
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
        <div className="label">合格率:</div>
        <Input className="content" disabled value={ qcModel.yxGradeObj.rate + '%' }/>
      </div>
      {
        baseInfo.isPatientNumber !== '否' &&
        <div className="item">
          <div className="label">病案号:</div>
          <div className={checkClass('inpNo')}>
            <Input
              placeholder="请输入病案号"
              value={master.inpNo}
              onChange={(e: any) => {
                qcModel.setMasterErrObj('inpNo', false)
                qcModel.setMaster({ ...master, inpNo: e.target.value })
              }} />
          </div>
        </div>
      }

      <div className="item">
        <div className="label">得分:</div>
        <Input className="content" disabled value={ qcModel.yxGradeObj.totalScore - qcModel.yxGradeObj.deductScore }/>
      </div>
      <div className="item">
        <div className="label">检查人:</div>
        <div className={checkClass('bedNurseList')}>
          <Select
            mode="tags"
            placeholder="请输入检查人"
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
      
    </div>
    <QuestionCon>
      {itemGroupList.map((itemGroup: any, groupIdx: number) =>
        <QcItemGroup
          itemGroup={itemGroup}
          baseInfo={baseInfo}
          index={groupIdx}
          key={groupIdx} />
      )}
    </QuestionCon>
    
  </Wrapper >
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

const AuditList = styled.div`
    position: relative;
    font-size: 12px;
    /* border-bottom: 0.5px dashed #bbbbbb; */
    padding-bottom: 10px;
    .auditListTitle{
      position: relative;
      font-size: 14px;
      font-weight: bold;
      padding-top: 5px;
    }
    .list{
      list-style: none;
      margin: 0;
      padding: 0;
      .auditItem{
        list-style: none;
        margin: 0;
        padding: 0;
        position: relative;
        display: flex;
        -webkit-display: flex;
        -moz-display: flex;
        -ms-display: flex;
        align-items: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        .auditItemName{
          position: relative;
          margin-right: 10px;
        }
        .auditSelectList{
          width: 190px;
        }
      }
    }
`