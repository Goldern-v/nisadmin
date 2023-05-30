import { Obj } from 'src/libs/types'
import { getMonthOfQuarter } from 'src/utils/date/season'

import TextareaModal from '../components/textarea/modal'
import TextareaSection from '../components/textarea/section'
import { SectionListItem } from '../model'
import { EXTRA_QUARTER } from '../../qcThreeMQSummary/enums'

import QC3MQ1Section from "../components/qc3M1/section";
import QC3MQ1Modal from "../components/qc3M1/modal";
import QcQ4Section from '../components/qcQ4/section'
import QcQ4Modal from '../components/qcQ4/modal'
// 三级质控季度汇总表
export const sectionList: SectionListItem[] = [
  {
    sectionId: "1",
    sectionTitle: "",
    modalTitle: "编辑",
    data: {},
    keyName: "explain",
    async onSave(val: any) {
      (this as any).setSectionData("1", val);
    },
    section: TextareaSection,
    modal: TextareaModal,
  },
  {
    sectionId: "2",
    sectionTitle: "一、总体情况",
    modalTitle: "编辑总体情况",
    data: {
      tableName: "qcScoreSum",
      imgIdx: 0,
    },
    config: {
      showEdit: false,
    },
    modalWidth: 1300,
    async onSave(val: any) {
      (this as any).setSectionData("2", val, (data: any) => {
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
    sectionId: "3",
    sectionTitle: "",
    modalTitle: "编辑表单名",
    data: {
      tableName: "qcFormSum",
    },
    config: {
      showEdit: false,
    },
    modalWidth: 1300,
    async onSave(val: any) {
      (this as any).setSectionData("4", val, (data: any) => {
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
    sectionId: "4",
    sectionTitle: "二、各质控组考校结果及原因分析",
    modalTitle: "编辑各质控组考校结果及原因分析",
    data: {
      tableName: 'qcResult',
    },
    async onSave(val: any) {
      (this as any).setSectionData("4", val);
    },
    section: QcQ4Section,
    modal: QcQ4Modal,
  },
  {
    sectionId: "5",
    sectionTitle: "三、改进措施",
    modalTitle: "编辑改进措施",
    data: {},
    keyName: "improvementMeasure",
    async onSave(val: any) {
      (this as any).setSectionData("5", val);
    },
    section: TextareaSection,
    modal: TextareaModal,
  }
];
