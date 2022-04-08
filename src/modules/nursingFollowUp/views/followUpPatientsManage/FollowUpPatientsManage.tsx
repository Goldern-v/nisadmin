import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
import 已分配出院患者 from './components/已分配出院患者'
import 待分配出院患者 from './components/待分配出院患者'
import FollowUpPatientsManageServices from './services/FollowUpPatientsManageServices'
const api = new FollowUpPatientsManageServices();
export interface Props { }
export default function FollowUpPatientsManage(props: any) {
  const [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1,
  })
  const { queryObj, history } = appStore
  const handleTagChange = (tabId: string) => {
    history.replace(`/nursingFollowUp/随访患者管理?tabId=${tabId}`)
  }
  const [templateList, setTemplateList]: any = useState([])
  const [deptList, setDeptList] = useState([] as any)
  const [diseaseList, setDiseaseList]: any = useState([])
  useEffect(() => {
    getDeptList();
    getTemplateList();
    getDiseaseList();
  }, []);
  const getDeptList = () => {
    api.getNursingUnitAll().then(res => {
      if (res.data.deptList instanceof Array) setDeptList(res.data.deptList);
    })
  }
  const getTemplateList = () => {
    api.visitTeam({}).then(res => {
      if (res.data instanceof Array) setTemplateList(res.data);
    })
  }
  const getDiseaseList = () => {
    api.visitDiseaseType( ).then(res => {
      if (res.data instanceof Array) setDiseaseList(res.data);
    })
  }
  const tabList = [
    { name: '已分配出院患者', id: '1' },
    { name: '待分配出院患者', id: '2' },
  ]
  const currentView = () => {
    switch (queryObj.tabId) {
      case '2':
        return <待分配出院患者 deptList={deptList} diseaseList={diseaseList}/>
      default:
        return <已分配出院患者 deptList={deptList}/>
    }
  }
  return <Wrapper>
    <div className="body">
      <div className="tab-nav-header">
        {tabList.map((item: any) => (
          <div
            key={item.id}
            className={[
              'tag-item',
              (() => {
                if (item.id == '1' && !queryObj.tabId)
                  return 'active'
                return item.id == queryObj.tabId ? 'active' : ''
              })()
            ].join(' ')}
            onClick={() => handleTagChange(item.id)}>
            {item.name}
          </div>
        ))}
      </div>
      <div className="page-content">
        {currentView()}
      </div>
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  height: 100%;
  width: calc(100vw - 200px);
  display: flex;
  flex-direction: column;
  .tab-nav-header{
    background: #fff;
    overflow: hidden;
    &>div{
      cursor: pointer;
      padding: 0 15px;
      border-right: 1px solid #eee;
      height:36px;
      font-size: 14px;
      line-height:36px;
      width: auto;
      float: left;
      &.active{
        background: rgba(0,0,0,0.045);
      }
    }
  }
  .page-content{
    flex: 1;
  }
`