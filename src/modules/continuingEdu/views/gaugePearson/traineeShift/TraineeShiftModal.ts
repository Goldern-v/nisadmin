import { observable, computed } from "mobx";
import { traineeShiftApi } from "./api/TraineeShiftApi";
import { fileDownload } from "src/utils/file/file";
import moment from "moment";
import { message } from "antd";

class TraineeShiftModal {
  @observable public sheetId: any = undefined; //轮科表id
  @observable public groupId: any = undefined; //轮科表id
  @observable public titleCurr: any = undefined; //轮科表默认值

  // 主列表信息
  @observable public isOkBtn: any = false; //增加二级菜单弹窗开关
  @observable public keyWord: any = undefined; //关键字
  @observable public tableList: any = []; //表格数据
  @observable public tableDeptList: any = []; //表格科室对应的列
  @observable public tableLoading = false; //表格loading

  // 科室信息
  @observable public deptTableList: any = []; //表格数据
  @observable public deptTableCopyList: any = []; // 表格展示数据
  @observable public deptTableLoading = false; //表格loading

  // 实习生全部信息初始化
  @observable public allGroupKeyWord: any = ''; //关键字undefined
  @observable public selectedYear: any = moment(); //选中年份
  @observable public allGroupTableList: any = []; //表格数据
  @observable public allGroupTableLoading = false; //表格loading

  // 实习生绑定信息
  @observable public groupTableList: any = []; //表格数据
  @observable public groupTableCopyList: any = []; // 表格展示数据
  @observable public groupTableLoading = false; //表格loading

  // 已有科室
  @observable public existingDeptTableList: any = []; //表格数据
  @observable public existingDeptTableLoading = false; //表格loading

  // 添加规培生
  @observable public addStuList: any = []; //表格数据
  @observable public addKeyName=''; //名字关键字
  @observable public addKeyYear = moment() as undefined | moment.Moment; //年份
  @observable public addStuTableLoading = false; //表格loading
  @observable public addStuPageIndex: any = 1; //页码
  @observable public addStuPageSize: any = 10; //每页大小
  @observable public addStuTotal: any = 0; //总条数

  @computed
  get postObj() {
    return {
      keyWord: this.keyWord || '',
      sheetId: this.sheetId
    };
  }

  @computed
  get postAllGroupObj() {
    return {
      sheetId: this.sheetId,
      keyWord: this.allGroupKeyWord,
      year: moment(this.selectedYear).format("YYYY"),
      groupId: this.groupId
    };
  }

  @computed get getStuByKey(){
    return {
      keyWord:this.addKeyName,
      year:this.addKeyYear
    }
  }
  

  //主列表
  onload() {
    this.tableLoading = true;
    traineeShiftApi.getSheetCompleteInfo(this.postObj).then(res => {
      this.tableLoading = false;
    //   console.log(res);
      
      this.tableDeptList = res.data.latPlanRotateDeptsList;
      this.tableList = res.data.latPlanRotatePersonList;
    }).catch(err=>{
      this.tableLoading = false;
    });
  }

	// 获取所有规培生  添加规培生
	getStuByNameOrYear() {
		this.addStuTableLoading = true
		traineeShiftApi.queryStudentInfoListWithoutCheck({
			keyWord: this.addKeyName,
			year: this.addKeyYear?.year(),
			sheetId:this.sheetId
		}).then(res => {
			this.addStuTableLoading = false;
			this.addStuList = res.data || []
		}).catch(err => {
			this.addStuTableLoading = false
		});
	}

  //所有实习生
  allGroupOnload() {
    this.allGroupTableLoading = true;
    traineeShiftApi
      .queryGraduateInternPageList(this.postAllGroupObj)
      .then(res => {
        res.data.map((item: any) => (item.isCheck = false));
        this.allGroupTableLoading = false;
        this.allGroupTableList = res.data;
      });
  }

  //获取已有绑定实习生
  groupOnload() {
    this.groupTableLoading = true;
    traineeShiftApi.queryAllRotatePersonsBySheetId().then(res => {
      this.groupTableLoading = false;
      this.groupTableList = res.data.rotatePersonsList;
      this.groupTableCopyList = res.data.rotatePersonsList;
    });
  }

  //全部科室
  deptOnload() {
    this.deptTableLoading = true;
    traineeShiftApi.queryAllDeptsAndRotateDeptsForTrain({sheetId:this.sheetId}).then(res => {
      this.deptTableLoading = false;
      this.deptTableList = res.data;
      this.deptTableCopyList = res.data;
    }).catch(err=>{
		this.deptTableLoading = false;
	});
  }

  // 已有科室
  queryAllRorateDepts() {
    this.existingDeptTableLoading = true;
    traineeShiftApi.queryAllRorateDeptsForTrain({sheetId:this.sheetId}).then(res => {
      this.existingDeptTableLoading = false;
      this.existingDeptTableList = res.data || [];
    }).catch(err=>{
		this.existingDeptTableLoading = false;
	});
  }

  //导出Excel
  export() {
    traineeShiftApi.exportSheetCompleteInfo({
		sheetId:this.sheetId
	}).then(res => {
      fileDownload(res);
    });
  }

  /** 获取导入模板 */
  getImportTemplate() {
    if (this.tableList.length<1) {
      message.warning('请先添加规培生')
    } else {
      traineeShiftApi.exportSheetTemplateYaXin({
		sheetId:this.sheetId
	}).then(res => fileDownload(res))
    }
  }

  /** 设置初始化的轮科表 */
  initRaunchy(){
    // 查询二级子菜单
    traineeShiftApi.queryAllRotationScheduleSheets().then((res)=>{
      if(res.data){
        let list:any[] = res.data
        list.map((item:any,index:any)=>{
          if(index == 0){
          console.log(item);
           this.sheetId = item.id
           this.titleCurr = item.title
          }
        })
        this.onload()
      }
    })
  }


  /** 根据模板导入实习生轮科表 */
  import() {
    let importElId = 'sxslrb_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      console.log(file)
      this.tableLoading = true;

      traineeShiftApi.importSheetTemplateYaXin(file, this.sheetId)
        .then(res => {
          message.success('导入成功')
          this.onload()
        }, err => this.tableLoading = false)

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
  }
}

export const traineeShiftModal = new TraineeShiftModal();
