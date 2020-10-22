const CryptoJS = require("crypto-js")
const SecretKey = 'chenrui2020'

//对字符串进行加密
export function compileStr(code: string) {
  return CryptoJS.AES.encrypt(code, SecretKey).toString();
}
//字符串进行解密
export function uncompileStr(code: string) {
  return CryptoJS.AES.decrypt(code, SecretKey).toString(CryptoJS.enc.Utf8);
} 