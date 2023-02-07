import { SelectItem } from "src/libs/types";

export const CONFIG = {
  1: {
    title: "护长夜查房评分记录",
    path: '/headNurNightRoundsRecordView',
    showExport: true,
    customColumns: [
      {
        title: "得分",
        dataIndex: "score",
        width: 80,
        align: "center",
      },
      {
        title: `检查人员`,
        dataIndex: `creatorName`,
        width: 80,
        align: "center",
      },
      {
        title: "值班护士",
        dataIndex: "onDutyNurseName",
        width: 80,
        align: "center",
      },
      {
        title: `值班护长`,
        dataIndex: "SR0001001",
        width: 80,
        align: "center",
      },
    ],
  },
  2: {
    title: "二值夜查房评分记录",
    path: '/nightRoundsRecordView',
    showExport: false,
    customColumns: [
      {
        title: "合格率",
        dataIndex: "score",
        width: 80,
        align: "center",
      },
      {
        title: `二值护士`,
        dataIndex: `creatorName`,
        width: 80,
        align: "center",
      },
    ],
  },
};

export const STATUS_LIST: SelectItem[] = [
  {
    label: '全部',
    value: '',
  },
  {
    label: "待提交",
    value: 0,
    color: "#e94033",
  },
  {
    label: "待护理部审核",
    value: 1,
    color: "#f4bd4a",
  },
  {
    label: "护理部审核已通过",
    value: 2,
    color: "#60ad91",
  },
];
