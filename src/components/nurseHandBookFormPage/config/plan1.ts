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
    key: 'key1',
    value: "",
    width: 35
  },
  {
    key: 'key2',
    value: "",
    width: 35
  },
  // {
  //   key: 'key3',
  //   value: "",
  //   width: 35
  // },
  // {
  //   key: 'key4',
  //   value: "",
  //   width: 35
  // }
]

export default {
  defaulLength: 17,
  tableTitle: "新生儿监护单",
  tBody,
  tHead,
}