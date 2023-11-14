import { SelectItem } from "src/libs/types";

/**
 * 925
 * 状态列表
 * -1被驳回、0待提交、1待审核、2已完成 */
export const STATUS_LIST: SelectItem[] = [
  {
    label: '全部',
    value: '',
  },
  {
    label: "待提交",
    value: 0,
    color: "#26109f",
  },
  {
    label: "待审核",
    value: 1,
    color: "#98241b",
  },
  {
    label: "已完成",
    value: 2,
    color: "#86c2a0",
  },
  {
    label: "已驳回",
    value: -1,
    color: "#9c5d25",
  },
];
/** 记录表  **/
export  const FORM_MENU_CODE={
  '住院病人数逐日登记表':1,
  '出院病人数逐日登记表':2,
  '特级病人数逐日登记表':3,
  '病危病人数逐日登记表':4,
  '一级护理人数逐日登记表':5,
  '二级护理人数逐日登记表':6,
}
/**记录表数据   字段**/
export const FORM_CODE_VALUE={
  '925ZYCYDJ_7_1':'inHospital',
  '925CYCYDJ_7_2':'outHospital',
  '925TJBRDJ_3':'specialClass',
  '925BWBRDJ_4':'critical',
  '925YJHLRSDJ_5':'firstClass',
  '925EJHLRSDJ_6':'secondClass'

}
/**年度**/
export  const HALF_YEAR ={
  '全年':2,
  '上半年':0,
  '下半年':1
}
export  const QuarterV ={1:'第一',2:'第二',3:'第三',4:'第四'}
/**925 护士长手册封面**/
export  const jewCoverArr =[
  {type:1,url:"./assets/护士长手册封面1.jpg",name:"护士长手册封面1"},
  {type:2,url:"./assets/护士长手册封面2.jpg",name:"护士长手册封面2"},
  {type:3,url:"./assets/护士长手册封面3.jpg",name:"护士长手册封面3"},
  {type:4,url:"./assets/护士长手册封面4.jpg",name:"护士长手册封面4"},
  {type:5,url:"./assets/护士长手册封面5.jpg",name:"护士长手册封面5"},
  {type:6,url:"./assets/护士长手册封面6.jpg",name:"护士长手册封面6"},
  {type:7,url:"./assets/护士长手册封面7.jpg",name:"护士长手册封面7"},
  {type:8,url:"./assets/护士长手册封面8.jpg",name:"护士长手册封面8"},
]
/**湛江海军封面**/
export  const zjhjCoverArr =[
  {type:9,url:"./assets/zjhj-1.png",name:"护士长手册封面"},
]