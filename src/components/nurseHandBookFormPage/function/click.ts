/**
 * 表单点击事件
 */
import moment from "moment";

export function tick(col:any) {
  col.value == "√" ? col.value = "" : col.value = "√"
  return true
}

export function timePicker(col:any) {
  if(col.value == ""){
    col.value = moment().format('YYYY-MM-DD HH:mm')
  }
  return true
}

export function datePicker(col:any) {
  if(col.value == ""){
    col.value = moment().format('YYYY-MM-DD')
  }
  return true
}
