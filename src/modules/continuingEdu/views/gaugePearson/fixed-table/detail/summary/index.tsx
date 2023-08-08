import {observer} from 'mobx-react'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Input} from "antd";
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";

export interface IProps {
    isPreview?: boolean
}

/**固定表-个人总结 */
export default observer(function FixedSummary(props: IProps) {
    const {isPreview = false} = props
    useEffect(() => {
        console.log("handbookModel.catalogue",handbookModel.catalogueData);
    }, [])
    const handleArea =(e:any)=>{
        trainingSettingApi.saveOrUpdateItemData({

        }).then((res)=>{

        })
    }
    return (
        <Wrapper>
            <div className='title'>
                个人总结
                <Input.TextArea
                    onBlur={handleArea}
                    className='area-input'
                    placeholder='请填写个人总结'
                />
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
    border: 1px solid #999;
    padding: 10px;

    .area-input {
      min-height: 500px;
      min-width: 400px;
    }

  }
`
