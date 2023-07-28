export const addCSS = (wid: any, cssText: string, id?: string) => {
  let style = wid.document.createElement('style') //创建一个style元素
  id && (style.id = id)
  let head = wid.document.head || wid.document.getElementsByTagName('head')[0] //获取head元素
  style.type = 'text/css' //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
  if (style.styleSheet) {
    //IE
    var func = function() {
      try {
        //防止IE中stylesheet数量超过限制而发生错误
        style.styleSheet.cssText = cssText
      } catch (e) {}
    }
    //如果当前styleSheet还不能用，则放到异步中则行
    if (style.styleSheet.disabled) {
      setTimeout(func, 10)
    } else {
      func()
    }
  } else {
    //w3c
    //w3c浏览器中只要创建文本节点插入到style元素中就行了
    var textNode = wid.document.createTextNode(cssText)
    style.appendChild(textNode)
  }
  head.appendChild(style) //把创建的style元素插入到head中
}

/**获取每毫米的像素值 */
export function getOneMmsPx() {
  // 创建一个1mm宽的元素插入到页面，然后坐等出结果
  let div = document.createElement("div");
  div.id = "mm";
  div.style.width = "1mm";
  // eslint-disable-next-line no-unused-expressions
  document.querySelector("body")?.appendChild(div);
  // 原生方法获取浏览器对元素的计算值
  let mm1 = document.getElementById("mm")?.getBoundingClientRect();
  // console.log(mm1);
  return mm1?.width;
}
