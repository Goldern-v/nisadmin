import {observable, computed} from "mobx";
import moment from 'moment'
import {quarterTimes} from "src/enums/date";
import service from "src/services/api";
import {qcZzwyApi} from "../qcZzwyApi";
import {appStore} from "src/stores";

class RectificationSummaryData {
    @observable public tableLoading = false; //表格loading
    @observable public tableList: any = []; //表格内容
    @observable public pageIndex: any = 1; //页码
    @observable public pageSize: any = 20; //每页大小
    @observable public total: any = 0; //总条数


    @observable public year = moment() as undefined | moment.Moment; //年份
    @observable public deptCode = "全院"; //科室
    @observable public deptName = "全院"; //科室名称

    @observable public selectQuarter = moment().quarter();//当前选择的季度
    // @observable public startDateQuarter = '';//季度开始时间
    // @observable public endDateQuarter = '';//季度结束时间
    @observable public monthRange = [moment(), moment()];//月份时间

    @observable public filterDate: any = [moment(moment()), moment()]


    // 科室列表
    @observable public deptList: any = []
    @observable public defaultDept: string = '';
    // 类型列表
    @observable public typeList = [
        {title: '按月度', type: '1'},
        {title: '按季度', type: '2'},
        {title: '按年度', type: '3'},
        {title: '按日期', type: '4'},
    ]
    @observable public selectType = '1';//选中的类型


    @computed get postObj() {
        return {
            wardCode: this.deptCode,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            qcLevel:appStore.queryObj?.qcLevel
        }
    }



    getTableList() {
        // 默认按月份
        let times = {
            beginDate: moment(this.monthRange[0]).startOf('month').format('YYYY-MM-DD'),
            endDate: moment(this.monthRange[1]).endOf('month').format('YYYY-MM-DD'),
        }
        if (this.selectType == '2') {
            // 季度
            times = {
                beginDate: quarterTimes(this.year?.format('YYYY'), this.selectQuarter)[0],
                endDate: quarterTimes(this.year?.format('YYYY'), this.selectQuarter)[1]
            }
        } else if (this.selectType == '3') {
            // 年度
            times = {
                beginDate: moment(this.year).startOf('year').format('YYYY-MM-DD'),
                endDate: moment(this.year).endOf('year').format('YYYY-MM-DD')
            }
        } else if (this.selectType == '4') {
            // 日期
            times = {
                beginDate: moment(this.filterDate[0]).format('YYYY-MM-DD'),
                endDate: moment(this.filterDate[1]).format('YYYY-MM-DD')
            }
        }
        this.tableLoading = true
        console.log("this.postObj===",this.postObj);
        qcZzwyApi.getRectificationSummary({...this.postObj, ...times}).then(res => {
            this.tableLoading = false
            this.tableList =res.data
        }).catch(err => {
            this.tableLoading = false

        })

    }

    /**科室列表 */
    getNursingAll() {
        // if (this.deptList.length > 0) {
        //     return false
        // }
        // 查询有权限的科室
        service.commonApiService.getNursingUnitSelf().then(res => {
            const {deptList} = res.data
            if (deptList[0] && deptList[0].name === '全部') {
                deptList.shift()
            }
            this.deptList = deptList || []
            this.defaultDept = res.data.defaultDept || ''
        }).catch(err => {

        })
    }
    //给我推荐一下适合react用的鱼骨图插件


}

export const RectificationData = new RectificationSummaryData()