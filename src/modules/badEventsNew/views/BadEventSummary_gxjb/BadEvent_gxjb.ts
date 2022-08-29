import { observable, computed } from "mobx";
import { fileDownload } from "src/utils/file/file";
import moment from 'moment';
import { badEventApi_gxjb } from "./api";

class BadEvent_gxjb {
	// 不良事件分类汇总表
	@observable public eventTypeList = []//类型列表
	@observable public eventType = { key: 'B0032', label: '跌倒/坠床' } //选中的汇总类型
	@observable public currentQuarter = moment().quarter() //当前季度
	@observable public deptList = []//科室列表
	@observable public selectDept = {key:'',label:'全部'}//选中的科室
	@observable public tableList = []; //表格内容
	@observable public tableLoading = false; //表格loading
	@observable public pageIndex: any = 1; //页码
	@observable public pageSize: any = 20; //每页大小
	@observable public total: any = 0; //总条数
	@observable public typeListByEventType=[{code:'',name:'全部'},{code:'跌倒',name:'跌倒'},{code:'坠床',name:'坠床'}]//跌倒坠床，其它的二级分类
	@observable public typeListByEventTypeSelect = {key:'',label:'全部'}//跌倒坠床，其它的二级分类的code
	@observable public otherTypeList=[
		{code:'',name:'全部'},
		{code:'烫伤',name:'烫伤'},
		{code:'冻伤',name:'冻伤'},
		{code:'标本采集错误',name:'标本采集错误'},
		{code:'输血相关事件',name:'输血相关事件'},
		{code:'患者走失',name:'患者走失'},
		{code:'护理投诉',name:'护理投诉'},
		{code:'其他',name:'其他'},
	]
	@computed get searchByTypeParams() {
		return {
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			formCode: this.eventType.label=='全部'?'':this.eventType.key,
			badEventType: this.typeListByEventTypeSelect.key,
			deptCode: this.selectDept.key,
			startDateStr: moment().quarter(this.currentQuarter).startOf('quarter').format('YYYY-MM-DD'),
			endDateStr: moment().quarter(this.currentQuarter).endOf('quarter').format('YYYY-MM-DD')
		}
	}
	/** 获取表格数据 */
	onload() {
		this.tableLoading = true;
		badEventApi_gxjb.getTableList(this.searchByTypeParams).then(res => {
			this.tableLoading = false;
			this.tableList = res.data.list;
			this.total = res.data.totalCount;
			this.pageIndex = res.data.pageIndex;
			this.pageSize = res.data.pageSize;
		}).catch(err=>{
			this.tableLoading = false;
		});
	}

	/** 导出Excel */
	export() {
		badEventApi_gxjb.exportClassificationSummary({
			"formCode": this.eventType.label=='全部'?'':this.eventType.key,
			"badEventType": this.eventType.key,
			"deptCode": this.selectDept.key,
			"startDateStr": moment().quarter(this.currentQuarter).startOf('quarter').format('YYYY-MM-DD'),
			"endDateStr": moment().quarter(this.currentQuarter).endOf('quarter').format('YYYY-MM-DD')
		}).then(res => {
		  fileDownload(res);
		});
	}


	// 获取科室
	getnursingDept() {
		if (this.deptList.length > 1) return

		badEventApi_gxjb.getnursingDeptRole().then(res => {
			console.log(res.data)
			let deptListall = [];
			deptListall = res.data.deptList || []
			deptListall.unshift({ code: '', name: '全部' })
			this.deptList = deptListall
		}).catch(err => {

		})
	}
	/**类型字典 */
	getDictList() {
		if (this.eventTypeList.length > 0) {
			return false
		}
		badEventApi_gxjb.getDictItemList().then(res => {
			this.eventType = { key: res.data[0].code, label: res.data[0].name }
			this.eventTypeList = res.data
		}).catch(err => {

		})
	}

	init() {
		// 初始化数据
		this.currentQuarter = moment().quarter()
		this.getnursingDept()
		this.getDictList()
		this.onload();
	}

	/** 选择分类时，会切换不同的表头*/
	chageColumn(code:string){
		switch (code) {
			case 'B0032':
				this.columnLast=this.columnChangeB0032
				this.typeListByEventType=[{code:'',name:'全部'},{code:'跌倒',name:'跌倒'},{code:'坠床',name:'坠床'}]
				this.typeListByEventTypeSelect = {key:'',label:'全部'}
				break;
			case 'B0033':
				this.columnLast=this.columnChangeB0033
				break;
			case 'B0034':
				this.columnLast=this.columnChangeB0034
				break;
			case 'B0035':
				this.columnLast=this.columnChangeB0035
				break;
			case 'B0036':
				this.columnLast=this.columnChangeB0036
				break;
			case 'B0037':
				this.columnLast=this.columnChangeB0037
				this.typeListByEventType=this.otherTypeList
				this.typeListByEventTypeSelect = {key:'',label:'全部'}
				break;
			default:
				break;
		 }
	}

	
	// 分类汇总表头左边不变的列
	@observable public columnFixedList: any = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => index + 1,
			align: "center",
			width: 30,
			// fixed:'left',
		},
		{
			title: "事件发生科室",
			dataIndex: "deptName",
			align: "center",
			width: 100,
			// fixed:'left',
		},
		{
			title: "不良事件类型",
			dataIndex: "badEventType",
			align: "center",
			width: 100
		},
		{
			title: "事件发生对象的姓名",
			dataIndex: "patientName",
			align: "center",
			width: 100
		},
		{
			title: "病案号",
			dataIndex: "inHospitalNo",
			align: "center",
			width: 60
		}
	]; 
	// 根据分类配置不同的表头-跌倒/坠床-B0032
	@observable public columnChangeB0032: any = [
		{
			title: "年龄",
			dataIndex: "age",
			align: "center",
			width: 40
		},
		{
			title: "诊断",
			dataIndex: "diagnosis",
			align: "center",
			width: 100
		},
		{
			title: "风跌倒/坠床风险评估结果",
			dataIndex: "ddzcfxpgjg",
			align: "center",
			width: 100
		},

		{
			title: "Barthel指数评定结果",
			dataIndex: "barthelAssess",
			align: "center",
			width: 80
		},
		{
			title: "事件发生日期",
			dataIndex: "happenDay",
			align: "center",
			width: 90
		},
		{
			title: "事件发生时间",
			dataIndex: "happenTime",
			align: "center",
			width: 90
		},
		{
			title: "事件发生班次",
			dataIndex: "happenShift",
			align: "center",
			width: 90
		},
		{
			title: "事件发生地点",
			dataIndex: "happenPlace",
			align: "center",
			width: 100
		},
		{
			title: "事件发生相关人员",
			dataIndex: "relevantPeople",
			align: "center",
			width: 80
		},
		{
			title: "事件发生相关人员/责任人姓名",
			dataIndex: "relevantPeopleName",
			align: "center",
			width: 100
		},
		{
			title: "发生时当事人层级",
			dataIndex: "relevantHierarchy",
			align: "center",
			width: 80
		},
		{
			title: "报告人",
			dataIndex: "reportPeople",
			align: "center",
			width: 60
		},
		{
			title: "上报护理部日期",
			dataIndex: "reportDay",
			align: "center",
			width: 100
		},
		{
			title: "上报护理部时间",
			dataIndex: "reportTime",
			align: "center",
			width: 100
		},
		{
			title: "跌倒/坠床时状态",
			dataIndex: "ddzcszt",
			align: "center",
			width: 100
		},
		{
			title: "事件发生的简要描述",
			dataIndex: "briefDesciption",
			align: "center",
			width: 100
		},
		
		{
			title: "跌倒/坠床造成的伤害",
			dataIndex: "ddzczcdsh",
			align: "center",
			width: 100
		},
		{
			title: "跌倒/坠床伤害级别",
			dataIndex: "ddzcshjb",
			align: "center",
			width: 200
		},
		{
			title: "护理部讨论不良事件级别",
			dataIndex: "eventLevel",
			align: "center",
			width: 100
		},
	]
	@observable public columnLast:any = this.columnChangeB0032
	// 根据分类配置不同的表头-非计划拔管-B0033
	@observable public columnChangeB0033: any = [
		{
			title: "入院时导管脱出风险评分",
			dataIndex: "dgtcfxpf",
			align: "center",
			width: 100
		},
		{
			title: "导管脱出风险评定结果",
			dataIndex: "dgtcfxjg",
			align: "center",
			width: 100
		},
		{
			title: "Barthel指数评定结果",
			dataIndex: "barthelAssess",
			align: "center",
			width: 100
		},
		{
			title: "导管类型",
			dataIndex: "dglx",
			align: "center",
			width: 80
		},
		{
			title: "事件发生日期",
			dataIndex: "happenDay",
			align: "center",
			width: 90
		},
		{
			title: "事件发生时间",
			dataIndex: "happenTime",
			align: "center",
			width: 90
		},
		{
			title: "事件发生班次",
			dataIndex: "happenShift",
			align: "center",
			width: 90
		},
		{
			title: "事件发生地点",
			dataIndex: "happenPlace",
			align: "center",
			width: 100
		},
		{
			title: "事件发生相关人员",
			dataIndex: "relevantPeople",
			align: "center",
			width: 80
		},
		{
			title: "事件发生相关人员/责任人姓名",
			dataIndex: "relevantPeopleName",
			align: "center",
			width: 100
		},
		{
			title: "发生时当事人层级",
			dataIndex: "relevantHierarchy",
			align: "center",
			width: 80
		},
		{
			title: "报告人",
			dataIndex: "reportPeople",
			align: "center",
			width: 60
		},
		{
			title: "上报护理部日期",
			dataIndex: "reportDay",
			align: "center",
			width: 100
		},
		{
			title: "上报护理部时间",
			dataIndex: "reportTime",
			align: "center",
			width: 100
		},
		{
			title: "非计划拔管时患者状态",
			dataIndex: "fjhbgshzzt",
			align: "center",
			width: 100
		},
		{
			title: "事件发生的简要描述",
			dataIndex: "briefDesciption",
			align: "center",
			width: 100
		},
		{
			title: "护理部讨论不良事件级别",
			dataIndex: "eventLevel",
			align: "center",
			width: 100
		},
	]
	// 根据分类配置不同的表头-院内压力性损伤-B0034
	@observable public columnChangeB0034: any = [
		{
			title: "压力性损伤风险评估级别",
			dataIndex: "ylxsspgjb",
			align: "center",
			width: 100
		},
		
		{
			title: "Barthel指数评定结果",
			dataIndex: "barthelAssess",
			align: "center",
			width: 100
		},
		{
			title: "是否已申报难免压力性损伤备案",
			dataIndex: "sfysbylxss",
			align: "center",
			width: 100
		},
		{
			title: "事件发生日期",
			dataIndex: "happenDay",
			align: "center",
			width: 90
		},
		{
			title: "事件发生时间",
			dataIndex: "happenTime",
			align: "center",
			width: 90
		},
		{
			title: "事件发生班次",
			dataIndex: "happenShift",
			align: "center",
			width: 90
		},
		{
			title: "事件发生地点",
			dataIndex: "happenPlace",
			align: "center",
			width: 100
		},
		{
			title: "事件发生相关人员",
			dataIndex: "relevantPeople",
			align: "center",
			width: 80
		},
		{
			title: "事件发生相关人员/责任人姓名",
			dataIndex: "relevantPeopleName",
			align: "center",
			width: 100
		},
		{
			title: "发生时当事人层级",
			dataIndex: "relevantHierarchy",
			align: "center",
			width: 80
		},
		{
			title: "报告人",
			dataIndex: "reportPeople",
			align: "center",
			width: 60
		},
		{
			title: "上报护理部日期",
			dataIndex: "reportDay",
			align: "center",
			width: 100
		},
		{
			title: "上报护理部时间",
			dataIndex: "reportTime",
			align: "center",
			width: 100
		},
		{
			title: "事件发生的简要描述",
			dataIndex: "briefDesciption",
			align: "center",
			width: 100
		},
		{
			title: "护理部讨论不良事件级别",
			dataIndex: "eventLevel",
			align: "center",
			width: 100
		},
	]
	// 根据分类配置不同的表头-给药错误-B0035
	@observable public columnChangeB0035: any = [
		{
			title: "事件发生日期",
			dataIndex: "happenDay",
			align: "center",
			width: 90
		},
		{
			title: "事件发生时间",
			dataIndex: "happenTime",
			align: "center",
			width: 90
		},
		{
			title: "事件发生班次",
			dataIndex: "happenShift",
			align: "center",
			width: 90
		},
		{
			title: "事件发生地点",
			dataIndex: "happenPlace",
			align: "center",
			width: 100
		},
		{
			title: "事件发生相关人员",
			dataIndex: "relevantPeople",
			align: "center",
			width: 80
		},
		{
			title: "事件发生相关人员/责任人姓名",
			dataIndex: "relevantPeopleName",
			align: "center",
			width: 100
		},
		{
			title: "发生时当事人层级",
			dataIndex: "relevantHierarchy",
			align: "center",
			width: 80
		},
		{
			title: "报告人",
			dataIndex: "reportPeople",
			align: "center",
			width: 60
		},
		{
			title: "上报护理部日期",
			dataIndex: "reportDay",
			align: "center",
			width: 100
		},
		{
			title: "上报护理部时间",
			dataIndex: "reportTime",
			align: "center",
			width: 100
		},
		{
			title: "药物名称",
			dataIndex: "ywmc",
			align: "center",
			width: 80
		},
		{
			title: "剂量",
			dataIndex: "ywjl",
			align: "center",
			width: 80
		},
		{
			title: "剂型",
			dataIndex: "ywjx",
			align: "center",
			width: 80
		},
		{
			title: "给药差错分值",
			dataIndex: "gyccfz",
			align: "center",
			width: 90
		},
		{
			title: "事件发生的简要描述",
			dataIndex: "briefDesciption",
			align: "center",
			width: 100
		},
		{
			title: "护理部讨论不良事件级别",
			dataIndex: "eventLevel",
			align: "center",
			width: 100
		},
	]
	// 根据分类配置不同的表头-护士锐器伤-B0036
	@observable public columnChangeB0036: any = [
		
		{
			title: "事件发生日期",
			dataIndex: "happenDay",
			align: "center",
			width: 90
		},
		{
			title: "事件发生时间",
			dataIndex: "happenTime",
			align: "center",
			width: 90
		},
		{
			title: "事件发生班次",
			dataIndex: "happenShift",
			align: "center",
			width: 90
		},
		{
			title: "事件发生地点",
			dataIndex: "happenPlace",
			align: "center",
			width: 100
		},
		{
			title: "事件发生相关人员",
			dataIndex: "relevantPeople",
			align: "center",
			width: 80
		},
		{
			title: "事件发生相关人员/责任人姓名",
			dataIndex: "relevantPeopleName",
			align: "center",
			width: 100
		},
		{
			title: "发生时当事人层级",
			dataIndex: "relevantHierarchy",
			align: "center",
			width: 80
		},
		{
			title: "报告人",
			dataIndex: "reportPeople",
			align: "center",
			width: 60
		},
		{
			title: "上报护理部日期",
			dataIndex: "reportDay",
			align: "center",
			width: 100
		},
		{
			title: "上报护理部时间",
			dataIndex: "reportTime",
			align: "center",
			width: 100
		},
		{
			title: "锐器伤发生方式",
			dataIndex: "rqsfsfs",
			align: "center",
			width: 80
		},
		{
			title: "锐器伤所涉及的具体器具",
			dataIndex: "rqsssjdjtqj",
			align: "center",
			width: 80
		},
		{
			title: "发生锐器伤时的具体操作或环节",
			dataIndex: "fsrqssdjtczhhj",
			align: "center",
			width: 80
		},
		{
			title: "感染源类型",
			dataIndex: "grylx",
			align: "center",
			width: 80
		},
		{
			title: "该污染源是否含有血源性传播疾病",
			dataIndex: "gwrysfhyxyxcbjb",
			align: "center",
			width: 80
		},
		{
			title: "血源性传播疾病类型",
			dataIndex: "xyxcbjblx",
			align: "center",
			width: 80
		},
		{
			title: "事件发生的简要描述",
			dataIndex: "briefDesciption",
			align: "center",
			width: 100
		},
		{
			title: "护理部讨论不良事件级别",
			dataIndex: "eventLevel",
			align: "center",
			width: 100
		},
	]
	// 根据分类配置不同的表头-其它-B0037
	@observable public columnChangeB0037: any = [
		
		{
			title: "事件发生日期",
			dataIndex: "happenDay",
			align: "center",
			width: 90
		},
		{
			title: "事件发生时间",
			dataIndex: "happenTime",
			align: "center",
			width: 90
		},
		{
			title: "事件发生班次",
			dataIndex: "happenShift",
			align: "center",
			width: 90
		},
		{
			title: "事件发生地点",
			dataIndex: "happenPlace",
			align: "center",
			width: 100
		},
		{
			title: "事件发生相关人员",
			dataIndex: "relevantPeople",
			align: "center",
			width: 80
		},
		{
			title: "事件发生相关人员/责任人姓名",
			dataIndex: "relevantPeopleName",
			align: "center",
			width: 100
		},
		{
			title: "发生时当事人层级",
			dataIndex: "relevantHierarchy",
			align: "center",
			width: 80
		},
		{
			title: "报告人",
			dataIndex: "reportPeople",
			align: "center",
			width: 60
		},
		{
			title: "上报护理部日期",
			dataIndex: "reportDay",
			align: "center",
			width: 100
		},
		{
			title: "上报护理部时间",
			dataIndex: "reportTime",
			align: "center",
			width: 100
		},
		{
			title: "事件发生的简要描述",
			dataIndex: "briefDesciption",
			align: "center",
			width: 100
		},
		{
			title: "护理部讨论不良事件级别",
			dataIndex: "eventLevel",
			align: "center",
			width: 100
		},
	];
}
export const badEventData_gxjb = new BadEvent_gxjb();