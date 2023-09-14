import { Obj } from "src/libs/types";
import {createArr} from "src/utils/array/array";
import {createObjV} from "src/utils/object/object";
import MonthlyWork from "src/modules/nurseHandBookNew/views/detail-jew/components/MonthlyWork";
const arr2 = Array.from(Array(12), (j,k) => k)
/**提个不同表单的初始化操作 */
export default {
  '925NDGZJH_2': {
    initContent() {
      const self: any = this;
      self.handleEditorChange({
        v1: "",
      });
    },
    editTitle: true
  },
  '925NDXLJH_2': {
    initContent() {
      const self: any = this;
      self.handleEditorChange({
        v1: "",
      });
    },
    editTitle: true
  },

  '925BNGZZJ_6': {
    initContent() {
      const self: any = this;
      self.handleEditorChange({
        v1: "",
      });
    },
    editTitle: true
  },

  GSYHZSC_5: {
    initContent() {
      const self: any = this;
      self.handleEditorChange({
        v1: "",
        v2: "",
        v3: "",
        v4: "",
      });
    },
    editTime: true,
  },
  GSYHZSC_6: {
    initContent() {
      const self: any = this;
      self.handleEditorChange({
        v1: "",
        v2: "",
        v3: "",
        v4: "",
        v5: "",
        v6:'',
      });
    },
    editTime: true,
  },
  "925HLLWDJ_9_1": {
    initContent(row = 26, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925JSGXDJ_9_2": {
    initContent(row = 26, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925JSGXDJ_9_3": {
    initContent(row = 26, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925WCXXJXDJ_9_4": {
    initContent(row = 26, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925JSJXJXDJ_9_5": {
    initContent(row = 26, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925HLRYJDDJ_9_6": {
    initContent(row = 26, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925HRHSDJ_9_7": {
    initContent(row = 26, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925NDXLJH_3": {
    initContent(row = 24, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925JDGZJH_4": {
    initContent(row = 28, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  "925GZJHJZZD_5": {
    initContent(row = 27, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
};
/**
 * 使用tableCon的表单配置
 * isAdd 是否存在添加一页按钮
 * rows: 一页所需行数
 * tip: 备注
 * titleType: 标题类型
 */
export const tableConConfig = {
  '925GZJHJZZD_5': {
    columns: [
      {
        title: "",
        width: "4%",
        // component: "DataPicker",
      },
      {
        title: "重点工作",
        width: "50%",
        // component: "DataPicker",
      },
      {
        title: "责任人",
        width: "15%",
      },
      {
        title: "完成",
        width: "15%",
      },
      {
        title: "备注",
      },
    ],
    columnsMonth:[
      {
        title: "",
        width: "4%",
      },
      {
        title: "",
        width: "96%",
      },
    ],
    columnsRemark:[
      {
        title: "",
        width: "4%",
      },
      {
        title: "",
        width: "96%",
      },
    ],
    rows: 27,
    titleType: "title",
    tip: ``
  },
  '925NDXLJH_3':{
    columns: [
  // {
  //   title: "时间",
  //   width: "8%",
  //   // component: "DataPicker",
  // },
  {
    title: "制度培训计划",
    width: "15%",
  },
  {
    title: "理论学习计划",
    width: "15%",
  },
  {
    title: "负责人",
    width: "12%",
   component: "Dead",
  },
  {
    title: "护理疑难病例讨论",
    width: "25%",
  },
  {
    title: "护理教学查房",
    width: "15%",
  },
  {
        title: "负责人",
        width: "12%",
    component: "Dead",
 },
],
    operationColumns:[
      {
        title: "时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "操作项目",
        width: "15%",
      },
      {
        title: "负责人",
        width: "12%",
        component: "Dead",
      },
      {
        title: "时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "操作项目",
        width: "15%",
      },
      {
        title: "负责人",
        width: "12%",
        component: "Dead",
      },
    ],
    otherColumns:[ {
      title: "时间",
      width: "15%",
      component: "DataPicker",
    }, {
      title: "内容",
      width: "32%",
    }, {
      title: "负责人",
      width: "12%",
      component: "Dead",
    }, {
      title: "内容",
      width: "32%",
    }, {
      title: "负责人",
      width: "12%",
      component: "Dead",
    },],
    isAdd: true,
    rows: 12,
    titleType: "title",
  },
  '925JDGZJH_4':{
    columns: [
      {
        title: "季度工作计划",
        width: "10%",
      },
      {
        title: "内容",
        width: "50%",
      },
      {
        title: "完成",
        width: "15%",
      },
      {
        title: "备注",
        width: "15%",
      },
    ],
    rows: 27,
    titleType: "title",
    tip: ``
  },
  "925HLLWDJ_9_1": {
    columns: [
      {
        title: "日期",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "作 者",
        width: "15%",
      },
      {
        title: "题   目",
        width: "15%",
      },
      {
        title: "发表杂志名称",
        width: "20%",
      },
      {
        title: "期刊号",
      },
      {
        title: "会议名称",
        width: "10%",
      },
    ],
    titleType:true,
    isAdd: true,
    rows: 20,
  },
  '925JSGXDJ_9_2': {
    columns: [
      {
        title: "日期",
        width: "10%",
        component: "DataPicker",
      },
      {
        title: "项目名称",
        width: "15%",
      },
      {
        title: "负责人",
        width:'12%',
        component: "Dead",
      },
      {
        title: "职务",
      },
      {
        title: "进展与效果",
        width: "15%",
      },
    ],
    isAdd: true,
    rows: 20,
  },
  "925JSGXDJ_9_3": {
    columns: [
      // {
      //   title: "序号",
      //   width: "15%",
      // },
      {
        title: "日期",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "项目名称",
        width: "15%",
        // component: "DataPicker",
      },
      {
        title: "协助单位",
        width: "25%",
      },
      {
        title:"获奖等级",
        width: "15%"
      },
      {
        title:"获奖人",
        width: "15%"
      },
    ],
    isAdd: true,
    rows: 20,
  },
  "925WCXXJXDJ_9_4": {
    columns: [
      {
        title: "姓名",
        width: "15%",
      },
      {
        title: "进修及参观学习单位",
        width: "40%",
        // component: "DataPicker",
      },
      {
        title: "离院时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "返院时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title:"总天数",
        width: "15%"
      },
    ],
    isAdd: true,
    rows: 20,
  },
  "925JSJXJXDJ_9_5": {
    columns: [
      // {
      //   title: "序号",
      //   width: "10%",
      // },
      {
        title: "姓名",
        width: "10%",
      },
      {
        title: "职 务",
        width: "10%",
        // component: "DataPicker",
      },
      {
        title: "单   位",
        width: "25%",
        // component: "DataPicker",
      },
      {
        title: "来院时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "离院时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title:"总天数",
        width: "15%"
      },
    ],
    isAdd: true,
    rows: 20,
  },
  "925HLRYJDDJ_9_6": {
    columns: [
      {
        title: "嘉奖",
        width: "15%",
      },
      {
        title: "立功",
        width: "10%",
      },
      {
        title: "荣誉称号",
        width: "10%",
        // component: "DataPicker",
      },
      {
        title: "其他",
        width: "30%",
      },
    ],
    isAdd: true,
    rows: 20,
  },
  "925HRHSDJ_9_7": {
    columns: [
      {
        title: "日期",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "姓名",
        width: "8%",
      },
      {
        title: "内容摘要",
        width: "16%",
        // component: "DataPicker",
      },
      {
        title: "满意度调查反馈",
        width: "16%",
        // component: "DataPicker",
      },
      {
        title: "口头表扬",
        width: "6%",
        // component: "DataPicker",
      },
      {
        title: "意见本",
        width: "10%",
        // component: "DataPicker",
      },
      {
        title:"报刊媒体报道",
        width: "10%"
      },
      {
        title:"表扬",
        width: "6%"
      },
      {
        title:"锦旗",
        width: "6%"
      },
      {
        title:"匾",
        width: "6%"
      },
    ],
    isAdd: true,
    rows: 20,
  }
};
export const dateFormat = "YYYY-MM-DD HH:mm";
export const dateFormat1 = "YYYY年MM月DD日 星期d HH:mm";
export const dateFormat2 = "YYYY年MM月DD日";
export const dateFormat3 = "YYYY-MM-DD";