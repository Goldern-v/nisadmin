/**
 * 江门妇幼-月工作总结
 */

const tBody1: any = [
  { key: 'one', name: '月工作总结', value: "月工作总结", width: 120, style: { minHeight: "200px" } },
  { key: 'summary1', name: '月工作总结', value: "", width: 580, style:{ minHeight: "200px", textAlign: "left" } },
]

const tBody2: any = [
  { key: 'two', name: '本月工作亮点', value: "本月工作亮点", width: 120, style: { minHeight: "200px" } },
  { key: 'summary2', name: '月工作总结', value: "", width: 580, style:{ minHeight: "200px", textAlign: "left" } },
]

const tBody3: any = [
  { key: 'three', name: '下月改进重点', value: "下月改进重点", width: 120, style: { minHeight: "200px" } },
  { key: 'summary3', name: '月工作总结', value: "", width: 580, style:{ minHeight: "200px", textAlign: "left" } },
]

const sign = {
  signName: { key:'signName', value:'', preName: "记录人" },
  signTime: { key:'signTime', value:'', preName: "记录时间" },
}
export default {
  hiddenFixHeader: true,
  defaulLength: [1,1,1],
  tableTitle: { value: "月工作总结", width: 699 },
  tBody: [tBody1,tBody2,tBody3],
  sign: sign,
}