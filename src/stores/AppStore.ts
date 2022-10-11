import { action, observable, computed } from "mobx";
import * as H from "history";
import * as reactRouter from "react-router";
import qs from "qs";

/**
 * 全局加载对象
 * @param duration 预计加载完成毫秒数
 * @param aside 描述
 * @param progress 进度
 * @param isFullpage 是否全屏
 */
interface FullLoadingBarObj {
  duration?: number;
  aside: string;
  progress?: string;
  isFullpage?: boolean;
}

type hisIds = "hj" | "wh" | "ys" | "nys" | "dzlc" | "gzhd" | "lcey" | "germ" | "jmfy" | "dghl" | "dgxg" | "yczyy" | "nfzxy" | "xzsn" | "fqfybjy" | "wjgdszd" | "bhsrm" | "qzxyy" | "fssdy" | "gxjb" | "fsxt" | "whyx" | "gzsrm" | "sdlj" | "lyrm" | "gdtj" | "whfk" | "lyyz" | "qhwy" | "whsl" | "zzwy" | "ytll" | "zhzxy" | 'whhk' | 'nfsd';
// type HisAdapterMap = { [p in hisIds]?: any };
type HisAdapterMap = Record<string, any>;

export default class AppStore {
  public constructor() {
    this.isExpand = (localStorage.getItem("isExpand") as any) || "1";
    this.appToken = "51e827c9-d80e-40a1-a95a-1edc257596e7";
    window.onresize = () => {
      this.wih = window.innerHeight;
      this.wid = window.innerWidth;
    };
  }

  @observable public isExpand: "1" | "0" = "1";
  @observable private appToken: string | null = null;

  /** 开发环境 true-开发  false-生产*/
  @observable public isDev: boolean =
    process.env.NODE_ENV === "development" ||
    window.location.port == "34022" || //武汉测试环境
    window.location.port == "9093" ||
    window.location.hostname == "localhost" ||
    window.location.hostname == "192.168.1.54" || //公司测试环境
    window.location.hostname == "info.cr-health.com" //公司测试环境

  @observable public isDevelopment: boolean = process.env.NODE_ENV === "development"
  //是否是
  @observable public onlyBadEvent: boolean = !!process.env.REACT_APP_ONLY_BAD_EVENT

  /** 路由控制器 */
  @observable public history!: H.History;
  @observable public match!: reactRouter.match<any>;
  @observable public location!: H.Location<any>;
  /** 页面高度 */
  @observable public wih: number = window.innerHeight;
  /** 页面宽度 */
  @observable public wid: number = window.innerWidth;

  /** 医院id */
  @observable public HOSPITAL_ID: hisIds = process.env
    .REACT_APP_HOSPITAL_ID as hisIds;
  /** 医院名称 */
  @observable public HOSPITAL_Name = process.env.REACT_APP_HOSPITAL_NAME;
  /** 全局进度条 */
  @observable public fullLoadingBarObj: FullLoadingBarObj | null = null;

  /** 医院别名（简称）*/
  @observable public hospitalOtherName: string | undefined = process.env.REACT_APP_OTHER_NAME;
  /**
   * 医院密码校验规则
   * flag 是否开启
   * rule 校验规则
   * ruleMsg 失败提示
   */
  @observable public pwdRule: Record<string, any> = { flag: false }
  /** url 参数 */
  @computed
  public get HOSPITAL_LOGO() {
    if (this.onlyBadEvent) {
      //不良事件系统登录界面显示单独的logo
      if (window.location.hash.match('login'))
        return require("src/assets/images/不良事件logo2.png")

      return require("src/assets/images/BadEventLogo.svg")
    }

    if (process.env.REACT_APP_BLANK_DEMO)
      return require("src/assets/images/logo.png")

    let logoUrl = require("src/assets/images/logo.png");
    switch (this.HOSPITAL_ID) {
      case "wh":
        logoUrl = require("src/assets/images/武汉logo.png");
        break;
      case "hj":
        logoUrl = require("src/assets/images/厚街logo.png");
        break;
      case "nys":
        logoUrl = require("src/assets/images/南医三logo.png");
        break;
      case "dgxg":
        logoUrl = require("src/assets/images/东莞谢岗.png");
        break;
      case "nfzxy":
        logoUrl = require("src/assets/images/南方中西医logo.png")
        break;
      case "gzsrm":
        logoUrl = require("src/assets/images/贵州省人民医院.png")
        break;
      case "dgxg":
        logoUrl = require("src/assets/images/东莞谢岗.png");
        break;
      case "lcey":
        // logoUrl = require("src/assets/images/lcey_logo.jpg");
        logoUrl = require("src/assets/images/liaocheng_logo.png");
        break;
      case "gzhd":
        logoUrl = require(`src/assets/images/${this.HOSPITAL_ID}Logo.png`);
        break;
      case "whyx":
        logoUrl = require(`src/assets/images/${this.HOSPITAL_ID}Logo.png`);
        break;
      case "lyrm":
        logoUrl = require(`src/assets/images/${this.HOSPITAL_ID}Logo.png`);
        break;
      case "gdtj":
        logoUrl = require(`src/assets/images/${this.HOSPITAL_ID}Logo.jpg`);
        break;
      case "whsl":
        logoUrl = require(`src/assets/images/${this.HOSPITAL_ID}Logo.png`);
        break;
      case "zzwy":
        logoUrl = require(`src/assets/images/${this.HOSPITAL_ID}Logo.jpg`);
        break;
      case "zhzxy":
        logoUrl = require(`src/assets/images/${this.HOSPITAL_ID}Logo.png`);
      default:
        break;
    }
    return logoUrl;
  }

  /** url 参数 */
  @computed
  public get query() {
    try {
      return this.location.search.substr(1);
    } catch (error) {
      return "";
    }
  }

  @computed
  public get queryObj() {
    try {
      return qs.parse(this.location.search.substr(1));
    } catch (error) {
      return {};
    }
  }

  @computed
  public get selfNurseFile() {
    /* 护理档案详情判断是否是在我的档案模块中查看 */
    return this.match.path == '/selfNurseFile/:type'
  }

  @action
  public setExpand = (isExpand: "1" | "0") => {
    this.isExpand = isExpand;
    localStorage.setItem("isExpand", isExpand);
  };

  @action
  public getAppToken = () => {
    return this.appToken;
  };

  /** 打开全局进度条 */
  openFullLoadingBar(option: FullLoadingBarObj) {
    this.fullLoadingBarObj = option;
  }

  /**
   * 关闭全局进度条
   * @param okText 状态
   * @param options.delay 关闭延时
   */
  closeFullLoadingBar(okText?: string, options?: {
    delay: number
  }) {
    const { delay } = options || {}

    return new Promise<void>((resolve, reject) => {
      this.openFullLoadingBar({
        aside:
          okText ||
          (this.fullLoadingBarObj ? this.fullLoadingBarObj.aside : ""),
        progress: "100%"
      });
      setTimeout(() => {
        this.fullLoadingBarObj = null;
        resolve();
      }, delay || 200);
    });
  }

  /** 关闭全局进度条 */
  closeFullLoadingBarInFail(failText?: string) {
    return new Promise<void>((resolve, reject) => {
      this.openFullLoadingBar({
        aside: failText || "出现错误",
        progress: "0%"
      });
      setTimeout(() => {
        this.fullLoadingBarObj = null;
        resolve();
      }, 200);
    });
  }

  /** 医院适配器 用于区分医院适配不同的操作 */
  hisAdapter(hisAdapterMap: HisAdapterMap, vague = false) {
    if (vague) {
      for (let hospitalId in hisAdapterMap) {
        if (hospitalId.split(',').indexOf(this.HOSPITAL_ID) >= 0)
          return hisAdapterMap[hospitalId]()
      }
      if (hisAdapterMap[Object.keys(hisAdapterMap)[0] as hisIds])
        return hisAdapterMap[Object.keys(hisAdapterMap)[0] as hisIds]();
    }
    if (hisAdapterMap[this.HOSPITAL_ID] !== undefined)
      return hisAdapterMap[this.HOSPITAL_ID]();
    if (hisAdapterMap[Object.keys(hisAdapterMap)[0] as hisIds])
      return hisAdapterMap[Object.keys(hisAdapterMap)[0] as hisIds]();
    return "";
  }

  /**适配医院和状态 返回对应的内容*/
  public hisMatch(config: {
    map: {
      /**默认选项 other */
      other?: any,
      /**默认选项 all */
      all?: any,
      /**默认选项 default */
      default?: any,
      [p: string]: any
    },
    /**当前医院id或状态 默认为系统医院id*/
    currentHospitalId?: string,
    /**是否可以归类 */
    vague?: boolean
  }) {
    const { map, currentHospitalId, vague } = config
    let _currentHospitalId = currentHospitalId || this.HOSPITAL_ID as string
    if (vague) {
      for (let hospitalId in map) {
        if (hospitalId.split(',').indexOf(_currentHospitalId) >= 0)
          return map[hospitalId]
      }
    } else {
      if (Object.keys(map).indexOf(_currentHospitalId) >= 0) return map[_currentHospitalId]
    }

    return map["other"] || map["all"] || map["default"] || null
  }
}
