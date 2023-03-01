import { createArr } from './../../../../utils/array/array';
import { message } from "src/vendors/antd";
import * as useAuditStatus from "src/hooks/useAuditStatus";
import { appStore, authStore } from "src/stores";
import { action, computed, observable } from "mobx";
import * as types from "src/libs/types";
import { nurseHandBookService } from "../../services/NurseHandBookService";
import config, { tableConConfig } from "./config";
import createModal from "src/libs/createModal";
import auditModal from "./components/auditModal";
import { Modal } from "antd";
import { preview, print } from "printing";
import { createObjV } from 'src/utils/object/object';

class NurseHandBookRecordModel {
  @observable public detail: useAuditStatus.Props = {
    record: {},
    nodeList: [],
  };
  @observable public id: string = "";
  @observable public editorData: any = "";
  @observable public editorTitle: any = "";
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
    const { status = '' } = this.detail?.record || {}
    if (authStore.isDepartment) {
      return true
    }
    return [0, 1, -1].includes(status)
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
          record: { detail, title = "", menuCode = '' },
        } = res.data;
        this.detail = res.data;
        if (detail) {
          this.editorData = JSON.parse(detail);
        } else {
          this.editorData = ''
        }

        // 初始化新建的detail字段
        if (config(menuCode)) {
          this.configFn =
            config(menuCode)
          this.editorTitle = title;
        } else {
          this.configFn = null
        }
        if (this.editorData === '' && this.configFn) {
          const config = tableConConfig[this.detail?.record?.menuCode]
          if (config) {
            this.configFn.initContent.call(this, config.rows, config.columns.length)
          } else {
            this.configFn.initContent.call(this)
          }
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
    this.configFn = null
    const { id } = appStore.queryObj;
    this.id = id;
    this.getDetail();
  };
  public reset = () => {
    this.configFn = null
    this.id = "";
    this.editorData = "";
    this.editorTitle = null;
  }

  /**
   * 提交或暂存
   * @param status 0 | 1
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
        nurseHandBookService
          .cancelNHR({
            id: this.id,
          })
          .then((res) => {
            this.getDetail();
          });
      }
    })
  };
  public openAudit = () => {
    this.auditModal.show({
      onOkCb: (params: types.Obj) => {
        this.handleNode(params)
      }
    })
  }
  /**
   * 审核
   * @param params 
   */

  public handleNode = (params: types.Obj) => {
    const { nextNode: nodeCode, id } = this.detail.record || {}
    const data = { ...params, nodeCode, id }
    nurseHandBookService.handleNodeNHR(data).then((res) => {
      this.getDetail();
    });
  };
  public onPrint = () => {
    setTimeout(() => {
      this.isPrint = true
      print(this.ctxRef.current, {
      // preview(this.ctxRef.current, {
        injectGlobalCss: true,
        scanStyles: false,
        direction: "vertical",
        css: `
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
        
        .title {
          border: none;
          padding: 0;
        }
        `,
      }).then(() => this.isPrint = false)
    })
  }
  public addItem() {
    Modal.confirm({
      title: '添加一页',
      content: '是否需要添加一页?',
      onOk: () => {
        const config = tableConConfig[this.detail?.record?.menuCode]
        this.editorData = [...this.editorData, ...createArr(config.rows, () => createObjV(config.columns.length))]
      }
    })
  }
}

export const nurseHandbookRecordModel = new NurseHandBookRecordModel();
