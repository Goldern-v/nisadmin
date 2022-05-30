import { SectionListItem } from "../AnalysisDetailModal";
import TextareaSection2 from "../components/textarea/section2";
import TextareaModal from "../components/textarea/modal";
import ImprovementProjectSection from "../components/improvement-project/section";
import ImprovementProjectModal from "../components/improvement-project/modal";
import LevelTitleSection from "../components/level-title/section";
import ProblemImpModal from "../components/ProblemImp/ProblemImpModal";
import ProblemImpSection from "../components/ProblemImp/ProblemImpSection";
import qualityIndexSection from "../components/qualityIndex/qualityIndexSection";
import qualityIndexModal from "../components/qualityIndex/qualityIndexModal";
import departmentResultSection from "../components/departmentResult/departmentResultSection";
import departmentResultModal from "../components/departmentResult/departmentResultModal";
import conclusionSection from "../components/conclusion/conclusionSection";
import conclusionModal from "../components/conclusion/conclusionModal";
import FileUploaderSection from "../components/file-upload/section";
import FileUploaderModal from "../components/file-upload/modal";
import planCompletionSection from "../components/planCompletion/planCompletionSection";
import planCompletionModal from "../components/planCompletion/planCompletionModal";
import tableSection from "../components/table/section";
import tableModal from "../components/table/modal";
// 二级质控汇总配置
export const sectionList: SectionListItem[] = [
  {
    sectionId: "1_1",
    sectionTitle: "一、上月护理质量问题改进反馈:",
    modalTitle: "上月护理质量问题改进反馈",
    data: {},
    keyName: "key1_1",
    async onSave(val: any) {
      (this as any).setSectionData("1_1", val);
    },
    section: ProblemImpSection,
    modal: ProblemImpModal,
  },
  {
    sectionId: "2",
    sectionTitle: "二、护理质量指标",
    modalTitle: "",
    keyName: "",
    section: LevelTitleSection,
  },
  {
    sectionId: "2_1",
    sectionTitle: "1、科室一级质量结果",
    modalTitle: "编辑质量指标",
    data: {},
    keyName: "key2_1",
    async onSave(val: any) {
      (this as any).setSectionData("2_1", [{}]);
    },
    section: qualityIndexSection,
    modal: qualityIndexModal,
  },
  {
    sectionId: "2_2",
    sectionTitle: "2、科室专科护理监测指标结果",
    modalTitle: "编辑监测指标结果",
    data: {},
    keyName: "key2_2",
    async onSave(val: any) {
      (this as any).setSectionData("2_2", [{}]);
    },
    section: departmentResultSection,
    modal: departmentResultModal,
  },
  {
    sectionId: "2_3",
    sectionTitle: "结论:",
    modalTitle: "编辑结论",
    data: {},
    keyName: "key2_2",
    async onSave(val: any) {
      (this as any).setSectionData("2_2", [{}]);
    },
    section: conclusionSection,
    modal: conclusionModal,
  },
  {
    sectionId: "3",
    sectionTitle: "三、本月工作完成情况",
    data: {
      level: 1,
    },
    section: LevelTitleSection,
  },
  {
    sectionId: "3_1",
    sectionTitle: "1、本月计划完成情况:",
    modalTitle: "编辑本月计划完成情况",
    data: {},
    async onSave(val: any) {
      (this as any).setSectionData("3_1", [{}]);
    },
    section: planCompletionSection,
    modal: planCompletionModal,
  },
  {
    sectionId: "3_3",
    sectionTitle: "3、本月计划完成情况:",
    modalTitle: "编辑本月计划完成情况",
    data: {
      list: [
        {
          tableDataId: '1',
          index: '4',
          mainProblem: '3',
          causeAnalysis: '2',
          correctiveMeasures: '1',
          evaluation: '0',
        }
      ],
      tempList: [
        {
          id: 30,
          reportTemplateId: 1,
          tableName: "deptNotPassIndexImprove",
          widgetType: "text",
          editable: 1,
          options: "",
          hidden: 1,
          fieldWidth: null,
          fieldIndex: 0,
          fieldName: "tableDataId",
          fieldComment: "表格行数据id",
        },
        {
          id: 18,
          reportTemplateId: 1,
          tableName: "deptNotPassIndexImprove",
          widgetType: "text",
          editable: 1,
          options: "",
          hidden: 0,
          fieldWidth: null,
          fieldIndex: 1,
          fieldName: "index",
          fieldComment: "指标",
        },
        {
          id: 19,
          reportTemplateId: 1,
          tableName: "deptNotPassIndexImprove",
          widgetType: "text",
          editable: 1,
          options: "",
          hidden: 0,
          fieldWidth: null,
          fieldIndex: 2,
          fieldName: "mainProblem",
          fieldComment: "主要问题",
        },
        {
          id: 20,
          reportTemplateId: 1,
          tableName: "deptNotPassIndexImprove",
          widgetType: "text",
          editable: 1,
          options: "",
          hidden: 0,
          fieldWidth: null,
          fieldIndex: 3,
          fieldName: "causeAnalysis",
          fieldComment: "原因分析",
        },
        {
          id: 21,
          reportTemplateId: 1,
          tableName: "deptNotPassIndexImprove",
          widgetType: "text",
          editable: 1,
          options: "",
          hidden: 0,
          fieldWidth: null,
          fieldIndex: 4,
          fieldName: "correctiveMeasures",
          fieldComment: "整改措施",
        },
        {
          id: 22,
          reportTemplateId: 1,
          tableName: "deptNotPassIndexImprove",
          widgetType: "text",
          editable: 1,
          options: "",
          hidden: 0,
          fieldWidth: null,
          fieldIndex: 5,
          fieldName: "evaluation",
          fieldComment: "效果评价",
        },
      ],
    },
    async onSave(val: any) {
      (this as any).setSectionData("3_3", val);
    },
    
    section: tableSection,
    modal: tableModal,
  },
  {
    sectionId: "4_4",
    sectionTitle:
      "4、主要护理问题改进方案：（安全隐患、发生频次高的问题等，每季度至少有一项改进）",
    modalTitle: "编辑主要护理问题改进方案",
    data: {},
    keyName: "",
    async onSave(val: any) {
      (this as any).setSectionData("4_4", val);
    },
    section: ImprovementProjectSection,
    modal: ImprovementProjectModal,
  },
  {
    sectionId: "4_8",
    sectionTitle: "5、特殊事件及需解决的问题",
    modalTitle: "编辑特殊事件及需解决的问题",
    data: {},
    keyName: "key4_8",
    async onSave(val: any) {
      (this as any).setSectionData("4_8", val);
    },
    section: TextareaSection2,
    modal: TextareaModal,
  },
  {
    sectionId: "4_0",
    sectionTitle: "四、现场图片",
    modalTitle: "编辑现场图片",
    keyName: "",
    data: {},
    async onSave(val: any) {
      (this as any).setSectionData("4_0", val);
    },
    section: FileUploaderSection,
    modal: FileUploaderModal,
  },
  {
    sectionId: "5",
    sectionTitle: "五、下月工作重点",
    modalTitle: "",
    keyName: "",
    section: LevelTitleSection,
  },
  {
    sectionId: "5_1",
    sectionTitle: "1、科室工作计划",
    modalTitle: "编辑科室工作计划",
    data: {},
    keyName: "key5_1",
    async onSave(val: any) {
      (this as any).setSectionData("5_1", val);
    },
    section: TextareaSection2,
    modal: TextareaModal,
  },
  {
    sectionId: "5_2",
    sectionTitle: "2、科室培训计划",
    modalTitle: "编辑科室培训计划",
    data: {},
    keyName: "key5_2",
    async onSave(val: any) {
      (this as any).setSectionData("5_2", val);
    },
    section: TextareaSection2,
    modal: TextareaModal,
  },
];
