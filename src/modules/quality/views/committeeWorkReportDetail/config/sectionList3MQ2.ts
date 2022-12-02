import TextareaModal from "../components/textarea/modal";
import TextareaSection from "../components/textarea/section";
import { SectionListItem } from "../model";
import QC3MQ1Section from "../components/qc3M1/section";
import QC3MQ1Modal from "../components/qc3M1/modal";
import { Obj } from "src/libs/types";
import { getMonthOfQuarter } from "src/utils/date/season";
import { EXTRA_QUARTER } from "../../qcThreeMQSummary/enums";
// 三级质控季度汇总表
export const sectionList: SectionListItem[] = [
  {
    sectionId: "1",
    sectionTitle: "一、质控分数",
    modalTitle: "编辑质控分数",
    data: {
      tableName: "qcScoreSum",
    },
    modalWidth: 1300,
    async onSave(val: any) {
      (this as any).setSectionData("1", val, (data: any) => {
        const self = this;
        const { reportQuarter } = self.allData.pageInfo;
        const curMonthList: string[] = getMonthOfQuarter(
          Number(reportQuarter) - 1
        );
        // 增加平均分
        curMonthList.push("平均分");

        let list: Obj[] = [];
        data.forEach((v: Obj) => {
          const { deptName, deptCode } = v;
          curMonthList.forEach((v1, i) => {
            list.push({
              deptCode,
              deptName,
              score: v["score" + i],
              month: v1,
            });
          });
        });
        return list;
      });
    },
    section: QC3MQ1Section,
    modal: QC3MQ1Modal,
  },
  {
    sectionId: "2",
    sectionTitle: "二、表单名",
    modalTitle: "编辑表单名",
    data: {
      tableName: "qcFormSum",
    },
    modalWidth: 1300,
    async onSave(val: any) {
      (this as any).setSectionData("2", val, (data: any) => {
        const self = this;
        const {
          summaryFormCode,
          summaryFormName,
          reportQuarter,
          templateName,
        } = self.allData.pageInfo;
        const codeList: string[] = summaryFormCode.split(",");
        const nameList: string[] = summaryFormName.split(",");
        const curMonthList: string[] = getMonthOfQuarter(
          Number(reportQuarter) - 1
        );
        // 增加平均分
        curMonthList.push("平均分");
        if (codeList.length === 1 && templateName !== EXTRA_QUARTER) return data;
        let list: Obj[] = [];
        data.forEach((v: Obj) => {
          const { deptName, deptCode } = v;
          codeList.forEach((v1, i) => {
            if (templateName === EXTRA_QUARTER) {
              curMonthList.forEach((v2, i2) => {
                list.push({
                  deptCode,
                  deptName,
                  score: v[`score${i}-${i2}`],
                  month: v2,
                  formCode: v1,
                  formName: nameList[i] || "",
                })
              })
            } else {
              list.push({
                deptCode,
                deptName,
                score: v["score" + i],
                formCode: v1,
                formName: nameList[i] || "",
              });
            }
          });
        });
        return list;
      });
    },
    section: QC3MQ1Section,
    modal: QC3MQ1Modal,
  },
  {
    sectionId: "3",
    sectionTitle: "（一）检查时间",
    modalTitle: "编辑检查时间",
    data: {},
    keyName: "checkTime",
    async onSave(val: any) {
      (this as any).setSectionData("3", val);
    },
    section: TextareaSection,
    modal: TextareaModal,
  },
  {
    sectionId: "4",
    sectionTitle: "（二）检查科室",
    modalTitle: "编辑检查科室",
    data: {},
    keyName: "checkDept",
    async onSave(val: any) {
      (this as any).setSectionData("4", val);
    },
    section: TextareaSection,
    modal: TextareaModal,
  },
  {
    sectionId: "5",
    sectionTitle: "（三）检查人员",
    modalTitle: "编辑检查人员",
    data: {},
    keyName: "checkPeople",
    async onSave(val: any) {
      (this as any).setSectionData("5", val);
    },
    section: TextareaSection,
    modal: TextareaModal,
  },
  {
    sectionId: "6",
    sectionTitle: "（四）检查反馈",
    modalTitle: "编辑检查反馈",
    data: {},
    keyName: "checkFeedback",
    async onSave(val: any) {
      (this as any).setSectionData("6", val);
    },
    section: TextareaSection,
    modal: TextareaModal,
  },
  {
    sectionId: "7",
    sectionTitle: "原因分析",
    modalTitle: "编辑原因分析",
    data: {},
    keyName: "reasonAnalysis",
    async onSave(val: any) {
      (this as any).setSectionData("7", val);
    },
    section: TextareaSection,
    modal: TextareaModal,
  },
  {
    sectionId: "8",
    sectionTitle: "整改措施",
    modalTitle: "编辑整改措施",
    data: {},
    keyName: "correctiveMeasures",
    async onSave(val: any) {
      (this as any).setSectionData("8", val);
    },
    section: TextareaSection,
    modal: TextareaModal,
  },
];
