//图表高度自适应相关
export const chartHeightCol = (restHeight = 200): number => {
  let windowHeight = document.documentElement.clientHeight

  return windowHeight - restHeight
}