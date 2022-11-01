import styled from "styled-components";
import React, {useState, useEffect} from "react";
import {observer} from "mobx-react";
import moment from "moment";
import {Radio, Checkbox} from "antd";
import {PromotionAppUtils} from '../../PromotionAppUtils'
import {appStore} from "src/stores";

interface Props {
    type: string,
    disabled: boolean,
    values: any,
    option: any[],
    inputKey: string,
}

interface WrapperProps {
    color: any;//这里写的是任意类型请参考实际情况书写正确类型
}

export default observer(function SelectBox(props: Props) {
    const {type, disabled, values, option, inputKey} = props;
    const {tableObjN1, tableObjN2, tableObjN3, tableObjN4} = PromotionAppUtils;
    let [color, setColor] = useState('#00A680')
    const standardN1 = ['JS0000036', 'JS0000036', 'JS0000039', 'JS0000042', 'JS0000044', 'JS0000045', 'JS0000046', 'JS0000050', 'JS0000051', 'JS0000052', 'JS0000053']
    const standardN2 = ['JS0000058', 'JS0000061', 'JS0000042', 'JS0000063', 'JS0000064', 'JS0000067', 'JS0000076', 'JS0000078', 'JS0000084', 'JS0000086', 'JS0000088', 'JS0000090']
    const standardN3 = ['JS0000042', 'JS0000107', 'JS0000108', 'JS0000067', 'JS0000086', 'JS0000090']
    const standardN4 = ['JS0000134', 'JS0000137', 'JS0000042', 'JS0000067', 'JS0000084', 'JS0000085']
    const setFun = (e:string) => {
        color = ((option.length === 2 && e === 'B') || (option.length === 3 && e === 'C')) ? 'red' : '#00A680'
        setColor(color)
    }
    const judgeColor = (e: string) => {
        /*对每个阶段划分判断*/
        if (appStore.HOSPITAL_ID === 'whyx' && PromotionAppUtils.master.formCode === 'HSJS_0001' && standardN1.includes(inputKey)) {
            setFun(e)
        }
        if (appStore.HOSPITAL_ID === 'whyx' && PromotionAppUtils.master.formCode === 'HSJS_0002' && standardN2.includes(inputKey)) {
            setFun(e)
        }
        if (appStore.HOSPITAL_ID === 'whyx' && PromotionAppUtils.master.formCode === 'HSJS_0003' && standardN3.includes(inputKey)) {
            setFun(e)
        }
        if (appStore.HOSPITAL_ID === 'whyx' && PromotionAppUtils.master.formCode === 'HSJS_0004' && standardN4.includes(inputKey)) {
            setFun(e)
        }
    }
    const onClickRadio = (e: any, value: any) => {
        judgeColor(e.target.value)
        if (PromotionAppUtils.master.formCode == 'HSJS_0001') {
            if (tableObjN1[value] == e.target.value) {
                tableObjN1[value] = ''
            } else {
                tableObjN1[value] = e.target.value
            }
        } else if (PromotionAppUtils.master.formCode == 'HSJS_0002') {
            if (tableObjN2[value] == e.target.value) {
                tableObjN2[value] = ''
            } else {
                tableObjN2[value] = e.target.value
            }
        } else if (PromotionAppUtils.master.formCode == 'HSJS_0003') {
            if (tableObjN3[value] == e.target.value) {
                tableObjN3[value] = ''
            } else {
                tableObjN3[value] = e.target.value
            }
        } else if (PromotionAppUtils.master.formCode == 'HSJS_0004') {
            if (tableObjN4[value] == e.target.value) {
                tableObjN4[value] = ''
            } else {
                tableObjN4[value] = e.target.value
            }
        }

    }
    const onCheckboxChange = (e: any, value: any) => {
        let list = e.filter((item: any) => item != ',')
        if (PromotionAppUtils.master.formCode == 'HSJS_0001') {
            tableObjN1[value] = list.toString();
        } else if (PromotionAppUtils.master.formCode == 'HSJS_0002') {
            tableObjN2[value] = list.toString();
            console.log(tableObjN2[value]);
        } else if (PromotionAppUtils.master.formCode == 'HSJS_0003') {
            tableObjN3[value] = list.toString();
        } else if (PromotionAppUtils.master.formCode == 'HSJS_0004') {
            tableObjN4[value] = list.toString();
        }
    }
    useEffect(() => {
        judgeColor(values)
    }, [values])
    return (
        <Wrapper color={color}>
            {
                type && type == "radio" ? (
                    option.map((item: any, index) => {
                        return <Radio.Group

                            value={values} key={index}>
                            <Radio
                                value={item.value} onClick={(e) => {
                                onClickRadio(e, inputKey)
                            }} disabled={disabled}>{item.label}</Radio>
                        </Radio.Group>
                    })
                ) : (
                    <Checkbox.Group
                        options={option} value={Array.isArray(values) ? values : values} onChange={(e) => {
                        onCheckboxChange(e, inputKey)
                    }}/>
                )
            }
        </Wrapper>
    )
})

const Wrapper = styled.div<WrapperProps>`
  display: flex;

  .input-item {
    span {
      margin: 0 8px;
    }

    input {
      width: 13px !important;
    }
  }

  .ant-radio-wrapper {
    font-size: 12px;
    margin: 0px;
    margin-left: 3px;
  }

  .ant-checkbox-wrapper {
    font-size: 12px;
  }

  .ant-checkbox-input, .ant-radio-input {
    width: 20px !important;
  }

  .ant-radio-inner::after {
    background-color: ${props => props.color};
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: ${props => props.color}
  }
`



