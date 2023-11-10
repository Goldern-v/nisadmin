import { observable, computed, action } from "mobx";
import { fileDownload } from "src/utils/file/file";
import { qualityService } from "../../services/QualitySummaryService";
import printing from 'printing'
import { crrentMonth } from "src/utils/moment/crrentMonth";

interface tableObj {
  qcCode:string,
  qcName:string,
  mainQuestions:[],
  reason:string,
  measure:string,
  track:string
}
interface platoObj {
  countNum:number,
  rate:number,
  qcItemType:string,
  qcItemTypeName:string,
}
type Data = tableObj;

class SummaryModal {
  public qcLevelList = [
    {name:"一级质控",code:1},
    {name:"二级质控",code:2},
    {name:"三级质控",code:3},
  ]; //质控级别
  public typeList = [
    {name:"表格",code:"1"},
    {name:"柏拉图",code:"2"},
  ]; //质控级别
  @observable public qcCodeList = []; //表单列表
  @observable public qcLevel = 1; //质控级别
  @observable public qcCode = ""; //表单编码
  @observable public showtype = "1"; //页面显示类型
  @observable public type = 1; //类型（1汇总；2明细）
  @observable public tableList:tableObj[] = []; // 表格内容
  @observable public ChartsImg:string[] = []; //帕拉图片路径
  @observable public plato:platoObj[] = []; //帕拉图数据
  @observable public selectedDate: any = crrentMonth(); // 查房日期
  @observable public tableLoading = false;
  @observable public isPrint = false;

  async initData() {
    await Promise.all([
      this.getTemplateList(),
    ]);
  }

  @computed
  get postObj() {
    return {
      qcLevel:this.qcLevel,
      qcCode:this.qcCode,
      type:this.type,
      beginDate: this.selectedDate[0].format("YYYY-MM-DD"),
      endDate: this.selectedDate[1].format("YYYY-MM-DD")
    };
  }

  @action
  changeExport(flag:boolean){
    this.isPrint = flag
  }

  getTemplateList(){
    return new Promise((resolve:any,reject:any)=>{
      qualityService.getTemplateList(this.qcLevel).then(res=>{
        this.qcCodeList = res.data;
        this.qcCode = res.data[0].qcCode
        resolve(true)
      })
    })
  }
  
  initCanvasImg = ()=>{
    let timer: any = null
    timer = setTimeout(() => {
      let canvasEl = document.querySelectorAll('canvas') as any
      if (canvasEl.length) {
        let arr = []
        for (let i = 0; i < canvasEl.length; i++) {
          arr.push(canvasEl[i].toDataURL())
        }
        this.ChartsImg = arr
      }
    }, 1000)
  }

  setImg = () => {
    let imgEl = document.querySelectorAll('.chart-img') as any
    if (imgEl.length) {
      for (let i = 0; i < imgEl.length; i++) {
        this.ChartsImg[i] && (imgEl[i].src = this.ChartsImg[i])
      }
    }
  }

  toPrint = ()=>{
    setTimeout(() => {
      printing.preview(document.querySelector(".tableBox") as HTMLElement, {
        // 插入所有link和style标签到打印，默认是false
        injectGlobalCss: true,
        // 指定扫描样式，默认是true（全部）
        scanStyles: false,
        css: `
          .chart-img {
            max-height: 260mm;
            width: 100%;
            object-fit: cover
          }
        `
      }).then(() => {
        this.changeExport(false)
      })
    }, 500)
  }

  exportExcel(){
    qualityService.export(this.postObj).then(res=>{
      fileDownload(res);
    })
  }

  async onload() {
    this.tableLoading = true;
    await Promise.all([
      qualityService.getPage(this.postObj).then((res: { data?: Data }) => {
        let data:tableObj = res.data!
        let arr:any[] = []
        data?.mainQuestions?.map((main:any)=>{
          main.remark?.map((mark:any,markIn:number)=>{
            let _data:tableObj = {...data}
            let _main = {...main}
            if( _data && _data?.mainQuestions) delete _data?.mainQuestions
            delete _main?.remark
            let obj = {..._data,..._main,mark:mark.remark}
            if(markIn===0) obj.markRowspan = main.remark.length
            arr.push(obj)
          })
        })
        this.tableList = arr
      }),
      qualityService.getPlato(this.postObj).then((res:any) => {
        this.plato = res.data
      })
    ])
    this.tableLoading = false;
    this.initCanvasImg()
  }

  async init() {
    await this.initData();
    await this.onload();
  }
}

export const summaryModal = new SummaryModal();
