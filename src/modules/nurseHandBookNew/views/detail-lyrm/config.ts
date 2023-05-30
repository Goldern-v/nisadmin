import { appStore } from "src/stores";
import { createArr } from "src/utils/array/array";
import moment from "moment";

import EditPage from "./components/editPage";
import LYHZSC_1_2 from "./components/LYHZSC_1_2";
import LYHZSC_2_3 from "./components/LYHZSC_2_3";
import LYHZSC_4_1 from "./components/LYHZSC_4/LYHZSC_4_1";
import LYHZSC_4_2 from "./components/LYHZSC_4/LYHZSC_4_2";
import { Obj } from "src/libs/types";
import LYHZSC_4_3 from "./components/LYHZSC_4/LYHZSC_4_3";
import LYHZSC_4_4 from "./components/LYHZSC_4/LYHZSC_4_4";
import LYHZSC_4_5 from "./components/LYHZSC_4/LYHZSC_4_5";
import LYHZSC_4_6 from "./components/LYHZSC_4/LYHZSC_4_6";
import LYHZSC_4_7 from "./components/LYHZSC_4/LYHZSC_4_7";
import { createObjV } from "src/utils/object/object";
import LYHZSC_4_8 from "./components/LYHZSC_4/LYHZSC_4_8";
import LYHZSC_4_9 from "./components/LYHZSC_4/LYHZSC_4_9";
import LYHZSC_4_10 from "./components/LYHZSC_4/LYHZSC_4_10";
import LYHZSC_4_11 from "./components/LYHZSC_4/LYHZSC_4_11";
import LYHZSC_4_12 from "./components/LYHZSC_4/LYHZSC_4_12";
import LYHZSC_6_7 from "./components/LYHZSC_6/LYHZSC_6_7";
import LYHZSC_6_6 from "./components/LYHZSC_6/LYHZSC_6_6";
import LYHZSC_6_5 from "./components/LYHZSC_6/LYHZSC_6_5";
import tableCon from "./components/tableCon";

export const LYHZSC_2_3_NAME = '护理质量检查分析及改进记录'
/**不同表单的初始化操作 */
export default function config(code: string) {
  return appStore.hisMatch({
    map: {
      default: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: "",
          });
        },
        Component: EditPage,
        editTitle: true,
      },
      LYHZSC_1_2: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: "",
            v2: "",
            v3: "",
            v4: "",
          });
        },
        Component: LYHZSC_1_2,
        editTitle: true,
      },
      LYHZSC_2_3: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: "",
            v2: "",
          });
        },
        Component: LYHZSC_2_3,
      },
      LYHZSC_4_1: {
        initContent() {
          const self: any = this;
          const arr = createArr(13, (j, k) =>
            k >= 9 ? { v1: "" } : { v1: "", v2: "", v3: "", v4: "" }
          );
          self.handleEditorChange({
            v1: "",
            v2: arr,
          });
        },
        Component: LYHZSC_4_1,
      },
      LYHZSC_4_2: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: moment().format("M月"),
            v2: "",
            v3: "",
            v4: "",
            v5: "",
            v6: "",
            v7: "",
            v8: "",
            v9: "",
            v10: "",
          });
        },
        Component: LYHZSC_4_2,
        editTitle: true,
      },
      LYHZSC_4_3: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: moment().format("M月"),
            v2: "",
            v3: "",
            v4: "",
            v5: "",
            v6: "",
            v7: "",
            v8: "",
            v9: "",
            v10: "",
            v11: "",
          });
        },
        Component: LYHZSC_4_3,
        editTitle: true,
      },
      LYHZSC_4_4: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: "",
            v2: "",
            v3: "",
            v4: "",
            v5: "",
            v6: "",
            v7: "",
            v8: "",
            v9: "",
            v10: "",
            v11: "",
            v12: "",
            v13: "",
            v14: "",
          });
        },
        Component: LYHZSC_4_4,
      },
      LYHZSC_4_5: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: "",
            v2: "",
            v3: "",
            v4: "",
            v5: "",
            v6: "",
            v7: "",
            v8: "",
            v9: "",
            v10: "",
            v11: "",
            v12: "",
          });
        },
        Component: LYHZSC_4_5,
      },
      LYHZSC_4_6: {
        initContent() {
          const self: any = this;
          const arr = createArr(14, (j, k) => ({ v1: "", v2: "", v3: "" }));
          self.handleEditorChange({
            list: arr,
            v1: "",
          });
        },
        Component: LYHZSC_4_6,
      },
      LYHZSC_4_7: {
        initContent() {
          const self: any = this;
          self.handleEditorChange(createObjV(6));
        },
        Component: LYHZSC_4_7,
      },
      LYHZSC_4_8: {
        initContent() {
          const self: any = this;
          self.handleEditorChange(createObjV(4));
        },
        Component: LYHZSC_4_8,
      },
      LYHZSC_4_9: {
        initContent() {
          const self: any = this;
          const arr1 = createArr(16, (j, k) => createObjV(4));
          const arr2 = createArr(4, (j, k) => createObjV(3));
          self.handleEditorChange({
            v1: "",
            v2: "",
            v3: arr1,
            v4: arr2,
          });
        },
        Component: LYHZSC_4_9,
      },
      LYHZSC_4_10: {
        initContent() {
          const self: any = this;
          const arr = createArr(15, (j, k) => createObjV(9));
          self.handleEditorChange(arr);
        },
        Component: LYHZSC_4_10,
      },
      LYHZSC_4_11: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: "",
          });
        },
        Component: LYHZSC_4_11,
      },
      LYHZSC_4_12: {
        initContent() {
          const self: any = this;
          self.handleEditorChange(createObjV(6));
        },
        Component: LYHZSC_4_12,
      },
      "LYHZSC_5_1,LYHZSC_5_2,LYHZSC_6_1,LYHZSC_6_2,LYHZSC_6_3,LYHZSC_6_4,LYHZSC_6_8": {
        initContent(row = 20, col = 4) {
          const self: any = this;
          const arr = createArr(row, (j, k) => createObjV(col));
          self.handleEditorChange(arr);
        },
        Component: tableCon,
      },
      LYHZSC_6_5: {
        initContent() {
          const self: any = this;
          const arr = createArr(21, (j, k) => createObjV(4));
          self.handleEditorChange(arr);
        },
        Component: LYHZSC_6_5,
      },
      LYHZSC_6_6: {
        initContent() {
          const self: any = this;
          self.handleEditorChange(createObjV(27));
        },
        Component: LYHZSC_6_6,
      },
      LYHZSC_6_7: {
        initContent() {
          const self: any = this;
          self.handleEditorChange({
            v1: "",
          });
        },
        Component: LYHZSC_6_7,
      },
    },
    vague: true,
    currentHospitalId: code,
  });
}
/**
 * 格式化标题
 * @param params 创建弹窗返回的字段
 * @param options 当前页面配置
 * @returns
 */
export const formatTitle = (params: Obj, options: Obj) => {
  const { menuCode, name } = options;
  const {
    year = "",
    deptName = "",
    menuName = "",
    menuCode: menuCodeP,
  } = params;
  if (menuCodeP) {
    if ("LYHZSC_4_2" === menuCodeP)
      return `${moment().format("M月")}${LYHZSC_2_3_NAME}`;
    else if ("LYHZSC_4_3" === menuCodeP)
      return `${moment().format("M月")}${menuName}`;
    return `${deptName}${menuName}`;
  }
  if (
    [
      "LYHZSC_1_1",
      "LYHZSC_1_2",
      "LYHZSC_2_1",
      "LYHZSC_2_2",
      "LYHZSC_3_1",
      "LYHZSC_3_2",
      "LYHZSC_5_1",
      "LYHZSC_5_2",
    ].includes(menuCode)
  )
    return `${year}年${deptName}${name}`;
  return name;
};
/**使用tableCon的表单配置
 * isAdd 是否存在添加一页按钮
 * rows: 一页所需行数
 * tip: 备注
 * titleType: 标题类型
 */
export const tableConConfig = {
  LYHZSC_5_1: {
    columns: [
      {
        title: "时间",
        width: "15%",
        component: "DataPicker",
      },
      {
        title: "培训主题",
      },
      {
        title: "主讲人",
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
    tip: `备注：1、此表为科室全年全员及各层级护士理论培训安排。
    2、“培训主题”栏填写授课题目等。
    3、“培训对象”栏填写本次培训必修人员，如“全员”或哪一层级护士。
    4、“落实时间”栏填写本次理论授课实际完成时间。
    5.“备注”栏主要用于培训主题、时间或主讲人等有调整时，记录调整原因及情况。`
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
/**
 * 时间格式
 */
export const dateFormat = "YYYY-MM-DD HH:mm";
export const dateFormat1 = "YYYY年MM月DD日 星期d HH:mm";
export const dateFormat2 = "YYYY年MM月DD日";
export const dateFormat3 = "YYYY-MM-DD";
export const dateFormat4 = "YYYY年MM月";
export const dateFormat5 = "YYYY-MM";
export const timeFormat = "HH:mm";

export const phD = "   年  月  日";
