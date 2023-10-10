import {observable, computed, action} from "mobx";
import moment from 'moment'
import {qcZzwyApi} from "../qcZzwyApi";
import {appStore} from "src/stores";
import {message} from "antd";
import {quarterTimes} from "src/enums/date";
import {qcMonthCheckData} from "src/modules/quality/views/qcZzwy/qcMonthCheckReport/qcMonthCheckData";

class QuarterlyAnalysisReportZzwy {
    @observable public tableLoading = false; //表格loading
    @observable public contentLoading = false //页面loading
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
    @observable public summarize: string = '202x年第X季度护理部组织XXXXX质量检查小组对全院XXXXX质量情况进行全面检查，现将检查结果和主要问题报告如下: '
    /**第一部分 检查总体情况内容 **/
    @observable public checkOverall: string = '1、检查内容包括 Xx 项一级指标，合格率≥90%，详见表1：二级指标xX 项，其中得分率＜90%的条目有3项，具体详见表2。'
    @observable public tableParams: any = {
        one: '表1 202X年第X季度XXXXXXX护理质量检查一级指标检查情况表',
        two: '表2 202X年第X季度XXXXXXX护理质量检查得分率较低条目汇总表'
    }
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
    @observable public templateList: any = []//模板列表
    @observable public templateData: any = {
        qcCode: '',
        itemCodeObj: [],//二级项目对象，name，code，简称simpleName
        itemCodeList: []//二级项目的codelist，用于获取柱状图传参
    }
    /**柱状图数据**/
    @observable public analysisChartData: any = {
        textArea: '',
        fields: [],
        devData: [],
        imgList: [],//附近图片的path
    }
    @observable public reportTwoItem: any = []//根据报告表Code找到报告表下的二级项目
    /**鱼骨图数据**/
    @observable public fishValueObj: any = [
        Array.from(Array(50)).reduce((prev, cur, i) => {
            prev[`v${i + 1}`] = '';
            return prev
        }, {})
    ]

    @computed get postObj() {
        return {
            wardCode: this.deptCode,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            templateName: '季度质量分析报告',
            hospitalCode: 'zzwy',
            reportLevel: appStore.queryObj?.qcLevel || '1',
        }
    }

    @action
    updateReportMasterData(data: any) {
        this.reportMasterData = data.reportMasterData
        this.qcReportItemDtoList = data.qcReportItemDtoList
        // console.log("this.reportMasterData===2222",this.reportMasterData);
    }

    @action
    updateFishValueObj(value: any, index: number) {
        // this.fishValueObj  =value
        this.fishValueObj[index] = value
        // console.log(this.fishValueObj);
    }

    @action
    updateSummaryTable(index: number, key: string, value: any) {
        this.summaryTable[index][key] = value;
    }

    @action
    updateReferredTable(index: number, key: string, value: any) {
        this.referredTable[index][key] = value;
    }

    /**动态添加鱼骨图内容**/
    @action
    handleAddFishValue() {
        let obj: any = Array.from(Array(50)).reduce((prev, cur, i) => {
            prev[`v${i + 1}`] = '';
            return prev
        }, {})
        this.fishValueObj.push(obj)
    }

    @action
    handleDeleteFishValue(index: number) {
        if (this.fishValueObj.length == 1) {
            return message.info('至少保留一张')
        }
        this.fishValueObj = this.fishValueObj.filter((item: any, k: number) => k !== index)
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
        this.contentLoading = true
        let qcReportItemDtoList = this.qcReportItemDtoList || []
        let qcReportItemDataList: any = []
        qcReportItemDtoList.map((it: any, index: number) => {
            let itemValue: any = {}
            switch (index) {
                case 0 :
                    itemValue = {
                        summarize: this.summarize,
                        checkOverall: this.checkOverall,
                        tableParams: this.tableParams,
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
                    itemValue = {analysisChartData: this.analysisChartData}
                    break
                default :
                    return
            }
            qcReportItemDataList.push({
                itemCode: it.itemCode,
                itemValue: JSON.stringify(itemValue),
                reportItemId: it.id,
                reportMasterId: this.reportMasterData.id || null,
                id: it.qcReportItemDataList ? it.qcReportItemDataList[0].id : null,
            })
        })
        console.log("this.qcReportItemDtoList===", qcReportItemDataList);
        let params = {
            hospitalCode: "zzwy",
            templateName: "季度质量分析报告",
            // qcReportItemDataList:newList,
            qcReportItemDataList,
            ...this.reportMasterData,
        }
        /** 分析报告按模块分 第一部分 为 { summarize:string,inspectTable:arr,three:arr,four:string } ***/
        qcZzwyApi.saveQcReport(params).then((res: any) => {
            message.success('保存成功')
            this.getTableList()
            appStore.history.goBack()
        }).finally(() => {
            this.contentLoading = false
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
            startDate: `${this.reportMasterData.startDate} 00:00:00`,
            endDate: `${this.reportMasterData.endDate} 23:59:59`,
            wardCode: this.reportMasterData.wardCode,
            qcItemLevel: type,
            qcCode: this.reportMasterData.summaryFormCode,
            level: appStore.queryObj?.qcLevel
        }
        qcZzwyApi.getQcItemDataList(params).then((res: any) => {
            this.inspectTable = res.data
        })
    }

    /**获取分析报告详情**/
    getQcReportById(master: number) {
        this.contentLoading = true
        qcZzwyApi.getQcReportById(master).then((res: any) => {
            this.reportMasterData = res.data.reportMasterData
            this.qcReportItemDtoList = res.data.qcReportItemDtoList
            this.analysisItemValue(res.data.qcReportItemDtoList)
            this.getQcItemDataList('first')
            // this.getQcItemDataList('second')
        }).finally(() => {
            this.contentLoading = false
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
                let obj: any = JSON.parse(item.qcReportItemDataList[0].itemValue)
                if (index == 0 && item.qcReportItemDataList[0].itemValue) {
                    this.summarize = obj.summarize || this.summarize
                    this.checkOverall = obj.checkOverall || this.checkOverall,
                    this.tableParams = obj.tableParams || this.tableParams,
                     this.contentValue = obj.contentValue || ''
                    this.summaryTable = obj.summaryTable || []
                    //     还有二级项目内容
                }
                /**鱼骨图内容**/
                if (index == 1 && item.qcReportItemDataList[0].itemValue) {
                    // if (obj.fishValueObj) {
                    //     this.fishValueObj = obj.fishValueObj
                    //     console.log("this.fishValueObj===", this.fishValueObj);
                    // }
                    this.fishValueObj = obj.fishValueObj || Array.from(Array(50)).reduce((prev, cur, i) => {
                        prev[`v${i + 1}`] = '';
                        return prev
                    }, {})
                }
                /**整改措施**/
                if (index == 2 && item.qcReportItemDataList[0].itemValue) {
                    this.rectification = obj.rectification
                }
                /**追踪评价**/
                if (index == 3 && item.qcReportItemDataList[0].itemValue) {
                    this.referredTable = obj.referredTable || []
                }
                /**柱状图**/
                if (index == 4 && item.qcReportItemDataList[0].itemValue) {
                    this.analysisChartData = obj.analysisChartData || []
                }
            }
        })
    }

    /**根据类型 季度，月度，通过年份，月份处理开始时间，结束时间**/
    getDateRange(reportType: string, option: any, year: any) {
        // console.log(reportType, option, year);
        const startYear = year;
        const startDate = moment(new Date(startYear, 0, 1)).format('YYYY-MM-DD');
        // console.log(startDate);
        const endDate = moment(new Date(startYear, 11, 31)).format('YYYY-MM-DD');
        // console.log(endDate);
        if (reportType == '月度') {
            let old = moment(new Date(year, option, 0)).format('YYYY-MM-DD')
            // console.log("old===", old);
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
            // this.summaryTable.push({
            //     label: item.label,
            //     code: item.qcItemCode,
            //     evalRate: undefined,
            // })
            this.referredTable.push({
                simpleName: item.simpleName,
                b: undefined,
                c: undefined,
                d: undefined,
                e: undefined,
                g: undefined
            })
        })
    }

    getRatioByItemCode() {
        qcZzwyApi.getRatioByItemCode({
            wardCode: this.reportMasterData.wardCode,
            qcItemCodeList: this.templateData.itemCodeList,
            startDate: this.reportMasterData.startDate,
            endDate: this.reportMasterData.endDate,
            reportLevel: appStore.queryObj?.qcLevel,
        }).then(res => {
            let data = res.data || []
            let newData: any = []
            let itemArry: any = []
            let smallObj: any = {}
            let fields: any = []//key值
            data.map((it: any) => {
                itemArry = []
                smallObj = {}
                fields = it.reportRatioDto.months
                it.reportRatioDto.months.map((ii: any, index: number) => {
                    smallObj.name = it.qcItemName
                    smallObj[ii] = Number(it.reportRatioDto.ratios[index])
                    //
                })
                itemArry.push(smallObj)
                newData.push(itemArry)

            })
            this.summaryTable =data.map((item:any)=>{
               /**保留一位小数**/
               item.evalRate = Number(item.reportRatioDto.ratios[0]).toFixed(1)
                return item
            })
            this.analysisChartData.fields = fields
            this.analysisChartData.devData = newData

        }).catch(err => {

        })
    }

    /**获取模板列表 */
    getTemplateList() {
        if (this.templateList.length > 1) {
            return false
        }
        qcZzwyApi.getTemplateList(appStore.queryObj?.qcLevel).then(res => {
            this.templateList = res.data || []
        }).catch(err => {

        })
    }

    getReportTwoItem() {
        qcZzwyApi.getReportTwoItem(this.reportMasterData.summaryFormCode).then(res => {
            this.reportTwoItem = res.data || []
        }).catch(err => {

        })
    }

    /**清空上一次保存的数据，避免数据乱**/
    @action
    resetPropertiesToDefault() {
        this.reportMasterData = {}
        this.qcReportItemDtoList = []
        this.reportTwoItem = []
        // this.summarize = ''
        this.summaryTable = []
        this.analysisChartData = {
            textArea: '',
            fields: [],
            devData: [],
            imgList: [],//附近图片的path
        }
        this.templateData = {
            qcCode: '',
            itemCodeObj: [],//二级项目对象，name，code，简称simpleName
            itemCodeList: []//二级项目的codelist，用于获取柱状图传参
        }
        this.referredTable = []
        this.rectification = ''
        // this.fishValueObj = [
        //     Array.from(Array(50)).reduce((prev, cur, i) => {
        //         prev[`v${i + 1}`] = '';
        //         return prev
        //     }, {})
        // ]

    }
}

export const QuarterlyZzwyData = new QuarterlyAnalysisReportZzwy()