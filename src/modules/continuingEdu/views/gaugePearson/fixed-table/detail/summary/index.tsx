import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Input, message} from "antd";
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";

const {TextArea} = Input

export interface IProps {
    isPreview?: boolean
    /**规培手册导出数据**/
    exportData?: any
}

/**固定表-个人总结 */
export default observer(function FixedSummary(props: IProps) {
    const {isPreview = false, exportData} = props
    const [value, setValue] = useState(exportData|| handbookModel?.detail?.dataMaps?.summary)
    const handleArea = (e: any) => {
        if (!isPreview) {
            const {
                id: catalogId,
                masterId,
                templateId,
                templateType
            } = handbookModel.curCatalogue
            trainingSettingApi.saveOrUpdateItemData({
                catalogId,
                masterId,
                templateId,
                templateType,
                dataMaps: {summary: e.target.value}
            }).then((res) => {
                // 重新请求详情数据
                message.success('保存成功')
                handbookModel.getCatalogueData()
            })
        }
    }
    useEffect(() => {
        if(exportData){
            setValue(exportData)
        }
        if(handbookModel?.detail?.dataMaps?.summary){
            setValue(handbookModel?.detail?.dataMaps?.summary)
        }
    }, [exportData,handbookModel?.detail?.dataMaps?.summary])
    return (
        <Wrapper>
            <div className='title' style={{ border:isPreview ?'1px solid #999': "none"}}>
                个人总结
                {
                    isPreview ? <TextArea
                        disabled
                        className='area-input'
                        placeholder=""
                    /> : <TextArea
                        value={value}
                        onChange={(e: any) => setValue(e.target.value)}
                        onBlur={handleArea}
                        className='area-input'
                        placeholder='请填写个人总结'
                    />
                }
            </div>
        </Wrapper>
    )
})

const Wrapper: any = styled.div`
  width: 210mm;
  /* height: 960mm; */

  .title {
    line-height: 32px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 10px;

    .area-input {
      min-height: 500px;
      min-width: 400px;
    }

  }
`
