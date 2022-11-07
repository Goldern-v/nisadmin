/**
 * 判断数值是否为小数，是——返回many位小数，整数——返回整数
 * @param num 要判断的数值
 * @param many 要保留多少位小数，四舍五入
 * @returns 返回处理的值
 */
 export const numberFormat = (num:number,many:number)=>{
	if (!isNaN(num)) {
		return ((num + '').indexOf('.') !== -1) ? num.toFixed(many) : num;
	  }
  }