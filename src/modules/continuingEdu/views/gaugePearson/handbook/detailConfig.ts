import template2 from "./components/template2";
import template3 from "./components/template3";
import BaseInfo from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/baseInfo'
import Grade from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/grade'
import Summary from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/summary'
import { ICurCatalogue } from "./model";
import standardTraining from "./components/standardTraining";
import baseExam from "./components/baseExam";
import ClinicalEvaluation from "./components/ClinicalEvaluation";
import specialSkill from "./components/specialSkill";
import professionalism from "./components/professionalism";

/***
 * isSearch:是否需要查询
 * 
 */
export const config = {
  1: {
    isSearch: true,
    component: template2,
  },
  2: {
    isSearch: true,
    component: template2,
  },
  3: {
    isSearch: true,
    component: template3,
  },
  '4规培生基本信息': {
    isSearch: false,
    component: BaseInfo,
  },
  '4岗前培训考核成绩': {
    isSearch: true,
    component: Grade,
  },
  '4个人总结': {
    isSearch: true,
    component: Summary,
  },
}

export const configTemplate = {
  '护士规范化培训课表及实施记录': {
    isSearch: true,
    component: standardTraining,
  },
  '基础操作技能单项考核汇总表': {
    isSearch: true,
    component: baseExam,
  },
  '临床评定表': {
    isSearch: true,
    // Clinical evaluation
    component: ClinicalEvaluation,
  },
  '专项技能考核表': {
    isSearch: true,
    component: specialSkill,
  },
  '职业素质评定表': {
    isSearch: true,
    component: professionalism,
  },
}

export const getConfig = (item: ICurCatalogue) => {
  const { templateType, tableName } = item
  let flag: string = templateType + ''
  if (templateType === 4) {
    flag += tableName
  }else if(templateType === 1){
    return configTemplate[tableName]
  }
  return config[flag]
}

