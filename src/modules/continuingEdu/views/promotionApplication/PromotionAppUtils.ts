import { observable, computed } from "mobx";
import { fileDownload } from "src/utils/file/file";
import {PromotionApplicationApi} from './api/PromotionApplicationApi'
import { appStore,authStore } from "src/stores/index";
import moment from 'moment'

class PromotionApp {
  @observable public loading = false; // 晋升表code
  @observable public id = ''; // 晋升表code
  @observable public formCode = 'HSJS_0001'; // 晋升表code
  @observable public formName = "N0->N1晋升申请"; // 晋升表名称
  @observable public status = "-1"; // 晋升表状态
  @observable public editStatus = '创建'; // 晋升表修改状态
  @observable public nextNodeCode = ""; // 提交&&创建&&保存
  @observable public tabsKey = '1'; // tabs的第几项
  @observable public tableObj = {
    JS0000001:'',  //科室
    JS0000002:'',  //姓名
    JS0000003:'',  //SAP号码
    JS0000004:'',  //来院时间
    JS0000005:'',  //学历
    JS0000006:'',  //护士职业证书编号
    JS0000007:'',  //来院时间
    JS0000008:'',  //申请人签名
    JS0000009:'',  //申请日期
    JS0000010:'',  //护长审核
    JS0000011:'',  //护长签名
    JS0000012:'',  //护长签名工号
    JS0000013:'',  //护长签名日期
    JS0000014:'',  //科护长审核
    JS0000015:'',  //科护长签名
    JS0000016:'',  //科护长签名工号
    JS0000017:'',  //科护长签名日期
    JS0000018:'',  //科晋级小组科护士审核
    JS0000019:'',  //科晋级小组科护士签名
    JS0000020:'',  //科晋级小组科护士签名工号
    JS0000021:'',  //科晋级小组科护士签名日期
    JS0000022:'',  //护理部科护士审核
    JS0000023:'',  //护理部科护士签名
    JS0000024:'',  //护理部科护士签名工号
    JS0000025:'',  //护理部科护士签名日期
    JS0000026:'',  //获得职称年
    JS0001001:'',  //N0分层培训手册填写
    JS0001002:'',  //资质认证
    JS0001003:moment(),  //三层理论考核_年度
    JS0001004:'',  //三层理论考核
    JS0001005:moment(),  //专科理论考核_年度
    JS0001006:'',  //专科理论考核
    JS0001007:'',  //独立从事一般患者护理工作
    JS0001008:'',  //转正后持续工作时间
    JS0001009:'',  //参与临床倒班时间
    JS0001010:'',  //各类长休假情况
    JS0001011:'',  //各类长休假情况明细
    JS0001012:'',  //曾获得何种荣誉
    JS0001013:'',  //自我总结
    JS0001014:'',  //晋升考核_理论考核
    JS0001015:'',  //晋升考核_床边综合能力考核
    JS0001016:'',  //晋升考核_读书报告
    JS0001017:'',  //xxxx年度无护理服务投诉
    JS0001018:'',  //xxxx年绩效考核
    JS0001019:'',  //xxxx年度无个人原因得III级护理不良事件
    JS0001020:'',  //xxxx年度学分达标
  };  // 表单的数据



  @computed   get listObj() {
    return {
      master:{
        creatorNo:authStore.user?.empNo,
        creatorName:authStore.user?.empName,
        updaterNo:authStore.user?.empNo,
        updaterName:authStore.user?.empName,
        updateTime:moment().format("YYYY-MM-DD HH:mm"),
        currentLevel:authStore.user?.currentLevel,
        formCode:this.formCode,
        formName:this.formName,
        deptName:authStore.user?.deptName,
        empNo:authStore.user?.empNo,
        empName:authStore.user?.empName,
        status:this.status,
        chainCode: "HSJS_COMMON",
        chainName: "护士晋升申请通用",
        attachmentCount: 0,
        nextNodeCode: "commit",
        lastCommitTime: "2022-07-20 14:51",
        hasRead: false
      },
      itemDataMap:this.tableObj
    }
  }

  onSave() {
    this.loading = true;
    PromotionApplicationApi.getSaveOrCommit(this.listObj).then((res)=>{
      console.log(res,'ddddddddd');
      this.loading = false;
    })
  }
  // 获取护士晋升详情
  // getlistOnload(){
  //   PromotionApplicationApi.getpromotionList(id)
  // }
}

export const PromotionAppUtils = new PromotionApp()
