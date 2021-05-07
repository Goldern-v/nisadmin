export interface departType {
  "id"?: number,
  "dictCode"?: string,
  "name"?: string,
  "expand"?: string,
  "parentId"?: number,
  "children"?: departType[],

  [propName: string]: any
}
