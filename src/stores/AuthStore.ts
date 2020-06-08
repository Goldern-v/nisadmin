/** 权限验证 */
import { action, observable, computed } from "mobx";

import User from "src/models/User";
import { DeptType } from "src/components/DeptSelect";
import { appStore } from "src/stores";

export default class AuthStore {
  public constructor() {
    try {
      this.initUser();
    } catch (error) {
      console.log(error);
    }
  }

  @observable public user: User | null = null;
  @observable public authToken: string | null = null;
  @observable public adminNurse: string | null = null;

  /** 当前用户科室列表 */
  @observable public deptList: DeptType[] = [];
  /** 当前用户默认科室 */
  @observable public defaultDeptCode: any = "";
  /** 当前用户默认科室名 */
  @observable public defaultDeptCodeName: any = "";

  /** 用户选择的科室 */
  @observable public selectedDeptCode: any = "";

  @computed
  public get selectedDeptNameAdd() {
    try {
      if (this.selectedDeptName === "全院") {
        return "全院" + appStore.match.params.name;
      }
      return (
        this!.deptList.find(
          (item: DeptType) => item.code === this.selectedDeptCode
        )!.name + appStore.match.params.name
      );
    } catch (error) {
      return "";
    }
  }
  // 仅科室名
  @computed
  public get selectedDeptNameOnly() {
    try {
      if (this.selectedDeptName === "全院") {
        return "全院";
      }
      return this!.deptList.find(
        (item: DeptType) => item.code === this.selectedDeptCode
      )!.name;
    } catch (error) {
      return "";
    }
  }
  @computed
  public get post() {
    try {
      return this.user && this.user.post;
    } catch (error) {
      return "";
    }
  }
  @computed
  public get selectedDeptName() {
    try {
      let dept = this.deptList.find(
        (dept: any) => dept.code == this.selectedDeptCode
      );
      if (dept) localStorage.selectedDeptName = dept.name;
      return dept ? dept.name : localStorage.selectedDeptName;
    } catch (error) {
      return "";
    }
  }
  @computed
  public get defaultDeptName() {
    try {
      let dept = this.deptList.find(
        (dept: any) => dept.code == this.defaultDeptCode
      );
      if (dept) localStorage.defaultDeptCode = dept.name;
      return dept ? dept.name : localStorage.defaultDeptCode;
    } catch (error) {
      return "";
    }
  }

  /** 是否是管理员 */
  public get isAdmin() {
    try {
      return this.user && (this.user.superuser || this.user.empNo == "G6051"); //** 武汉护理部大佬 */
    } catch (error) {
      return "";
    }
  }

  public get isAd() {
    try {
      return (
        this.user && (this.user.empNo == "admin" || this.user.empNo == "ADMIN")
      ); //** admin */
    } catch (error) {
      return "";
    }
  }

  /** 是否是护理部 */
  public get isDepartment() {
    try {
      if (this.isAdmin) return true;

      if (this.user && this.user.roleManageCode === "QCR0001") return true;

      if (
        this.user &&
        this.user.roleManageCodeList.find((code: string) => code === "QCR0001")
      )
        return true;

      return "";
    } catch (error) {
      return "";
    }
  }
  /** 是否是科护士长 */
  public get isSupervisorNurse() {
    try {
      if (
        this.user &&
        this.user.roleManageCodeList.find((code: string) => code === "QCR0003")
      )
        return true;

      if (this.user && this.user.roleManageCode === "QCR0003") return true;

      return "";
    } catch (error) {
      return "";
    }
  }
  /** 是否是护士长 */
  public get isRoleManage() {
    try {
      return this.user && this.user.roleManage == "1";
    } catch (error) {
      return false;
    }
  }
  /** 是否只是护士长 */
  public get isOnlyRoleManage() {
    return this.isRoleManage && !(this.isDepartment || this.isSupervisorNurse);
  }
  /** 是否非普通护士 */
  public get isNotANormalNurse() {
    return this.isRoleManage || this.isDepartment || this.isSupervisorNurse;
  }
  /** 用户初始化 */
  @action
  public initUser() {
    this.user = JSON.parse(sessionStorage.getItem("user") || "{}");
    this.authToken = sessionStorage.getItem("authToken") || "";
    this.adminNurse = sessionStorage.getItem("adminNurse") || "";
    this.defaultDeptCode = this.user && this.user.deptCode;
    this.defaultDeptCodeName = this.user && this.user.deptName;
    this.selectedDeptCode =
      sessionStorage.getItem("selectedDeptCode") || this.defaultDeptCode || "";
  }

  /** 用户清除数据 */
  @action
  public delUser() {
    this.user = null;
    this.authToken = null;
    this.adminNurse = null;
    this.defaultDeptCode = null;
    this.selectedDeptCode = null;
    this.defaultDeptCodeName = null;
    this.deptList = [];
  }

  @action
  public selectDeptCode(value: string) {
    this.selectedDeptCode = value;
    sessionStorage.setItem("selectedDeptCode", value);
  }

  @action
  public async updateUser(user: User) {
    this.user = user;
  }

  @action
  public getUser() {
    return this.user as User;
  }

  @action
  public setAuthToken(token: string) {
    this.authToken = token;
  }

  @action
  public getAuthToken() {
    return (this.authToken as string) || "";
  }

  @action
  public setAdminNurse(name: string) {
    this.adminNurse = name;
  }

  @action
  public getAdminNurse() {
    return (this.adminNurse as string) || "";
  }
}
