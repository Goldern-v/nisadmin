import { observable, computed } from "mobx";
import moment from 'moment'
class DatasSumMonth {
  @observable public month = moment().month() + 1; //yue份
	@observable public deptCode = "042202"; //科室
	@observable public year = moment() as undefined | moment.Moment; //年份
	@observable public deptName = ""; //科室名称
  @observable public footerText = "填表说明：1、本表每天由N班负责统计各项目数量，时间段为（16:00-16:00）；2、必须认真登记，签名。每月统计完毕于28日前以“OA”形式上报护理部。<br \>3、使用高危药物：氨茶碱针、10%氯化钾针、去乙酰毛花苷针、浓氯化钠针、右旋糖酐40氯化钠针、硫酸镁针、20%甘露醇针、肝素钠针、葡萄糖酸钙针盐酸多巴胺针、葡萄糖针(50%)、盐酸维拉帕米针、盐酸胺碘酮、硝酸甘油针、硝普钠、间羟胺、去甲肾上腺素、盐酸肾上腺素、异丙肾上腺素、酚妥拉明针、乌拉地尔针、普罗帕酮针、胰岛素、维库溴铵、缩宫素、羟乙基淀粉、蔗糖铁注射液、生长抑素、丙泊芬、丝裂霉素针。"; 

  @computed
	get postObj() {
		return {
			deptCode: this.deptCode,//科室
			month: this.month > 9 ? this.month : '0' + this.month.toString(),
			year: this.year?.year(),
		};
	}
}
export const datasSumMonth = new DatasSumMonth();