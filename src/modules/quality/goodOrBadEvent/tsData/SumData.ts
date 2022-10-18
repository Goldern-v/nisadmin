import { observable, computed } from "mobx";
import moment from 'moment'

class SumData {

  // 年份汇总数据
  @observable public deptCode = ""; //科室
  @observable public deptName = ""; //科室名称
  @observable public month = moment().month()+1; //yue份
  @observable public year = moment() as undefined | moment.Moment; //年份
  @observable public quarter = moment().quarter() as unknown; //季度
  
  // 年份汇总数据 end


  // 监听年变化，修改表头
  @computed get yearChange(){
    return this.year?.year()
  }
  // 科室年度汇总
  @computed get postObj(){
    return {
      year:this.year?.year(),
      deptCode:this.deptCode,
      month:this.month>9?this.month:'0'+this.month,
    }
  }

  @computed get deptNameChange(){
    return this.deptName
  }

  focusNextIpt(e?: any) {
		let baseTableEl = document.getElementById('baseTable')
		if (baseTableEl) {
			let iptList = baseTableEl.querySelectorAll('input:enabled') as any  //只计算了；input框
			if ((e.keyCode && (e.keyCode == 13 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40))) {
				for (let i = 0; i < iptList.length; i++) {
					let el = iptList[i]
					if (el == (e.target)) {
						if ((e.keyCode && e.keyCode == 37) && iptList[i - 1]){
							// ArrowLeft
							iptList[i - 1].focus && iptList[i - 1].focus()
							// iptList[i - 1].click && iptList[i - 1].click()
						}else if ((e.keyCode && e.keyCode == 39) && iptList[i + 1]){
							// ArrowRight
							iptList[i + 1].focus && iptList[i + 1].focus()
							// iptList[i + 1].click && iptList[i + 1].click()
						}else if (iptList[i + 8] && (e.keyCode == 13 || e.keyCode==40)) {
							// down enter
							iptList[i + 8].focus && iptList[i + 8].focus()
							// iptList[i + 8].click && iptList[i + 8].click()
						}else if (iptList[i - 8] && e.keyCode == 38) {
							// up
							iptList[i - 8].focus && iptList[i - 8].focus()
							// iptList[i - 8].click && iptList[i - 8].click()
						}
						break
					}
				}
			}
	}
}

// 合计的方向键盘 一行只有2个
focusNextIpt2(e?: any) {
	let baseTableEl = document.getElementById('baseTable')
	if (baseTableEl) {
		let iptList = baseTableEl.querySelectorAll('input:enabled') as any  //只计算了；input框
		if ((e.keyCode && (e.keyCode == 13 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40))) {
			for (let i = 0; i < iptList.length; i++) {
				let el = iptList[i]
				if (el == (e.target)) {
					if ((e.keyCode && e.keyCode == 37) && iptList[i - 1]){
						// ArrowLeft
						iptList[i - 1].focus && iptList[i - 1].focus()
						// iptList[i - 1].click && iptList[i - 1].click()
					}else if ((e.keyCode && e.keyCode == 39) && iptList[i + 1]){
						// ArrowRight
						iptList[i + 1].focus && iptList[i + 1].focus()
						// iptList[i + 1].click && iptList[i + 1].click()
					}else if (iptList[i + 2] && (e.keyCode == 13 || e.keyCode==40)) {
						// down enter
						iptList[i + 2].focus && iptList[i + 2].focus()
						// iptList[i + 8].click && iptList[i + 8].click()
					}else if (iptList[i - 2] && e.keyCode == 38) {
						// up
						iptList[i - 2].focus && iptList[i - 2].focus()
						// iptList[i - 8].click && iptList[i - 8].click()
					}
					break
				}
			}
		}
}
}
}
export const sumData = new SumData();