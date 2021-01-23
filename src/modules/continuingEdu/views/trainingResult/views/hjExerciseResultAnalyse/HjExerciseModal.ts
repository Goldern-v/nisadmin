import { observable, computed } from "mobx";
import { appStore } from "src/stores";
import { fileDownload } from "src/utils/file/file";
import { hjExerciseApi } from "./api/HjExerciseApi";

class HjExerciseModal {
  @observable public keyIdx = "0";

  @observable public statisticsTableList = [];
  @observable public statisticsTableLoading = false;
  @observable public statisticsPageIndex: any = 1;
  @observable public statisticsPageSize: any = 20;
  @observable public statisticsTotal: any = 0;

  @observable public analyseTableList = [];
  @observable public analyseTableLoading = false;
  @observable public analysePageIndex: any = 1;
  @observable public analysePageSize: any = 20;
  @observable public analyseTotal: any = 0;

  @observable public excelTableListByScoresSection = [];
  @observable public scoresSectionImgYuan = "";
  @observable public scoresSectionImgZhu = "";

  @observable public excelTableListByHierarchy = [];
  @observable public hierarchyImg = "";
  @observable public hierarchyImgYuan = "";
  @observable public hierarchyImgZhu = "";

  @observable public excelTableListByTitle = [];
  @observable public titleImg = "";
  @observable public titleImgYuan = "";
  @observable public titleImgZhu = "";

  @observable public excelTableListByDept = [];
  @observable public deptImg = "";
  @observable public deptImgYuan = "";
  @observable public deptImgZhu = "";

  @observable public excelTableLoading = false;

  @computed
  get postStatisticsObj() {
    return {
      cetpId: appStore.queryObj.id,
      pageSize: this.statisticsPageSize,
      pageIndex: this.statisticsPageIndex
    };
  }

  @computed
  get postAnalyseObj() {
    return {
      cetpId: appStore.queryObj.id,
      pageSize: this.analysePageSize,
      pageIndex: this.analysePageIndex
    };
  }

  // 统计初始化数据
  statisticsOnload() {
    this.statisticsTableLoading = true;
    hjExerciseApi
      .queryExerciseResultStatsByPage(this.postStatisticsObj)
      .then(res => {
        this.statisticsTableLoading = false;
        this.statisticsTableList = res.data.list;
        this.statisticsTotal = res.data.totalCount;
        this.statisticsPageIndex = res.data.pageIndex;
        this.statisticsPageSize = res.data.pageSize;
      });
  }

  // 分析初始化数据
  analyseOnload() {
    this.analyseTableLoading = true;
    hjExerciseApi
      .queryExerciseResultAnalyseByPage(this.postAnalyseObj)
      .then(res => {
        this.analyseTableLoading = false;
        this.analyseTableList = res.data.list;
        this.analyseTotal = res.data.totalCount;
        this.analysePageIndex = res.data.pageIndex;
        this.analysePageSize = res.data.pageSize;
      });
  }

  // 报表按成绩
  excelOnloadByScoresSection() {
    hjExerciseApi
      .queryExerciseResultAnalyseReportByScoresSection(appStore.queryObj.id)
      .then(res => {
        this.excelTableListByScoresSection = res.data;
      });
  }
  // 报表按层级
  excelOnloadByHierarchy() {
    hjExerciseApi
      .queryExerciseResultAnalyseReportByHierarch(appStore.queryObj.id)
      .then(res => {
        this.excelTableListByHierarchy = res.data;
      });
  }
  // 报表按职称
  excelOnloadByTitle() {
    hjExerciseApi
      .queryExerciseResultAnalyseReportByTitle(appStore.queryObj.id)
      .then(res => {
        this.excelTableListByTitle = res.data;
      });
  }
  // 报表按科室
  excelOnloadByDept() {
    hjExerciseApi
      .queryExerciseResultAnalyseReportByDept(appStore.queryObj.id)
      .then(res => {
        this.excelTableListByDept = res.data;
      });
  }
  excelAll() {
    this.excelOnloadByDept();
    this.excelOnloadByTitle();
    this.excelOnloadByHierarchy();
    this.excelOnloadByScoresSection();
  }
  async excelInit() {
    this.excelTableLoading = true;
    await this.excelAll();
    this.excelTableLoading = false;
  }

  //导出Excel
  export() {
    const urlNameArr: any = [
      "exportExerciseResultStats",
      "exportExerciseResultAnalyse",
      "exportExerciseResultAnalyseReport"
    ];
    let urlName = urlNameArr[this.keyIdx];
    hjExerciseApi.exportExam(appStore.queryObj.id, urlName).then(res => {
      fileDownload(res);
    });
  }
}

export const hjExerciseModal = new HjExerciseModal();
