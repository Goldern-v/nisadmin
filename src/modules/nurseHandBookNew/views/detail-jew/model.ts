import { message } from "src/vendors/antd";
import * as useAuditStatus from "src/hooks/useAuditStatus";
import { appStore, authStore } from "src/stores";
import { action, computed, observable } from "mobx";
import * as types from "src/libs/types";
import { nurseHandBookService } from "../../services/NurseHandBookService";
import config from "./config";
import createModal from "src/libs/createModal";
import auditModal from "./components/auditModal";
import { Modal } from "antd";
import { preview, print } from "printing";
import moment from 'moment'
import { Obj } from "src/libs/types";
import {tableConConfig} from "src/modules/nurseHandBookNew/views/detail-lyrm/config";
import service from "src/services/api";
import {FORM_MENU_CODE} from "src/modules/nurseHandBookNew/views/list-jew/utils/enums";
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class NurseHandBookRecordModel {
  @observable public detail: useAuditStatus.Props = {
    record: {},
    nodeList: [],
    audit:false
  };
  @observable public id: string = "";
  @observable public editorData: any = "";
  @observable public editorTitle: any = null;
  @observable public editorTime: any = null;
  public configFn: any = null
  @observable public loading: boolean = false;
  @observable public auditModal: any = null
  @observable public isPrint: boolean = false
  @observable public ctxRef: any = null
  @observable public  yearPersonData:any ={}
  @observable public  formListMenu:any =[]
  @observable public result:boolean =false
/**科室护士data**/
@observable public  nurseList:any =[]
  constructor() {
    this.auditModal = createModal(auditModal)
  }
  /**编辑权限 */
  @computed
  get allowEdit() {
    const { status = '', empNo } = this.detail?.record || {}
    // temporary ok
    if (authStore.user?.empNo === empNo) return true
    if (authStore.isDepartment) {
      return [2, 1].includes(status)
    }
    return [0, -1].includes(status)
  }

  @action
  public handleEditorChange = (data: any) => {
    this.editorData = data;
  };
@action
public  handleEditorAllChange =(data1:any,data2:any)=>{

}
  addPageData(count:number){
    const arr2 = Array.from(Array(count), (j,k) => k)
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
    return arr
  };
  /**编辑标题 */
  public onChangeTitle = (e: any) => {
    this.editorTitle = e.target.value;
  };

  public addEditorData = (count:number)=>{
    this.editorData = [...this.editorData, ...this.addPageData(count)]
  };

  public createObjV=(count: number, defVal = {})=>{
    let newObj: any = {}
  for (let i = 1; i <= count; i++) {
    newObj[`v${i}`] = defVal[`v${i}`] || '' ;
    if(i%4===0) newObj['title'] = ''
    
  }
  return newObj
  };

  public getDetail = async () => {
    this.loading = true;
    return nurseHandBookService
      .getNHRById({ id: this.id })
      .then((res: types.Obj) => {
        const {
          record: { detail,deptCode, title = "", menuCode = '', time,year,menuName},
        } = res.data;
        /**获取当前科室护士**/
        this.getNurseList(deptCode)
        /**获取年度病人数据**/
        if(this.formListMenu.findIndex((item:any)=>item.menuCode === menuCode) > -1){
          this.getYearData({
            wardCode:deptCode,
            year,
            type:FORM_MENU_CODE[menuName]
          })
        }
        this.detail = res.data;

        if (detail) {
          this.editorData = JSON.parse(detail);
        } else {
          this.editorData = ''
        }
        // 初始化新建的detail, title, time
        if (config[menuCode]) {
          this.configFn =
            config[menuCode]
          this.editorTime = time ? moment(time) : '';
          this.editorTitle = title ;
        } else {
          this.configFn = null
        }
        if (this.editorData ==='' && this.configFn) {
          const config = tableConConfig[this.detail?.record?.menuCode]
          if (config) {
            this.configFn.initContent.call(this, config.rows, config.columns.length)
          } else {
            this.configFn.initContent.call(this)
          }
        }

        this.loading = false;
        this.result =true
      })
      .catch((e) => {
        console.log("test-e", e);
        this.loading = false;
        this.result =true
      });
  };
  @action
  public init = async (cb?: Function) => {
    this.configFn = null
    const { id} = appStore.queryObj;
    this.id = id;
    this.getDetail();
  };
  /**重置 */
  public reset = () => {
    this.configFn = null
    this.id = "";
    this.editorData = "";
    this.editorTitle = null;
    this.editorTime = null;
    this.yearPersonData =null
    this.result =false
  }

  /**
   * 保存状态
   * @param status 
   */
  public onCommit = (status: string) => {
    const {url}=appStore.queryObj
    /**封面url数据**/
    if(url){
      this.editorData = JSON.stringify(url)
    }
    let detail = this.editorData;
    if (typeof this.editorData !== "string") {
      // 对富文本的数据做转义
      // data.detail = data.detail.replace(/\n\r/g, '')
      detail = JSON.stringify(detail);
    }

    const params: types.Obj = {
      id: this.id,
      status,
      detail,
    };
    this.configFn?.editTitle && (params.title = this.editorTitle);
    this.configFn?.editTime && (params.time = this.editorTime ? this.editorTime.format(dateFormat) : '');
    nurseHandBookService.saveNHRDetail(params).then((res) => {
      if (res.code === "200") {
        message.success(res.desc);
        this.getDetail();
      }
    });
  };

  /**
   * 撤回提交
   */
  public onCancel = () => {
    Modal.confirm({
      title: '撤回',
      content: '是否撤回?',
      onOk: () => {
        this.onCommit('1')
      }
    })
  };
  public openAudit = () => {
    this.auditModal.show({
      onOkCb: (params: string) => {
        this.onCommit(params)
      }
    })
  }
  /**
   * 审核
   * @param params 
   */

  public handleNode = (params: types.Obj) => {
    nurseHandBookService.handleNodeNHR(params).then((res) => {
      this.getDetail();
    });
  };
  public onPrint = () => {
    setTimeout(() => {
      this.isPrint = true
      // preview(this.ctxRef.current, {
      print(this.ctxRef.current, {
        injectGlobalCss: true,
        scanStyles: false,
        direction: "vertical",
        css: `
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }
        @page {
          margin: 0;
        }
        .con--a4 {
          min-height: 0px !important;
          width: 100% !important;
          margin: 0;
          word-break: break-all;
        }
        table {
          table-layout: fixed
        }
        tr, pre {
          page-break-inside: auto;
          page-break-after: auto
        }
        tr .ant-select-selection{
        border:none
        }
         
        i.anticon, .ant-select-arrow {
          display: none;
        }
        .date-con .ant-calendar-picker {
          flex: 1;
        }
        .ant-calendar-picker-input.ant-input {
          display: flex;
          border: none;
        }
        .date-con pre {
          white-space: nowrap;
        }
        .addButton{ 
          display:none
         }
        .title {
          border: none;
          padding: 0;
        }
        .title-con .ant-input.title {
          padding: 0px;
        }
        `,
      }).then(() => this.isPrint = false)
    })
  }
/**获取当前科室护士列表**/
public getNurseList(deptCode:any){
  service.commonApiService.userDictInfo(deptCode).then((res) => {
    this.nurseList = res.data
  })
}
public  getYearData(params:Obj){
  nurseHandBookService.getYearData(params).then((res)=>{
    this.yearPersonData =res.data
    // let list = Array.from(Array(12)).map((item:any,key:number)=>{
    //    res.data.list.map((i:any,i1:number)=>{
    //        if(key === i.month){
    //
    //        }
    //    })
    // })
  })
}
}

export const nurseHandbookRecordModel = new NurseHandBookRecordModel();
