type Obj = Record<string, any> 
export class AnalysisModal  {
  // 自动提取的数据
  public renderData: Obj | string = ''
  public tableTempList: Obj | string = ''
  
  /**保存自动提取数据 */
  setRenderData(data: Obj) {
    this.renderData = data.renderTableDataMap || {}
    this.tableTempList = data.reportTableFieldTemplateList || {}
  }
  /**使用完提取数据后，清除数据 */
  clearRenderData() {
    this.renderData = ''
    this.tableTempList = ''
  }
}

export const analysisModal = new AnalysisModal()