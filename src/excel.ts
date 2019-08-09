import XLSX from 'xlsx'
export function downloadExl(json: any, type?: any) {
  var tmpDown: any //导出的二进制对象
  var tmpdata: any = json[0]
  json.unshift({})
  var keyMap: any = [] //获取keys
  //keyMap =Object.keys(json[0]);
  for (var k in tmpdata) {
    keyMap.push(k)
    json[0][k] = k
  }
  var tmpdata: any = [] //用来保存转换好的json
  json
    .map((v: any, i: any) =>
      keyMap.map((k: any, j: any) =>
        Object.assign(
          {},
          {
            v: v[k],
            position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
          }
        )
      )
    )
    .reduce((prev: any, next: any) => prev.concat(next))
    .forEach(
      (v: any, i: any) =>
        (tmpdata[v.position] = {
          v: v.v
        })
    )
  var outputPos = Object.keys(tmpdata) //设置区域,比如表格从A1到D10
  var tmpWB = {
    SheetNames: ['mySheet'], //保存的表标题
    Sheets: {
      mySheet: Object.assign(
        {},
        tmpdata, //内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
        }
      )
    }
  }
  tmpDown = new Blob(
    [
      s2ab(
        XLSX.write(
          tmpWB,
          { bookType: type == undefined ? 'xlsx' : type, bookSST: false, type: 'binary' } //这里的数据是用来定义导出的格式类型
        )
      )
    ],
    {
      type: ''
    }
  )
  //创建二进制对象写入转换好的字节流

  var href = URL.createObjectURL(tmpDown) //创建对象超链接
  let a = document.createElement('a')
  a.download = 'aaa'
  a.href = href
  document.body.appendChild(a)
  a.click()
  setTimeout(function() {
    //延时释放
    URL.revokeObjectURL(tmpDown) //用URL.revokeObjectURL()来释放这个object URL
  }, 100)
}

function s2ab(s: any) {
  //字符串转字符流
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n: any) {
  let temCol = '',
    s = '',
    m = 0
  while (n > 0) {
    m = (n % 26) + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}

// function tableToJsonStr() {
//   //根据实际情况通过js拼接json字符串
//   var jsonStr = '[ '
//   for (var i = 0; i < $('.listOrder').length; i++) {
//     for (var j = 0; j < $('.listOrder')[i].children.length; j += 2) {
//       jsonStr += '{"roomNo":"' + $('.listOrder')[i].children[j].innerText + '",'
//       jsonStr += '"lockNo":"' + $('.listOrder')[i].children[j + 1].children[0].value + '"},'
//     }
//   }
//   jsonStr = jsonStr.slice(0, -1) + ']'
//   try {
//     return JSON.parse(jsonStr)
//   } catch (e) {
//     console.error(e)
//   }
// }
