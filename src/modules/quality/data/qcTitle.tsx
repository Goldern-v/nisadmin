import { appStore } from "src/stores";

export const qcOneTitle = appStore.hisMatch({
  map: {
    'nys': {
      leftNavTitle: '科级质量检查记录',
      listViewTitle: '科级质量检查',
    },
    other: {
      leftNavTitle: '一级质控记录',
      listViewTitle: '一级质控',
    },
  }
})

export const qcThreeTitle = appStore.hisMatch({
  map: {
    'nys': {
      leftNavTitle: ' 院级质量控制记录',
      listViewTitle: ' 院级质量控制',
    },
    other: {
      leftNavTitle: '三级质控记录',
      listViewTitle: '三级质控',
    },
  }
})