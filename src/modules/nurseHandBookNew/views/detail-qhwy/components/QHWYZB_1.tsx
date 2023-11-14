import React from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import {Input} from 'antd'
import {observer} from 'mobx-react'
import {DetailCtxCon} from 'src/modules/nurseHandBookNew/style'
import moment from 'moment'
import classNames from "classnames";

const {TextArea} = Input


/**护士长季度工作计划 */
export default observer(function () {

    const onChange = (e: any, key: string) => {

        const data = {
            ...model.editorData,
            [key]: e.target.value || e.currentTarget.innerText
        }

        model.handleEditorChange(data)
    }

    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
            <div className='title-box'>
                <Input className={classNames(['title', 'title-box-input'])} value={model.editorData?.vYear}
                       onChange={(e: any) => onChange(e, 'vYear')}/>年
                <Input
                    className={classNames(['title', 'title-box-input'])}
                    value={model.editorData?.vMonth} onChange={(e: any) => onChange(e, 'vMonth')}/>月第
                <Input
                    className={classNames(['title', 'title-box-input'])}
                    value={model.editorData?.vWeek}
                    onChange={(e: any) => onChange(e, 'vWeek')}/>周{model.editorTitle}
            </div>
            <table>
                <colgroup>
                    <col width='100%'/>
                </colgroup>
                <tbody>
                <tr>
                    <td className='flex cell-ipt'>
                        <div>日期：{moment().format('YYYY-MM-DD')}</div>
                        {/*<DatePicker*/}
                        {/*    disabledDate={disabledDate}*/}
                        {/*  style={{ width: 180 }}*/}
                        {/*  value={model.editorData?.v1 ? moment(model.editorData.v1) : undefined} onChange={(e:any) => onChange1(e, 'v1')} />*/}
                    </td>
                </tr>
                {/* <tr>
            <td className='flex cell-ipt'>
              <div>科室：</div>
              <Select style={{width: '80%'}} value={model.editorData?.v2} onChange={(e:any) => onChange1(e, 'v2')}>
                {
                  deptList.map(v => (
                    <Option key={v.code} value={v.code}>{v.name}</Option>
                  ))
                }
              </Select>
            </td>
          </tr> */}
                <tr>
                    <td>
                        <div className='label'>
                            上周工作完成情况：
                        </div>
                        <TextArea autosize={{minRows: 8}} className='cell-ipt te-8' value={model.editorData?.v3}
                                  onChange={(e: any) => onChange(e, 'v3')}></TextArea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className='label'>
                            未完成工作及说明：
                        </div>
                        <TextArea autosize={{minRows: 8}} className='cell-ipt te-8' value={model.editorData?.v4}
                                  onChange={(e: any) => onChange(e, 'v4')}></TextArea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className='label'>
                            上周临时性工作：
                        </div>
                        <TextArea autosize={{minRows: 8}} className='cell-ipt te-8' value={model.editorData?.v5}
                                  onChange={(e: any) => onChange(e, 'v5')}></TextArea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className='label'>
                            本周工作计划：
                        </div>
                        <TextArea autosize={{minRows: 8}} className='cell-ipt te-8' value={model.editorData?.v6}
                                  onChange={(e: any) => onChange(e, 'v6')}></TextArea>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className='label'>
                            需协调和帮助：
                        </div>
                        <TextArea autosize={{minRows: 8}} className='cell-ipt te-8' value={model.editorData?.v7}
                                  onChange={(e: any) => onChange(e, 'v7')}></TextArea>
                    </td>
                </tr>
                </tbody>
            </table>
        </Wrapper>
    )
})

const Wrapper = styled(DetailCtxCon)`
  .title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .title-box-input {
    width: 70px !important;
    margin-bottom: 0 !important;
  }

  .label {
    text-align: left;
  }

  .flex {
    display: flex;
  }

  .ant-select-arrow {
    display: none;
  }

  .ant-input {
    border: none
  }
`