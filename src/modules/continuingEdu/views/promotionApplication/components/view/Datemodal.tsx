import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { DatePicker} from "antd";
import {PromotionAppUtils} from '../../PromotionAppUtils'

interface Props {
  value:moment.Moment | undefined,
  keys:any,
}
export default observer(function DateModal(props:Props){
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false)
  const {value,keys} = props
  const {tableObjN1,tableObjN2,tableObjN3,tableObjN4}  = PromotionAppUtils

  const handleChange = (e: any, value: any) => {
    if(PromotionAppUtils.master.formCode == 'HSJS_0001'){
      tableObjN1[value] = e;
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0002') {
      tableObjN2[value] = e;
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0003') {
      tableObjN3[value] = e;
    } else if (PromotionAppUtils.master.formCode == 'HSJS_0004') {
      tableObjN4[value] = e;
    }
    setyearPickerIsOpen(false);
  };

  return(
    <DatePicker
    value={value}
    open={yearPickerIsOpen}
    mode="year"
    className="year-picker"
    placeholder="全部"
    format="YYYY"
    onOpenChange={() => {
      setyearPickerIsOpen(true);
    }}
    onPanelChange={(e) => {
      handleChange(e, keys);
    }}
  />
  )
})