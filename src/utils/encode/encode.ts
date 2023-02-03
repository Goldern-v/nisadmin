const CryptoJS = require("crypto-js")
const privateKey = 'chenrui2020'

/** 对字符串进行加密 */
export function compileStr(code: string) {
  return CryptoJS.AES.encrypt(code, privateKey).toString();
}
/** 字符串进行解密 */
export function uncompileStr(code: string) {
  return CryptoJS.AES.decrypt(code, privateKey).toString(CryptoJS.enc.Utf8);
}