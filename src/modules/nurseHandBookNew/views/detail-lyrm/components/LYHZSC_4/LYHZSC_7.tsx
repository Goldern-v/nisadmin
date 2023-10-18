import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../../newModel'
import {Input} from 'antd'
import {observer} from 'mobx-react'
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {cloneDeep} from "lodash";

const {TextArea} = Input

export interface Props {
}
/**护士长手册说明*/
export default observer(function (props: Props) {
    const onChange = (e: any) => {
        let data =cloneDeep(model.noticeObj)
        model.setNoticeObj({
            ...data,
            notice:e.target.value
        })
    }
    const onTitleChange = (e: any) => {
        let data =cloneDeep(model.noticeObj)
        model.setNoticeObj({
            ...data,
            title:e.target.value
        })
    }
    useEffect(() => {
        nurseHandBookService.getNotice().then((res: any) => {
            model.setNoticeObj(res.data)
        })
    }, [])
    return (
        <Wrapper ref={model.ctxRef}  style={{ pointerEvents: model.allowEdit ? 'auto' : 'none' }}>
            <Input className='title'
                   onChange={onTitleChange}
                   value={
                       model.noticeObj.title || '护士长手册说明'
            }>
            </Input>
            <TextArea
                rows={20}
                style={{
                    width: '80%',
                }}
                placeholder='请输入护士长手册说明'
                onChange={onChange}
                value={model.noticeObj.notice}/>
            {/*{*/}
            {/*    model.editorData?.v1 ? <TextArea value={*/}
            {/*            model.editorData?.v1*/}
            {/*        }/> :*/}
            {/*        <Empty style={{marginTop: '200px', width: "100%"}} image={Empty.PRESENTED_IMAGE_SIMPLE}*/}
            {/*               description={'暂无说明内容'}/>*/}
            {/*}*/}
        </Wrapper>
    )
})

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 95px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  .title{
    margin-top: 6vh;
      margin-bottom: 20px;
      text-align: center;
      font-size: 18px;
      font-weight: 800;
      line-height: 40px;
      border-left: none;
      border-right: none;
      border-top: none;
      border-radius: 0;
      min-height: 40px;
      :focus {
        box-shadow: none;
  }

`