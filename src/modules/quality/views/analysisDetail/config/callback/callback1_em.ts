import { appStore } from 'src/stores';
import { analysisModal } from './../../../analysisWhyx/AnalysisModal';
import { getBlank, replenishList } from './../../util/tool';
/**固定渲染数据 */
const FIXED_ITEMS = [
  '采血扫描合格率',
  '长期口服药扫描合格率',
  '长期静脉给药扫描合格率',
  '静脉炎发生例数',
  '药液渗出发生例数',
  '各类导管非计划拔管例数',
  '锐器伤发生例数',
  '',
  '',
  ''
]
export const obj =  {

  getData() {
    return {
      key1_1: [
        { question: "疫情期间上班人手不足", feetback: "问题反馈,需要紧急调配人手" },
        { question: "疫情期间上班人手不足", feetback: "问题反馈,需要紧急调配人手" },
        { question: "疫情期间上班人手不足", feetback: "问题反馈,需要紧急调配人手" },
        { question: "疫情期间上班人手不足", feetback: "问题反馈,需要紧急调配人手" },
      ],
      key2_1: {
        tableData: [
          { lx: "过程", xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
          { lx: "过程", xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
          { lx: "过程", xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
          { lx: "过程", xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
          { lx: "过程", xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
          { lx: "过程", xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
          { lx: "过程", xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
          { lx: "过程", xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
        ],
        bottom: {
          blsj: 7,
          lxjb: '高级'
        }
      },
      key2_2: [
        { xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
        { xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
        { xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
        { xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
        { xm: "分级护理表质量", zlhgf: "合格分90分", hgl: ">=90%", hgsccs: "9/10", pjf: "92", hgl2: "93%", wdb: "达标" },
      ],
      key2_3: {
        conclusion: {
          zb: 100,
          db: 80,
          wdb: 20
        },
        tableData: [
          { zb: "护理指标高评分", zywt: "护理部门主要问题是红红火火恍恍惚惚或", yyfx: "原因分析原因分析原因分析哈哈哈", zgcs: "整改护理部署的措施", xgpj: "满意满意继续努力" },
          { zb: "护理指标高评分", zywt: "护理部门主要问题是红红火火恍恍惚惚或", yyfx: "原因分析原因分析原因分析哈哈哈", zgcs: "整改护理部署的措施", xgpj: "满意满意继续努力" },
          { zb: "护理指标高评分", zywt: "护理部门主要问题是红红火火恍恍惚惚或", yyfx: "原因分析原因分析原因分析哈哈哈", zgcs: "整改护理部署的措施", xgpj: "满意满意继续努力" },
        ]
      },
      key3_1:
      {
        ygznr:
        {
        gzjh:' 首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划',
        pxjh:' 首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划',
        },
        wcqk:
        {
        gzjh:' 首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划',
        pxjh:' 首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划，首先工作计划然后工作计划最后工作计划',
        }
      },
      '3_3': [
        {
          year: '2020',
          index4: '',
          index3: '',
          index2: '',
          index0: '',
          index5: '',
          index1: '',
        }
      ],
      '3_4': {
        i1: '1',
        i2: '1',
        i3: '1',
        i4: '1',
        i5: '1',
      },
      '4_4': {
        q: 'question',
        r: {
          r: '人',
          j: '机',
          w: '物',
          f: '法',
          h: '环',
        },
        mr: 'mainReason',
        sign: '目标',
        what: 'what',
        why: 'Why',
        how: 'How',
        when: 'When',
        where: 'Where',
        who: 'Who',
        c: 'content'
      },
      '4_7': [
        {
          deptName: '',
          empName: '',
          score: '',
          mq: ''
        }
      ],
      report: {
        key1_1: '2',
        key2_1: '2',
        key2_2: '2',
        key2_3: '2',
        key4_8: '2',
        key5_1: '2',
        key5_2: '1',
      },
      img: []
    }
  },
  formatData() {
    (this as any).getSectionData('1_1').list = (this as any).allData['key1_1'];
    (this as any).getSectionData('2_1').list = (this as any).allData['key2_1'];
    (this as any).getSectionData('2_2').list = (this as any).allData['key2_2'];
    (this as any).getSectionData('2_3').list = (this as any).allData['key2_3'];
    (this as any).getSectionData("3_1").text = (this as any).allData["key3_1"];
    (this as any).getSectionData("3_1").list = (this as any).allData["3_3"];
    (this as any).getSectionData('3_4').value = (this as any).allData['3_4'];
    (this as any).getSectionData('4_4').value = (this as any).allData['4_4'];
    (this as any).getSectionData('4_8').report = (this as any).allData.report;
    (this as any).getSectionData('4_0').value = (this as any).allData.img;
    (this as any).getSectionData('5_1').report = (this as any).allData.report;
    (this as any).getSectionData('5_2').report = (this as any).allData.report;
    
  },
  async initRender() {
    if (!(analysisModal.renderData && analysisModal.tableTempList)) return
    const { renderData, tableTempList } = analysisModal
    const obj: Record<string, any> = {}
    Object.keys(renderData).map((v: string) => {
      obj[v] = []
      // 本月护理主要问题分析改进 提取
      if (v == 'monthCareProblemImprove') {
        const data: Record<string, any> = {}
        renderData[v].map((v1: any) => {
          if (data[v1.item] != undefined) {
            v1.mainProblem && (data[v1.item] += v1.mainProblem + '/n')
            return
          }
          data[v1.item] = v1.mainProblem || ''
        })
        let blank = getBlank(tableTempList[v])
        Object.keys(data).map((v2: any) => {
          obj[v].push({ ...blank, item: v2, mainProblem: data[v2] })
        })
        return
      }

      const blank = getBlank(tableTempList[v])
      renderData[v].map((v3: any) => {
        obj[v].push({ ...blank, ...v3 })
      })
      if (v == 'deptOneQualityIndexResult') {
        FIXED_ITEMS.map((v4: string) => {
          obj[v].push({ ...blank, item: v4 })
        })
      }
    });
    let proList: any[] = []
    const reportId = appStore.queryObj.id
    Object.keys(obj).map((v4: string) => {
      if (!obj[v4]) return
      const params = {
        reportId,
        tableName: v4,
        data: obj[v4]
      }
      proList.push((this as any).saveReportTableData(params))
    })
    try {
      const res = await Promise.all(proList)
      analysisModal.clearRenderData()
      return res
    } catch (e) {
    }
  }
}