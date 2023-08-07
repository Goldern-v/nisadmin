import template2 from "./components/template2";
import template3 from "./components/template3";
import BaseInfo from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/baseInfo'
import Grade from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/grade'
import Summary from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/summary'
import { ICurCatalogue } from "./model";

/***
 * isSearch:是否需要查询
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

export const getConfig = (item: ICurCatalogue) => {
  const { templateType, tableName } = item
  let flag: string = templateType + ''
  if (templateType === 4) {
    flag += tableName
  }
  return config[flag]
}

