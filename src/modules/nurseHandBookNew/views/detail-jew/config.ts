import { Obj } from "src/libs/types";
import {createArr} from "src/utils/array/array";
import {createObjV} from "src/utils/object/object";
import MonthlyWork from "src/modules/nurseHandBookNew/views/detail-jew/components/MonthlyWork";
const arr2 = Array.from(Array(12), (j,k) => k)
/**提个不同表单的初始化操作 */
export default {
  '925NDXLJH_3': {
    initContent() {
      const self: any = this;
      self.handleEditorChange({
        v1: "",
      });
    },
    editTitle: true
  },
  GSYHZSC_2: {
    initContent() {
      const self: any = this;
      const arr = arr2.map((v, i) => {
        const obj: Obj = {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
        };
        return i % 4 === 0 ? { ...obj, title: ""} : obj;
      });
      self.handleEditorChange(arr);
    },
    
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
  GSYHZSC_4: {
    initContent() {
      const self: any = this;
      self.handleEditorChange({
        v1: "",
        v2: "",
        v3: "",
        v4: "",
        v5: "",
      });
    },
    editTime: true,
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
  "925GZJHJZZD_5": {
    initContent(row = 27, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
    // Component: MonthlyWork,
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
  LYHZSC_5_2: {
    columns: [
      {
        title: "时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "技能项目",
      },
      {
        title: "示教者",
        width: "15%",
      },
      {
        title: "培训对象",
        width: "15%",
      },
      {
        title: "落实时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "备注",
      },
    ],
    isAdd: true,
    rows: 20,
    titleType: "title",
    tip: `备注：1、此表用于登记科室全年全员及各层级护士技能培训安排等。
    2、“培训对象”栏填写“全员”或哪一层级护士。
    3、“落实时间”栏填写本次技能培训实际完成时间。
    4、“各注，栏主要用于培训技能项目、时间或示教者等有调整时，记录调整原因及情况。`,
  },
  LYHZSC_6_1: {
    columns: [
      {
        title: "时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "地点",
        width: "15%",
      },
      {
        title: "主查人",
        width: "15%",
      },
      {
        title: "患者姓名",
        width: "15%",
      },
      {
        title: "住院号",
        width: "15%",
      },
      {
        title: "诊断",
      },
      {
        title: "参加人数",
        width: "10%",
      },
    ],
    isAdd: true,
    rows: 20,
  },
  LYHZSC_6_2: {
    columns: [
      {
        title: "姓名",
        width: "15%",
      },
      {
        title: "日期",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "层级",
        width: "10%",
      },
      {
        title: "理论考核内容",
      },
      {
        title: "技能考核内容",
      },
      {
        title: "成绩",
        width: "10%",
      },
    ],
    isAdd: true,
    rows: 20,
  },
  LYHZSC_6_3: {
    columns: [
      {
        title: "姓名",
        width: "15%",
      },
      {
        title: "培养项目",
      },
      {
        title: "培养时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "培养地点",
        width: "20%",
      },
    ],
    isAdd: true,
    rows: 20,
    tip:
        "备注：此表主要填写护士参加院内培训、轮转、外出学习、进修、参观等情况，以及获得的荣誉等",
  },
  LYHZSC_6_4: {
    columns: [
      {
        title: "时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "作者",
        width: "15%",
      },
      {
        title: "题目",
        width: "50%",
      },
      {
        title: "发表情况",
        width: "20%",
      },
    ],
    isAdd: true,
    rows: 20,
  },
  LYHZSC_6_8: {
    columns: [
      {
        title: "时间",
        width: "20%",
        component: "DataPicker",
      },
      {
        title: "地点",
      },
      {
        title: "主讲人",
        width: "15%",
      },
      {
        title: "题目",
      },
      {
        title: "参加人数",
        width: "15%",
      },
    ],
    isAdd: false,
    rows: 20,
  },
};
export const dateFormat = "YYYY-MM-DD HH:mm";
export const dateFormat1 = "YYYY年MM月DD日 星期d HH:mm";
export const dateFormat2 = "YYYY年MM月DD日";
export const dateFormat3 = "YYYY-MM-DD";