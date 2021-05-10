export interface departType {
  "id": number,
  "dictCode"?: string,
  "name"?: string,
  "expand"?: string,
  "expand2": number | string, // 用来存储层级
  "parentId"?: number,
  "children"?: departType[],

  [propName: string]: any
}
