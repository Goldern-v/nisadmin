import { tick } from "../function/click"
const tHead = {
  top: [
    {
      name: '日期',
      colspan: '1',
      rowspan: '3'
    },
    {
      name: '时间',
      colspan: '1',
      rowspan: '3'
    },
    {
      name: '神志',
      colspan: '1',
      rowspan: '3'
    },
    {
      name: '瞳孔',
      colspan: '4',
      rowspan: '1'
    },
    {
      name: '体温<br/>(℃)',
      colspan: '1',
      rowspan: '3',
    },
    {
      name: '心率<br/>(次/分)',
      colspan: '1',
      rowspan: '3',
    },
    {
      name: '血压<br/>(mmHg)',
      colspan: '1',
      rowspan: '3'
    },
    {
      name: '呼吸<br/>(次/分)',
      colspan: '1',
      rowspan: '3',
      
    },
    {
      name: 'SPO2',
      colspan: '1',
      rowspan: '3'
    },
    {
      name: '入量',
      colspan: '2',
      rowspan: '1',
    },
    {
      name: '出量',
      colspan: '2',
      rowspan: '1',
      canSet: false,
    },
    {
      name: '标题1',
      colspan: "1",
      rowspan: "3",
      canSet: true,
      key: "field22",
    },
    {
      name: '标题2',
      colspan: "1",
      rowspan: "3",
      canSet: true,
      key: "field23",
    },
    {
      name: '标题3',
      colspan: "1",
      rowspan: "3",
      canSet: true,
      key: "field24",
    },
    {
      name: '护理记录',
      colspan: '1',
      rowspan: '3',
    },
  ],
  mid: [
    {
      name: '左',
      colspan: '2',
      rowspan: '1',
    },
    {
      name: '右',
      colspan: '2',
      rowspan: '1',
    },
    {
      name: '项目',
      colspan: '1',
      rowspan: '2'
    },
    {
      name: '入量<br/>(ml)',
      colspan: '1',
      rowspan: '2',
    },
    {
      name: '项目',
      colspan: '1',
      rowspan: '2',
    },
    {
      name: '出量<br/>(ml)',
      colspan: '1',
      rowspan: '2',
    },
  ],
  bottom: [
    {
      name: '直径(mm)',
      colspan: '1',
      rowspan: '1',
    },
    {
      name: '光反应',
      colspan: '1',
      rowspan: '1',
    },
    {
      name: '直径(mm)',
      colspan: '1',
      rowspan: '1',
    },
    {
      name: '光反应',
      colspan: '1',
      rowspan: '1',
    },
  ]
}
const tBody:any = [
  // {
  //   key: "contractionOne",
  //   name: "时间",
  //   value: "",
  //   width: "100px",
  //   select: ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'],
  //   multiple: "/",
  // },
  // {
  //   key: "preInputOne",
  //   name: "一",
  //   value: "",
  //   width: "100px",
  //   select: ['但是格式的', '水电费第三方士大夫', '是大富大贵', '很过分', '华润广东', '爱我去', '表格内', 'SaaS', '按时的说法', '讽德诵功'],
  //   click: tick,
  // },
  // {
  //   key: "preInputTwo",
  //   name: "二",
  //   value: "",
  //   width: "100px",
  // },
  // {
  //   key: "uterineOne",
  //   name: "三",
  //   value: "",
  //   width: "100px",
  //   click: tick,
  // },
  // {
  //   key: "uterineTwo",
  //   name: "四",
  //   value: "",
  //   width: "100px",
  // },
  // {
  //   key: "uterineTwo",
  //   name: "四",
  //   value: "",
  //   width: "100px",
  // },
  // {
  //   key: "uterineTwo",
  //   name: "四",
  //   value: "",
  //   width: "100px",
  // },
  // {
  //   key: "uterineTwo",
  //   name: "四",
  //   value: "",
  //   width: "100px",
  // },
  // {
  //   key: "uterineTwo",
  //   name: "四",
  //   value: "",
  //   width: "100px",
  // },
  // {
  //   key: "uterineThree",
  //   name: "五",
  //   value: "",
  //   width: "100px",
// }
]

export default { 
  defaulLength: 17,
  tableTitle: "新生儿监护单",
  tBody,
  tHead,
}