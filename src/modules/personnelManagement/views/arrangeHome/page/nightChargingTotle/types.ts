//夜班统计对象
export interface INightThiftItem extends Record<string,any> {
  deptName: string;
  zghs: number;
  money: number;
  hggr: number;
  hs: number;
  zwzb: number;
  fzrhs: number;
}

//夜班统计金额
export interface INightThiftMoney extends Record<string,any> {
  zghs: number;
  money: number;
  hggr: number;
  hs: number;
  zwzb: number;
  fzrhs: number;
}