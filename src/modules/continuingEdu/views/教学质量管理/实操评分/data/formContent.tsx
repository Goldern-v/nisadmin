

import 操作技术评分 from './../components/templates/操作技术评分'
import 个案护理发表评分表 from './../components/templates/个案护理发表评分表'
import 护士床边综合能力考核表 from './../components/templates/护士床边综合能力考核表'
import 临床护理小讲课比赛评分表 from './../components/templates/临床护理小讲课比赛评分表'
import 规范化培训护士工作情况调查表 from './../components/templates/规范化培训护士工作情况调查表'
import 新毕业生护士工作情况调查表 from './../components/templates/新毕业生护士工作情况调查表'

export const getTemplate = (practicalTableId?: string | number) => {
  let Template: (props: any) => JSX.Element = () => <span></span>

  switch (Number(practicalTableId)) {
    case 2:
      Template = 个案护理发表评分表
      break
    case 3:
      Template = 护士床边综合能力考核表
      break
    case 4:
      Template = 临床护理小讲课比赛评分表
      break
    case 5:
      Template = 规范化培训护士工作情况调查表
      break
    case 6:
      Template = 新毕业生护士工作情况调查表
      break
    default:
      Template = 操作技术评分
  }

  return Template
}