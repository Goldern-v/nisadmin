import {Obj} from "src/libs/types";
import {createArr} from "src/utils/array/array";
import {createObjV} from "src/utils/object/object";
import MonthlyWork from "src/modules/nurseHandBookNew/views/detail-jew/components/MonthlyWork";

const arr2 = Array.from(Array(12), (j, k) => k)
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
                v6: '',
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
        initContent(row = 36, col = 4) {
            const self: any = this;
            const arr1 = createArr(12, (j, k) => createObjV(col));
            const arr2 = createArr(5, (j, k) => createObjV(col));
            const arr3 = createArr(5, (j, k) => createObjV(col));
            self.handleEditorChange({arr1, arr2, arr3});
        },
    },
    "925JDGZJH_4": {
        initContent(row = 24, col = 4) {
            const self: any = this;
            const arr1 = createArr(12, (j, k) => createObjV(col));
            const arr2 = createArr(12, (j, k) => createObjV(col));
            self.handleEditorChange({arr1, arr2})
        },
    },
    "925GZJHJZZD_5": {
        initContent(row = 27, col = 4) {
            const self: any = this;
            const arr = createArr(row, (j, k) => createObjV(col));
            self.handleEditorChange(arr);
        },
    },
    '925NDBRDJ_7': {
        initContent(row = 12, col = 4) {
            const self: any = this;
            const arr = createArr(row, (j, k) => createObjV(col));
            self.handleEditorChange(arr);
        },
    },
    /**护士长手册**/
    '925SCFM_1': {
        initContent() {
            const self: any = this;
            self.handleEditorChange({
                v1: "",  /*年限*/
                v2: "", /*科室*/
                v3: "",/*名称*/
            });
        },
    },
    'JMFYRLTJB': {
        initContent(row = 10, col = 10) {
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
                component: "TextArea",
            },
            {
                title: "重点工作",
                width: "50%",
                component: "TextArea",
            },
            {
                title: "责任人",
                width: "15%",
            },
            {
                title: "完成",
                width: "15%",
                component: "TextArea",
            },
            {
                title: "备注",
                component: "TextArea",
            },
        ],
        columnsMonth: [
            {
                title: "",
                width: "4%",
                component: "TextArea",
            },
            {
                title: "",
                width: "96%",
                component: "TextArea",
            },
        ],
        columnsRemark: [
            {
                title: "",
                width: "4%",
                component: "TextArea",
            },
            {
                title: "",
                width: "96%",
                component: "TextArea",
            },
        ],
        rows: 27,
        titleType: "title",
        tip: ``
    },
    '925NDXLJH_3': {
        zjhjColumns:[
            {
                title: "业务学习",
                width: "20%",
                component: 'TextArea'
            },
            {
                title: "负责人",
                width: "12%",
                component: "Dead",
            },
            {
                title: "业务学习",
                width: "20%",
                component: 'TextArea'
            },
            {
                title: "负责人",
                width: "12%",
                component: "Dead",
            },
            {
                title: "教学查房",
                width: "20%",
                component: 'TextArea'
            },
            {
                title: "负责人",
                width: "12%",
                component: "Dead",
            },
        ],
        columns: [
            {
                title: "制度培训计划",
                width: "15%",
                component: 'TextArea'
            },
            {
                title: "理论学习计划",
                width: "15%",
                component: 'TextArea'
            },
            {
                title: "负责人",
                width: "15%",
                component: "Dead",
            },
            {
                title: "护理疑难病例讨论",
                width: "25%",
                component: 'TextArea'
            },
            {
                title: "护理教学查房",
                width: "10%",
                component: 'TextArea'
            },
            {
                title: "负责人",
                width: "12%",
                component: "Dead",
            },
        ],
        operationColumns: [
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
                width: "15%",
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
                width: "15%",
                component: "Dead",
            },
        ],
        otherColumns: [{
            title: "时间",
            width: "15%",
            component: "DataPicker",
        }, {
            title: "训练计划内容",
            width: "70%",
            component: "TextArea",
        },
            // , {
            //   title: "负责人",
            //   width: "15%",
            //   component: "Dead",
            // }, {
            //   title: "内容",
            //   width: "25%",
            // },
            {
                title: "负责人",
                width: "15%",
                component: "Dead",
            },],
        isAdd: true,
        rows: 12,
        titleType: "title",
    },
    '925JDGZJH_4': {
        columns: [
            {
                title: "季度工作计划",
                width: "10%",
                component: "TextArea"
            },
            {
                title: "内容",
                width: "50%",
                component: "TextArea"

            },
            {
                title: "完成",
                width: "15%",
                component: "TextArea"

            },
            {
                title: "备注",
                width: "15%",
                component: "TextArea"

            },
        ],
        rows: 27,
        titleType: "title",
        tip: ``
    },
    '925NDBRDJ_7': {
        columns: [
            {
                title: "",
                width: "4%",
                // component: "DataPicker",
            },
            {
                title: "重点工作",
                width: "50%",
                component: "TextArea",
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
                component: "TextArea",
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
                component: "TextArea",
            },
            {
                title: "题   目",
                width: "15%",
                component: "TextArea",
            },
            {
                title: "发表杂志名称",
                width: "20%",
                component: "TextArea",
            },
            {
                title: "期刊号",
            },
            {
                title: "会议名称",
                width: "10%",
                component: "TextArea",
            },
        ],
        titleType: true,
        isAdd: true,
        rows: 20,
    },
    '925JSGXDJ_9_2': {
        columns: [
            {
                title: "日期",
                width: "15%",
                component: "DataPicker",
            },
            {
                title: "项目名称",
                width: "35%",
                component: "TextArea",
            },
            {
                title: "负责人",
                width: '12%',
                component: "Dead",
            },
            {
                title: "职务",
                width: '10%',
                component: "TextArea",
            },
            {
                title: "进展与效果",
                width: "15%",
                component: "TextArea",
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
                component: "TextArea",
            },
            {
                title: "协助单位",
                width: "25%",
                component: "TextArea",
            },
            {
                title: "获奖等级",
                width: "15%"
            },
            {
                title: "获奖人",
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
                component: "TextArea",
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
                title: "总天数",
                width: "15%",
                component: "TextArea",
            },
        ],
        isAdd: true,
        rows: 20,
    },
    "925JSJXJXDJ_9_5": {
        columns: [
            {
                title: "序号",
                width: "5%",
            },
            {
                title: "姓名",
                width: "10%",
            },
            {
                title: "职 务",
                width: "10%",
                component: "TextArea",

                // component: "DataPicker",
            },
            {
                title: "单   位",
                width: "25%",
                component: "TextArea",

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
                title: "总天数",
                width: "15%",
                component: "TextArea",

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
                component: "TextArea",
            },
            {
                title: "立功",
                width: "10%",
                component: "TextArea",
            },
            {
                title: "荣誉称号",
                width: "10%",
                component: "TextArea",
                // component: "DataPicker",
            },
            {
                title: "其他",
                width: "30%",
                component: "TextArea",
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
                component: 'TextArea'
            },
            {
                title: "满意度调查反馈",
                width: "16%",
                component: 'TextArea'
            },
            {
                title: "口头表扬",
                width: "6%",
                component: 'TextArea'
            },
            {
                title: "意见本",
                width: "10%",
                component: 'TextArea'
            },
            {
                title: "报刊媒体报道",
                width: "10%",
                component: 'TextArea'
            },
            {
                title: "表扬",
                width: "6%",
                component: 'TextArea'
            },
            {
                title: "锦旗",
                width: "6%",
                component: 'TextArea'
            },
            {
                title: "匾",
                width: "6%",
                component: 'TextArea'
            },
        ],
        isAdd: true,
        rows: 20,
    },
    "JMFYRLTJB": {
        columns: [
            {
                title: "序号",
                isEdit:false,
            },
            {
                title: "统计单位",
                isEdit:false,
                keyType: 'deptName'
            },
            {
                title: "实际开放床位",
                isEdit:true,
                keyType:'v1'
            },
            {
                title: "配置标准",
                isEdit:true,
                keyType:'v2'
            },
            {
                title: "应配护士",
                isEdit:true,
                keyType:'v3'
            },
            {
                title: "现有执业护士总人数",
                isEdit:false,
                keyType:'practicingNurses',
            },
            {
                title: "床位使用率",
                isEdit:true,
                keyType:'v4'
            },
            {
                title: "实际床护比",
                isEdit:true,
                keyType:'v5'
            },
            {
                title: "休假人次",
                isEdit:true,
                keyType:'v6'
            },
            {
                title: "实际在岗人次",
                isEdit:true,
                keyType:'v7'
            },
            {
                title: "实际应配护士",
                isEdit:true,
                keyType:'v8'
            },
            {
                title: "培训生",
                isEdit:false,
                keyType:'trainee',
            },
            {
                title: "本月人力分析",  //实际在岗人次-实际应配护士
                isEdit:true,
                keyType:'v9'
            },
        ],
        // isAdd: true,
        rows: 20,
    }
};
export const dateFormat = "YYYY-MM-DD HH:mm";
export const dateFormat1 = "YYYY年MM月DD日 星期d HH:mm";
export const dateFormat2 = "YYYY年MM月DD日";
export const dateFormat3 = "YYYY-MM-DD";