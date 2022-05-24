import { replenishList } from './../../util/tool';

export const obj =  {

  getData() {
    return {
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
        key4_8: '2',
        key5_1: '2',
        key5_2: '1',
      },
    }
  },
   formatData() {
    (this as any).getSectionData('4_4').value = (this as any).allData['4_4'];
    (this as any).getSectionData('4_7').value = replenishList((this as any).allData['4_7'], 6);
    (this as any).getSectionData('4_8').report = (this as any).allData.report;
    (this as any).getSectionData('5_1').report = (this as any).allData.report;
    (this as any).getSectionData('5_2').report = (this as any).allData.report;
    
  }
}