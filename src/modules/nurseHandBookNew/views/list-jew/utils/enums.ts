import { SelectItem } from "src/libs/types";

/**
 * 临邑
 * 状态列表
 * -1被驳回、0待提交、1待审核、2已完成 */
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
    label: "待审核",
    value: 1,
    color: "#98241b",
  },
  {
    label: "已完成",
    value: 2,
    color: "#86c2a0",
  },
  {
    label: "已驳回",
    value: -1,
    color: "#9c5d25",
  },
];
