import React, {memo} from "react";
import {DatePicker, Input} from "antd";
import {dateFormat3} from "src/modules/nurseHandBookNew/views/detail-jew/config";
import moment from "moment";
const {TextArea}=Input
export default memo((props: any) => {
    const {value, component,height, ...other} = props
    switch (component) {
        case 'DataPicker':
            return (
                <DatePicker className='cell-ipt'
                            format={dateFormat3} value={value ? moment(value) : undefined} {...other} />)
        case 'TextArea':
            return (
                <TextArea className='cell-ipt'
                          style={{height:height||'600px'}}
                         value={value} {...other} />)
        default:
            return <Input className='cell-ipt ta-c' value={value} {...other} />
    }
}, (prev: any, next: any) => {
    return prev?.value == next?.value
})