import { observable, computed } from "mobx";
import { fileDownload } from "src/utils/file/file";
import moment from 'moment';
import { badEventApi_gxjb } from "./api";

class BadEventQuarter_gxjb {
	// 不良事件例数统计表
	@observable public eventTypeList = []//类型列表
	@observable public eventType = ['全部'] //选中的汇总类型
	@observable public pageIndex: any = 1; //页码
	@observable public pageSize: any = 20; //每页大小
	@observable public total: any = 0; //总条数

	@observable public currentQuarter = moment().quarter() //当前季度
    @observable public queryType = '1';//季度查询1，年度查询2
    @observable public tableList = []; //表格内容
	@observable public tableLoading = false; //表格loading
    @observable public monthList=[
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
    ]
	@observable public deptList = []//科室列表
	@observable public selectDept = {key:'',label:'全部'}//选中的科室
	
	@computed get searchByTypeParams() {
		return {
			"pageIndex": this.pageIndex,
    		"pageSize": this.pageSize,
    		"formCodeList": this.eventType[0]=='全部'?[]:this.eventType,
            "deptCode": this.selectDept.key,
            "startDateStr": moment().quarter(this.currentQuarter).startOf('quarter').format('YYYY-MM-DD'),
            "endDateStr": moment().quarter(this.currentQuarter).endOf('quarter').format('YYYY-MM-DD'),

		}
	}

	/** 获取表格数据 */
	onload() {
		this.tableLoading = true;
		badEventApi_gxjb.listReportSummary(this.searchByTypeParams).then(res => {
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
		badEventApi_gxjb.exportReportSummary({
    		"formCodeList": this.eventType[0]=='全部'?[]:this.eventType,
            "deptCode": this.selectDept.key,
            "startDateStr": moment().quarter(this.currentQuarter).startOf('quarter').format('YYYY-MM-DD'),
            "endDateStr": moment().quarter(this.currentQuarter).endOf('quarter').format('YYYY-MM-DD'),
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
			this.eventType = ['全部']
			// res.data.unshift({code:'',name:'全部'})
			this.eventTypeList = res.data
		}).catch(err => {

		})
	}
	
	init() {
		// 初始化数据
		// this.eventType = { key: 'B0032', label: '全部' }
		this.currentQuarter = moment().quarter()
		this.getDictList()
		this.getnursingDept()
		this.onload();
	}
}
export const badEventQuarterData_gxjb = new BadEventQuarter_gxjb();