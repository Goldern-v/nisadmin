import { numToRmb } from "./numToRmb"

/** 一直夜班汇总方法 */
export const oneTableDataSumUp = (list1: any[], list2: any) => {
  let newList1 = [...list1]
  let newList2 = { ...list2 }

  let allMoney = 0 // 总金额汇总

  let allDaysP = 0 //一值P班 日期汇总
  let allMoneySimpleP = 0 //一值P班 金额汇总
  let allMoneyComplexP = '' //一值P班 金额汇总中文大写

  let allDaysN = 0 //一值N班 日期汇总
  let allMoneySimpleN = 0 //一值N班 金额汇总
  let allMoneyComplexN = '' //一值N班 金额汇总中文大写

  newList1.forEach((item: any) => {
    allDaysP += item.daysP
    allMoneySimpleP += item.moneyP

    allDaysN += item.daysN
    allMoneySimpleN += item.moneyN
  })

  allMoneySimpleP = parseInt((allMoneySimpleP * 100).toString()) / 100
  allMoneySimpleN = parseInt((allMoneySimpleN * 100).toString()) / 100

  allMoneyComplexP = numToRmb(allMoneySimpleP)
  allMoneyComplexN = numToRmb(allMoneySimpleN)

  allMoney = parseInt(((allMoneySimpleP + allMoneySimpleN) * 100).toString()) / 100

  newList2 = {
    ...newList2,
    allDaysP,
    allMoneySimpleP,
    allMoneyComplexP,
    allDaysN,
    allMoneySimpleN,
    allMoneyComplexN,
    allMoney,
  }

  return newList2
}

/** 突发回院汇总方法 */
export const twoTableDataSumUp = (list1: any[], list2: any) => {
  let newList1 = [...list1]
  let newList2 = { ...list2 }

  let allDays = 0
  let allMoneySimple = 0
  let allMoneyComplex = ''

  newList1.forEach((item: any) => {
    allDays += item.days
    allMoneySimple += item.money
  })

  allMoneySimple = parseInt((allMoneySimple * 100).toString()) / 100
  allMoneyComplex = numToRmb(allMoneySimple)

  newList2 = {
    ...newList2,
    allDays,
    allMoneySimple,
    allMoneyComplex,
  }

  return newList2
}