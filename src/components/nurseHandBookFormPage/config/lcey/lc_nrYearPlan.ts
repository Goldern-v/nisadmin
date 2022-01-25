/**
 * 聊城二院-护理部年度工作计划
 */
import moment from "moment";

const tBody: any = [
  { key: 'launchPlan', name: '年度工作开展计划', value: "", width: 800, style:{ textAlign: "left" } },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年护理部年度工作计划`, width: 800 },
  tBody:[tBody],
}