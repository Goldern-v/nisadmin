/**
 * 江门妇幼-科室护理人员月度动态出勤表
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { formPageService } from '../../api/FormPageService'
import { datePicker } from "../../function/click";
let user: any = authStore.user || {};
let dutyList: any = []

formPageService.getUsers(user.deptCode).then(res => {
  res.data.map((item:any)=>{
    dutyList.push(item.name)
  })
})
const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "姓名", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "出勤", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "病假", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "事假", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "产假", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "计生假", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "其他", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "异动", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 100 },
  { key: "name", name: "姓名", value: "", width: 100, select: dutyList },
  { key: "attendance", name: "出勤", value: "", width: 100 },
  { key: "sickLeave", name: "病假", value: "", width: 100 },
  { key: "privateAffairLeave", name: "事假", value: "", width: 100 },
  { key: "maternityLeave", name: "产假", value: "", width: 100 },
  { key: "familyPlanningLeave", name: "计生假", value: "", width: 100 },
  { key: "other", name: "其他", value: "", width: 100 },
  { key: "move", name: "异动", value: "", width: 100 },
]

const computeRow: any = [
  { key: 'serialNumber', name:'序号', value: "", width: 100, hidden:true },
  { key: 'name', name:'合计数据', value: "合计数据", width: 199 },
  { key: 'calculation_attendance', name:'出勤', value: "", width: 100 },
  { key: 'calculation_sickLeave', name:'病假', value: "", width: 100 },
  { key: 'calculation_privateAffairLeave', name:'事假', value: "", width: 100 },
  { key: 'calculation_maternityLeave', name:'产假', value: "", width: 100 },
  { key: 'calculation_familyPlanningLeave', name:'计生假', value: "", width: 100 },
  { key: 'calculation_other', name:'其他', value: "", width: 100 },
  { key: 'move', name:'异动', value: "", width: 100 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `科室护理人员动态及考勤情况${moment().format('YYYY')}年${moment().format('MM')}月`, width: 892 },
  computeRow: [computeRow],//计算列
  tBody: [tBody],
  tHead: [tHead],
}