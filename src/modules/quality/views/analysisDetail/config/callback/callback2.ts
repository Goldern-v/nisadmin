
export const obj =  {

  getData() {
    return {
      report: {
        key5_1: '2'
      }
    }
  },
   formatData() {
    (this as any).getSectionData('5_1').report = (this as any).report
  }
}