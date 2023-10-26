import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import printing from 'printing'
import {STATUS_LIST} from "src/modules/nurseHandBookNew/views/list-jew/utils/enums";

export interface Props {
    renderCfg: any
    callback: (success: boolean) => any

}

export default function ZjhjImportTable(props: Props) {
    const {renderCfg, callback} = props
    const exportId = 'exportNurserFileWh'
    /** 加载完成 */
    const [inited, setInited]: any = useState(false)
    /** 基本信息 */
    /** 编制变动 */
    const handlePrint = () => {
            let printEl = document.getElementById(exportId)
            if (printEl) printing(printEl, {
                injectGlobalCss: true,
                scanStyles: false,
                css: `
        @page {
          margin: 10mm;
        }
        *{
          color:#000;
        }
        #${exportId} {
          display:block!important;
        }
      `
            })
        }


    useEffect(() => {
        setInited(true)
        setTimeout(() => {
            handlePrint()
            setInited(false)
            callback(false)
        }, 700)
    }, [])

    return <Wrapper id={exportId}>
        {inited && <React.Fragment>
            <div className="render-container">
                {renderCfg.map((cfg: any, tableIdx: any) => (
                    <TableCon
                        key={tableIdx}>
                        <colgroup>
                            {cfg.columns.map((column: any, columnIdx: number) => (
                                <col width={column.col || ''} key={`${tableIdx}-${columnIdx}-col`}/>
                            ))}
                        </colgroup>
                        <thead></thead>
                        <tbody>
                        <tr className="main-title-row">
                            <td colSpan={cfg.columns.length}>{cfg.mainTitle}</td>
                        </tr>
                        <tr className="title-row">
                            {cfg.columns.map((column: any, columnIdx: number) => {
                                if (columnIdx !== cfg.columns.length - 1) {
                                    return <td key={`${tableIdx}-${columnIdx}-title`}>{column.title}</td>
                                }
                            })}
                        </tr>
                        {cfg.data.map((item: any, itemIdx: number) => (
                            <tr
                                className="content-row"
                                key={`${tableIdx}-${itemIdx}-row`}>
                                {cfg.columns.map((column: any, columnIdx: number) => {
                                    let statusValue: any = {}
                                    let halfYearText:string =''
                                    if (column.dataIndex == 'status') {
                                        statusValue = STATUS_LIST.find(v => v.value === item[column.dataIndex])
                                    }
                                    if(column.dataIndex == 'halfYear'){
                                        halfYearText={1:'上半年',0:"下半年"}[item[column.dataIndex]]
                                    }
                                    if (columnIdx == 0) {
                                        return <td
                                            key={`${tableIdx}-${columnIdx}-${itemIdx}-content`}>
                                            {itemIdx + 1}
                                        </td>
                                    }
                                    if (columnIdx !== cfg.columns.length - 1) {
                                        return <td
                                            key={`${tableIdx}-${columnIdx}-${itemIdx}-content`}>
                                            {column.dataIndex == 'status' ? statusValue.label:column.dataIndex == 'halfYear'? halfYearText  : item[column.dataIndex]}
                                        </td>
                                    }
                                })}
                        </tr>
                        ))}
                    </tbody>
                    </TableCon>
                    ))}
                    </div>
                    </React.Fragment>}
            </Wrapper>
            }

        const Wrapper = styled.div`
        display:none;
        .render-container{
        width: 660px;
        margin: auto;
        table{
        position: relative;
    }
    }
        `
        const TableCon = styled.table`
        width: 100%;
        border-collapse: collapse;
        td {
        border: 1px solid #000;
        height: 27px;
        text-align: center;
    }
        tr{
        &.main-title-row{
        font-weight: bold;
    }
        &.title-row,&.content-row{
        font-size:12px;
    }

        &.content-row{
        /* td{
          &>div{
            width: 100%;
            height: auto;
            max-height: 100%;
            overflow: hidden;
          }
        } */
    }
    }
        `