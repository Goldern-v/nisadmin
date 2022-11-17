import CryptoJS from 'crypto-js';

const keyStr = '5hOwdHxpW0GOciqZ';

//加密
export function encrypt(word: string): string {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: CryptoJS.enc.Utf8.parse('0102030405060708'),
        mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
    });
    let hexStr = encrypted.ciphertext.toString().toUpperCase();
    return hexStr.toString();
}

//解密
export function decrypt(word: string): string {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: CryptoJS.enc.Utf8.parse('0102030405060708'),
        mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}