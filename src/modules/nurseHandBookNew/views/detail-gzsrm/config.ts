import { Obj } from "src/libs/types";
const arr2 = Array.from(Array(12), (j,k) => k)
/**提个不同表单的初始化操作 */
export default {
  GSYHZSC_1: {
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
  GSYHZSC_3: {
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
};
