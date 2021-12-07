import { tick } from "../function/click"
const tHead = {
  top: [
    {
      name: "顶部表头",
      colspan: "2",
      rowspan: "1",
    }
  ],
  mid: [
    {
      name: "中部表头1",
      colspan: "1",
      rowspan: "1",
      style: {
        width: 35
      }
    },
    {
      name: "中部表头2",
      colspan: "1",
      rowspan: "1",
      style: {
        width: 35
      }
    },
  ],
  bottom: [
    // {
    //   name: "底部表头1",
    //   colspan: "1",
    //   rowspan: "1",
    //   style: {
    //     width: 35
    //   }
    // },
    // {
    //   name: "底部表头2",
    //   colspan: "1",
    //   rowspan: "1",
    //   style: {
    //     width: 35
    //   }
    // },
    // {
    //   name: "底部表头3",
    //   colspan: "1",
    //   rowspan: "1",
    //   style: {
    //     width: 35
    //   }
    // },
    // {
    //   name: "底部表头4",
    //   colspan: "1",
    //   rowspan: "1",
    //   style: {
    //     width: 35
    //   }
    // },
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
    width: 35
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