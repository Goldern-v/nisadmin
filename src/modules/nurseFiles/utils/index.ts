import { appStore, authStore } from "src/stores";

/**判断档案能否编辑 */
export const editFlag = () => {
  if (
    authStore.isAdmin ||
    authStore.isRoleManage ||
    authStore.isAd ||
    JSON.parse(sessionStorage.getItem("user") || "").empNo ===
      appStore.queryObj.empNo
  ) {
    return true;
  }
  return false;
};
