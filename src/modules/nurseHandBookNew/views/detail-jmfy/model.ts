import { message } from "src/vendors/antd";
import * as useAuditStatus from "src/hooks/useAuditStatus";
import { appStore, authStore } from "src/stores";
import { action, computed, observable } from "mobx";
import * as types from "src/libs/types";
import { nurseHandBookService } from "../../services/NurseHandBookService";
import config from "./config";
import  auditModal from './components/auditModal'
import createModal from "src/libs/createModal";
import { Modal } from "antd";
import { preview, print } from "printing";
import moment from 'moment'
import {tableConConfig} from "src/modules/nurseHandBookNew/views/detail-lyrm/config";
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class NurseHandBookRecordModelJmfy {
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
  @observable public menuList:any =[]  //分类列表
  constructor() {
    this.auditModal = createModal(auditModal)
  }
  /**编辑权限 */
  @computed
  get allowEdit() {
    // const { status = '', empNo } = this.detail?.record || {}
    // // temporary ok
    // if (authStore.user?.empNo === empNo) return true
    // if (authStore.isDepartment) {
    //   return [2, 1].includes(status)
    // }
    // return [0, -1].includes(status)
    return true
  }

  @action
  public handleEditorChange = (data: any) => {
    this.editorData = data;
  };

  /**编辑标题 */
  public onChangeTitle = (e: any) => {
    this.editorTitle = e.target.value;
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
        const currentYear:number =new Date().getFullYear()

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
          this.editorTitle =menuName
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
  public init = async (id: any) => {
    this.configFn = null
    this.id = id||appStore.queryObj.id;
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
      onOkCb: (params: any) => {
        this.handleNode(params)
      }
    })
  }
  /**
   * 审核
   * @param params 
   */

  public handleNode = (params: types.Obj) => {
    nurseHandBookService.handleNodeNHR({
      ...params,
      id: this.id,
      nodeCode:this.detail?.record?.nextNode
    }).then((res) => {
      message.success('审核成功')
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

  public  getMenuList(){
    nurseHandBookService.getFormList().then(res => {
      this.menuList =res.data
    })
  }
}

export const jmfydModel = new NurseHandBookRecordModelJmfy();
