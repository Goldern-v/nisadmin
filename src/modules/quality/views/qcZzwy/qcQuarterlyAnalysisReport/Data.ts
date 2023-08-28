import {observable, computed} from "mobx";
import moment from 'moment'
import {qcZzwyApi} from "../qcZzwyApi";

class QuarterlyAnalysisReportZzwy {
    @observable public tableLoading = false; //表格loading
    @observable public tableList: any = []; //表格内容
    @observable public pageIndex: any = 1; //页码
    @observable public pageSize: any = 20; //每页大小
    @observable public total: any = 0; //总条数

    @observable public year = moment() as undefined | moment.Moment; //年份
    @observable public deptCode = "全院"; //科室
    @observable public deptName = "全院"; //科室名称
    @observable public filterDate: any = [moment(moment()), moment()]
    /**创建信息主体内容**/
    @observable public reportMasterData: any = {}
    /**报告信息item-list**/
    @observable public qcReportItemDtoList: any = []

    @computed get postObj() {
        return {
            wardCode: this.deptCode,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            templateName: '季度质量分析报告',
            hospitalCode: 'zzwy',
            reportLevel: 1
        }
    }


    getTableList() {
        // 默认按月份
        let times = {
            startDate: moment(this.filterDate[0]).format('YYYY-MM-DD'),
            endDate: moment(this.filterDate[1]).format('YYYY-MM-DD')
        }
        this.tableLoading = true
        qcZzwyApi.qcReportGetPage({...this.postObj, ...times}).then(res => {
            this.tableLoading = false
            this.tableList = res.data.list || []
        }).catch(err => {
            this.tableLoading = false

        })

    }

    /*保存报告**/
    saveQcReport() {
        let list:any =this.qcReportItemDtoList.map((item:any)=>{
             return{
                 reportMasterId:this.reportMasterData.id,
                 reportItemId:item.id,
                 ...item,
                 itemValue:item.qcReportItemDataList
             }
        })
        let params = {
            hospitalCode: "zzwy",
            templateName: "季度质量分析报告",
            qcReportItemDataList:list,
            ...this.reportMasterData
        }
        qcZzwyApi.saveQcReport(params).then((res: any) => {

        })
    }

    /**获取分析报告内容 一级，二级**/
    getQcItemDataList() {
        qcZzwyApi.getQcItemDataList({}).then((res: any) => {

        })
    }

}

export const QuarterlyZzwyData = new QuarterlyAnalysisReportZzwy()