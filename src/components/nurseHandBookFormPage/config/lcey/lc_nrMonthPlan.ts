/**
 * 聊城二院-护理部月工作计划
 */
import moment from "moment";
import React, { useState, useEffect } from 'react'
import { authStore } from 'src/stores'
import { datePicker } from "../../function/click";
import { formPageService } from '../../api/FormPageService'
let user: any = authStore.user || {};
let dutyList: any = []


formPageService.getUsers(user.deptCode).then(res => {
  res.data.map((item:any)=>{
    dutyList.push(item.name)
  })
})

const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "工作计划", colspan: "1", rowspan: "1", style:{ width: 400 } },
    { name: "完成时限", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "责任人", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "备注", colspan: "1", rowspan: "1", style:{ width: 150 } },
   
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "plan", name: "工作计划", value: "", width: 400 },
  { key: "time", name: "完成时限", value: "", width: 100, click: datePicker },
  { key: "nurseList", name: "责任人", value: "", width: 150, select: dutyList, multiple:"/" },
  { key: "remark", name: "备注", value: "", width: 150 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${moment().format('MM')}月护理部月工作计划`, width: 846 },
  tBody: [tBody],
  tHead: [tHead],
}