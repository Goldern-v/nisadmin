import { action, observable, computed } from "mobx";
import * as H from "history";
import { match } from "react-router";
import qs from "qs";

interface FullLoadingBarObj {
  /** 预计加载完成毫秒数 */
  duration?: number;
  /** 描述 */
  aside: string;
  progress?: string;
  isFullpage?: boolean;
}

type hisIds = "hj" | "wh" | "ys" | "nys";
type HisAdapterMap = { [p in hisIds]?: any };

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
    window.location.port == "34002" ||
    window.location.port == "9093" ||
    window.location.port == "9864" ||
    window.location.port == "9866";

  /** 路由控制器 */
  @observable public history!: H.History;
  @observable public match!: match<any>;
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

  /** url 参数 */
  @computed
  public get HOSPITAL_LOGO() {
    if (this.HOSPITAL_ID == "wh") {
      return require("src/assets/images/武汉logo.png");
    } else if (this.HOSPITAL_ID == "hj") {
      return require("src/assets/images/厚街logo.png");
    } else if (this.HOSPITAL_ID == "nys") {
      return require("src/assets/images/南医三logo.png");
    } else {
      return require("src/assets/images/厚街logo.png");
    }
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
  /** 关闭全局进度条 */
  closeFullLoadingBar(okText?: string) {
    return new Promise((resolve, reject) => {
      this.openFullLoadingBar({
        aside:
          okText ||
          (this.fullLoadingBarObj ? this.fullLoadingBarObj.aside : ""),
        progress: "100%"
      });
      setTimeout(() => {
        this.fullLoadingBarObj = null;
        resolve();
      }, 200);
    });
  }
  /** 关闭全局进度条 */
  closeFullLoadingBarInFail(failText?: string) {
    return new Promise((resolve, reject) => {
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
  hisAdapter(hisAdapterMap: HisAdapterMap) {
    if (hisAdapterMap[this.HOSPITAL_ID] !== undefined)
      return hisAdapterMap[this.HOSPITAL_ID]();
    if (hisAdapterMap[Object.keys(hisAdapterMap)[0] as hisIds])
      return hisAdapterMap[Object.keys(hisAdapterMap)[0] as hisIds]();
    return "";
  }
}
