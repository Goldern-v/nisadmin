export const theme = {
  /** 主题色 */
  $mtc: '#00A680',
  /** 主题对比色 */
  $mcc: '#F0944B',
  /** 深主题色 */
  $mtdc: '#1D9165',
  /** 黄 明亮色 */
  $mlc: '#fff8b1',
  /** 页面的padding */
  $mcp: '15px 15px',
  // padding: ${(p) => p.theme.$mcp};
  // body背景色统一
  $bgBody: '#eeeeee',
  // 阴影
  $shadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
  // tab阴影
  $tabShadow: '0px 1px 2px 0px rgba(0,0,0,0.15)',
  // 上下左右间距
  $margin: '20px',
  // 表格每行高度   height:${(p) => p.theme.$tableRowHeight};
  $tableRowHeight: '30px',
  $tableThHeight: '36px',
  $headerHeight: '50px'
}
export type Theme = typeof theme
