/**
 * 聊城二院-病区月工作总结
 */
import moment from "moment";
import { authStore } from 'src/stores'
let user: any = authStore.user || {};

const tBody: any = [
  { key: 'conclusion', name: '月工作总结', value: "", width: 800, style:{ textAlign: "left" } },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${moment().format('MM')}月${user.deptName}月工作总结`, width: 800 },
  tBody:[tBody],
}