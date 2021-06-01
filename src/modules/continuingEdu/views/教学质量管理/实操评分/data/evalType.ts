export const evalTypeGroup = {
  '1': {
    name: '操作技术',
    formName: '操作技术',
    formList: [
      { code: 'czjspfb', name: '操作技术评分表' },
    ]
  },
  '2': {
    name: '临床能力',
    formName: '规培生评价调查表',
    formList: [
      { code: 'gahlfbpfb', name: '个案护理发表评分表' },
      { code: 'hscbzhnlkhpfb', name: '护士床边综合能力考核评分表' },
      { code: 'lchlxjkpfb', name: '临床护理小讲课评分表' },
    ]
  },
  '3': {
    name: '工作情况',
    formName: '护理教学质量巡查项目表',
    formList: [
      { code: 'hjyygfhpxhsgzqkdcb', name: '厚街医院规范化培训护士工作情况调查表' },
      { code: 'hjyyxbyhsgzqkdcb', name: '厚街医院新毕业护士工作情况调查表' },
    ]
  },
} as { [p: string]: any }