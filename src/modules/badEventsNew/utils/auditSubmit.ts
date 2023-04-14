import { message } from "antd";
import { appStore } from "src/stores";
export interface AuditSubmitIn {
  nodeCode: any;
  auditInfo: any;
  saveParams: any;
  userInfo: any;
  params: any;
}

const commonFn = ({
  nodeCode,
  auditInfo,
  saveParams,
  userInfo,
  params,
}: AuditSubmitIn): boolean => {
  switch (nodeCode) {
    case "nurse_handle": //科护士长审核
      saveParams["B0028024"] = auditInfo.handleContent; //科护士长审核意见
      if (auditInfo.noPass) {
        if (auditInfo.handleContent.trim().length <= 0) {
          message.warning("审核意见不能为空");
          return false;
        }
      }
      break;
    case "nursing_minister_audit": //护理部审核
      // 是否不良事件
      if (auditInfo.noPass) {
        if (auditInfo.handleContent.trim().length <= 0) {
          message.warning("审核意见不能为空");
          return false;
        }
      }
      saveParams["B0002061"] = auditInfo.noPass ? "0" : "1";
      // 意见和日期
      saveParams["B0002054"] = auditInfo.handleContent; //护理部审核意见
      saveParams["B0002053"] = auditInfo.auditDate; // 护理部审核日期
      saveParams["B0009020"] = userInfo.empName; //B0009020未跟后端做统一（待修改）
      saveParams["B0010018"] = userInfo.empName; //护理优良事件报告表（待修改）
      break;
    case "dept_handle": //病区处理
      // 意见和日期
      saveParams["B0002062"] = auditInfo.handleContent;
      saveParams["B0002057"] = auditInfo.handleContent;
      saveParams["B0002056"] = auditInfo.auditDate;
      params.noPass = false;
      break;
    case "nursing_minister_comfirm": //护理部确认
      // 意见和日期
      saveParams["B0002059"] = auditInfo.handleContent;
      saveParams["B0002058"] = auditInfo.auditDate;
      break;
    // 追踪评论
    case "nursing_minister_flowcomment":
      saveParams["B0009023"] = auditInfo.handleContent;
      saveParams["B0009024"] = userInfo.empName;
      saveParams["B0009025"] = auditInfo.auditDate;
      break;
    default:
  }
  return true;
};

const NODE_CODE_CONFIG = {
  ward_head_nurse: {
    empName: "B0046034",
    auditDate: "B0046035",
    handleContent: "B0046036",
  },
  big_head_nurse: {
    empName: "B0046037",
    auditDate: "B0046038",
    handleContent: "B0046039",
  },
  nursing_minister_audit: {
    empName: "B0046040",
    auditDate: "B0046041",
    handleContent: "B0046042",
  },
  ward_handle: {
    empName: "B0046043",
    auditDate: "B0046044",
    handleContent: "B0046045",
  },
  nursing_minister_rectification_result: {
    empName: "B0046046",
    auditDate: "B0046047",
    handleContent: "B0046048",
  },
};
const fn1 = ({
  nodeCode,
  auditInfo,
  saveParams,
  userInfo,
  params,
}: AuditSubmitIn): boolean => {
  if (!NODE_CODE_CONFIG[nodeCode]) return true;
  console.log('test-nodeCode', nodeCode, NODE_CODE_CONFIG[nodeCode])
  const { handleContent, auditDate, empName } = NODE_CODE_CONFIG[nodeCode];
  saveParams[handleContent] = auditInfo.handleContent;
  saveParams[auditDate] = auditInfo.auditDate;
  saveParams[empName] = userInfo.empName;
  return true;
};
/**
 * 审核操作方法
 */
export default (data: AuditSubmitIn) => {
  const fn = appStore.hisMatch({
    map: {
      yczyy: () => fn1(data),
      other: () => commonFn(data),
    },
  });
  return fn();
};
