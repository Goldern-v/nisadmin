import { SectionListItem } from "./../model/StarRatingReportEditModel";
import Line from "../components/common/Line";
import { appStore } from "src/stores";
import 标题模块 from "../components/标题/标题模块";
import 标题弹窗 from "../components/标题/标题弹窗";
import 夜班费上报表模块 from "../components/夜班费上报表/夜班费上报表模块";
import 夜班费上报表弹窗 from "../components/夜班费上报表/夜班费上报表弹窗";

export const sectionList: SectionListItem[] = [
  {
    sectionId: "报告名称",
    sectionTitle: "报告名称",
    modalTitle: "编辑报告名称",
    data: {},
    section: 标题模块,
    modal: 标题弹窗
  },
  {
    sectionId: "夜班费上报表",
    sectionTitle: "夜班费上报表",
    modalTitle: "编辑夜班费上报表",
    data: {},
    section: 夜班费上报表模块,
    modal: 夜班费上报表弹窗,
    modalWidth: ['nys', 'dghl', 'fqfybjy', 'gzsrm','sdlj', 'nfsd'].includes(appStore.HOSPITAL_ID) ? 1400 : 900
  }
];
