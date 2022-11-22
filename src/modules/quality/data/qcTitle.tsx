import { appStore } from "src/stores";

export const qcOneTitle = appStore.hisMatch({
  map: {
    nys: {
      leftNavTitle: "科级质量检查记录",
      listViewTitle: "科级质量检查",
      detailViewTitle: "科级质量检查",
    },
    other: {
      leftNavTitle: "一级质控记录",
      listViewTitle: "一级质控",
      detailViewTitle: "质控记录",
    },
  },
});

export const qcThreeTitle = appStore.hisMatch({
  map: {
    nys: {
      leftNavTitle: " 院级质量控制记录",
      listViewTitle: " 院级质量控制",
      detailViewTitle: "院级质量控制",
    },
    fssdy: {
      leftNavTitle: "专项检查记录",
      listViewTitle: "专项检查控制",
      detailViewTitle: "专项检查控制",
    },
    other: {
      leftNavTitle: "三级质控记录",
      listViewTitle: "三级质控",
      detailViewTitle: "质控记录",
    },
  },
});
// 护理部职能督导 by亚心
export const qcFunTitle = appStore.hisMatch({
  map: {
    "whyx,whhk": {
      leftNavTitle: "护理部职能督导",
      listViewTitle: "护理部职能督导",
      detailViewTitle: "质控记录",
    },
    other: {
      leftNavTitle: "护理部职能督导",
      listViewTitle: "护理部职能督导",
      detailViewTitle: "质控记录",
    },
  },
  vague:true,
});

export const navTitle = (qcLevel: string) => {
  switch (qcLevel) {
    case "1":
      return qcOneTitle.detailViewTitle;
    case "2":
      return "质控记录";
    case "3":
      return qcThreeTitle.detailViewTitle;
    case "护理部职能督导":
      return qcFunTitle.detailViewTitle;
    default:
      return "...";
  }
};
