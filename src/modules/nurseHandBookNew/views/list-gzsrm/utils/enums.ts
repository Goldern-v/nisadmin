import { SelectItem } from "src/libs/types";
// -1已撤回、0待提交、1撤回中、2已提交
export const STATUS_LIST: SelectItem[] = [
  {
    label: '全部',
    value: '',
  },
  {
    label: "待提交",
    value: 0,
    color: "#26109f",
  },
  {
    label: "已提交",
    value: 2,
    color: "#86c2a0",
  },
  {
    label: "已撤回",
    value: -1,
    color: "#9c5d25",
  },
  {
    label: "撤回中",
    value: 1,
    color: "#98241b",
  },
];