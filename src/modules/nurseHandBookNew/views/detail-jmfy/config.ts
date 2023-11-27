import {createArr} from "src/utils/array/array";
import {createObjV} from "src/utils/object/object";
import {FileItem} from "src/components/MultiFileUploader";


/**提个不同表单的初始化操作 */
export default {
    'JMFYHSZGZJH_3': {
        initContent(row = 10, col = 10) {
            const self: any = this;
            self.handleEditorChange({
                v1: "",
                v2: "",
                v3: "",
                v4: "",
                v5: "", v6: "", v7: "", v8: "", v9: "",
                v10: "", v11: "", v12: "", v13: "", v14: "", v15: "", v16: "", v17: "", v18: "",
                v19: "", v20: "", v21: "", v22: "", v23: ""
            });
        },

    },
    'JMFYHSZGZZJ_3':{
        initContent(row = '', col = '') {
            const self: any = this;
            self.handleEditorChange({v1:'' });
        },
    },
    'JMFYHSZGZZJ_2':{
        initContent(row = '', col = '') {
            const self: any = this;
            self.handleEditorChange({v1:'' });
        },
    },
    'JMFYHSZGZZJ_1':{
        initContent(row = '', col = '') {
            const self: any = this;
            self.handleEditorChange({v1:'' ,v2:'',v3:'',v4:'',v5:""});
        },
    },
    'JMFYHSZGZJH_2':{
        initContent(row = 20, col = 6) {
            const self: any = this;
            const arr = createArr(row, (j, k) => createObjV(col));
            self.handleEditorChange({arr,fileData:[] as FileItem[]});
        },
    }
};
/**
 * 使用tableCon的表单配置
 * isAdd 是否存在添加一页按钮
 * rows: 一页所需行数
 * tip: 备注
 * titleType: 标题类型
 */
export const tableConConfig = {
    'JMFYHSZGZJH_3':{
        columns: [
            {
                title: "",
                width: "4%",
                component: "TextArea",
            },
        ]
    }
};
export const dateFormat = "YYYY-MM-DD HH:mm";
export const dateFormat1 = "YYYY年MM月DD日 星期d HH:mm";
export const dateFormat2 = "YYYY年MM月DD日";
export const dateFormat3 = "YYYY-MM-DD";