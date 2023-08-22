import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import printing from 'printing'
import Cover from './pages/Cover'
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";
import FixedBaseInfo from "src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/baseInfo";
import Grade from 'src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/grade'
import Summary from "src/modules/continuingEdu/views/gaugePearson/fixed-table/detail/summary";
import StandardTraining from "../components/standardTraining";
import BaseExam from "src/modules/continuingEdu/views/gaugePearson/handbook/components/baseExam";
import ClinicalEvaluation from "src/modules/continuingEdu/views/gaugePearson/handbook/components/ClinicalEvaluation";
import SpecialSkill from "src/modules/continuingEdu/views/gaugePearson/handbook/components/specialSkill";
import Professionalism from "src/modules/continuingEdu/views/gaugePearson/handbook/components/professionalism";
import Template2 from "src/modules/continuingEdu/views/gaugePearson/handbook/components/template2";
import PdfViewer from "src/modules/nursingRulesNew-wh/components/PdfViewer";

export interface Props {
    callback: (success: boolean) => any
    masterId: number | string | undefined
}

export default function ExportBookWhyx(props: Props) {
    const {callback, masterId} = props
    /** 加载完成 */
    const [inited, setInited]: any = useState(false)
    const [config, setConfig] = useState([] as any)
    const handlePrint = () => {
        let printEl = document.getElementById('exportBookId')
        let documentTitle = window.document.title
        window.document.title = '规培生手册'
        if (printEl) printing(printEl, {
            injectGlobalCss: true,
            scanStyles: false,
            css: `
        @page {
          margin: 10mm;
        }
   @media print {
  .ant-spin-nested-loading {
    height: auto !important;
  }
        *{
          color:#000;
        }
        #exportBookId {
          display:block!important;
        }
      `
        })
        setTimeout(() => window.document.title = documentTitle, 1000)
    }

    const getData = () => {
        trainingSettingApi.exportQueryAllData(masterId).then((res: any) => {
            setConfig([...res.data])
            setInited(true)
            setTimeout(() => {
                handlePrint()
                setInited(false)
                callback(true)
            }, 500)
        })
    }

    useEffect(() => {
        getData()
    }, [masterId])

    return <Wrapper id='exportBookId'>
        {inited && <React.Fragment>
            <PrintPage>
                <Cover/>
            </PrintPage>
            <div className="render-container">
                {
                    config.map((item: any) => {
                        const {templateType,tableName} =item.catalogListVo
                        /*固定类型*/
                        if (templateType == 4 && tableName == '规培生基本信息') {
                            return <FixedBaseInfo/>
                        }
                        if (templateType == 4 && tableName == '个人总结') {
                            return <Summary   exportData={item.itemAndDataVo?.dataMaps?.summary} />
                        }
                        if (templateType == 4 &&tableName == '岗前培训考核成绩') {
                            return  <Grade  exportData = {item?.itemAndDataVo?.preTheoryExamDetails}/>
                        }
                        /*固定模板类型*/
                        if(templateType == 1 && tableName =='护士规范化培训课表及实施记录'){
                            return <StandardTraining isExport={true} exportData={item.itemAndDataVo?.templateItemListVos}/>
                        }
                        if(templateType == 1 && tableName =='基础操作技能单项考核汇总表'){
                            return <BaseExam isExport={true} exportData={item.itemAndDataVo?.templateItemListVos}/>
                        }
                        if(templateType == 1 && tableName =='专项技能考核表'){
                            return <SpecialSkill isExport={true} exportData={item.itemAndDataVo?.templateItemListVos}/>
                        }
                        if(templateType == 1 && tableName =='职业素质评定表'){
                            return <Professionalism isExport={true} exportData={item.itemAndDataVo?.templateItemListVos}/>
                        }
                        if(templateType == 1 && tableName =='临床评定表'){
                            return <ClinicalEvaluation isExport={true} dataMaps={item.itemAndDataVo?.dataMaps} exportData={item.itemAndDataVo?.templateItemListVos}/>
                        }
                        /*pdf类型*/
                        if(templateType == 3){
                            return  <PdfViewer file={item.itemAndDataVo?.attachment?.path} width={780 - 2} />
                        }
                        if(templateType == 2){
                            return <Template2
                                tableName={tableName}
                                itemDataStr={item.itemAndDataVo?.itemDataStr?JSON.parse(item.itemAndDataVo?.itemDataStr):[]}
                                isExport={true} formItems={item.itemAndDataVo?.formItems}/>
                        }
                    })
                }
            </div>
        </React.Fragment>}
    </Wrapper>
}

const Wrapper = styled.div`
  display: none;

  .render-container {
    width: auto;
    margin: auto;

    table {
      position: relative;
    }
  }
`
const PrintPage = styled.div`
  width:auto;
  height: 962px;
  margin: 0mm auto;
  page-break-after: always;
  position: relative;
  * {
    color: #000;
  }
  table {
    table-layout: fixed;
  }
`