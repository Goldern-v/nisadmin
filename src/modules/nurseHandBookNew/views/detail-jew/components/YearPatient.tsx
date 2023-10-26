import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import {observer} from 'mobx-react'
import {DetailCtxCon} from 'src/modules/nurseHandBookNew/style'
import {Obj} from 'src/libs/types'
import {tableConConfig} from '../config'
import {FORM_CODE_VALUE} from "src/modules/nurseHandBookNew/views/list-jew/utils/enums";

/**表格类表单 */
export default observer(function () {
    const config = useMemo(() => tableConConfig[model.detail?.record?.menuCode] || {}, [model.id])
    const [itemValue, setItemValue] = useState('')
    useEffect(() => {
        setItemValue(FORM_CODE_VALUE[model.detail?.record?.menuCode])
    }, [])
    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
            <div className='heard-title'>
                {model.detail?.record?.year}年{model.detail?.record?.[config?.titleType || 'menuName']}
            </div>
            <table className='table-content'>
                <thead>
                <tr>
                    <td style={{width: '80px'}}>
                        <div style={{"position": "relative"}}>
                            <div style={{textAlign: 'right'}}>月份</div>
                            <div style={{textAlign: "left"}}>日期</div>
                            <div style={{
                                "content": "",
                                "position": "absolute",
                                "width": "1px",
                                "height": "105px",
                                "top": "-21px",
                                "left": "38px",
                                "backgroundColor": "#1A3A50",
                                "display": "block",
                                "transform": "rotate(-50deg)"
                            }}>
                            </div>
                        </div>
                    </td>

                    {
                        Array.from(Array(31)).map((v: Obj, i: number) => (
                            <td key={i}>{(i + 1) <= 9 ? `0${i + 1}` : i + 1}</td>
                        ))
                    }
                    <td>合计</td>
                </tr>
                </thead>
                <tbody>

                {
                    (model.yearPersonData?.list || []).map((item: any, key: number) => {
                        return (
                            <tr>
                                <td>{key + 1}月</td>
                                {item.map((val: any) => {
                                    let value: any = undefined
                                    if (itemValue && val) {
                                        value = val[itemValue]
                                    }
                                    return (
                                        <td style={{textAlign: 'center'}}>{value || 0}</td>
                                    )
                                })}
                                <td style={{width:"30px"}}>{model.yearPersonData?.monthTotal[key]}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td>年合计</td>
                    <td>{model.yearPersonData?.monthTotal.reduce((a: number, b: number) => a + b, 0)}</td>
                </tr>
                </tbody>
            </table>
            {config?.tip && <div className='fs-s'>{config?.tip}</div>}
        </Wrapper>
    )
})

const Wrapper = styled(DetailCtxCon)`
  width: 800px;

  .titleName {
    line-height: 40px;
    border: 1px solid #333;
    border-bottom: none;
    text-align: center;
  }

  .svg-td {
    position: relative;

    span {
      position: absolute;
    }

    svg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;

      line {
        stroke: #000;
        stroke-width: 1;
      }
    }
  }

  .table-content {
    font-family: SimSun, sans-serif !important;;
    font-size: 16px;
  }

  .table-content tr td {
    white-space: nowrap;
  }

  .box {
    position: relative;
  }

  .box::before {
    content: "";
    position: absolute;
    width: 100%; /* 对角线宽度，设置为100%表示对角线铺满容器 */
    height: 2px; /* 对角线粗细 */
    background-color: #333; /* 对角线颜色 */
    top: 50%; /* 垂直位置，使对角线水平居中 */
    transform: translateY(-50%) rotate(-45deg); /* 旋转对角线为45度倾斜 */
  }

  .date-content {
    position: relative;
    z-index: 1; /* 确保内容在对角线上方显示 */
  }

  .date {
    font-weight: bold; /* 样式日期 */
  }

  .month {
    font-style: italic; /* 样式月份 */
  }

  .date-content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(-45deg, #000 50%, transparent 50%);
    background-size: 4px 4px; /* 调整对角线间距 */
  }

  .heard-title {
    margin-bottom: 20px;
    text-align: center;
    font-family: 'FZXiaoBiaoSong-B05S', SimSun, sans-serif !important; /* 使用方正小标3号字体或宋体作为备选字体 */
    font-size: 24px; /* 标题字号，可根据需要调整 */
    font-weight: bold; /* 加粗 */
  }
`