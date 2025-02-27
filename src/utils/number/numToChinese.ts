//如果数字含有小数部分，那么可以将小数部分单独取出
//将小数部分的数字转换为字符串的方法：

var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
var chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
var chnUnitChar = ['', '十', '百', '千']
/**中文数字2 */
export const chnNumChar1 = ['零', '一', '两', '三', '四', '五', '六', '七', '八', '九']
var numToChn = function(num: any) {
  var index = num.toString().indexOf('.')
  if (index != -1) {
    var str = num.toString().slice(index)
    var a = '点'
    for (var i = 1; i < str.length; i++) {
      a += chnNumChar[parseInt(str[i])]
    }
    return a
  } else {
    return
  }
}

//定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
function sectionToChinese(section: any) {
  var str = '',
    chnstr = '',
    zero = false,
    count = 0 //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
  while (section > 0) {
    var v = section % 10 //对数字取余10，得到的数即为个位数
    if (v == 0) {
      //如果数字为零，则对字符串进行补零
      if (zero) {
        zero = false //如果遇到连续多次取余都是0，那么只需补一个零即可
        chnstr = chnNumChar[v] + chnstr
      }
    } else {
      zero = true //第一次取余之后，如果再次取余为零，则需要补零
      str = chnNumChar[v]
      str += chnUnitChar[count]
      chnstr = str + chnstr
    }
    count++
    section = Math.floor(section / 10)
  }
  return chnstr
}

//定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零

export function numToChinese(num: any) {
  var a = numToChn(num) || ''
  num = Math.floor(num)
  var unitPos = 0
  var strIns = '',
    chnStr = ''
  var needZero = false

  if (num === 0) {
    return chnNumChar[0]
  }
  while (num > 0) {
    var section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = sectionToChinese(section)
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = section < 1000 && section > 0
    num = Math.floor(num / 10000)
    unitPos++
  }

  return (chnStr + a).replace('一十', '十')
}

// TransformToChinese(12339492835.99302)
//输出    "一百二十三亿三千九百四十九万二千八百三十五点九九三零二"
