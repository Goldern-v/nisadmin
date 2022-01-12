/**
 * 聊城二院-病区半年工作总结
 */
import moment from "moment";
import { authStore } from 'src/stores'
let user: any = authStore.user || {};

const tBody: any = [
  { key: 'conclusion', name: '年工作总结', value: "", width: 800, style:{ textAlign: "left" } },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${user.deptName}${Number(moment().format('M')) <= 6  ? '上':'下'}半年工作总结`, width: 800 },
  tBody:[tBody],
}