import {observer} from 'mobx-react'
import React, {useEffect, useState} from 'react'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import {Place} from 'src/components/common'
import {Obj} from 'src/libs/types'
import {appStore} from 'src/stores'
import styled from 'styled-components'
import moment from 'moment'
import {Button, Select, message} from 'antd'
import AddModal from './components/addModal'
import {trainingSettingApi} from '../api/TrainingSettingApi'
import {handbookModel, handbookModel as model} from './model'
import Menu from './components/menu'
import Detail from './components/detail'
import ExportBookWhyx from "src/modules/continuingEdu/views/gaugePearson/handbook/exportBookWhyx/ExportNurseFileWh";
const BG = require('src/modules/nurseFiles/view/nurseFiles-wh/images/顶部背景.png')
const spacePhoto = require('src/modules/statistic/img/spacePhoto.svg')
const {Option} = Select

export interface IProps {
}

/**规培生手册 */
export default observer(function PearsonHandbook(props: IProps) {
    /**规培生信息
     * 从学习培训跳转通过params传递信息
     */
    const [addVisible, setAddVisible] = useState(false)
    const [exportVisible, setExportVisible] = useState(false)

    const onExport = () => {
        if(handbookModel.curCatalogue.masterId){
            setExportVisible(true)
        }
    }
    const onCreate = () => {
        setAddVisible(true)
    }
    const createHandbook = (e: Obj) => {
        trainingSettingApi.createHandbook({
            ptStudentId: model.info.id,
            ...e,
        }).then(res => {
            message.success(res.desc)
            setAddVisible(false)
            model.getHandbookList()
        })
    }

    useEffect(() => {
        model.info = appStore.queryObj
        model.reset()
    }, [])
    useEffect(() => {
        if (model.curHb?.id) model.getCatalogue()
    }, [model.curHb])

    return (
        <Wrapper>
            <div className='header'>
                <BaseBreadcrumb data={[{name: '规培护士', link: ''}, {name: '规培手册', link: ''}]}/>
                <div className='header-info'>
          <span className='header-title'>
            {model.info.name}
          </span>
                    <span>{model.info.sapCode}</span>
                    |
                    <span>{model.info.studyDeptName}</span>
                    |
                    <span>{model.info.sex}</span>
                    |
                    <span>{model.age}岁</span>
                    <Place/>
                    <Button onClick={() => appStore.history.goBack()}>返回</Button>
                    <Button type='primary' onClick={() => onExport()}>导出</Button>
                </div>
            </div>
            <div className='create-con'>
                <div>
                    {model.curHb?.id && <div className='create-con-title'>
                       规培生手册
                    </div>}
                    {
                        model.curHb?.id &&
                        <Select
                            style={{ width: '200px',marginTop:'6px' }}
                            value={model.curHb?.id} onChange={(e: any, option: any) => model.getCurHb(option)}>
                            {
                                model.handbookList.map(v =>
                                    <Option value={v.id} key={v.id}>{v.handbookName}</Option>
                                )}
                        </Select>
                    }
                </div>
                <Place/>
                <Button type='danger' onClick={() => model.delHandbook()}>删除</Button>
                <Button type='primary' onClick={() => onCreate()}>创建手册</Button>
            </div>
            <div className={'ctx-con' + (model.curHb?.id ? '' : ' ctx-con__empty')}>
                {model.curHb?.id ?
                    <>
                        <Menu/>
                        <Detail/>
                    </>
                    :
                    <>
                        <embed src={spacePhoto} type='image/svg+xml'/>
                        <div className='spaceFont'>暂无数据</div>
                    </>
                }
            </div>
            <AddModal visible={addVisible} data={model.info} onCancel={() => setAddVisible(false)}
                      onOk={createHandbook}/>
          {/*导出pdf  */}
            {exportVisible && (
                <ExportBookWhyx
                    masterId={handbookModel.curCatalogue.masterId}
                    callback={() => { setExportVisible(false) }} />
            )}

        </Wrapper>
    )
})

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    background: url(${BG});
    background-size: cover;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #dbe0e4;
    font-size: 13px;
    position: relative;

    .header-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;
      padding: 10px 30px;

      span:not(.header-title) {
        padding: 0 5px;
      }
    }

    .header-title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
  }

  .create-con {
    padding: 5px  20px 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .create-con-title {
      font-weight: bold;
      color: #333;
      margin-top: 4px;
      text-align: center;
      font-size: 18px;
    }

  }

  .ctx-con {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    &.ctx-con__empty {
      flex-direction: column;
      justify-content: center;
    }

    .ant-menu {
      height: 100%;
    }
  }
`
