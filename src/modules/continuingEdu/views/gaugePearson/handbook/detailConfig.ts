import template2 from "./components/template2";
import template3 from "./components/template3";
import BaseInfo from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/baseInfo'
import Grade from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/grade'
import Summary from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/summary'
import { ICurCatalogue } from "./model";

const config = {
  1: template2,
  2: template2,
  3: template3,
  '4规培生基本信息': BaseInfo,
  '4岗前培训考核成绩': Grade,
  '4个人总结': Summary,
}

const getCon = (item: ICurCatalogue) => {
  const { templateType, tableName } = item
  let flag: string = templateType + ''
  if (templateType === 4) {
    flag += tableName
  }
  return config[flag]
}

export default {
  getCon
}