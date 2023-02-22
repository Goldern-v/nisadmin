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
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

class NurseHandBookRecordModel {
  @observable public detail: useAuditStatus.Props = {
    record: {},
    nodeList: [],
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
  /**编辑标题 */
  public onChangeTitle = (e: any) => {
    this.editorTitle = e.target.value;
  };

  public getDetail = async () => {
    this.loading = true;
    return nurseHandBookService
      .getNHRById({ id: this.id })
      .then((res: types.Obj) => {
        const {
          record: { detail, title = "", menuCode = '', time },
        } = res.data;
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
          this.editorTitle = title;
        } else {
          this.configFn = null
        }
        if (this.editorData === '' && this.configFn) {
          this.configFn.initContent.call(this)
        }

        this.loading = false;
      })
      .catch((e) => {
        console.log("test-e", e);
        this.loading = false;
      });
  };
  @action
  public init = async (cb?: Function) => {
    const { id } = appStore.queryObj;
    this.id = id;
    this.getDetail();
  };

  /**
   * 保存状态
   * @param status 
   */
  public onCommit = (status: string) => {
    let detail = this.editorData;
    if (typeof this.editorData !== "string") {
      // // 对富文本的数据做转义
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
        // direction: "vertical",
        css: `
        @page {
          margin: 0;
        }
        .con--a4 {
          min-height: 0px !important;
          width: 100% !important;
        }
        .title {
          border: none;
          padding: 0;
        }
        `,
      }).then(() => this.isPrint = false)
    })
  }
}

export const nurseHandbookRecordModel = new NurseHandBookRecordModel();
