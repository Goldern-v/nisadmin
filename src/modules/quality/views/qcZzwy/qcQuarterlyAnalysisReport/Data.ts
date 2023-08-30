import {observable, computed, action} from "mobx";
import moment from 'moment'
import {qcZzwyApi} from "../qcZzwyApi";
import {appStore} from "src/stores";
import {message} from "antd";
import {quarterTimes} from "src/enums/date";

class QuarterlyAnalysisReportZzwy {
    @observable public tableLoading = false; //表格loading
    @observable public tableList: any = []; //表格内容
    @observable public pageIndex: any = 1; //页码
    @observable public pageSize: any = 20; //每页大小
    @observable public total: any = 0; //总条数
    @observable public qcLevel: any = appStore.queryObj.qcLevel || 3
    @observable public year = moment() as undefined | moment.Moment; //年份
    @observable public deptCode = "全院"; //科室
    @observable public deptName = "全院"; //科室名称
    @observable public filterDate: any = [moment(moment()), moment()]
    /**创建信息主体内容**/
    @observable public reportMasterData: any = {}
    /**报告信息item-list**/
    @observable public qcReportItemDtoList: any = []
    /**  第一部分: 总结value**/
    @observable public summarize: string = ''
    /** 第一部分: 情况检查表  inspectTable**/
    @observable public inspectTable: any = []
    /** 第一部分: 汇总内容**/
    @observable public summaryTable: any = []
    /** 第一部分: 主要内容**/
    @observable public contentValue: string = ''
    /**整改措施内容 input**/
    @observable public rectification: string = ''
    /**二级项目 --简称**/
    @observable public referredTable: any = []
    /**鱼骨图数据**/
    @observable public fishValueObj: any = Array.from(Array(40)).reduce((prev, cur, i) => {
        prev[`v${i + 1}`] = '';
        return prev
    }, {})

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

    @action
    updateFishValueObj(value:any){
        this.fishValueObj  =value
        console.log(this.fishValueObj);
    }
    @action
    updateSummaryTable(index: number, key: string, value: any) {
        this.summaryTable[index][key] = value;
    }

    @action
    updateReferredTable(index: number, key: string, value: any) {
        this.referredTable[index][key] = value;
    }

    getTableList() {
        // 默认按月份
        let times = {
            startDate: moment(this.filterDate[0]).format('YYYY-MM-DD'),
            endDate: moment(this.filterDate[1]).format('YYYY-MM-DD')
        }
        this.tableLoading = true
        qcZzwyApi.qcReportGetPage({...this.postObj, ...times, reportLevel: this.qcLevel}).then(res => {
            this.tableLoading = false
            this.tableList = res.data.list || []
        }).catch(err => {
            this.tableLoading = false

        })

    }

    /*保存报告**/
    saveQcReport() {
//判断后边处理
//         console.log("this.qcReportItemDtoList====", this.qcReportItemDtoList);
//         console.log("this.summaryTable===",this.summaryTable);
        // console.log("this.referredTable===",this.referredTable);/
        // return
        let list: any = this.qcReportItemDtoList.map((item: any, index: number) => {
            let itemValue: any = {}
            switch (index) {
                case 0 :
                    itemValue = {
                        summarize: this.summarize,
                        inspectTable: this.inspectTable,
                        summaryTable: this.summaryTable,
                        contentValue: this.contentValue
                    }
                    break
                case 1:
                    itemValue = {fishValueObj: this.fishValueObj}
                    break
                case 2:
                    itemValue = {rectification: this.rectification}
                    break
                case 3:
                    itemValue = {referredTable: this.referredTable}
                    break
                case 4:
                    break
                default :
                    return
            }
            /*第一部分*/
            // if (index == 0) {
            //     itemValue = {
            //         summarize: this.summarize,
            //         inspectTable: this.inspectTable,
            //         summaryTable: this.summaryTable,
            //         contentValue: this.contentValue
            //     }
            // } else if (index == 2) {
            //     itemValue = {
            //         rectification: this.rectification
            //     }
            // }
            return {
                reportMasterId: this.reportMasterData.id,
                reportItemId: item.id,
                itemCode: item.itemCode,
                itemNo: item.itemNo,
                itemValue: itemValue ? JSON.stringify(itemValue) : ''
            }
        })
        let params = {
            hospitalCode: "zzwy",
            templateName: "季度质量分析报告",
            qcReportItemDataList: list,
            ...this.reportMasterData,
            // startDate: "2023-01-01",
            // endDate: "2023-12-30",
        }
        /** 分析报告按模块分 第一部分 为 { summarize:string,inspectTable:arr,three:arr,four:string } ***/
        qcZzwyApi.saveQcReport(params).then((res: any) => {
            message.success('保存成功')
            this.getTableList()
            appStore.history.goBack()
        })
    }

    /**获取分析报告内容 一级，二级
     *
     *
     * {
     *     "beginDate": "string",
     *     "endDate": "string",
     *     "wardCode": "string",
     *     "qcItemLevel": "string",
     *     "qcCode": "string"
     * }
     * **/
    getQcItemDataList(type: string) {
        let params = {
            beginDate: this.reportMasterData.startDate,
            endDate: this.reportMasterData.endDate,
            wardCode: this.reportMasterData.wardCode,
            qcItemLevel: type,
            qcCode: this.reportMasterData.qcCode
        }
        qcZzwyApi.getQcItemDataList(params).then((res: any) => {
            console.log("res===", res);
        })
    }

    /**获取分析报告详情**/
    getQcReportById(master: number) {
        this.reportMasterData = {}
        this.qcReportItemDtoList = []
        qcZzwyApi.getQcReportById(master).then((res: any) => {
            this.reportMasterData = res.data.reportMasterData
            this.qcReportItemDtoList = res.data.qcReportItemDtoList
            this.analysisItemValue(res.data.qcReportItemDtoList)
            this.getQcItemDataList('first')
            this.getQcItemDataList('second')

        })
    }

    /**删除**/
    qcItemDeleteQcReport(reportId: number) {
        qcZzwyApi.qcItemDeleteQcReport({reportId}).then((res: any) => {
            message.success('操作成功')
            this.getTableList()
        })
    }

    /**解析itemValue**/
    analysisItemValue(arr: any) {
        arr.map((item: any, index: number) => {
            /**默认itemValue被转化成数组，默认只取第一项**/
            if (item.qcReportItemDataList) {
                if (index == 0 && item.qcReportItemDataList[0].itemValue) {
                    let obj: any = JSON.parse(item.qcReportItemDataList[0].itemValue)
                    this.summarize = obj.summarize || ""
                    this.contentValue = obj.contentValue || ''
                    this.summaryTable = obj.summaryTable || []
                    //     还有二级项目内容
                }
                /**鱼骨图内容**/
                if (index == 1 && item.qcReportItemDataList[0].itemValue) {
                    let obj: any = JSON.parse(item.qcReportItemDataList[0].itemValue)
                    if(obj.fishValueObj) this.fishValueObj = obj.fishValueObj
                    console.log("this.fishValueObj===",this.fishValueObj);
                }
                /**整改措施**/
                if (index == 2 && item.qcReportItemDataList[0].itemValue) {
                    let obj: any = JSON.parse(item.qcReportItemDataList[0].itemValue)
                    this.rectification = obj.rectification
                }
                /**追踪评价**/
                if (index == 3 && item.qcReportItemDataList[0].itemValue) {
                    let obj: any = JSON.parse(item.qcReportItemDataList[0].itemValue)
                    this.referredTable = obj.referredTable || []
                }
            }
        })
    }

    /**根据类型 季度，月度，通过年份，月份处理开始时间，结束时间**/
    getDateRange(reportType: string, option: any, year: any) {
        console.log(reportType, option, year);
        const startYear = year;
        const startDate = moment(new Date(startYear, 0, 1)).format('YYYY-MM-DD');
        console.log(startDate);
        const endDate = moment(new Date(startYear, 11, 31)).format('YYYY-MM-DD');
        console.log(endDate);
        if (reportType == '月度') {
            let old = moment(new Date(year, option, 0)).format('YYYY-MM-DD')
            console.log("old===", old);
            return {
                startDate: `${year}-${option}-01`,
                endDate: old
            }
        } else {
            /*季度*/
            switch (option) {
                case '全年':
                    return {
                        startDate: startDate,
                        endDate: endDate,
                    };
                case '上半年':
                    return {
                        startDate: startDate,
                        endDate: moment(new Date(startYear, 5, 30)).format('YYYY-MM-DD'),
                    };
                case '下半年':
                    return {
                        startDate: moment(new Date(startYear, 6, 1)).format('YYYY-MM-DD'),
                        endDate: endDate,
                    };
                case '第一季度':
                    return {
                        startDate: startDate,
                        endDate: moment(new Date(startYear, 2, 31)).format('YYYY-MM-DD'),
                    };
                case '第二季度':
                    return {
                        startDate: moment(new Date(startYear, 3, 1)).format('YYYY-MM-DD'),
                        endDate: moment(new Date(startYear, 5, 30)).format('YYYY-MM-DD'),
                    };
                case '第三季度':
                    return {
                        startDate: moment(new Date(startYear, 6, 1)).format('YYYY-MM-DD'),
                        endDate: moment(new Date(startYear, 8, 30)).format('YYYY-MM-DD'),
                    };
                case '第四季度':
                    return {
                        startDate: moment(new Date(startYear, 9, 1)).format('YYYY-MM-DD'),
                        endDate: endDate,
                    };
                default:
                    return {};
            }
        }
    }

    /**获取到的二级项目以及简称内容 label ，simpleName
     *
     * data来源可能是从点击添加出现的二级弹窗内容的回调，也可能是获取详情后的数据
     * **/
    handleSelectReport(data: any) {
        this.summaryTable = []
        this.referredTable = []
        data.map((item: any) => {
            this.summaryTable.push({
                label: item.label,
                code: item.qcItemCode,
                evalRate: undefined,
            })
            this.referredTable.push({
                simpleName: item.simpleName,
                b: undefined,
                c: undefined,
                d: undefined,
                e: undefined,
                g: undefined
            })
        })
        console.log(this.summaryTable);
    }
}

export const QuarterlyZzwyData = new QuarterlyAnalysisReportZzwy()