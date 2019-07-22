import { globalModal } from 'src/global/globalModal'

export function openAuditModal(title: string, row: any, callBack: any) {
  switch (title) {
    case '文章':
      {
        globalModal.auditModal.show({
          getTableData: callBack,
          id: row.id,
          type: 'nurseWHArticle',
          title: '审核文章',
          tableFormat: [
            {
              发表年份: `publicYear`,
              杂志名称: `magazineName`
            },
            {
              文章名称: `articleName`,
              期刊号: `periodicalNumber`
            },
            {
              卷号: `volumeNumber`,
              起止页码: `pageNumber`
            },
            {
              文章类别: `articleType`,
              影响因子: `influencingFactors`
            }
          ],
          allData: row
        })
      }
      break
  }
}
