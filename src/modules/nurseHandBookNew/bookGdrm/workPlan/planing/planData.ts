import { observable, computed } from "mobx";
import moment from 'moment'
import { nursingHandlerApi } from "../../api/NursingHandlerApi";
import { fileDownload } from "src/utils/file/file";
import {
    Badge, ColumnProps,
    message,
    Input,
    Select,
    DatePicker,
    Steps,
    Button,
    Modal,
    Icon,
    Row, Col,
    Empty
} from 'src/vendors/antd'

class planData {
    @observable public year = moment() as undefined | moment.Moment; //年份
    @observable public month = moment().month(); //yue份
    @observable public quarter = moment().quarter() as unknown; //季度
    @observable public deptList = [];//科室列表
    @observable public deptCode = [''];//选中的科室
    @observable public processList=[
        {name:'全部',status:''},
        {name:'草稿',status:'0'},
        {name:'待审核',status:'1'},
        {name:'审核通过',status:'2'},
        {name:'审核驳回',status:'-1'},
    ];
    @observable public processStatus = ''; //审核 -1被驳回,0待提交，1提交后审核中，2审核完成
    @observable public keyWord = '';
    @observable public modalVisible = false;//创建弹框
    @observable public isCreating = false;//是否正在创建,显示富文本编辑框
    @observable public user = JSON.parse(sessionStorage.getItem('user') || '')
    @observable public yearYear = moment() as undefined | moment.Moment; //年份
    @observable public itemList=[] as any;//列表数据
    @observable public contentItem={id:null,content:'',status:null};
    @observable public contentDetail={} as any;//获取文章详情，有审核流程
    @observable public attchList = [];//附件列表
    @observable public mainLoading = false;//查询或者初始化的时候的loading
    @observable public detailLoading = false;//获取详情的时候的loading
    @observable public maxWidthTitle = 1400;//浏览器屏幕大小，控制左上标题的显示，默认1400，特殊1600
    
    
    // 年份汇总数据
    @observable public deptCodeYear = ""; //科室
    @observable public deptNameYear = ""; //科室名称
    
    // 年份汇总数据 end

    // 月份计划
    @observable public pathname = "";//路径pathname
    @observable public createYear = moment() as undefined | moment.Moment; //年份
    @observable public createQuarter = moment().quarter() as unknown; //季度
    @observable public createMonth = moment().month() + 1; //yue份
    // YDJH(1, "月度工作计划"),
    // JDJH(2, "季度工作计划"),
    // NDJH(3, "年度工作计划"),
    // YDZJ(4, "月度工作总结"),
    // JDZJ(5, "季度工作总结"),
    // NDZJ(6, "年度工作总结"),
    // KNJY(7, "科内大事/好人/好事/建议");
    @observable public type=1;//月度工作计划
    @observable public typeObject={
      "planmonth":1,
      "planquarter":2,
      "planyear":3,
      "managemonth":1,
      "managequarter":2,
      "manageyear":3,
      'summonth':4,
      "sumquarter":5,
      "sumyear":6,
      'summanagemonth':4,
      "summanagequarter":5,
      "summanageyear":6,
      "betterquarter":7,
      "bettermanagequarter":7,
  }
    public taskTypeName(taskType: number): string {
        switch (taskType) {
          case 1: return '新建'
          case 2: return '提交'
          case 3: return '撤销'
          case 4: return '退回'
          case 5: return '审核通过'
          default: return ''
        }
      }
      @observable public auditInfo = [] as any[]
    // 新建计划，年
    @computed get createObj(){
        return {
            type:this.typeObject[this.pathname],
            year: this.createYear?.year(),
        }
    }

    // 监听年变化，修改表头
    @computed get yearChange() {
        return this.yearYear?.year()
    }
    // 科室年度汇总
    @computed get postObjYear() {
        return {
            year: this.yearYear?.year(),
            deptCode: this.deptCodeYear
        }
    }

    /**获取两级 科室 */
    getDept(){
        nursingHandlerApi.getDeptList().then(res=>{
            res.data.unshift({
              name:'全部',
              code:''
            })
            this.deptList = res.data
            // setDeptListAll(res.data)
          }).catch(err=>{
  
          })
    }

    /**重置所有数据 */
    handelReset(){
        this.yearYear = moment()
        this.keyWord = ''
        this.processStatus = ''
        this.deptCode = ['']
        this.month = moment().month()
        this.quarter = moment().quarter()

        this.getList()
    }

	/**判断空白提示语  管理的也在这里计算 */
	getEmptyTips(pathname:string){
		let tips = '工作计划'
    this.maxWidthTitle = 1400
		if(pathname.indexOf('sum')>-1){
			tips = '工作总结'
		}else if(pathname.indexOf('better')>-1){
			tips = '好人好事'
      this.maxWidthTitle = 1400
		}
		return tips
	}
    /**工作计划/总结列表 
	 * 保存编辑框的时候会带id，带id就回显这一条数据，不是选中第一条
	*/
    getList(id?:any){
      // 初始化数据
      this.attchList = []
      this.auditInfo = []
      this.contentDetail = {}
      this.contentItem = {id:null,content:'',status:null}
      // 初始化数据
        let paramter = {
            type:this.typeObject[this.pathname],
            year:this.yearYear?.year(),
            keyword :this.keyWord,
            empNo : this.user.empNo,
            status:this.processStatus,
            // 没有科室
            // dept_code:this.deptCode.length>1?this.deptCode[1]:'',
        } as any
        // 没有季度和月份
        // if(planDatas.pathname.indexOf('quarter')>-1){
        //     // 季度
        //     paramter.quarter = this.quarter
        // }else if(planDatas.pathname.indexOf('month')>-1){
        //     paramter.month = this.month+1
        // }
        // console.log(paramter)
        // return
		this.mainLoading = true
        nursingHandlerApi.recordList(paramter).then(res=>{
            if(res.code == '200'){
              this.mainLoading = false
                this.itemList = res.data.list
				if(id){
					for (let index = 0; index < this.itemList.length; index++) {
						if(this.itemList[index].id == id){
							this.contentItem = this.itemList[index]
							this.getDetail(id)
							break;
						}
						
					}
				}else{
					if(this.itemList.length>0){
						// 默认选中第一条
						this.contentItem = this.itemList[0]
						this.getDetail(this.itemList[0].id)
					}
				}
                
            }
        }).catch(err=>{
          this.mainLoading = false
        })
    }
    /**获取详情*/
    getDetail(id:any){
      this.contentDetail = {content:null} as any
		this.detailLoading = true
        nursingHandlerApi.recordDetail({id:id}).then(res=>{
			this.detailLoading = false
            this.contentDetail = {...res.data}
            this.auditInfo = res.data.nodeList || []//审核流程
            this.attchList = res.data.attachmentList || []//附件
        }).catch(err=>{
			this.detailLoading = false
        })
    }
    /**撤销 */
    cancelSubmit(){
        nursingHandlerApi.recordCancel({id:this.contentDetail.id}).then(res=>{
          if(res.code == '200'){
            this.getList()
            // 撤销成功
            this.attchList = []
            this.auditInfo = []
            this.contentDetail = {}
            this.contentItem = {id:null,content:'',status:null}
          }
        }).catch(err=>{

        })
    }
    /**删除 */
  delItem(){
    nursingHandlerApi.recordDelete(this.contentDetail.id).then(res=>{
        if (res.code == '200') {
            message.success('删除成功')
            this.contentDetail = {}
            this.attchList = []
            this.auditInfo = []
            this.contentDetail = {}
            this.contentItem = {id:null,content:'',status:null}
            // 重新获取列表
            this.getList()
            // this.itemList = []
            // planDatas.modalVisible = false
        } else {
            message.error(res.desc)
        }
    }).catch(err=>{

    })
  }
  /**编辑页面导入 */
  importEditor(){
    let importElId = 'handler_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      nursingHandlerApi.recordWordImport(file)
        .then(res => {
          this.contentDetail.content = res.data
        }).catch(err=> {
        })

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  
  }
  /**编辑页面导出 */
  exportEditor(){
    nursingHandlerApi.recordWordExport({
        id: this.contentDetail.id
    }).then(res => fileDownload(res))

  }

  /**导入附件 */
  importAttch(){
    let importElId = 'handlerattch_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      nursingHandlerApi.nurseHandBookAttachment(file)
        .then(res => {
          this.contentDetail.content = res.data
        }).catch(err=> {
        })

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  }

    // 计划导出
    exportPlan(){

    }
}
export const planDatas = new planData();