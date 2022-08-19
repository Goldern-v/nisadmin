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
  @observable public treeDeptList: DeptType[] = [];
  /** 当前用户默认科室 */
  @observable public defaultDeptCode: any = "";
  /** 当前用户默认科室名 */
  @observable public defaultDeptCodeName: any = "";

  /** 用户选择的科室 */
  @observable public selectedDeptCode: any = "";

  @computed
  public get selectedDeptNameAdd() {
    try {
      if (this.selectedDeptName === "全院" || !this.selectedDeptCode) {
        return "全院" + (appStore.match.params.name || '');
      }
      return (
        this!.deptList.find(
          (item: DeptType) => item.code === this.selectedDeptCode
        )!.name + (appStore.match.params.name || '')
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

  /** 是否是袁红 */
  public get isYuanHong() {
    try {
      return this.user && this.user.empNo == "G6039";
    } catch (error) {
      return "";
    }
  }


  /** 是否是肖瑞芬护士长 */
  public get isXiaoRuiFen() {
    try {
      return this.user && this.user.roleManageCodeList.includes('QCR1102');
    } catch (error) {
      return "";
    }
  }
  /** 是否是护理部主任 */
  public get isHoundSing() {
    try {
      return this.user && this.user.roleManageCodeList.includes('QCR0008'); //亚心
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
  /** 是否是超级管理员 */
  public get isSuperAdmin() {
    try {
      return this.user && this.user.roleManageCodeList.includes('SUPER_ADMIN')
    } catch (error) {
      return false
    }
  }

  /**是否是伤口小组成员 */
  public get isWound() {
    try {
      return this.user && this.user.roleManageCodeList.includes('Nsk1001')
    } catch (error) {
      return false
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

      return false;
    } catch (error) {
      return false;
    }
  }

  /** 武汉亚心是否是护理部 */
  public get isDepartmentYaXin() {
    // QCR1100  护理部(孙琳)
    // QCR0001  护理部
    let adminCode = ['QCR1100', 'QCR0001']
    try {
      if (this.isAdmin) return true;
      let arrdeis = adminCode.find((item) => {
        if (this.user) {
          return this.user.roleManageCodeList.includes(item)
        }
      })
      if (arrdeis) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
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

      return false;
    } catch (error) {
      return false;
    }
  }
  /** 是否是护士长 */
  public get isRoleManage() {
    try {
      if (!this.user) return false
      if (this.user.roleManageCode === 'QCR0004') return true
      if (this.user.roleManageCodeList?.find((code: string) => code === "QCR0004")) return true
      if (this.user.roleManage == "1") return true
      if (this.user.post == '护长') return true
      return false
    } catch (error) {
      return false;
    }
  }

  /** 武汉亚心护长、教学组长以上*/
  public get isTeachingNurseYaXin() {
    // QCR1102  护士长(肖瑞芳)
    // QCR0007  副护士长
    // QCR0003  科护士长
    // QCR0004  护士长
    // WHYX_QCR5003  总代教护士
    // WHYX_QCR5002  见习代教护士
    // WHYX_QCR5001  代教护士
    let adminCode = ['QCR1102', 'QCR0007', 'QCR0003', 'QCR0004', 'WHYX_QCR5003', 'WHYX_QCR5002', 'WHYX_QCR5001']
    try {
      if (!this.user) return false
      let arrdeis = adminCode.find((item) => {
        if (this.user) {
          return this.user.roleManageCodeList.includes(item)
        }
      })
      if (arrdeis) {
        return true
      } else {
        return false
      }



    } catch (error) {
      return false
    }
  }

  /** 护长、教学组长以上*/
  public get isTeachingNurse() {
    //     QCR0004  护士长
    // WHYX_QCR5001  代教护士
    // WHYX_QCR5002  见习代教护士
    // WHYX_QCR5003  总代教护士
    let adminCode = ['QCR0004', 'WHYX_QCR5001', 'WHYX_QCR5002', 'WHYX_QCR5003']
    try {
      if (!this.user) return false
      let arrdeis = adminCode.find((item) => {
        if (this.user) {
          return this.user.roleManageCodeList.includes(item)
        }
      })
      if (arrdeis) {
        return true
      } else {
        return false
      }



    } catch (error) {
      return false
    }
  }
  /** 护长、教学组长以上*/
  public get isHeadNurse() {
    //     SYS0001  管理员
    // QCR0004  护士长
    // QCR0100  教学组长
    // QCR0001  护理部
    let adminCode = ['SYS0001', 'QCR0004', 'QCR0100', 'QCR0001']
    try {
      if (!this.user) return false
      return adminCode.includes(this.user.roleManageCode)
    } catch (error) {
      return false
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

  /** 是否实习生 */
  public get isOnlyInternsManage() {
    return this.user && this.user.userType == "1" ? true : false;
  }
  /**是否是张俊 */
  public get isZJ() {
    return !!(this.user && this.user.empNo === '284')
  }
  /**是否是胡柳 */
  public get isHL() {
    return !!(this.user && this.user.empNo === '75')
  }
  public get isEmpNoAdmin() {
    return !!(this.user && this.user.empNo == 'admin')
  }
  // 三级质控已发布查看权限 护士长，护理部
  public get level3publishedWatch() {
    return this.isRoleManage || this.isDepartment
  }
  // 三级质控审核权限
  public get level3Check() {
    return this.isZJ || this.isHL || this.isEmpNoAdmin
  }
  // 二级质控查看权限
  public get level2Watch() {
    return this.isZJ || this.isHL || this.isEmpNoAdmin || this.isSupervisorNurse
  }
  // 一级质控查看权限
  public get level1Watch() {
    return this.isZJ || this.isHL || this.isEmpNoAdmin || this.isSupervisorNurse || this.isRoleManage
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
