import { tick } from "../function/click"
const tHead = {
  top: [
  // {
  //   name: '',
  //   style: {},
  //   colspan: "2",
  //   rowspan: "1",
  //   key: 'recordYear'
  // },
  // {
  //   name: `
  //   体温<br/>(℃)
  //   `,
  //   style: {},
  //   colspan: "1",
  //   rowspan: "3",
  // },
  // {
  //   name: `
  //   脉搏<br/>次/分
  //   `,
  //   style: {},
  //   colspan: "1",
  //   rowspan: "3",
  // },
  // {
  //   name: `
  //   心率<br/>次/分
  //   `,
  //   style: {},
  //   colspan: "1",
  //   rowspan: "3",
  // },
  // {
  //   name: `
  //   呼吸<br/>次/分
  //   `,
  //   colspan: "1",
  //   rowspan: "3"
  // },
  // {
  //   name: `
  //   血压
  //   `,
  //   colspan: "1",
  //   rowspan: "3"
  // },
  // {
  //   name: `
  //   意识
  //   `,
  //   colspan: "1",
  //   rowspan: "3"
  // },
  // {
  //   name: `
  //   SPO₂<br/>(%)
  //   `,
  //   colspan: "1",
  //   rowspan: "3"
  // },
  // {
  //   name: `
  //   入量
  //   `,
  //   colspan: "2",
  //   rowspan: "1",
  // },
  // {
  //   name: `
  //   出量
  //   `,
  //   colspan: "2",
  //   rowspan: "1",
  // },
  // {
  //   name: `健康教育`,
  //   colspan: "1",
  //   rowspan: "3",
  //   style: {
  //     minWidth: "103px",
  //     maxWidth: "103px"
  //   },
  // },
  // {
  //   name: `瞳孔`,
  //   style: {},
  //   colspan: "4",
  //   rowspan: "1",
  // },
  // {
  //   name: `吸氧<br/>升/分`,
  //   style: {},
  //   colspan: "1",
  //   rowspan: "3",
  // },
  // {
  //   name: `人工<br/>气道<br/>途径`,
  //   style: {},
  //   colspan: "1",
  //   rowspan: "3",
  // },
  // {
  //   name: `头痛`,
  //   style: {},
  //   colspan: "1",
  //   rowspan: "3",
  // },
  // {
  //   name: `指尖<br/>血糖<br/>mmol/L`,
  //   style: {},
  //   colspan: "1",
  //   rowspan: "3",
  // },
  // {
  //   name: `标题1`,
  //   colspan: "1",
  //   rowspan: "3",
  //   canSet: true,
  //   key: "fieldFive", //标题1
  //   style: {
  //     minWidth: "30px",
  //     maxWidth: "30px"
  //   }
  // },
  // {
  //   name: `标题2`,
  //   colspan: "1",
  //   rowspan: "3",
  //   canSet: true,
  //   key: "fieldSix", //标题2
  //   style: {
  //     minWidth: "30px",
  //     maxWidth: "30px"
  //   }
  // },
  // {
  //   name: `标题3`,
  //   colspan: "1",
  //   rowspan: "3",
  //   canSet: true,
  //   key: "fieldEight", //标题3
  //   style: {
  //     minWidth: "30px",
  //     maxWidth: "30px"
  //   }
  // },
  // {
  //   name: `标题4`,
  //   colspan: "1",
  //   rowspan: "3",
  //   canSet: true,
  //   key: "fieldNine", //标题4
  //   style: {
  //     minWidth: "30px",
  //     maxWidth: "30px"
  //   }
  // },
  // {
  //   name: `标题5`,
  //   colspan: "1",
  //   rowspan: "3",
  //   canSet: true,
  //   key: "fieldTen", //标题5
  //   style: {
  //     minWidth: "30px",
  //     maxWidth: "30px"
  //   }
  // },
  // {
  //   name: `
  //   特殊情况记录
  //   `,
  //   style: {
  //     minWidth: "153px",
  //     maxWidth: "153px"
  //   },
  //   colspan: "1",
  //   rowspan: "3"
  // },
  // {
  //   name: `
  //   记录人签名
  //   `,
  //   style: {
  //     minWidth: "80px",
  //     maxWidth: "80px"
  //   },
  //   colspan: "1",
  //   rowspan: "3"
  // },
  // {
  //   name: `
  //   质控护士签名
  //   `,

  //   colspan: "1",
  //   rowspan: "3"
  // }
  ],
  mid: [
  // {
  //   name: "日期",
  //   colspan: "1",
  //   rowspan: "2"
  // },
  // {
  //   name: "时间",
  //   colspan: "1",
  //   rowspan: "2"
  // }, {
  //   name: `
  //   名称
  //   `,
  //   colspan: "1",
  //   rowspan: "2",
  //   style: {
  //     minWidth: "65px",
  //     maxWidth: "65px"
  //   },
  // },
  // {
  //   name: `
  //   量<br/>ml
  //   `,
  //   colspan: "1",
  //   rowspan: "2",
  // },
  // {
  //   name: `
  //   名称
  //   `,
  //   colspan: "1",
  //   rowspan: "2",
  //   style: {
  //     minWidth: "65px",
  //     maxWidth: "65px"
  //   },
  // },
  // {
  //   name: `
  //   量<br/>ml
  //   `,
  //   colspan: "1",
  //   rowspan: "2",
  // },
  // {
  //   name: `
  //   直径<br/>(mm)
  //   `,
  //   colspan: "2",
  //   rowspan: "1",
  // },
  // {
  //   name: `
  //   对光<br/>反应
  //   `,
  //   colspan: "2",
  //   rowspan: "1",
  // },
  ],
  bottom: [
  // {
  //   name: `
  //   左
  //   `,
  //   colspan: "1",
  //   rowspan: "1",
  // },
  // {
  //   name: `
  //   右
  //   `,
  //   colspan: "1",
  //   rowspan: "1",
  // },
  // {
  //   name: `
  //   左
  //   `,
  //   colspan: "1",
  //   rowspan: "1",
  // },
  // {
  //   name: `
  //   右
  //   `,
  //   colspan: "1",
  //   rowspan: "1",
  // }
  ]
}
const tBody: any = [
  {
    key: "index",
    name: "序号",
    value: "",
    width: "100px",
  },
  {
    key: "what",
    name: "what",
    value: "",
    width: "100px",
  },
  {
    key: "why",
    name: "why",
    value: "",
    width: "100px",
  },
  {
    key: "where",
    name: "where",
    value: "",
    width: "100px",
  },
  {
    key: "who",
    name: "who",
    value: "",
    width: "100px",
  },
  {
    key: "when",
    name: "when",
    value: "",
    width: "100px",
  },
  {
    key: "how",
    name: "how",
    value: "",
    width: "100px",
  },
]

export default {
  defaulLength: 17,
  tableTitle: "月工作重点及周安排",
  tBody,
  tHead,
}