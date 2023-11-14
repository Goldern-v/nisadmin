import {createArr} from "src/utils/array/array";
import {createObjV} from "src/utils/object/object";
import QHWYZB_1 from "./components/QHWYZB_1"
import moment from "moment";

const arr2 = Array.from(Array(12), (j,k) => k)
/**提个不同表单的初始化操作 */
export default {
  QHWYHYHSQK: {
    initContent(row = 20, col = 4) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  QHWYCJCFJL:{
    initContent(row = 20, col = 3) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  QHWYJJRZBQK:{
    initContent(row = 8, col = 1) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange([ { v1:'',v2:'',v3:'',v4:'' },{ v1:'',v2:'',v3:'',v4:'' },{ v1:'',v2:'',v3:'',v4:'',v5:'' },...arr ]);
    },
  },
  QHWYYWCFJL:{
    initContent(row = 15, col = 1) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange([ { v1:''},{ v1:'',v2:''},{ v1:'',v2:'',v3:'',v4:'',v5:'' },...arr ]);
      console.log([{v1: ''}, {v1: '', v2: ''}, {v1: '', v2: '', v3: '', v4: '', v5: ''}, {v1: ''}, ...arr]);
    },
  },
  QHWYZB_1: {
    initContent() {
      let day =new Date().getDate()
      let week=new Date().getDay()
      const self: any = this;
      self.handleEditorChange({
        v1: null,
        v2: "",
        v3: "",
        v4: "",
        v5: '',
        v6: '',
        v7: '',

        vYear:new Date().getFullYear(),
        vMonth:new Date().getMonth() + 1,
        vWeek:Math.ceil( ((day + 6) - week)/7)
      });
    },
  },
  QHWYYB_1: {
    initContent() {
      const self: any = this;
      self.handleEditorChange({
        v1: null,
        v2: "",
        v3: "",
        v4: "",
        v5: '',
        v6: '',
        vYear:self.detail?.record?.year,
        vMonth:self.detail?.record?.month,
        // vYear:new Date().getFullYear(),
        // vMonth:new Date().getMonth() + 1,
      });
    },
  },
  'QHWYHDDJ_1':{
    initContent(row=20,col=6) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  },
  'QHWYHDDJ_2':{
    initContent(row=20,col=6) {
      const self: any = this;
      const arr = createArr(row, (j, k) => createObjV(col));
      self.handleEditorChange(arr);
    },
  }
};
export const tableConConfig = {
  'QHWYHYHSQK': {
    columns: [
      {
        title: "姓名",
        width: "25%",
        component: 'Dead'
      },
      {
        title: "怀孕时间",
        width: "25%",
        component: "DataPicker",
      },
      {
        title: "预产期",
        width: "25%",
        component: "DataPicker",
      },
      {
        title: "胎次",
        width: "25%",
        component: 'TextArea'
      },
    ],
    rows: 20,
    titleType: "title",
    tip: ``
  },
  'QHWYCJCFJL':{
    columns: [
      {
        title: "日期",
        width: "14%",
        component: 'DataPicker'
      },
      {
        title: "内容",
        width: "43%",
        component: 'TextArea'
      },
      {
        title: "护理上存在或应解决的问题",
        width: "43%",
        component: 'TextArea'
      },
    ],
    rows: 20,
    titleType: "title",
    tip: ``
  },
  'QHWYJJRZBQK':{
     columns:[
     ]
  },
  'QHWYYWCFJL':{},
  'QHWYZB_1':{
    columns: [
      {
        title: "日期",
        width: "100%",
        component: 'DataPicker'
      },
      // {
      //   title: "内容",
      //   width: "43%",
      //   component: 'TextArea'
      // },
      // {
      //   title: "护理上存在或应解决的问题",
      //   width: "43%",
      //   component: 'TextArea'
      // },
    ],
    rows: 20,
    titleType: "title",
    tip: ``
  },
  'QHWYYB_1':{
    columns: [
      {
        title: "日期",
        width: "100%",
        component: 'DataPicker'
      },
      // {
      //   title: "内容",
      //   width: "43%",
      //   component: 'TextArea'
      // },
      // {
      //   title: "护理上存在或应解决的问题",
      //   width: "43%",
      //   component: 'TextArea'
      // },
    ],
    rows: 20,
    titleType: "title",
    tip: ``
  },
  'QHWYHDDJ_1':{
    columns: [
      {
        title: "日期",
        width: "15%",
        component: 'DataPicker'
      },
      {
        title: "活动名称",
        width: "23%",
        component: 'TextArea'
      },
      {
        title: "活动地点",
        width: "23%",
        component: 'TextArea'
      },
      {
        title: "参加人数",
        width: "12%",
        component: 'TextArea'
      },
      {
        title: "受众人群",
        width: "12%",
        component: 'TextArea'
      },
      {
        title: "备注",
        width: "15%",
        component: 'TextArea'
      },
    ],
    rows: 20,
    titleType: "title",
    tip: ``
  },
  'QHWYHDDJ_2':{
    columns: [
      {
        title: "日期",
        width: "15%",
        component: 'DataPicker'
      },
      {
        title: "活动名称",
        width: "15%",
      },
      {
        title: "活动地点",
        width: "15%",
      },
      {
        title: "参加人数",
        width: "15%",
      },
      {
        title: "受众人群",
        width: "15%",
      },
      {
        title: "备注",
        width: "25%",
      },
    ],
    rows: 20,
    titleType: "title",
    tip: ``
  },

};

export const dateFormat = "YYYY-MM-DD HH:mm";
/**不同表单的初始化操作 */
