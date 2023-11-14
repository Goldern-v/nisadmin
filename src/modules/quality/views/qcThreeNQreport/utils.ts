import moment from "moment";
let nowMoment = moment()
export const handleReplace  = (type: string) => {
  const currMonth = nowMoment.month()+ 1  + '月'; //当前月份
  const currQuarter = Math.ceil(Number(nowMoment.month() + 1)  / 3)+ '季度'; //当前季度
  const currYear = Math.ceil(Number(nowMoment.month() + 1) / 6) == 1 ? '上半年': '下半年'; //当前季度
  let reportTypes = {
    '年度': '',
    '季度':  currQuarter ,
    '半年度': currYear,
    '月度': currMonth 
  }
  return reportTypes[type]
}

export const handleStartEenDate = (type: string, month: string, year: any ) => {
  if(!type) return {startDate:'' , endDate: ''}
  if(!month){
    month =  handleReplace(type) || '年度'
  }
  
  let qcTime = {
    '上半年': [1, 6],
    '下半年': [7, 12],
    '1季度': [1, 3],
    '2季度': [4, 6],
    '3季度': [7, 9],
    '4季度': [10, 12]
  }
  let startNewMoment ,lastNewMoment ;
  startNewMoment =  year.format("YYYY") + '-' + ( type == '月度'  ? month?.split('月')[0] : type != '年度' ? qcTime[month][0] : '');
  lastNewMoment =  year.format("YYYY") + '-' + ( type == '月度'  ? month?.split('月')[0] : type != '年度' ? qcTime[month][1] :'');
 
  
  // 第一天
  const firstDayOfQuarter =  moment(startNewMoment).startOf('month').format('YYYY-MM-DD');  
  // 最后一天
  const lastDayOfQuarter = moment(lastNewMoment).endOf('month').format('YYYY-MM-DD');  

  // 
  const startReportTypes = {
    '年度': moment(startNewMoment).startOf('year').format('YYYY-MM-DD'),
    '季度':  firstDayOfQuarter,
    '半年度': firstDayOfQuarter,
    '月度': moment(startNewMoment).startOf('month').format('YYYY-MM-DD')
  }
  const endReportTypes = {
    '年度': moment(lastNewMoment).endOf('year').format('YYYY-MM-DD'),
    '季度':  lastDayOfQuarter ,
    '半年度': lastDayOfQuarter,
    '月度': moment(lastNewMoment).endOf('month').format('YYYY-MM-DD') 
  }
  
  return {startDate:startReportTypes[type] , endDate: endReportTypes[type] } 
}