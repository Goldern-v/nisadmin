import { replenishList } from './../../util/tool';

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
    }
  },
   formatData() {
    (this as any).getSectionData('1_1').list = (this as any).allData['key1_1'];
    (this as any).getSectionData('2_1').list = (this as any).allData['key2_1'];
    (this as any).getSectionData('2_2').list = (this as any).allData['key2_2'];
    (this as any).getSectionData('2_3').list = (this as any).allData['key2_3'];
    (this as any).getSectionData('4_4').value = (this as any).allData['4_4'];
    (this as any).getSectionData('4_7').value = replenishList((this as any).allData['4_7'], 6);
    (this as any).getSectionData('4_8').report = (this as any).allData.report;
    (this as any).getSectionData('5_1').report = (this as any).allData.report;
    (this as any).getSectionData('5_2').report = (this as any).allData.report;
    
  }
}