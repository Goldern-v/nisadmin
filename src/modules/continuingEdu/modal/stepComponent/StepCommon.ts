import { appStore } from 'src/stores'

export interface IStudentCreditType {
  name: string,
  code: number,
}
/**
 * 学习学分类型
 */
export const newStudentCreditTypeList: Array<IStudentCreditType> = appStore.hisMatch({
  map: {
    wh: [
      { name: "国家级", code: 1 },
      { name: "省级", code: 2 },
      { name: "市级", code: 3 },
    ],
    gxjb: [
      { name: "国家级", code: 1 },
      { name: "省级", code: 2 },
      { name: "市级", code: 3 },
      { name: "院级", code: 4 },
      { name: "科级", code: 5 },
      { name: "病区", code: 6 },
    ],
    whyx: [
      { name: "I级学分", code: 1 },
      { name: "II级学分", code: 2 },
    ],
    other: [
      { name: "院级学分", code: 1 },
      { name: "片区学分", code: 2 },
      { name: "病区学分", code: 3 },
    ],
  }
})
/**
 * 学习学分类型map
 */
// export const newStudentCreditTypeMap: any = {
//   1: "国家级",
//   2: "省级",
//   3: "市级"
// };
export const newStudentCreditTypeMap: any = appStore.hisMatch({
  map: {
    gxjb: {
      1: "国家级",
      2: "省级",
      3: "市级",
      4: "院级",
      5: "科级",
      6: "病区"
    },
    whyx: { 
      1: "I级学分", 
      2: "II级学分",
    },
    other: {
      1: "国家级",
      2: "省级",
      3: "市级"
    },
  }
});
