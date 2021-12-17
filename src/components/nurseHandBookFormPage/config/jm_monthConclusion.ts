/**
 * 江门妇幼-月工作总结
 */

const tBody: any = [
  { key: 'one', name:'one', value: "", width: 120, style:{minHeight: "200px"} },
  { key: 'summary', name:'月工作总结', value: "", width: 580, style:{minHeight: "200px",textAlign:"left"} },
]

const leftHead: any = [
  { name:'月工作总结', width: 100, height:200 },
  { name:'本月工作亮点', width: 100, height:200 },
  { name:'下月改进重点', width: 100, height:200 },
]

const sign = {
  signName:{key:'signName', value:'', preName:"记录人"},
  signTime:{key:'signTime', value:'', preName:"记录时间"}
}
export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [3],
  tableTitle: { value: "月工作总结", width: 700 },
  tBody:[tBody],
  leftHead:[leftHead],
  sign: sign,
}