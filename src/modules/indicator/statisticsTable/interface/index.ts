export interface IModal {
  name: string, // 名称
  isLoading: boolean, // loading状态
  selectedDate: string, //年份
  selectedDeptType: string,//科室
  deptList: any[], //科室列表
  tableColumn: any[], // 表格配置
  dataList: any[], //数据列表

  init: Function, // 初始化方法
  search: Function, // 查询方法
}

export interface IDataSource {
  denominatorDesc: string | undefined,
  indicatorCode: string| undefined,
}