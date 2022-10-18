import { observable, computed } from "mobx";
import moment from 'moment'

class DataClinialMonth {
	@observable public currentMonthDays = moment().daysInMonth();//这个月有几天，用于按键跳到下一个输入框
	@observable public month = moment().month() + 1; //yue份
	@observable public deptCode = "042202"; //科室
	@observable public year = moment() as undefined | moment.Moment; //年份
	@observable public deptName = ""; //科室名称

	// 月度汇总
	@computed
	get postObj() {
		return {
			deptCode: this.deptCode,//科室
			month: this.month > 9 ? this.month : '0' + this.month.toString(),
			year: this.year?.year(),
		};
	}

	focusNextIpt(e?: any) {
		if ((e.keyCode && e.keyCode == 13)) {
			let baseTableEl = document.getElementById('baseTable')
			if (baseTableEl) {
				let iptList = baseTableEl.querySelectorAll('input:enabled,textarea:enabled') as any

				for (let i = 0; i < iptList.length; i++) {
					let el = iptList[i]
					if (el == (e.target)) {
						if (iptList[i + this.currentMonthDays]) {
							iptList[i + this.currentMonthDays].focus && iptList[i + this.currentMonthDays].focus()
							iptList[i + this.currentMonthDays].click && iptList[i + this.currentMonthDays].click()
						}
						break
					}
				}
			}
		}
	}

}
	
export const dataClinialMonth = new DataClinialMonth();
